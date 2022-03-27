import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from './links.service';
import { StatsService } from './stats.service';

@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly statsService: StatsService,
  ) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    console.log(createLinkDto);
    return await this.linksService.create(createLinkDto);
  }

  @Get()
  async findAll() {
    return await this.linksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.linksService.findOne(id);
  }

  @Get('/redirect/:id')
  async redirect(@Param('id') id: string, @Response() res) {
    const link = await this.linksService.findOne(id);
    res.redirect(HttpStatus.MOVED_PERMANENTLY, link.long_url);
    this.statsService.create({ link: link._id, time: new Date() });
    return link;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log({ id });

    const isRemoved = await this.linksService.remove(id);

    //if (isRemoved !== true) {
    // throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    //}

    return;
  }
}
