import { IsString, IsArray, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsString()
  usuarioId: string;

  @IsString()
  metodoPago: string;

  @IsArray()
  items: any[];

  @IsNumber()
  subtotal: number;

  @IsNumber()
  total: number;
}
