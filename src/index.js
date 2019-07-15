class UserTrace {
    constructor() {
        this.actions = {}
    }

    addAction(serializedEvent) {
        try {
            // TODO: validte input
            const event = JSON.parse(serializedEvent)
            const { action, time } = event
            if (this.actions[action]) {
                this.actions = {
                    ...this.actions,
                    [action]: {
                        ...this.actions[action], 
                        count: this.actions[action].count + 1,
                        time: (this.actions[action].time * this.actions[action].count + time) / (this.actions[action].count + 1)
                    }
                }
            } else {
                this.actions = {
                    ...this.actions,
                    [action]: {
                        action,
                        time,
                        count: 1
                    } 
                }
            }
        } catch (err) {
            // TODO: Error handling
            throw new Error('invalid input')
        }
    }

    getStats() {
        const stats = []
        for (var action in this.actions) {
            stats.push({action: this.actions[action].action, avg: this.actions[action].time})
        }
        return JSON.stringify(stats)
    }
}

module.exports = { UserTrace } 
