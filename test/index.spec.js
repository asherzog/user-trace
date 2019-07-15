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
    })

    describe('getStats method', () => {
        it('should do something', () => {
            expect('test').to.equal('test')
        })
    })
})