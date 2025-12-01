import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Package } from './schemas/package.schema';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('create')
  async create(@Body() body: Partial<Package>): Promise<Package> {
    return this.packageService.create(body);
  }

  @Get('all')
  async findAll(): Promise<Package[]> {
    return this.packageService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Package> {
    return this.packageService.findById(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Package>,
  ): Promise<Package> {
    return this.packageService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.packageService.delete(id);
  }
}
