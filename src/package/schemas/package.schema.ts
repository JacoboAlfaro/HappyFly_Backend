import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PackageDocument = Package & Document & { _id: Types.ObjectId };

@Schema({ collection: 'packages' })
export class Package {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [String], required: true })
  destinos: string[];

  @Prop({ type: [String], required: true })
  incluye: string[];

  @Prop({ required: true })
  duracion: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ type: [String], default: [] })
  imagenes: string[];

  @Prop({ required: false })
  vendedorId?: Types.ObjectId;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
