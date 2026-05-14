import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a Prisma module

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async validateClick(characterName: string, clickX: number, clickY: number) {
    const character = await this.prisma.character.findUnique({
      where: { name: characterName },
    });

    if (!character) return { correct: false };

    const margin = 3.0; // 3% wiggle room
    const xDiff = Math.abs(character.targetX - clickX);
    const yDiff = Math.abs(character.targetY - clickY);

    const isCorrect = xDiff <= margin && yDiff <= margin;

    return {
      correct: isCorrect,
      // If correct, return coordinates so frontend can place a permanent marker
      location: isCorrect ? { x: character.targetX, y: character.targetY } : null,
    };
  }
}