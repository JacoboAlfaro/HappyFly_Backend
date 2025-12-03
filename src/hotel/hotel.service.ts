import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hoteltModel: Model<HotelDocument>,
  ) {}

  async create(hotel: Partial<Hotel>): Promise<Hotel> {
    try {
      console.log(hotel);
      const newHotel = new this.hoteltModel(hotel);
      return await newHotel.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al crear el hotel');
    }
  }

  async findAll(): Promise<Hotel[]> {
    try {
      return await this.hoteltModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error al obtener los hoteles');
    }
  }

  async findByVendedorId(vendedorId: string): Promise<Hotel[]> {
    try {
      return await this.hoteltModel.find({ vendedorId }).exec();
    } catch (error) {
      throw new BadRequestException(
        'Error al obtener los hoteles del vendedor',
      );
    }
  }

  async findById(id: string): Promise<Hotel> {
    const hotel = await this.hoteltModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException('Hotel con id ${id} no encontrado');
    }
    return hotel;
  }

  async update(id: string, hotel: Partial<Hotel>): Promise<Hotel> {
    const updatedHotel = await this.hoteltModel
      .findByIdAndUpdate(id, hotel, { new: true })
      .exec();
    if (!updatedHotel) {
      throw new NotFoundException('Hotel con id ${id} no encontrado');
    }
    return updatedHotel;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedHotel = await this.hoteltModel.findByIdAndDelete(id).exec();
    if (!deletedHotel) {
      throw new NotFoundException('Hotel con id ${id} no encontrado');
    }
    return { message: 'Hotel con id ${id} eliminado correctamente' };
  }

  async findByUbicacion(destino: string): Promise<Hotel[]> {
    if (!destino) return [];

    const normalizedUbicacion = destino
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    const hoteles = await this.hoteltModel.find().exec();

    const coincidencias = hoteles.filter((hotel) => {
      const hotelDestino = hotel.destino
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

      return (
        hotelDestino?.includes(normalizedUbicacion) ||
        normalizedUbicacion.includes(hotelDestino)
      );
    });

    console.log(
      `Buscando hoteles para "${destino}" — encontrados: ${coincidencias.length}`,
    );

    return coincidencias;
  }
}
