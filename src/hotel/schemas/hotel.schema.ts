import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelDocument = Hotel & Document & { _id: Types.ObjectId };

@Schema({ collection: 'hotels' })
export class Hotel {
  @Prop({ required: true })
  destino: string;

  @Prop({ required: true })
  nombreHotel: string;

  @Prop({ required: true })
  fechaLlegada: Date;         
  
  @Prop({ required: true })
  fechaSalida: Date;     

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  huespedes: number;

  @Prop({ required: true })
  imagen: string;

}

export const HotelSchema = SchemaFactory.createForClass(Hotel);