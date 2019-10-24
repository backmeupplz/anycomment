import { Context } from 'koa'
import { getOrCreateUser } from '../models'
import { Controller, Post } from 'koa-router-ts'
import axios from 'axios'

@Controller('/login')
export default class {
  @Post('/google')
  async google(ctx: Context) {
    const accessToken = ctx.request.body.accessToken

    const userData: any = (await axios(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
    )).data

    const user = await getOrCreateUser({
      name: userData.name,
      email: userData.email,
    })
    ctx.body = user.stripped(true)
  }
}
