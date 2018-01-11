/* tslint:disable */
import {
  NonRoadVehicleFuel_CN,
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface NonRoadVehicle_CNInterface {
  "id"?: number;
  "serialNumber": string;
  "nrVehicleTypeId": number;
  "nrRatedPowerTypeId"?: number;
  "nrEmissionStandardId": number;
  "efValue1_1"?: any;
  "efValue1_2"?: any;
  "systemDomainId"?: string;
  "systemUserId": string;
  "created"?: Date;
  "modified"?: Date;
  nonRoadVehicleFuel_CNs?: NonRoadVehicleFuel_CN[];
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class NonRoadVehicle_CN implements NonRoadVehicle_CNInterface {
  "id": number;
  "serialNumber": string;
  "nrVehicleTypeId": number;
  "nrRatedPowerTypeId": number;
  "nrEmissionStandardId": number;
  "efValue1_1": any;
  "efValue1_2": any;
  "systemDomainId": string;
  "systemUserId": string;
  "created": Date;
  "modified": Date;
  nonRoadVehicleFuel_CNs: NonRoadVehicleFuel_CN[];
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: NonRoadVehicle_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NonRoadVehicle_CN`.
   */
  public static getModelName() {
    return "NonRoadVehicle_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NonRoadVehicle_CN for dynamic purposes.
  **/
  public static factory(data: NonRoadVehicle_CNInterface): NonRoadVehicle_CN{
    return new NonRoadVehicle_CN(data);
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
      name: 'NonRoadVehicle_CN',
      plural: 'NonRoadVehicle_CNs',
      path: 'NonRoadVehicle_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "serialNumber": {
          name: 'serialNumber',
          type: 'string'
        },
        "nrVehicleTypeId": {
          name: 'nrVehicleTypeId',
          type: 'number'
        },
        "nrRatedPowerTypeId": {
          name: 'nrRatedPowerTypeId',
          type: 'number'
        },
        "nrEmissionStandardId": {
          name: 'nrEmissionStandardId',
          type: 'number'
        },
        "efValue1_1": {
          name: 'efValue1_1',
          type: 'any'
        },
        "efValue1_2": {
          name: 'efValue1_2',
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
        nonRoadVehicleFuel_CNs: {
          name: 'nonRoadVehicleFuel_CNs',
          type: 'NonRoadVehicleFuel_CN[]',
          model: 'NonRoadVehicleFuel_CN'
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
