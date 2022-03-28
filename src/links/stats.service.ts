import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stat, StatDocument } from './schemas/stat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stat.name) private statModel: Model<StatDocument>) {}

  async create(createStatDto) {
    const createdCat = new this.statModel(createStatDto);
    return await createdCat.save();
  }

  async findOne(id): Promise<Stat> {
    return await this.statModel.findById(id).exec();
  }

  async findAll(): Promise<Stat[]> {
    return await this.statModel.find().exec();
  }

  async addStatas(id) {
    const now = new Date();
    const reportDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    this.statModel.findOne(
      { link: id, 'stats.time': reportDate },
      async (err, stat) => {
        /*
        let subDoc = stat.stats.;
        subDoc = {
          count: 8
        };
        const sav = await subDoc.save();
         */
        stat.update;
        console.log({ stat });
      },
    );
  }

  async addStat(id: string) {
    const now = new Date();
    const reportDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    const stat = await this.statModel.findOneAndUpdate(
      { link: id, time: reportDate },
      {
        link: id,
        time: reportDate,
        //count: 8,
        $inc: { count: 1 },
      },
      { upsert: true, new: true, useFindAndModify: false },
    );
    return;
  }

  async addStata(id: string, updateLinkDto?) {
    const now = new Date();
    const reportDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    const newStat = {
      //link: id,
      stats: {
        time: reportDate,
        //  $inc: { count: 1 },
      },
      //$set: { 'stats.$.time': reportDate },
      //'stats.$.time': reportDate,
      $inc: { 'stats.$.count': 1 },
    };
    const anot = {
      $set: {
        'stats.$.time': reportDate,
      },
    };
    try {
      console.log('-------------------1');

      const stat = await this.statModel.findOneAndUpdate(
        { link: id, 'stats.time': reportDate },
        {
          $set: {
            link: id,
            'stats.$.count': 8,
          },
        },
        { upsert: true, new: true, useFindAndModify: false },
      );
      console.log('stat', stat);
    } catch (e) {
      console.log('-------------------2');
      console.log(e);
      return;
      const stat = new this.statModel({
        $set: {
          link: id,
        },
      });
      console.log('stat', stat);
      return await stat.save();
    }

    return 'oli';
  }
}
