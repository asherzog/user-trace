const expect = require('chai').expect
const { UserTrace } = require('../src')

describe('UserTrace Module', () => {
  describe('Instance', () => {
    it('should instanciate new UserTrace with empty action stats', () => {
      const test = new UserTrace()
      const expected = { actions: {} }
      expect(test).to.deep.equal(expected)
    })
    it('should instanciate multiple new UserTraces with empty action stats', () => {
      const test = new UserTrace()
      const test2 = new UserTrace()
      const expected = { actions: {} }
      expect(test).to.deep.equal(expected)
      expect(test2).to.deep.equal(expected)
    })
  })
  describe('addAction method', () => {
    it('should add a new action', () => {
      const test = new UserTrace()
      test.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      const expected = {
        actions: {
          jump: { action: 'jump', time: 100, count: 1 }
        }
      }
      expect(test).to.deep.equal(expected)
    })
    it('should add two separate actions', () => {
      const test = new UserTrace()
      test.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      test.addAction(JSON.stringify({ action: 'run', time: 100 }))
      const expected = {
        actions: {
          jump: { action: 'jump', time: 100, count: 1 },
          run: { action: 'run', time: 100, count: 1 }
        }
      }
      expect(test).to.deep.equal(expected)
    })
    it('should track like actions and average their time', () => {
      const test = new UserTrace()
      test.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      test.addAction(JSON.stringify({ action: 'jump', time: 200 }))
      const expected = {
        actions: {
          jump: { action: 'jump', time: 150, count: 2 }
        }
      }
      expect(test).to.deep.equal(expected)
    })
    it('should differentiate instances', () => {
      const test = new UserTrace()
      const test2 = new UserTrace()
      test.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      test.addAction(JSON.stringify({ action: 'jump', time: 200 }))
      test2.addAction(JSON.stringify({ action: 'jump', time: 200 }))
      const expectedTest1 = {
        actions: {
          jump: { action: 'jump', time: 150, count: 2 }
        }
      }
      const expectedTest2 = {
        actions: {
          jump: { action: 'jump', time: 200, count: 1 }
        }
      }
      expect(test).to.deep.equal(expectedTest1)
      expect(test2).to.deep.equal(expectedTest2)
    })
    it('should throw an error with bad inputs', () => {
      const test = new UserTrace()
      expect(() => test.addAction({ action: 'jump', time: 100 })).to.throw(Error, 'Input must be serialized JSON')
      expect(() => test.addAction(JSON.stringify({ time: 10 }))).to.throw(Error, 'Missing required inputs')
      expect(() => test.addAction(JSON.stringify({ action: 'jump' }))).to.throw(Error, 'Missing required inputs')
      expect(() => test.addAction(JSON.stringify({ action: {}, time: 100 }))).to.throw(Error, 'You should have specified if you wanted me to allow other types')
      expect(() => test.addAction(JSON.stringify({ action: 'jump', time: '100' }))).to.throw(Error, 'You should have specified if you wanted me to allow other types')
    })
  })

  describe('getStats method', () => {
    it('should return an empty serialized json array of stats if no actions taken', () => {
      const user = new UserTrace()
      const expected = JSON.stringify([])
      const test = user.getStats()
      expect(test).to.equal(expected)
    })
    it('should return a serialized json array of stats', () => {
      const user = new UserTrace()
      user.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      const expected = JSON.stringify([{ action: 'jump', avg: 100 }])
      const test = user.getStats()
      expect(test).to.equal(expected)
    })
    it('should return a serialized json array of stats with multiple actions', () => {
      const user = new UserTrace()
      user.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      user.addAction(JSON.stringify({ action: 'run', time: 75 }))
      user.addAction(JSON.stringify({ action: 'jump', time: 200 }))
      const expected = JSON.stringify([
        { action: 'jump', avg: 150 },
        { action: 'run', avg: 75 }
      ])
      const test = user.getStats()
      expect(test).to.equal(expected)
    })
    it('should return different stats for different UserTraces', () => {
      const user = new UserTrace()
      const user2 = new UserTrace()
      user.addAction(JSON.stringify({ action: 'jump', time: 100 }))
      user.addAction(JSON.stringify({ action: 'run', time: 75 }))
      user2.addAction(JSON.stringify({ action: 'jump', time: 200 }))
      const expected1 = JSON.stringify([
        { action: 'jump', avg: 100 },
        { action: 'run', avg: 75 }
      ])
      const expected2 = JSON.stringify([{ action: 'jump', avg: 200 }])
      const test1 = user.getStats()
      const test2 = user2.getStats()
      expect(test1).to.equal(expected1)
      expect(test2).to.equal(expected2)
    })
  })
})
