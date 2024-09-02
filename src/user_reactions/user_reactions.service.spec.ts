import { Test, TestingModule } from '@nestjs/testing';
import { UserReactionsService } from './user_reactions.service';

describe('UserReactionsService', () => {
  let service: UserReactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReactionsService],
    }).compile();

    service = module.get<UserReactionsService>(UserReactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
