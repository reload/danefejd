import UnitStore from '../src/UnitStore'
import { expect } from 'chai';
import 'mocha';

describe ('UnitStore', () => {
  describe ('#getInstance', () => {
    it ('it is a singleton', () => {
        const store1 = UnitStore.getInstance()
        const store2 = UnitStore.getInstance()
        expect(store1).to.equal(store2)
    })
  })

  describe ('#destroy', () => {
    it ('destroys the singletons reference to the current instance', () => {
      // Note that all references remains and points to the old instance.
      const store1 = UnitStore.getInstance()
      const store2 = UnitStore.getInstance()
      store1.destroy()
      const store3 = UnitStore.getInstance()
      expect(store1).to.equal(store2)
      expect(store3).to.not.equal(store2)
    })
  })

  describe ('#remove', () => {
    it ('removes units by id', () => {
      let store = UnitStore.getInstance()
      store.add()
      store.add()
      store.remove(0)
      const result = store.toArray()
      expect(result[0].id).to.equal(1)
      store.destroy()
    })
  })

  describe ('#add', () => {
    it ('adds new units with unique ids', () => {
      let store = UnitStore.getInstance()
      store.add()
      store.add()
      store.remove(1)
      store.add()
      const result = store.toArray()
      expect(result[0].id).to.equal(0)
      expect(result[1].id).to.equal(2)
      store.destroy()
    })
  })
})