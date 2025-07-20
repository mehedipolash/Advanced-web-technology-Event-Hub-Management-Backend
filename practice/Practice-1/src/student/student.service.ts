import { Injectable } from '@nestjs/common';
import { AddDTO } from './dto/Student.dto';

@Injectable()
export class StudentService {
  sayHello(): string {
    return 'Hello, Admin';
  }

  createStudent(studentData: AddDTO): object {
    return {
      status: 201,
      message: 'Success.',
      data: {
        id: studentData.id,
        name: studentData.name,
        class: studentData.class,
        roll: studentData.roll,
      },
    };
  }

  deleteStudent(id: string): object {
    return { status: 200, message: `Successfully deleted ID: ${id}` };
  }

  getAStudent(name: string, roll: string): object {
    return {
      status: 200,
      message: `you have searched for ${name} and roll ${roll}`,
    };
  }
}
