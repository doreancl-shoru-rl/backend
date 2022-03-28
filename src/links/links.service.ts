import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Linka, LinkDocument } from './schemas/link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class LinksService {
  //constructor(@Inject(Linka.name) private LinkaModel: Model<LinkDocument>) {}
  constructor(
    @InjectModel(Linka.name) private LinkModel: Model<LinkDocument>,
  ) {}

  async create(CreateLinkDto: CreateLinkDto) {
    const createdCat = new this.LinkModel(CreateLinkDto);
    return await createdCat.save();
  }

  async findOne(link): Promise<Linka> {
    return await this.LinkModel.findOne({ link: link }).exec();
  }

  async findAll(): Promise<Linka[]> {
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
