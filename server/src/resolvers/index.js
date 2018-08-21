const { AuthPayload } = require('./AuthPayload')
const { Subscription } = require('./Subscription')
const { posts } = require('./Query/posts')
const { user } = require('./Query/user')
const { products } = require('./Query/products')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { product } = require('./Mutation/product')


module.exports = {
  Query: {
    ...posts,
    ...user,
    ...products,
  },
  Mutation: {
    ...auth,
    ...post,
    ...product,
  },
  Subscription,
  AuthPayload,
}
