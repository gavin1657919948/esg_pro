/* tslint:disable */
import {
  RoadFuelType_HK
} from '../index';

declare var Object: any;
export interface RoadVehicleType_HKInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  roadFuelType_HKs?: RoadFuelType_HK[];
}

export class RoadVehicleType_HK implements RoadVehicleType_HKInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  roadFuelType_HKs: RoadFuelType_HK[];
  constructor(data?: RoadVehicleType_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicleType_HK`.
   */
  public static getModelName() {
    return "RoadVehicleType_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicleType_HK for dynamic purposes.
  **/
  public static factory(data: RoadVehicleType_HKInterface): RoadVehicleType_HK{
    return new RoadVehicleType_HK(data);
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
      name: 'RoadVehicleType_HK',
      plural: 'RoadVehicleType_HKs',
      path: 'RoadVehicleType_HKs',
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
        roadFuelType_HKs: {
          name: 'roadFuelType_HKs',
          type: 'RoadFuelType_HK[]',
          model: 'RoadFuelType_HK'
        },
      }
    }
  }
}
