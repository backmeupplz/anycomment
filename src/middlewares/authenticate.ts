import { UserModel, User } from '../models/user'
import { Context } from 'koa'
import { verify } from '../helpers/jwt'
import { InstanceType } from '@hasezoey/typegoose'

export async function authenticate(ctx: Context, next: Function) {
  try {
    const token = ctx.headers.token
    if (!token) {
      return ctx.throw(403)
    }
    const payload = (await verify(token)) as any
    let user: InstanceType<User> = await UserModel.findOne({
      email: payload.email,
    })
    if (!user) {
      return ctx.throw(403)
    }
    ctx.state.user = user
  } catch (err) {
    return ctx.throw(403)
  }
  await next()
}
