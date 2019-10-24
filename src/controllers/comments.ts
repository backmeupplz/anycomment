import { Context } from 'koa'
import { Controller, Post, Get } from 'koa-router-ts'
import { authenticate } from '../middlewares/authenticate'
import { CommentModel } from '../models'

@Controller('/comments')
export default class {
  @Post('/', authenticate)
  async add(ctx: Context) {
    const { text, url } = ctx.request.body
    await new CommentModel({
      text,
      url,
      user: ctx.state.user._id,
    }).save()
    ctx.status = 200
  }

  @Get('/')
  async get(ctx: Context) {
    const url = ctx.request.query.url
    const skip = parseInt(ctx.request.query.skip, 10) || 0
    const limit = parseInt(ctx.request.query.limit, 10) || 0

    const comments = await CommentModel.find({ url })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user')
    ctx.body = comments.map(comment => comment.stripped())
  }
}
