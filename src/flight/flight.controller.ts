import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './schemas/flight.schema';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('create')
  async create(@Body() body: Partial<Flight>): Promise<Flight> {
    return this.flightService.create(body);
  }

  @Get('all')
  async findAll(): Promise<Flight[]> {
    return this.flightService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Flight> {
    return this.flightService.findById(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Flight>,
  ): Promise<Flight> {
    return this.flightService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.flightService.delete(id);
  }
}
