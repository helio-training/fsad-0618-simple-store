const { getUserId } = require('../../utils')

// cart(userID: ID!): [Product!]!

const carts = {
    async cart(parent, args, ctx, info) {
        const userId = getUserId(ctx)
        return await ctx.db.query.user({ where: { id: userId }}, info)
    },
}

module.exports = { carts }