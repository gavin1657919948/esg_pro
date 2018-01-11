/* tslint:disable */

declare var Object: any;
export interface RoadVehicleFuel_HKInterface {
  "id"?: number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "roadVehicle_HKId"?: number;
  "created"?: Date;
  "modified"?: Date;
  "emissionId"?: number;
  emission?: any;
}

export class RoadVehicleFuel_HK implements RoadVehicleFuel_HKInterface {
  "id": number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "roadVehicle_HKId": number;
  "created": Date;
  "modified": Date;
  "emissionId": number;
  emission: any;
  constructor(data?: RoadVehicleFuel_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadVehicleFuel_HK`.
   */
  public static getModelName() {
    return "RoadVehicleFuel_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadVehicleFuel_HK for dynamic purposes.
  **/
  public static factory(data: RoadVehicleFuel_HKInterface): RoadVehicleFuel_HK{
    return new RoadVehicleFuel_HK(data);
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
      name: 'RoadVehicleFuel_HK',
      plural: 'RoadVehicleFuel_HKs',
      path: 'RoadVehicleFuel_HKs',
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
        "roadVehicle_HKId": {
          name: 'roadVehicle_HKId',
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
