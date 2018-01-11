/* tslint:disable */

declare var Object: any;
export interface KPIInterface {
  "name": string;
  "value"?: string;
  "date"?: Date;
  "id"?: number;
}

export class KPI implements KPIInterface {
  "name": string;
  "value": string;
  "date": Date;
  "id": number;
  constructor(data?: KPIInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `KPI`.
   */
  public static getModelName() {
    return "KPI";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of KPI for dynamic purposes.
  **/
  public static factory(data: KPIInterface): KPI{
    return new KPI(data);
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
      name: 'KPI',
      plural: 'KPI',
      path: 'KPI',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
