/* tslint:disable */

declare var Object: any;
export interface RoadFuelType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  "roadVehicleType_CNId"?: number;
}

export class RoadFuelType_CN implements RoadFuelType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  "roadVehicleType_CNId": number;
  constructor(data?: RoadFuelType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadFuelType_CN`.
   */
  public static getModelName() {
    return "RoadFuelType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadFuelType_CN for dynamic purposes.
  **/
  public static factory(data: RoadFuelType_CNInterface): RoadFuelType_CN{
    return new RoadFuelType_CN(data);
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
      name: 'RoadFuelType_CN',
      plural: 'RoadFuelType_CNs',
      path: 'RoadFuelType_CNs',
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
        "roadVehicleType_CNId": {
          name: 'roadVehicleType_CNId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
