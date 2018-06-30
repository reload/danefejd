import State from '../src/State'
import StateItem from '../src/StateItem';
import Unit from '../src/Unit'
import Node from '../src/Node'
import { expect } from 'chai';
import 'mocha';

describe ('State', () => {
  describe ('#addItem', () => {
    it ('can build state items', () => {
      const node = new Node('Country')
      const unit = new Unit(1)
      const state = new State()
      state.addItems([new StateItem(node, unit)])
      expect(state.items.length).to.equal(1)
    })
  })
})