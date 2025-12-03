import { Body, Controller, Post, Get, Param, Logger } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @Post("create")
  async createOrder(@Body() body: CreateOrderDto) {
    this.logger.log("📦 BACKEND → Recibiendo orden:", body);

    const order = await this.orderService.createOrder(body);

    return {
      message: "Orden registrada correctamente",
      orderId: order.id,
    };
  }

  @Get("user/:usuarioId")
  async getOrdersByUser(@Param("usuarioId") usuarioId: string) {
    return this.orderService.getOrdersByUser(usuarioId);
  }
}
