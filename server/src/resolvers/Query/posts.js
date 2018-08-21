const { getUserId } = require('../../utils')

const posts = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  async post(parent, { id }, ctx, info) {
      const userId = getUserId(ctx)
      const requestingUserIsAuthor = await ctx.db.exists.Post({
          id,
          author: {
              id: userId,
          },
      })
      const requestingUserIsAdmin = await ctx.db.exists.User({
          id: userId,
          role: 'ADMIN',
      })

      if (requestingUserIsAdmin || requestingUserIsAuthor) {
          return ctx.db.query.post({ where: { id } }, info)
      }
      throw new Error(
          'Invalid permissions, you must be an admin or the author of this post to retrieve it.',
      )

  }
}

module.exports = { posts }
