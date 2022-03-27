import { Test, TestingModule } from '@nestjs/testing';
import { HolaService } from './hola.service';

describe('HolaService', () => {
  let service: HolaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolaService],
    }).compile();

    service = module.get<HolaService>(HolaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
