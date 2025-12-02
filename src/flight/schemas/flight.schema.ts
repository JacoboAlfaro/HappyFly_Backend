import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FlightDocument = Flight & Document & { _id: Types.ObjectId };

@Schema({ collection: 'flights' })
export class Flight {
  @Prop({ required: true })
  origen: string;

  @Prop({ required: true })
  destino: string;

  @Prop({ required: true })
  fechaIda: Date;

  @Prop({ required: true })
  fechaVuelta: Date;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  pasajero: number;

  @Prop({ required: true })
  aerolinea: string;

  @Prop({ requiere: true })
  imagen: string;

  @Prop({ requiere: true})
  descripcion: string;

  @Prop({ type: [Number], default: [] })
  asientosReservados: number[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
