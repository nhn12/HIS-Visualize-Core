import { AppConstants } from './../../../utils/app-constants';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { CommonPaging } from './../../../core/condition/paging';
import { CommonFilter } from './../../../core/condition/filter';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { TableMappingDto } from '../../category/services/data/table-mapping-dto';
import { Option } from '../../../share-component/common-list-component/common-list.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'reception-list.component.html',
  selector: "reception-list",
  styleUrls: ['reception-list.component.scss'],
  providers: [ReceptionListService]
})
export class ReceptionListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor(private route: Router) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Ngày T/Nhận', 'created_date', 'date'));
    this.mapTable.push(new TableMappingDto('Tên', 'hoten'));
    this.mapTable.push(new TableMappingDto('G/T', 'genderName'));
    this.mapTable.push(new TableMappingDto('N/S', 'namsinh'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
    this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
    this.mapTable.push(new TableMappingDto('Số TT', 'stt'));
    this.mapTable.push(new TableMappingDto('Thời gian khám', 'stt'));
    this.mapTable.push(new TableMappingDto('Nguồn ĐK', 'channel', 'icon'));



    this.option = new Option();
    this.option.isDelete = false;
    this.option.isEdit = false;
    this.option.urlCreate = "/reception/reception-create";
    this.option.urlEdit = "/reception/reception-create";
    this.option.callbackData = (data)=>{return this.callbackSource(data)}
  }

  callbackSource(data) {
    if(data && data.channel) {
      data['channel_custom'] = (data.channel == 'M'?'<i class="icon-screen-smartphone"></i>':'<i class="icon-home"></i>');
    }

    return data;

  }
}
