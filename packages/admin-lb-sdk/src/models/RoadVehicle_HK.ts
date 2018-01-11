/* tslint:disable */
import {
  RoadVehicleFuel_HK,
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface RoadVehicle_HKInterface {
  "id"?: number;
  "serialNumber": string;
  "licensePlateNo": string;
  "vehicleTypeId": number;
  "fuelTypeId": number;
  "subgroupId": number;
  "emissionStandardId": number;
  "efValue"?: any;
  "systemDomainId"?: string;
  "systemUserId": string;
  "created"?: Date;
  "modified"?: Date;
  roadVehicleFuel_HKs?: RoadVehicleFuel_HK[];
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class RoadVehicle_HK implements RoadVehicle_HKInterface {
  "id": number;
  "serialNumber": string;
  "licensePlateNo": string;
  "vehicleTypeId": number;
  "fuelTypeId": number;
  "subgroupId": number;
  "emissionStandardId": number;
  "efValue": any;
  "systemDomainId": string;
  "systemUserId": string;
  "created": Date;
  "modified": Date;
  roadVehicleFuel_HKs: RoadVehicleFuel_HK[];
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: RoadVehicle_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicle_HK`.
   */
  public static getModelName() {
    return "RoadVehicle_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicle_HK for dynamic purposes.
  **/
  public static factory(data: RoadVehicle_HKInterface): RoadVehicle_HK{
    return new RoadVehicle_HK(data);
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
      name: 'RoadVehicle_HK',
      plural: 'RoadVehicle_HKs',
      path: 'RoadVehicle_HKs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "serialNumber": {
          name: 'serialNumber',
          type: 'string'
        },
        "licensePlateNo": {
          name: 'licensePlateNo',
          type: 'string'
        },
        "vehicleTypeId": {
          name: 'vehicleTypeId',
          type: 'number'
        },
        "fuelTypeId": {
          name: 'fuelTypeId',
          type: 'number'
        },
        "subgroupId": {
          name: 'subgroupId',
          type: 'number'
        },
        "emissionStandardId": {
          name: 'emissionStandardId',
          type: 'number'
        },
        "efValue": {
          name: 'efValue',
          type: 'any'
        },
        "systemDomainId": {
          name: 'systemDomainId',
          type: 'string'
        },
        "systemUserId": {
          name: 'systemUserId',
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
        roadVehicleFuel_HKs: {
          name: 'roadVehicleFuel_HKs',
          type: 'RoadVehicleFuel_HK[]',
          model: 'RoadVehicleFuel_HK'
        },
        systemDomain: {
          name: 'systemDomain',
          type: 'SystemDomain',
          model: 'SystemDomain'
        },
        systemUser: {
          name: 'systemUser',
          type: 'SystemUser',
          model: 'SystemUser'
        },
      }
    }
  }
}
