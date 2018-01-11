/* tslint:disable */

declare var Object: any;
export interface NonRoadVehicleFuel_CNInterface {
  "id"?: number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "nonRoadVehicle_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
  "emissionId"?: number;
  "gasEmissionId"?: number;
  emission?: any;
  gasEmission?: any;
}

export class NonRoadVehicleFuel_CN implements NonRoadVehicleFuel_CNInterface {
  "id": number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "tripDistance": number;
  "fuelConsumption": number;
  "nonRoadVehicle_CNId": number;
  "created": Date;
  "modified": Date;
  "emissionId": number;
  "gasEmissionId": number;
  emission: any;
  gasEmission: any;
  constructor(data?: NonRoadVehicleFuel_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NonRoadVehicleFuel_CN`.
   */
  public static getModelName() {
    return "NonRoadVehicleFuel_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NonRoadVehicleFuel_CN for dynamic purposes.
  **/
  public static factory(data: NonRoadVehicleFuel_CNInterface): NonRoadVehicleFuel_CN{
    return new NonRoadVehicleFuel_CN(data);
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
      name: 'NonRoadVehicleFuel_CN',
      plural: 'NonRoadVehicleFuel_CNs',
      path: 'NonRoadVehicleFuel_CNs',
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
        "nonRoadVehicle_CNId": {
          name: 'nonRoadVehicle_CNId',
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
        "gasEmissionId": {
          name: 'gasEmissionId',
          type: 'number'
        },
      },
      relations: {
        emission: {
          name: 'emission',
          type: 'any',
          model: ''
        },
        gasEmission: {
          name: 'gasEmission',
          type: 'any',
          model: ''
        },
      }
    }
  }
}
