import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { ValidateClickDto } from './dto/validate-click.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('validate')
  async validate(@Body() body: ValidateClickDto) {
    return this.gameService.validateClick(body.characterName, body.x, body.y);
  }
}