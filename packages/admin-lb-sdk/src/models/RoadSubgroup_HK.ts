/* tslint:disable */
import {
  RoadEmissionStandard_HK
} from '../index';

declare var Object: any;
export interface RoadSubgroup_HKInterface {
  "id"?: number;
  "name": string;
  "roadFuelType_HKId"?: number;
  "created"?: Date;
  "modified"?: Date;
  roadEmissionStandard_HKs?: RoadEmissionStandard_HK[];
}

export class RoadSubgroup_HK implements RoadSubgroup_HKInterface {
  "id": number;
  "name": string;
  "roadFuelType_HKId": number;
  "created": Date;
  "modified": Date;
  roadEmissionStandard_HKs: RoadEmissionStandard_HK[];
  constructor(data?: RoadSubgroup_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadSubgroup_HK`.
   */
  public static getModelName() {
    return "RoadSubgroup_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadSubgroup_HK for dynamic purposes.
  **/
  public static factory(data: RoadSubgroup_HKInterface): RoadSubgroup_HK{
    return new RoadSubgroup_HK(data);
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
      name: 'RoadSubgroup_HK',
      plural: 'RoadSubgroup_HKs',
      path: 'RoadSubgroup_HKs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "roadFuelType_HKId": {
          name: 'roadFuelType_HKId',
          type: 'number'
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
        roadEmissionStandard_HKs: {
          name: 'roadEmissionStandard_HKs',
          type: 'RoadEmissionStandard_HK[]',
          model: 'RoadEmissionStandard_HK'
        },
      }
    }
  }
}
