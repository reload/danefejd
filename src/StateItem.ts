import Unit from './Unit'
import Node from './Node'

export default class StateItem {
  private _node: Node
  private _unit: Unit
  
  constructor (node: Node, unit: Unit) {
    this._node = node
    this._unit = unit
  }

  get node () : Node {
    return this._node
  }

  get unit () : Unit {
    return this._unit
  }
}