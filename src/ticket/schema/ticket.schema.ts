import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';
import { Events } from 'src/event/schema/event.schema';
import { schemaConfig } from 'src/util/schema.config';
import { TICKET_ENTITY, TICKET_STOCK, TICKET_TYPE } from 'src/util/types';

export type UserDocument = HydratedDocument<Ticket>;

@Schema(schemaConfig)
export class Ticket {
  // @Prop({
  //   required: false,
  //   type: [SingleEvents],
  //   default: [],
  // })
  // singleTicket: SingleEvents[];

  // @Prop({ required: false, type: [CollectiveEvents], default: [] })
  // collectiveTicket: CollectiveEvents[];

  @Prop({
    type: String,
    required: [true, 'ticket type is required'],
    enum: {
      values: ['FREE', 'PAID'],
      message: '{VALUE} is not supported',
    },
  })
  ticketType: string;

  @Prop({ type: String, required: [true, 'ticket name is required'] })
  ticketName: string;

  @Prop({ type: String, required: [true, 'ticket description is required'] })
  ticketDescription: string;

  @Prop({
    type: String,
    required: [true, 'ticket entity is required'],
    enum: {
      values: [TICKET_ENTITY.SINGLE, TICKET_ENTITY.COLLECTIVE],
      message: '{VALUE} is not supported',
    },
  })
  ticketEntity: TICKET_ENTITY;

  @Prop({
    type: Number,
    validate: {
      validator: function (value: string) {
        return this.ticketStock === TICKET_STOCK.LIMITED ||
          this.ticketEntity === TICKET_ENTITY.SINGLE
          ? !!value
          : true;
      },
      message: 'purchase limit is required',
    },
  })
  purchaseLimit: number;

  @Prop({
    type: Number,
    validate: {
      validator: function (value: string) {
        return this.ticketEntity === TICKET_ENTITY.COLLECTIVE ? !!value : true;
      },
      message: 'group price is required',
    },
  })
  groupPrice: number;

  @Prop({
    type: Number,
    validate: {
      validator: function (value: string) {
        return this.ticketEntity === TICKET_ENTITY.COLLECTIVE ? !!value : true;
      },
      message: 'group size is required',
    },
  })
  groupSize: number;

  @Prop({
    type: String,
    required: [true, 'ticket entity is required'],
    enum: {
      values: [TICKET_STOCK.LIMITED, TICKET_STOCK.UN_LIMITED],
      message: '{VALUE} is not supported',
    },
  })
  ticketStock: TICKET_STOCK;

  @Prop({
    type: Number,
    validate: {
      validator: function (value: string) {
        return this.ticketStock === TICKET_STOCK.LIMITED ? !!value : true;
      },
      message: 'ticket qty is required',
    },
  })
  ticketQty: number;

  @Prop({
    type: Number,
    validate: {
      validator: function (value: string) {
        return this.ticketPrice === TICKET_TYPE.PAID ? !!value : true;
      },
      message: 'ticket price is required',
    },
  })
  ticketPrice: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Events.name,
  })
  event: mongoose.Schema.Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
