import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GroupResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: string;
}
