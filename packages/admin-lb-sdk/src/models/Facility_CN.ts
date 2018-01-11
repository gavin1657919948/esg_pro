/* tslint:disable */
import {
  FacilityFuel_CN,
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface Facility_CNInterface {
  "id"?: number;
  "serialNumber": string;
  "fuelTypeId": number;
  "fuelDefineId": number;
  "facilityTypeId": number;
  "power": number;
  "powerUnit": string;
  "efValue1_1"?: any;
  "efValue1_2"?: any;
  "systemDomainId"?: string;
  "systemUserId": string;
  "created"?: Date;
  "modified"?: Date;
  facilityFuel_CNs?: FacilityFuel_CN[];
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class Facility_CN implements Facility_CNInterface {
  "id": number;
  "serialNumber": string;
  "fuelTypeId": number;
  "fuelDefineId": number;
  "facilityTypeId": number;
  "power": number;
  "powerUnit": string;
  "efValue1_1": any;
  "efValue1_2": any;
  "systemDomainId": string;
  "systemUserId": string;
  "created": Date;
  "modified": Date;
  facilityFuel_CNs: FacilityFuel_CN[];
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: Facility_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Facility_CN`.
   */
  public static getModelName() {
    return "Facility_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Facility_CN for dynamic purposes.
  **/
  public static factory(data: Facility_CNInterface): Facility_CN{
    return new Facility_CN(data);
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
      name: 'Facility_CN',
      plural: 'Facilitiy_CNs',
      path: 'Facilitiy_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "serialNumber": {
          name: 'serialNumber',
          type: 'string'
        },
        "fuelTypeId": {
          name: 'fuelTypeId',
          type: 'number'
        },
        "fuelDefineId": {
          name: 'fuelDefineId',
          type: 'number'
        },
        "facilityTypeId": {
          name: 'facilityTypeId',
          type: 'number'
        },
        "power": {
          name: 'power',
          type: 'number'
        },
        "powerUnit": {
          name: 'powerUnit',
          type: 'string'
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
        facilityFuel_CNs: {
          name: 'facilityFuel_CNs',
          type: 'FacilityFuel_CN[]',
          model: 'FacilityFuel_CN'
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
