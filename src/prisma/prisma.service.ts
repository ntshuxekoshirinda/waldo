import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Add '/client' to the end of the path
import { PrismaClient } from '../generated/prisma/client.js'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}