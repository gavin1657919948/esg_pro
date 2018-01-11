/* tslint:disable */
import {
  RoadSubgroup_HK
} from '../index';

declare var Object: any;
export interface RoadFuelType_HKInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  "roadVehicleType_HKId"?: number;
  roadSubgroup_HKs?: RoadSubgroup_HK[];
}

export class RoadFuelType_HK implements RoadFuelType_HKInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  "roadVehicleType_HKId": number;
  roadSubgroup_HKs: RoadSubgroup_HK[];
  constructor(data?: RoadFuelType_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadFuelType_HK`.
   */
  public static getModelName() {
    return "RoadFuelType_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadFuelType_HK for dynamic purposes.
  **/
  public static factory(data: RoadFuelType_HKInterface): RoadFuelType_HK{
    return new RoadFuelType_HK(data);
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
      name: 'RoadFuelType_HK',
      plural: 'RoadFuelType_HK',
      path: 'RoadFuelType_HK',
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
        "roadVehicleType_HKId": {
          name: 'roadVehicleType_HKId',
          type: 'number'
        },
      },
      relations: {
        roadSubgroup_HKs: {
          name: 'roadSubgroup_HKs',
          type: 'RoadSubgroup_HK[]',
          model: 'RoadSubgroup_HK'
        },
      }
    }
  }
}
