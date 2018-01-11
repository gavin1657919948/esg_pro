/* tslint:disable */
import {
  ContentEvent,
  ContentPage,
  ContentProduct,
  ContentPost,
  StorageFile,
  FacilitySurvey_CN,
  Facility_CN,
  RoadVehicle_CN,
  RoadVehicle_HK,
  NonRoadVehicle_CN,
  Organization
} from '../index';

declare var Object: any;
export interface SystemDomainInterface {
  "id": string;
  "name": string;
  "email": string;
  "created"?: Date;
  "modified"?: Date;
  contentEvents?: ContentEvent[];
  contentPages?: ContentPage[];
  contentProducts?: ContentProduct[];
  contentPosts?: ContentPost[];
  storageFiles?: StorageFile[];
  facilitySurveyCns?: FacilitySurvey_CN[];
  facilityCns?: Facility_CN[];
  roadVehicleCns?: RoadVehicle_CN[];
  roadVehicleHks?: RoadVehicle_HK[];
  nonRoadVehicleCns?: NonRoadVehicle_CN[];
  organizations?: Organization[];
}

export class SystemDomain implements SystemDomainInterface {
  "id": string;
  "name": string;
  "email": string;
  "created": Date;
  "modified": Date;
  contentEvents: ContentEvent[];
  contentPages: ContentPage[];
  contentProducts: ContentProduct[];
  contentPosts: ContentPost[];
  storageFiles: StorageFile[];
  facilitySurveyCns: FacilitySurvey_CN[];
  facilityCns: Facility_CN[];
  roadVehicleCns: RoadVehicle_CN[];
  roadVehicleHks: RoadVehicle_HK[];
  nonRoadVehicleCns: NonRoadVehicle_CN[];
  organizations: Organization[];
  constructor(data?: SystemDomainInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SystemDomain`.
   */
  public static getModelName() {
    return "SystemDomain";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SystemDomain for dynamic purposes.
  **/
  public static factory(data: SystemDomainInterface): SystemDomain{
    return new SystemDomain(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'SystemDomain',
      plural: 'Domains',
      path: 'Domains',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
        contentEvents: {
          name: 'contentEvents',
          type: 'ContentEvent[]',
          model: 'ContentEvent'
        },
        contentPages: {
          name: 'contentPages',
          type: 'ContentPage[]',
          model: 'ContentPage'
        },
        contentProducts: {
          name: 'contentProducts',
          type: 'ContentProduct[]',
          model: 'ContentProduct'
        },
        contentPosts: {
          name: 'contentPosts',
          type: 'ContentPost[]',
          model: 'ContentPost'
        },
        storageFiles: {
          name: 'storageFiles',
          type: 'StorageFile[]',
          model: 'StorageFile'
        },
        facilitySurveyCns: {
          name: 'facilitySurveyCns',
          type: 'FacilitySurvey_CN[]',
          model: 'FacilitySurvey_CN'
        },
        facilityCns: {
          name: 'facilityCns',
          type: 'Facility_CN[]',
          model: 'Facility_CN'
        },
        roadVehicleCns: {
          name: 'roadVehicleCns',
          type: 'RoadVehicle_CN[]',
          model: 'RoadVehicle_CN'
        },
        roadVehicleHks: {
          name: 'roadVehicleHks',
          type: 'RoadVehicle_HK[]',
          model: 'RoadVehicle_HK'
        },
        nonRoadVehicleCns: {
          name: 'nonRoadVehicleCns',
          type: 'NonRoadVehicle_CN[]',
          model: 'NonRoadVehicle_CN'
        },
        organizations: {
          name: 'organizations',
          type: 'Organization[]',
          model: 'Organization'
        },
      }
    }
  }
}
