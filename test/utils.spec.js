const expect = require('chai').expect
const Utils = require('../src/utils')

describe('Utils', () => {
  describe('parsedEvent', () => {
    it('should throw an error if input is not json parseable', () => {
      const test = { foo: 'bar' }
      expect(() => Utils.parsedEvent(test)).to.throw(Error, 'Input must be serialized JSON')
    })
    it('should throw an error if "action" is missing', () => {
      const test = JSON.stringify({ time: 10 })
      expect(() => Utils.parsedEvent(test)).to.throw(Error, 'Missing required inputs')
    })
    it('should throw an error if "time" is missing', () => {
      const test = JSON.stringify({ action: 'jump' })
      expect(() => Utils.parsedEvent(test)).to.throw(Error, 'Missing required inputs')
    })
    it('should throw an error if "action" is not string', () => {
      const test = JSON.stringify({ action: {}, time: 100 })
      const test2 = JSON.stringify({ action: [], time: 100 })
      const test3 = JSON.stringify({ action: 123, time: 100 })
      expect(() => Utils.parsedEvent(test)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
      expect(() => Utils.parsedEvent(test2)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
      expect(() => Utils.parsedEvent(test3)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
    })
    it('should throw an error if "time" is not number', () => {
      const test = JSON.stringify({ action: 'jump', time: '100' })
      const test2 = JSON.stringify({ action: 'jump', time: {} })
      const test3 = JSON.stringify({ action: 'jump', time: [100] })
      expect(() => Utils.parsedEvent(test)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
      expect(() => Utils.parsedEvent(test2)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
      expect(() => Utils.parsedEvent(test3)).to.throw(Error, 'You should have specified if you wanted me to allow other types')
    })
    it('should strip extra values and return obj with "action" and "time" properties', () => {
      const test = JSON.stringify({ action: 'jump', time: 100, garbage: 'garbage', foo: 'bar', pass: 100 })
      expect(Utils.parsedEvent(test)).to.deep.equal({ action: 'jump', time: 100 })
    })
  })
})
