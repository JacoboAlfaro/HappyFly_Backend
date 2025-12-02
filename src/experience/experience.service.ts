import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from './schemas/experience.schema';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  async create(experience: Partial<Experience>): Promise<Experience> {
    try {
      const newExperience = new this.experienceModel(experience);
      return await newExperience.save();
    } catch (error) {
      throw new BadRequestException('Error al crear la experiencia');
    }
  }

  async findAll(): Promise<Experience[]> {
    try {
      return await this.experienceModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error al obtener las experiencias');
    }
  }

  async findById(id: string): Promise<Experience> {
    const experience = await this.experienceModel.findById(id).exec();
    if (!experience) {
      throw new NotFoundException(`Experiencia con id ${id} no encontrada`);
    }
    return experience;
  }

  async update(
    id: string,
    experience: Partial<Experience>,
  ): Promise<Experience> {
    const updatedExperience = await this.experienceModel
      .findByIdAndUpdate(id, experience, { new: true })
      .exec();
    if (!updatedExperience) {
      throw new NotFoundException(`Experiencia con id ${id} no encontrada`);
    }
    return updatedExperience;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedExperience = await this.experienceModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedExperience) {
      throw new NotFoundException(`Experiencia con id ${id} no encontrada`);
    }
    return { message: `Experiencia con id ${id} eliminada correctamente` };
  }
}
