import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SummaryByDepartmentResponse } from '../../dto/response.dto';
import { HttpModule } from '@nestjs/axios';
describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('SummaryByDepartment', () => {
    it('should return SummaryByDepartmentResponse Interface', () => {
      const userController = app.get(UserController);
      expect(userController.SummaryByDepartment()).toBeDefined();
    });
  });
});
