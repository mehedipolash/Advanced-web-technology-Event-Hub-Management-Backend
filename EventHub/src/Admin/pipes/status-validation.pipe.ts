import { BadRequestException, PipeTransform } from '@nestjs/common';

export class StatusValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value !== 'active' && value !== 'inactive') {
      throw new BadRequestException(
        "Status must be either 'active' or 'inactive'",
      );
    }
    return value;
  }
}
