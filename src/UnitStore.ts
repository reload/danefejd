import Unit from './Unit'
export default class UnitStore {
  ids: number = 0
  units: Unit[] = []
  private static instance?: UnitStore
  
  private constructor () {
    // Empty.
    // We implement it as private, so that initializing with 'new' will fail.
  }

  static getInstance() {
    if (!UnitStore.instance) {
      UnitStore.instance = new UnitStore();
    }
    return UnitStore.instance;
  }

  destroy () {
    delete UnitStore.instance
  }

  add () {
    const unit = new Unit(this.ids++)
    this.units.push(unit)
    return unit
  }

  remove (id: number) {
    this.units = this.units.filter(u => u.id !== id)
  }

  toArray () : Unit[] {
    return this.units
  }
}
