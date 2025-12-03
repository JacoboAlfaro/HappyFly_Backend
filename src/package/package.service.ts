import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from './schemas/package.schema';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
  ) {}

  async create(packageData: Partial<Package>): Promise<Package> {
    try {
      const newPackage = new this.packageModel(packageData);
      return await newPackage.save();
    } catch (error) {
      throw new BadRequestException('Error al crear el paquete');
    }
  }

  async findAll(): Promise<Package[]> {
    try {
      return await this.packageModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error al obtener los paquetes');
    }
  }

  async findByVendedorId(vendedorId: string): Promise<Package[]> {
    try {
      return await this.packageModel.find({ vendedorId }).exec();
    } catch (error) {
      throw new BadRequestException(
        'Error al obtener los paquetes del vendedor',
      );
    }
  }

  async findById(id: string): Promise<Package> {
    const packageData = await this.packageModel.findById(id).exec();
    if (!packageData) {
      throw new NotFoundException(`Paquete con id ${id} no encontrado`);
    }
    return packageData;
  }

  async update(id: string, packageData: Partial<Package>): Promise<Package> {
    const updatedPackage = await this.packageModel
      .findByIdAndUpdate(id, packageData, { new: true })
      .exec();
    if (!updatedPackage) {
      throw new NotFoundException(`Paquete con id ${id} no encontrado`);
    }
    return updatedPackage;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedPackage = await this.packageModel.findByIdAndDelete(id).exec();
    if (!deletedPackage) {
      throw new NotFoundException(`Paquete con id ${id} no encontrado`);
    }
    return { message: `Paquete con id ${id} eliminado correctamente` };
  }
}
