import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}

  async create(flight: Partial<Flight>): Promise<Flight> {
    try {
      const newFlight = new this.flightModel(flight);

      return await newFlight.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al crear el vuelo');
    }
  }

  async findAll(): Promise<Flight[]> {
    try {
      return await this.flightModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error al obtener los vuelos');
    }
  }

  async findByVendedorId(vendedorId: string): Promise<Flight[]> {
    try {
      return await this.flightModel.find({ vendedorId }).exec();
    } catch (error) {
      throw new BadRequestException('Error al obtener los vuelos del vendedor');
    }
  }

  async findById(id: string): Promise<Flight> {
    const flight = await this.flightModel.findById(id).exec();
    if (!flight) {
      throw new NotFoundException('Vuelo con id ${id} no encontrado');
    }
    return flight;
  }

  async update(id: string, flight: Partial<Flight>): Promise<Flight> {
    const updatedFlight = await this.flightModel
      .findByIdAndUpdate(id, flight, { new: true })
      .exec();
    if (!updatedFlight) {
      throw new NotFoundException('Vuelo con id ${id} no encontrado');
    }
    return updatedFlight;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedFlight = await this.flightModel.findByIdAndDelete(id).exec();
    if (!deletedFlight) {
      throw new NotFoundException('Vuelo con id ${id} no encontrado');
    }
    return { message: 'Vuelo con id ${id} eliminado correctamente' };
  }

  async findByUbicacion(destino: string): Promise<Flight[]> {
    if (!destino) return [];

    const normalizedUbicacion = destino
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    const vuelos = await this.flightModel.find().exec();

    const coincidencias = vuelos.filter((vuelo) => {
      const vueloDestino = vuelo.destino
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

      return (
        vueloDestino?.includes(normalizedUbicacion) ||
        normalizedUbicacion.includes(vueloDestino)
      );
    });

    console.log(
      `Buscando vuelos para "${destino}" — encontrados: ${coincidencias.length}`,
    );

    return coincidencias;
  }

  async updateAsientos(id: string, asientos: number[]) {
    const vuelo = await this.flightModel.findById(id);
    if (!vuelo) throw new NotFoundException(`Vuelo con id ${id} no encontrado`);

    vuelo.asientosReservados = asientos;
    await vuelo.save();

    return vuelo;
  }
}
