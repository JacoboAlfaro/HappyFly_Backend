import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    this.logger.log("🟢 BACKEND → Guardando orden:");
    this.logger.log(dto);

    const created = new this.orderModel(dto);
    return created.save();
  }

  async getOrdersByUser(usuarioId: string) {
    return this.orderModel.find({ usuarioId }).exec();
  }
}
