/* tslint:disable */
import {
  FacilityType_CN
} from '../index';

declare var Object: any;
export interface FuelDefine_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  "fuelType_CNId"?: number;
  facilityType_CNs?: FacilityType_CN[];
}

export class FuelDefine_CN implements FuelDefine_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  "fuelType_CNId": number;
  facilityType_CNs: FacilityType_CN[];
  constructor(data?: FuelDefine_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FuelDefine_CN`.
   */
  public static getModelName() {
    return "FuelDefine_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FuelDefine_CN for dynamic purposes.
  **/
  public static factory(data: FuelDefine_CNInterface): FuelDefine_CN{
    return new FuelDefine_CN(data);
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
      name: 'FuelDefine_CN',
      plural: 'FuelDefine_CNs',
      path: 'FuelDefine_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
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
        "fuelType_CNId": {
          name: 'fuelType_CNId',
          type: 'number'
        },
      },
      relations: {
        facilityType_CNs: {
          name: 'facilityType_CNs',
          type: 'FacilityType_CN[]',
          model: 'FacilityType_CN'
        },
      }
    }
  }
}
