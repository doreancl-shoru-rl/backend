import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stat, StatDocument } from './schemas/stat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stat.name) private StatModel: Model<StatDocument>) {}

  async create(createStatDto) {
    const createdCat = new this.StatModel(createStatDto);
    const res = await createdCat.save();

    return res;
  }

  async findOne(id): Promise<Stat> {
    return await this.StatModel.findById(id).exec();
  }

  async findAll(): Promise<Stat[]> {
    return await this.StatModel.find().exec();
  }
}
