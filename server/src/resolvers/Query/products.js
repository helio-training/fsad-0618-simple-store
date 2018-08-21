const { getUserId } = require('../../utils')

const products = {
    product(parent, { id }, ctx, info) {
        return ctx.db.query.product({ where: { id }}, info)
    },
    products(parent, args, ctx, info) {
        return ctx.db.query.products({ }, info)
    },
}

module.exports = { products }