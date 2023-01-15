import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document, HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/common';
import * as short from 'short-uuid'

//export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends AbstractDocument {
  @Prop({ default: short.generate() })
  uid: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  /*@Prop({ default: new Date() })
  created_at: Date;

  @Prop({ type: String, ref: 'User', required: true })
  created_by: User;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ type: String, ref: 'User' })
  updated_by: User;

  @Prop({ default: new Date() })
  deleted_at: Date;

  @Prop({ type: String, ref: 'User' })
  deleted_by: User;*/
}

export const UserSchema = SchemaFactory.createForClass(User);
