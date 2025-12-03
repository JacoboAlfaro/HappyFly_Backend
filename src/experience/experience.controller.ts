import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './schemas/experience.schema';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('create')
  async create(@Body() body: Partial<Experience>): Promise<Experience> {
    return this.experienceService.create(body);
  }

  @Get('all')
  async findAll(): Promise<Experience[]> {
    return this.experienceService.findAll();
  }

  @Get('vendedor/:vendedorId')
  async findByVendedorId(
    @Param('vendedorId') vendedorId: string,
  ): Promise<Experience[]> {
    return this.experienceService.findByVendedorId(vendedorId);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Experience> {
    return this.experienceService.findById(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Experience>,
  ): Promise<Experience> {
    return this.experienceService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.experienceService.delete(id);
  }
}
