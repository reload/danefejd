import Graph from './Graph'
import { NodeType } from './Node'
import { UnitType } from './Unit'
import State from './State'
import { groupBy } from './helpers';
import StateItem from './StateItem';

export default class StateResolver {
  private _map: Graph
  private _state: State

  constructor (map: Graph, initialState: State) {
    this._map = map
    this._state = initialState
  }

  private failOnDuplicates (state: State) {
    const units = groupBy(state.items, 'unit')
    for (let key in units) {
      if (units[key].length > 1) throw new Error('Duplicate unit in state')
    }
  }

  private rejectArmiesAtSea (item: StateItem) : StateItem {
    if (item.unit.type === UnitType.ARMY && item.node.type === NodeType.SEA) {
      const currentItem = this._state.getItemByUnitId(item.unit.id)
      if (!currentItem) throw new Error('Unrecognized unit')
      return currentItem
    }
    return item
  }

  private rejectFleetsAtLand (item: StateItem) : StateItem {
    if (item.unit.type === UnitType.FLEET && item.node.type === NodeType.LAND) {
      const currentItem = this._state.getItemByUnitId(item.unit.id)
      if (!currentItem) throw new Error('Unrecognized unit')
      return currentItem
    }
    return item
  }

  private rejectDisconnectedTerritories (item: StateItem) : StateItem {
    const currentItem = this._state.getItemByUnitId(item.unit.id)
    if (!currentItem) throw new Error('Unrecognized unit')
    const currentNode = currentItem.node
    const nextNode = item.node
    if (currentNode.edges.indexOf(nextNode) < 0) {
      return currentItem
    }
    return item
  }

  private rejectIllegalState (nextState: State) : State {
    const items: StateItem[] = []
    nextState.items.forEach((nextItem: StateItem) => {
      let item = nextItem
      item = this.rejectArmiesAtSea(item)
      item = this.rejectFleetsAtLand(item)
      item = this.rejectDisconnectedTerritories(item)
      items.push(item)

    })
    return new State(items)
  }

  public resolve (nextState: State) : State {
    let state = nextState
    this.failOnDuplicates(state)
    return this.rejectIllegalState(state)
  }
  

}