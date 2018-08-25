const { getUserId } = require('../../utils')

// addProductToCart(productID: ID!): [Product!]!
// removeProductFromCart(productID: ID!): [Products!]!
// emptyCart: User
// checkout: Order

const cart = {
    async addProductToCart(parent, { productID }, ctx, info) {
        const userId = getUserId(ctx)
        if(!userId){
            throw new Error(`You need to be logged to do that`)
        }

        const productExists = ctx.db.exists.Product({
            id: productID
        })
        if(!productExists){
            throw new Error(`Product not found`)
        }

        return await ctx.db.mutation.updateUser(
            {
                where: { id: userId },
                data: {
                    cart: {
                        connect: {
                            id: productID
                        }
                    }
                }
            },
            info
        )
    },

    async removeProductFromCart(parent, { productID }, ctx, info) {
        const userId = getUserId(ctx)
        if(!userId){
            throw new Error(`You need to be logged to do that`)
        }

        const productExists = ctx.db.exists.Product({
            id: productID
        })
        if(!productExists){
            throw new Error(`Product not found`)
        }

        const user = await ctx.db.query.user({where: {id: userId}}, info)
        const isProductInCart = user.cart.map(product => product.id).includes(productID)
        if(!isProductInCart){
            throw new Error(`Product not in cart`)
        }

        return await ctx.db.mutation.updateUser(
            {
                where: { id: userId },
                data: {
                    cart: {
                        disconnect: {
                            id: productID
                        }
                    }
                }
            },
            info
        )
    },

    async emptyCart(parent, args, ctx, info) {
        const userId = getUserId(ctx)
        return await ctx.db.mutation.updateUser(
            {
                where: { id: userId },
                data: {
                    cart: []
                }
            }
        )
    },

    async checkout(parent, args, ctx, info) {
        const userId = getUserId(ctx)
        // Remove Products from User's Cart
        const products = await ctx.db.query.user({where: {id: userId}}, info).cart
        const currentdate = new Date()
        // 2018-08-21T01:25:40.408Z
        const purchaseDate = currentdate.getFullYear() + "-" +
            (currentdate.getMonth() + 1) + "-" +
            currentdate.getDate() + "T" +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds() + "." +
            currentdate.getMilliseconds() + "Z";
        // Create new Order with those Products
        // Connect User to Order
        console.log("User: ", userId)
        console.log("Products: ", products)
        console.log("Date: ", purchaseDate)
        return await ctx.db.mutation.createOrder(
            {
                data: {
                    products: {
                        set: products
                    },
                    purchaseDate,
                    buyer: {
                        connect: {
                            id: userId
                        }
                    }
                }
            },
            info
        )
    },
}

module.exports = { cart }
