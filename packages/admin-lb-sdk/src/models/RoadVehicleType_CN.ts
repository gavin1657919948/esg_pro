/* tslint:disable */
import {
  RoadFuelType_CN,
  RoadEmissionStandard_CN
} from '../index';

declare var Object: any;
export interface RoadVehicleType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  roadFuelType_CNs?: RoadFuelType_CN[];
  roadEmissionStandard_CNs?: RoadEmissionStandard_CN[];
}

export class RoadVehicleType_CN implements RoadVehicleType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  roadFuelType_CNs: RoadFuelType_CN[];
  roadEmissionStandard_CNs: RoadEmissionStandard_CN[];
  constructor(data?: RoadVehicleType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicleType_CN`.
   */
  public static getModelName() {
    return "RoadVehicleType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicleType_CN for dynamic purposes.
  **/
  public static factory(data: RoadVehicleType_CNInterface): RoadVehicleType_CN{
    return new RoadVehicleType_CN(data);
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
      name: 'RoadVehicleType_CN',
      plural: 'RoadVehicleType_CNs',
      path: 'RoadVehicleType_CNs',
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
        roadFuelType_CNs: {
          name: 'roadFuelType_CNs',
          type: 'RoadFuelType_CN[]',
          model: 'RoadFuelType_CN'
        },
        roadEmissionStandard_CNs: {
          name: 'roadEmissionStandard_CNs',
          type: 'RoadEmissionStandard_CN[]',
          model: 'RoadEmissionStandard_CN'
        },
      }
    }
  }
}
