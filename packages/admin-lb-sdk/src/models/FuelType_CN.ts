/* tslint:disable */
import {
  FuelDefine_CN
} from '../index';

declare var Object: any;
export interface FuelType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  fuelDefine_CNs?: FuelDefine_CN[];
}

export class FuelType_CN implements FuelType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  fuelDefine_CNs: FuelDefine_CN[];
  constructor(data?: FuelType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FuelType_CN`.
   */
  public static getModelName() {
    return "FuelType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FuelType_CN for dynamic purposes.
  **/
  public static factory(data: FuelType_CNInterface): FuelType_CN{
    return new FuelType_CN(data);
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
      name: 'FuelType_CN',
      plural: 'FuelType_CNs',
      path: 'FuelType_CNs',
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
      },
      relations: {
        fuelDefine_CNs: {
          name: 'fuelDefine_CNs',
          type: 'FuelDefine_CN[]',
          model: 'FuelDefine_CN'
        },
      }
    }
  }
}
