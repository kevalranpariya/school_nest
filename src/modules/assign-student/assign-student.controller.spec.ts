import { Test, TestingModule } from '@nestjs/testing';
import { AssignStudentController } from './assign-student.controller';
import { AssignStudentService } from './assign-student.service';

describe('AssignStudentController', () => {
  let controller: AssignStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignStudentController],
      providers: [AssignStudentService],
    }).compile();

    controller = module.get<AssignStudentController>(AssignStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
