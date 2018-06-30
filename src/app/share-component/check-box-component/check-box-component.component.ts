import { Component, OnInit, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../modules/category/services/category.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Filter, CommonFilter } from '../../core/condition/filter';
import { DefaultCondition, ConditionOperator, AndCondition } from '../../core/condition/condition';
import { to } from '../../utils/promise-utils';

export class CheckboxOptions {
  public enableDescription: boolean;
  public single: boolean;
}

export const EPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true
};

@Component({
  selector: 'app-check-box-component',
  templateUrl: './check-box-component.component.html',
  styleUrls: ['./check-box-component.component.scss'],
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor, OnChanges {

  onChange;

  @Input() resource;
  @Input() optional: CheckboxOptions;

  listData: any[] = [];
  modelList: any[] = [];
  registerMapData: any;

  typeClass: string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

  }

  writeValue(obj: any): void {
    if (obj && obj.length == undefined) {
      // Is single
      obj = [obj];
    }
    if (obj && obj.length > 0) {
      this.modelList = obj;
      if (!this.listData || this.listData.length <= 0) {
        this.registerMapData = ((obj) => {
          this.writeValue(obj);
        })
        return;
      }
      this.listData.forEach(element => {
        let temp = this.modelList.filter(x => (x.code == undefined && x == element.code) || (x.code != undefined && x.code == element.code));
        if (temp.length > 0) {
          element.checked = true;
          element.description = temp[0].description;
        } else {
          temp[0].checked = false;
          element.description = undefined;
        }
      })
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['resource'] && change['resource'].currentValue) {
      this.resource = change['resource'].currentValue;
      if(this.resource.indexOf("type_tbl")!=-1) {
        this.resource = "type_tbl";
        this.typeClass = change['resource'].currentValue.replace("type_tbl ", "");
      }
      this.getCategory();
    }
  }

  async getCategory() {
    let condition = [];
    condition.push(new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false));
    if(this.typeClass) {
      condition.push(new DefaultCondition(ConditionOperator.EQ, "class", this.typeClass));
    }
    let filter = new CommonFilter(new AndCondition(condition));
    this.categoryService.setResource(this.resource)
    let [error, response] = await to<any>(this.categoryService.getList(filter, null, null).toPromise());

    if (error) {
      return;
    }

    this.listData = response.results;
    if (this.registerMapData) {
      this.registerMapData(this.modelList);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  change($event) {
    // Angular does not know that the value has changed 
    // from our component, so we need to update her with the new value.
    this.onChange($event.target.textContent);
  }

  registerOnTouched(fn: any): void {

  }

  changeItem(item) {
    if (this.optional && this.optional.single) {
      // single mode
      if(item.checked == true) {
        this.listData.forEach(element=>{
          element.checked = false;
        })
        this.listData.filter(x => x.code == item.code)[0].checked = true;
        this.onChange(item.code);
      } else {
        this.onChange(null);
      }
      return;
    }

    if (this.optional && this.optional.enableDescription) {
      this.modelList = this.listData.filter(x => x.checked == true).map(value=>{
        let temp: any = {};
        temp.code = value.code;
        temp.description = value.description;
        return temp;
      });
    } else {
      this.modelList = this.listData.filter(x => x.checked == true).map(value => {
        return value.code;
      });
    }
    this.onChange(this.modelList);
  }


  setDisabledState?(isDisabled: boolean): void {

  }

}