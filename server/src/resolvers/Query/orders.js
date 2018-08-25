const { getUserId } = require('../../utils')

// allOrders: [Order!]!
// myOrders: [Order!]!
// order(id: ID!): Order

const orders = {
    async allOrders(parent, args, ctx, info) {
        const userId = getUserId(ctx)
        const requestingUserIsAdmin = await ctx.db.exists.User({
            id: userId,
            role: 'ADMIN',
        })
        return null
    },

    async myOrders(parent, args, ctx, info) {
        const userId = getUserId(ctx)
        return null
    },

    async order(parent, { id }, ctx, info) {
        const userId = getUserId(ctx)
        return null
    },
}

module.exports = { orders }