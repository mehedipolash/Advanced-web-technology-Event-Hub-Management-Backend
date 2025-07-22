import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AddDTO } from './dto/Student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('say')
  sayHello(): string {
    return this.studentService.sayHello();
  }

  // Create A New Student
  @Post('add')
  createStudent(@Body() createDTO: AddDTO): object {
    return this.studentService.createStudent(createDTO);
  }

  // Delete A Student
  @Delete(':id/delete')
  deleteStudent(@Param('id') stuID: string): object {
    return this.studentService.deleteStudent(stuID);
  }

  // Search By Name
  @Get('search')
  getAStudent(
    @Query('name') name: string,
    @Query('roll') roll: string,
  ): object {
    return this.studentService.getAStudent(name, roll);
  }

  @Get('bio/:id')
  getBio(@Param('id', ParseIntPipe) Bioid: number): string {
    return this.studentService.getBio(Bioid);
  }
  @Get('bioo/:flag')
  getBioBool(@Param('flag', ParseBoolPipe) flag: boolean): string {
    return this.studentService.getBioBool(flag);
  }
}
