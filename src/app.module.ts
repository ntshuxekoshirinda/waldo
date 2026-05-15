import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { GameModule } from './game/game.module.js';

@Module({
  imports: [PrismaModule, GameModule],
})
export class AppModule {}