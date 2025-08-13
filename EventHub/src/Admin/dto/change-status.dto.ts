import { IsIn } from 'class-validator';

export class ChangeStatusDto {
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
