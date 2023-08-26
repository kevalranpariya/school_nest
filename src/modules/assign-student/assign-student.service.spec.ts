import { Test, TestingModule } from '@nestjs/testing';
import { AssignStudentService } from './assign-student.service';

describe('AssignStudentService', () => {
  let service: AssignStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignStudentService],
    }).compile();

    service = module.get<AssignStudentService>(AssignStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
