import StateResolver from '../src/StateResolver'
import TestMap from './TestMap'
import Unit, { UnitType } from '../src/Unit'
import Node, { NodeType } from '../src/Node'
import { expect } from 'chai';
import 'mocha';
import State from '../src/State';
import StateItem from '../src/StateItem';

const map = new TestMap()

describe ('StateResolver', () => {
  describe ('#resolve', () => {
    it ('only allows one move per unit in a state', () => {
      const u = new Unit(1)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A')
      const n2 = new Node('B')

      map.setGraph({ 
        nodes: [n1, n2]
      })

      // build current state.
      const state = new State()

      // Build nextState.
      const nextState = new State([
        new StateItem(n1, u),
        new StateItem(n2, u)
      ])

      // Act.
      const resolver = new StateResolver(map, state)
      try {
        resolver.resolve(nextState)
      // Validate.
      } catch (err) {
        expect(err).to.not.be.null
      }
    })

    it ('does not allow armies to enter sea territory', () => {
      const u = new Unit(1)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A', NodeType.LAND)
      const n2 = new Node('B', NodeType.SEA)

      map.setGraph({
        nodes: [n1, n2],
        edges: [{ from: n1, to: n2 }]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(0)
    })

    it ('does not allow fleets to enter land territory', () => {
      const u = new Unit(1, UnitType.FLEET)

      // Build map.
      const map = new TestMap()
      const land = new Node('A', NodeType.LAND)
      const sea = new Node('B', NodeType.SEA)

      map.setGraph({
        nodes: [land, sea],
        edges: [{ from: land, to: sea }]
      })

      // build current state.
      const state = new State([new StateItem(sea, u)])

      // Build nextState.
      const nextState = new State([new StateItem(land, u)])

      // Aact.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === land)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(0)
    })

    it ('allows armies to enter land territory', () => {
      const u = new Unit(1)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A', NodeType.LAND)
      const n2 = new Node('B', NodeType.LAND)

      map.setGraph({
        nodes: [n1, n2],
        edges: [{ from: n1, to: n2 }]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(1)
    })

    it ('allows fleets to enter sea territory', () => {
      const u = new Unit(1, UnitType.FLEET)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A', NodeType.SEA)
      const n2 = new Node('B', NodeType.SEA)

      map.setGraph({
        nodes: [n1, n2],
        edges: [{ from: n1, to: n2 }]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(1)
    })

    it ('allows armies to enter coastal territory', () => {
      const u = new Unit(1)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A', NodeType.LAND)
      const n2 = new Node('B', NodeType.COASTAL)

      map.setGraph({
        nodes: [n1, n2],
        edges: [{ from: n1, to: n2 }]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(1)
    })

    it ('allows fleets to enter coastal territory', () => {
      const u = new Unit(1,  UnitType.FLEET)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A', NodeType.SEA)
      const n2 = new Node('B', NodeType.COASTAL)

      map.setGraph({
        nodes: [n1, n2],
        edges: [{ from: n1, to: n2 }]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)

      // Validate.
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(1)
    })

    it ('prevents units from going to unconnected territories', () => {
      const u = new Unit(1)

      // Build map.
      const map = new TestMap()
      const n1 = new Node('A')
      const n2 = new Node('B')

      map.setGraph({
        nodes: [n1, n2]
      })

      // build current state.
      const state = new State([new StateItem(n1, u)])

      // Build nextState.
      const nextState = new State([new StateItem(n2, u)])

      // Act.
      const resolver = new StateResolver(map, state)
      const resolvedState = resolver.resolve(nextState)
      const unitState = resolvedState.items.filter(item => item.unit === u)
      const nodeState = resolvedState.items.filter(item => item.node === n2)
      expect(unitState.length).to.equal(1)
      expect(nodeState.length).to.equal(0)
    })

  })
})
