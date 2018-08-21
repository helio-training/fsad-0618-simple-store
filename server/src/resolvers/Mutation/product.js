const { getUserId } = require('../../utils')

// createProduct(name: String!, desc: String!, image: String!, price: Float!, source: String!): Product!
// updateProduct(id: ID!, name: String!, desc: String!, image: String!, price: Float!, source: String!): Product
// deleteProduct(id: ID!): Product

const product = {
    async createProduct(parent, { name, desc, image, price, source }, ctx, info) {
        const userId = getUserId(ctx)
        const requestingUserIsAdmin = await ctx.db.exists.User({
            id: userId,
            role: 'ADMIN',
        })

        if (!requestingUserIsAdmin) {
            throw new Error(`You don't have access rights to create a product.`)
        }
        return ctx.db.mutation.createProduct(
            {
                data: {
                    name,
                    desc,
                    image,
                    price,
                    source,
                },
            },
            info
        )
    },

    async updateProduct(parent, { id, name, desc, image, price, source }, ctx, info) {
        const userId = getUserId(ctx)
        const requestingUserIsAdmin = await ctx.db.exists.User({
            id: userId,
            role: 'ADMIN',
        })

        if (!requestingUserIsAdmin) {
            throw new Error(`You don't have access rights to update a product.`)
        }

        const productExists = await ctx.db.exists.Product({
            id
        })
        if (!productExists) {
            throw new Error(`Product not found`)
        }

        return ctx.db.mutation.updateProduct(
            {
                where: { id },
                data: {
                    name,
                    desc,
                    image,
                    price,
                    source,
                },
            },
            info,
        )
    },

    async deleteProduct(parent, { id }, ctx, info) {
        const userId = getUserId(ctx)
        const requestingUserIsAdmin = await ctx.db.exists.User({
            id: userId,
            role: 'ADMIN',
        })

        const productExists = await ctx.db.exists.Product({
            id
        })

        if (!productExists || !requestingUserIsAdmin) {
            throw new Error(`Product not found or you don't have access rights to delete it.`)
        }

        return ctx.db.mutation.deleteProduct({ where: { id } })
    },
}

module.exports = { product }
