const { AuthPayload } = require('./AuthPayload')
const { Subscription } = require('./Subscription')
const { posts } = require('./Query/posts')
const { user } = require('./Query/user')
const { products } = require('./Query/products')
const { carts } = require('./Query/carts')
const { orders } = require('./Query/orders')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { product } = require('./Mutation/product')
const { cart } = require('./Mutation/cart')
const { order } = require('./Mutation/order')


module.exports = {
  Query: {
    ...posts,
    ...user,
    ...products,
    ...carts,
    ...orders,
  },
  Mutation: {
    ...auth,
    ...post,
    ...product,
    ...cart,
    ...order
  },
  Subscription,
  AuthPayload,
}
