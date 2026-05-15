import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Character } from '../generated/prisma/client.js'; 

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async validateClick(characterName: string, clickedX: number, clickedY: number) {
    // 1. Fetch the target character's true coordinates from Neon
    const character = await this.prisma.character.findUnique({
      where: { name: characterName }, // Assumes 'name' is unique in your schema
    });

    if (!character) {
      throw new NotFoundException(`Character ${characterName} not found.`);
    }

    // 2. Define a click tolerance window (e.g., within 20 pixels)
    const tolerance = 20; 
    const xMatches = Math.abs(character.x - clickedX) <= tolerance;
    const yMatches = Math.abs(character.y - clickedY) <= tolerance;

    // 3. Return the evaluation result to the controller
    if (xMatches && yMatches) {
      return { found: true, message: `Correct! You found ${characterName}!` };
    }

    return { found: false, message: 'Keep looking!' };
  }
}