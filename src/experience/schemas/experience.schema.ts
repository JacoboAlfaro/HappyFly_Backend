import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExperienceDocument = Experience & Document & { _id: Types.ObjectId };

@Schema({ collection: 'experiences' })
export class Experience {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  ubicacion: string;

  @Prop({ required: true })
  duracion: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  cuposDisponibles: number;

  @Prop({ type: [String], default: [] })
  incluye: string[];

  @Prop({ type: [String], default: [] })
  imagenes: string[];

  @Prop({ required: false })
  categoria?: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
