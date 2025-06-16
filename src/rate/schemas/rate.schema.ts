import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RateRecord extends Document {
  @Prop()
  request_id: number;

  @Prop({
    type: [
      {
        currency: String,
        sell: Number,
        buy: Number,
      },
    ],
  })
  rates: {
    currency: string;
    sell: number;
    buy: number;
  }[];
}

export const RateRecordSchema = SchemaFactory.createForClass(RateRecord);
