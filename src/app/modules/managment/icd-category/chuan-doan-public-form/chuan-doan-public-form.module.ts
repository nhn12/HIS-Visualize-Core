import { ShareComponentModule } from './../../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpCacheService } from '../../../../core/http/http-cache.service';
import { HttpService } from '../../../../core/http/http.service';
import { CommonListModule } from '../../../../share-component/common-list-component/common-list-component.module';
import { AuthenticationService } from '../../../../core/authentication/authentication.services';
import { NgxSelectModule } from 'ngx-select-ex';
import { ChuanDoanPublicFormComponent } from './chuan-doan-public-form.component';
import { ElasticModule } from 'angular2-elastic';
import { SearchTypingBoxComponent } from '../../../../share-component/search-typing-box/search-typing-box.component';
import { SearchTypingBoxModule } from '../../../../share-component/search-typing-box/search-typing-box-component.module';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    ReactiveFormsModule,
    TabsModule,
    NgxSelectModule,
    ElasticModule,
    CommonModule, 
    ShareComponentModule,
    SearchTypingBoxModule
  ],
  declarations: [ChuanDoanPublicFormComponent],
  exports: [ChuanDoanPublicFormComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class ChuanDoanPublicFormModule {


  constructor() {
  }


}