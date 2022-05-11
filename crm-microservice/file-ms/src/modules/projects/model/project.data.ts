import { ApiProperty } from '@nestjs/swagger';

export class ProjectData {
    @ApiProperty({ description: 'Name', example: 'Esta' })
    public readonly name: string;
}
