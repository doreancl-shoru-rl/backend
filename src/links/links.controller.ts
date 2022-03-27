import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from './links.service';
import { StatsService } from './stats.service';
import { Cache } from 'cache-manager';
import { Linka } from './schemas/link.schema';

@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly statsService: StatsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    let redirectLink: Linka = await this.cacheManager.get(id);
    if (!redirectLink) {
      redirectLink = await this.linksService.findOne(id);
      await this.cacheManager.set(id, redirectLink, { ttl: 900 });
    }
    res.redirect(HttpStatus.MOVED_PERMANENTLY, redirectLink.long_url);
    this.statsService.create({ link: redirectLink._id, time: new Date() });
    return redirectLink;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log({ id });

    const isRemoved = await this.linksService.remove(id);

    if (isRemoved !== true) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.del(id);

    return;
  }
}
