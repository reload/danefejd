export default class Unit {
  private _id: number
  private _type: number
  constructor (id: number, type?: number) {
    this._id = id
    this._type = type || UnitType.ARMY
  }

  get type () : number {
    return this._type
  }

  get id () : number {
    return this._id
  }

}

export const enum UnitType {
  ARMY,
  FLEET
}