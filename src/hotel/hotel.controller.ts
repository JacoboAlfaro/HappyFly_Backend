import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Hotel } from './schemas/hotel.schema';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    @Post('create')
    async create(@Body() body: Partial<Hotel>): Promise<Hotel> {
        return this.hotelService.create(body);
    }

    @Get('all')
    async findAll(): Promise<Hotel[]> {
        return this.hotelService.findAll();
    }

    @Get('id/:id')
    async findById(@Param('id') id: string): Promise<Hotel> {
        return this.hotelService.findById(id);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() body: Partial<Hotel>): Promise<Hotel> {
        return this.hotelService.update(id, body);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.hotelService.delete(id);
    }

}