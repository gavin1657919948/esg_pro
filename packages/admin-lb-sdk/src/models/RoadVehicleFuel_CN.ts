/* tslint:disable */

declare var Object: any;
export interface RoadVehicleFuel_CNInterface {
  "id"?: number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "roadVehicle_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
  "emissionId"?: number;
  emission?: any;
}

export class RoadVehicleFuel_CN implements RoadVehicleFuel_CNInterface {
  "id": number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "roadVehicle_CNId": number;
  "created": Date;
  "modified": Date;
  "emissionId": number;
  emission: any;
  constructor(data?: RoadVehicleFuel_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicleFuel_CN`.
   */
  public static getModelName() {
    return "RoadVehicleFuel_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicleFuel_CN for dynamic purposes.
  **/
  public static factory(data: RoadVehicleFuel_CNInterface): RoadVehicleFuel_CN{
    return new RoadVehicleFuel_CN(data);
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
      name: 'RoadVehicleFuel_CN',
      plural: 'RoadVehicleFuel_CNs',
      path: 'RoadVehicleFuel_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "timeStartValue": {
          name: 'timeStartValue',
          type: 'Date'
        },
        "timeEndValue": {
          name: 'timeEndValue',
          type: 'Date'
        },
        "timeUnit": {
          name: 'timeUnit',
          type: 'string'
        },
        "year": {
          name: 'year',
          type: 'number'
        },
        "tripDistance": {
          name: 'tripDistance',
          type: 'number'
        },
        "fuelConsumption": {
          name: 'fuelConsumption',
          type: 'number'
        },
        "roadVehicle_CNId": {
          name: 'roadVehicle_CNId',
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
        "emissionId": {
          name: 'emissionId',
          type: 'number'
        },
      },
      relations: {
        emission: {
          name: 'emission',
          type: 'any',
          model: ''
        },
      }
    }
  }
}
