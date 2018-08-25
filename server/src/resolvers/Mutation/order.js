const { getUserId } = require('../../utils')

// fulfillOrder(id: ID!): Order!

const order = {
    async fulfillOrder(parent, { id }, ctx, info) {
        const userId = getUserId(ctx)
        const requestingUserIsAdmin = await ctx.db.exists.User({
            id: userId,
            role: 'ADMIN',
        })
        return null
    },
}

module.exports = { order }

