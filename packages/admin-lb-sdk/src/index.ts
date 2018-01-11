/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { EmailApi } from './services/custom/Email';
import { CoreApi } from './services/custom/Core';
import { StorageContainerApi } from './services/custom/StorageContainer';
import { ContentEventApi } from './services/custom/ContentEvent';
import { ContentPageApi } from './services/custom/ContentPage';
import { ContentProductApi } from './services/custom/ContentProduct';
import { ContentPostApi } from './services/custom/ContentPost';
import { StorageFileApi } from './services/custom/StorageFile';
import { KPIApi } from './services/custom/KPI';
import { FacilitySurvey_CNApi } from './services/custom/FacilitySurvey_CN';
import { FacilitySurveyData_CNApi } from './services/custom/FacilitySurveyData_CN';
import { PollutantType_CNApi } from './services/custom/PollutantType_CN';
import { Facility_CNApi } from './services/custom/Facility_CN';
import { FacilityType_CNApi } from './services/custom/FacilityType_CN';
import { FuelDefine_CNApi } from './services/custom/FuelDefine_CN';
import { FuelType_CNApi } from './services/custom/FuelType_CN';
import { FacilityFuel_CNApi } from './services/custom/FacilityFuel_CN';
import { RoadVehicle_CNApi } from './services/custom/RoadVehicle_CN';
import { RoadVehicle_HKApi } from './services/custom/RoadVehicle_HK';
import { RoadVehicleFuel_CNApi } from './services/custom/RoadVehicleFuel_CN';
import { RoadVehicleFuel_HKApi } from './services/custom/RoadVehicleFuel_HK';
import { RoadFuelType_CNApi } from './services/custom/RoadFuelType_CN';
import { RoadFuelType_HKApi } from './services/custom/RoadFuelType_HK';
import { RoadSubgroup_HKApi } from './services/custom/RoadSubgroup_HK';
import { RoadVehicleType_CNApi } from './services/custom/RoadVehicleType_CN';
import { RoadVehicleType_HKApi } from './services/custom/RoadVehicleType_HK';
import { RoadEmissionStandard_CNApi } from './services/custom/RoadEmissionStandard_CN';
import { RoadEmissionStandard_HKApi } from './services/custom/RoadEmissionStandard_HK';
import { NonRoadVehicle_CNApi } from './services/custom/NonRoadVehicle_CN';
import { NrVehicleType_CNApi } from './services/custom/NrVehicleType_CN';
import { NonRoadVehicleFuel_CNApi } from './services/custom/NonRoadVehicleFuel_CN';
import { NrRatedPowerType_CNApi } from './services/custom/NrRatedPowerType_CN';
import { NrEmissionStandard_CNApi } from './services/custom/NrEmissionStandard_CN';
import { OrganizationApi } from './services/custom/Organization';
import { SystemApi } from './services/custom/System';
import { SystemDomainApi } from './services/custom/SystemDomain';
import { SystemSettingApi } from './services/custom/SystemSetting';
import { SystemUserApi } from './services/custom/SystemUser';
import { PingApi } from './services/custom/Ping';
import { MetaApi } from './services/custom/Meta';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        RealTime,
        EmailApi,
        CoreApi,
        StorageContainerApi,
        ContentEventApi,
        ContentPageApi,
        ContentProductApi,
        ContentPostApi,
        StorageFileApi,
        KPIApi,
        FacilitySurvey_CNApi,
        FacilitySurveyData_CNApi,
        PollutantType_CNApi,
        Facility_CNApi,
        FacilityType_CNApi,
        FuelDefine_CNApi,
        FuelType_CNApi,
        FacilityFuel_CNApi,
        RoadVehicle_CNApi,
        RoadVehicle_HKApi,
        RoadVehicleFuel_CNApi,
        RoadVehicleFuel_HKApi,
        RoadFuelType_CNApi,
        RoadFuelType_HKApi,
        RoadSubgroup_HKApi,
        RoadVehicleType_CNApi,
        RoadVehicleType_HKApi,
        RoadEmissionStandard_CNApi,
        RoadEmissionStandard_HKApi,
        NonRoadVehicle_CNApi,
        NrVehicleType_CNApi,
        NonRoadVehicleFuel_CNApi,
        NrRatedPowerType_CNApi,
        NrEmissionStandard_CNApi,
        OrganizationApi,
        SystemApi,
        SystemDomainApi,
        SystemSettingApi,
        SystemUserApi,
        PingApi,
        MetaApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
