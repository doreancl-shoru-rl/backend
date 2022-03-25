import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { Stat, StatDocument } from './schemas/stat.schema';

@Injectable()
export class StatsService {
  constructor(@Inject(Stat.name) private StatModel: Model<StatDocument>) {
  }

  async create(createStatDto: CreateStatDto) {
    console.log(createStatDto);
    const createdCat = new this.StatModel(createStatDto);
    return await createdCat.save();
  }

  async findOne(id): Promise<Stat> {
    return await this.StatModel.findById(id).exec();
  }

  async findAll(): Promise<Stat[]> {
    return await this.StatModel.find().exec();
  }

  async update(id: number, updateStatDto: UpdateStatDto) {
    const Stat = await this.StatModel.findByIdAndUpdate(id, updateStatDto);
    if (!Stat) {
      throw new NotFoundException();
    }
    return Stat;
  }

  async remove(id) {
    console.log({ id });
    const res: DeleteResult = await this.StatModel.deleteOne({
      _id: id,
    }).exec();

    return res.deletedCount > 0;
  }
}
