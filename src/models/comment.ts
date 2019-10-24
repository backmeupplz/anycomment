import {
  prop,
  Typegoose,
  InstanceType,
  instanceMethod,
  Ref,
} from '@hasezoey/typegoose'
import { omit } from 'lodash'
import { User } from './user'

export class Comment extends Typegoose {
  @prop({ required: true })
  text: string
  @prop({ required: true, index: true })
  url: string
  @prop({ required: true, index: true, ref: User })
  user: Ref<User>

  @instanceMethod
  stripped() {
    const stripFields = ['createdAt', 'updatedAt', '__v', 'email', 'token']
    this.user = omit((this.user as InstanceType<User>)._doc, stripFields)
    return this
  }

  // Mongo property
  _doc: any
}

export const CommentModel = new Comment().getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
})
