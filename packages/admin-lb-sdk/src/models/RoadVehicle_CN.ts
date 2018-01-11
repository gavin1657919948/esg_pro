/* tslint:disable */
import {
  RoadVehicleFuel_CN,
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface RoadVehicle_CNInterface {
  "id"?: number;
  "serialNumber": string;
  "licensePlateNo": string;
  "vehicleTypeId": number;
  "fuelTypeId": number;
  "emissionStandardId": number;
  "vehicleWeight": number;
  "efValue"?: any;
  "systemDomainId"?: string;
  "systemUserId": string;
  "created"?: Date;
  "modified"?: Date;
  roadVehicleFuel_CNs?: RoadVehicleFuel_CN[];
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class RoadVehicle_CN implements RoadVehicle_CNInterface {
  "id": number;
  "serialNumber": string;
  "licensePlateNo": string;
  "vehicleTypeId": number;
  "fuelTypeId": number;
  "emissionStandardId": number;
  "vehicleWeight": number;
  "efValue": any;
  "systemDomainId": string;
  "systemUserId": string;
  "created": Date;
  "modified": Date;
  roadVehicleFuel_CNs: RoadVehicleFuel_CN[];
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: RoadVehicle_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicle_CN`.
   */
  public static getModelName() {
    return "RoadVehicle_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicle_CN for dynamic purposes.
  **/
  public static factory(data: RoadVehicle_CNInterface): RoadVehicle_CN{
    return new RoadVehicle_CN(data);
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
      name: 'RoadVehicle_CN',
      plural: 'RoadVehicle_CNs',
      path: 'RoadVehicle_CNs',
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
        "emissionStandardId": {
          name: 'emissionStandardId',
          type: 'number'
        },
        "vehicleWeight": {
          name: 'vehicleWeight',
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
        roadVehicleFuel_CNs: {
          name: 'roadVehicleFuel_CNs',
          type: 'RoadVehicleFuel_CN[]',
          model: 'RoadVehicleFuel_CN'
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
