import { Inject, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Model } from 'mongoose';
import { Link } from './interfaces/link.interface';

@Injectable()
export class LinksService {
  constructor(
    @Inject('LINK_MODEL')
    private catModel: Model<Link>,
  ) {}

  create(createLinkDto: CreateLinkDto) {
    const createdCat = new this.catModel(createLinkDto);
    return createdCat.save();
  }

  async findOne(id): Promise<Link> {
    return await this.catModel.findById(id).exec();
  }

  async findAll(): Promise<Link[]> {
    return this.catModel.find().exec();
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
