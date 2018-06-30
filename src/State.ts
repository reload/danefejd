import StateItem from "./StateItem";
import Unit from "./Unit";
import Node from "./Node";

export default class State {
  private _items: StateItem[]

  constructor (items?: StateItem[]) {
    this._items = items || []
  }

  addItems (items: StateItem[]) {
    this._items = this._items.concat(items)
  }

  get items () : StateItem[] {
    return this._items
  }

  getItemByUnitId (id: number) : StateItem {
    return this.items.filter(i => i.unit.id === id)[0]
  }
}