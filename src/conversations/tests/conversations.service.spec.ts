import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from '../conversations.service';

describe('ServicesService', () => {
  let service: ConversationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationsService],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
