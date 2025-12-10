import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service'; // Importa el servicio UserService
import { UserDAO, UserDTO } from './interfaces/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Obtener todos los usuarios
  @Get()
  getAll(): Promise<UserDAO[]> {
    return this.userService.getAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  getById(@Param('id') id: string): Promise<UserDAO> {
    return this.userService.getById(id);
  }

  // Obtener usuarios por rol
  @Get('role/:role')
  getByRole(@Param('role') role: string): Promise<UserDAO[]> {
    return this.userService.getByRole(role);
  }

  // Crear un nuevo usuario
  @Post()
  create(@Body() userDto: any): Promise<UserDAO> {
    return this.userService.create(userDto);
  }

  // Actualizar la información de un usuario
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: any): Promise<UserDAO> {
    return this.userService.updateUser(id, userDto);
  }

  // Actualizar el rol de un usuario
  @Put(':id/role')
  updateUserRole(
    @Param('id') id: string,
    @Body() role: { role: string },
  ): Promise<UserDAO> {
    return this.userService.updateUserRole(id, role.role);
  }

  // Eliminar un usuario
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.getById(req.user._id);
  }
}
