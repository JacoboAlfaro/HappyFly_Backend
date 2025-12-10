import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  metodoPago: string;

  @Prop({
    type: [
      {
        id: String,
        tipo: String,
        nombre: String,
        cantidad: Number,
        precio: Number,
      },
    ],
    required: true,
  })
  items: any[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ required: true })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
