/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { Core } from '../../models/Core';
import { StorageContainer } from '../../models/StorageContainer';
import { ContentEvent } from '../../models/ContentEvent';
import { ContentPage } from '../../models/ContentPage';
import { ContentProduct } from '../../models/ContentProduct';
import { ContentPost } from '../../models/ContentPost';
import { StorageFile } from '../../models/StorageFile';
import { KPI } from '../../models/KPI';
import { FacilitySurvey_CN } from '../../models/FacilitySurvey_CN';
import { FacilitySurveyData_CN } from '../../models/FacilitySurveyData_CN';
import { PollutantType_CN } from '../../models/PollutantType_CN';
import { Facility_CN } from '../../models/Facility_CN';
import { FacilityType_CN } from '../../models/FacilityType_CN';
import { FuelDefine_CN } from '../../models/FuelDefine_CN';
import { FuelType_CN } from '../../models/FuelType_CN';
import { FacilityFuel_CN } from '../../models/FacilityFuel_CN';
import { RoadVehicle_CN } from '../../models/RoadVehicle_CN';
import { RoadVehicle_HK } from '../../models/RoadVehicle_HK';
import { RoadVehicleFuel_CN } from '../../models/RoadVehicleFuel_CN';
import { RoadVehicleFuel_HK } from '../../models/RoadVehicleFuel_HK';
import { RoadFuelType_CN } from '../../models/RoadFuelType_CN';
import { RoadFuelType_HK } from '../../models/RoadFuelType_HK';
import { RoadSubgroup_HK } from '../../models/RoadSubgroup_HK';
import { RoadVehicleType_CN } from '../../models/RoadVehicleType_CN';
import { RoadVehicleType_HK } from '../../models/RoadVehicleType_HK';
import { RoadEmissionStandard_CN } from '../../models/RoadEmissionStandard_CN';
import { RoadEmissionStandard_HK } from '../../models/RoadEmissionStandard_HK';
import { NonRoadVehicle_CN } from '../../models/NonRoadVehicle_CN';
import { NrVehicleType_CN } from '../../models/NrVehicleType_CN';
import { NonRoadVehicleFuel_CN } from '../../models/NonRoadVehicleFuel_CN';
import { NrRatedPowerType_CN } from '../../models/NrRatedPowerType_CN';
import { NrEmissionStandard_CN } from '../../models/NrEmissionStandard_CN';
import { Organization } from '../../models/Organization';
import { System } from '../../models/System';
import { SystemDomain } from '../../models/SystemDomain';
import { SystemSetting } from '../../models/SystemSetting';
import { SystemUser } from '../../models/SystemUser';
import { Ping } from '../../models/Ping';
import { Meta } from '../../models/Meta';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    Core: Core,
    StorageContainer: StorageContainer,
    ContentEvent: ContentEvent,
    ContentPage: ContentPage,
    ContentProduct: ContentProduct,
    ContentPost: ContentPost,
    StorageFile: StorageFile,
    KPI: KPI,
    FacilitySurvey_CN: FacilitySurvey_CN,
    FacilitySurveyData_CN: FacilitySurveyData_CN,
    PollutantType_CN: PollutantType_CN,
    Facility_CN: Facility_CN,
    FacilityType_CN: FacilityType_CN,
    FuelDefine_CN: FuelDefine_CN,
    FuelType_CN: FuelType_CN,
    FacilityFuel_CN: FacilityFuel_CN,
    RoadVehicle_CN: RoadVehicle_CN,
    RoadVehicle_HK: RoadVehicle_HK,
    RoadVehicleFuel_CN: RoadVehicleFuel_CN,
    RoadVehicleFuel_HK: RoadVehicleFuel_HK,
    RoadFuelType_CN: RoadFuelType_CN,
    RoadFuelType_HK: RoadFuelType_HK,
    RoadSubgroup_HK: RoadSubgroup_HK,
    RoadVehicleType_CN: RoadVehicleType_CN,
    RoadVehicleType_HK: RoadVehicleType_HK,
    RoadEmissionStandard_CN: RoadEmissionStandard_CN,
    RoadEmissionStandard_HK: RoadEmissionStandard_HK,
    NonRoadVehicle_CN: NonRoadVehicle_CN,
    NrVehicleType_CN: NrVehicleType_CN,
    NonRoadVehicleFuel_CN: NonRoadVehicleFuel_CN,
    NrRatedPowerType_CN: NrRatedPowerType_CN,
    NrEmissionStandard_CN: NrEmissionStandard_CN,
    Organization: Organization,
    System: System,
    SystemDomain: SystemDomain,
    SystemSetting: SystemSetting,
    SystemUser: SystemUser,
    Ping: Ping,
    Meta: Meta,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
