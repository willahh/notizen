import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new Note';
  }

  @Get('ab*cd')
  findAll(@Req() request: Request): string {
    return 'This action returns all notes';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log('finddOne', params.id);
    return `This action returns a #${params.id} note`;
  }
}
