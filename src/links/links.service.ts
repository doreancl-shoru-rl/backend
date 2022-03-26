import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { Link, LinkDocument } from './schemas/link.schema';

@Injectable()
export class LinksService {
  constructor(@Inject(Link.name) private LinkModel: Model<LinkDocument>) {}

  async create(createLinkDto: CreateLinkDto) {
    const createdCat = new this.LinkModel(createLinkDto);
    return await createdCat.save();
  }

  async findOne(id): Promise<Link> {
    return await this.LinkModel.findById(id).exec();
  }

  async findAll(): Promise<Link[]> {
    return await this.LinkModel.find().exec();
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const link = await this.LinkModel.findByIdAndUpdate(id, updateLinkDto);
    if (!link) {
      throw new NotFoundException();
    }
    return link;
  }

  async remove(id) {
    console.log({ id });
    const res: DeleteResult = await this.LinkModel.deleteOne({
      _id: id,
    }).exec();

    return res.deletedCount > 0;
  }
}
