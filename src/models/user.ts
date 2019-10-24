import { sign } from '../helpers/jwt'
import {
  prop,
  Typegoose,
  InstanceType,
  instanceMethod,
} from '@hasezoey/typegoose'
import { omit } from 'lodash'

export class User extends Typegoose {
  @prop({ required: true, index: true, lowercase: true })
  email: string
  @prop({ required: true, index: true })
  name: string

  @prop({ required: true, index: true, unique: true })
  token: string

  @instanceMethod
  stripped(withExtra = false) {
    const stripFields = ['createdAt', 'updatedAt', '__v']
    if (!withExtra) {
      stripFields.push('token')
      stripFields.push('email')
    }
    return omit(this._doc, stripFields)
  }

  // Mongo property
  _doc: any
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

interface LoginOptions {
  email: string
  name: string
}

export async function getOrCreateUser(loginOptions: LoginOptions) {
  let user: InstanceType<User> | undefined
  if (loginOptions.email) {
    user = await UserModel.findOne({ email: loginOptions.email })
  }
  if (!user) {
    user = await new UserModel({
      ...loginOptions,
      token: await sign(loginOptions),
    }).save()
  }
  return user
}
