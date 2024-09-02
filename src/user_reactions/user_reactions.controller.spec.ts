import { Test, TestingModule } from '@nestjs/testing';
import { UserReactionsController } from './user_reactions.controller';
import { UserReactionsService } from './user_reactions.service';

describe('UserReactionsController', () => {
  let controller: UserReactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserReactionsController],
      providers: [UserReactionsService],
    }).compile();

    controller = module.get<UserReactionsController>(UserReactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
