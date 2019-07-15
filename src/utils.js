module.exports = {
    parsedEvent: (serializedJson) => {
        try {
            const parsed = JSON.parse(serializedJson)
            const { action, time } = parsed
            if (!action || !time) {
                throw new Error('Missing required inputs')
            }
            if (typeof action !== 'string' || typeof time !== 'number') {
                throw new Error('You should have specified if you wanted me to allow other types')
            }
            // TODO: Beef this out more to sanitize inputs (trim strings, round nums, etc)
            return { action, time }
        } catch (err) {
            if (err.name === 'SyntaxError') {
                throw new Error('Input must be serialized JSON')
            }
            throw err
        }
    }
}
    