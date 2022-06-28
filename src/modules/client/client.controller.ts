import { Controller, Body, HttpStatus, Post, Get, Put, Param, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ClientCreateDto, ClientResponseDto, ClientUpdateDto } from './dto';
import { ClientsService } from './client.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: ClientResponseDto, description: 'Successfully created client' })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: ClientCreateDto): Promise<ClientResponseDto> {
    const project = await this.clientsService.create(data);
    return ClientResponseDto.mapFrom(project);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ClientResponseDto, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async getAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientsService.getAll();
    return ClientResponseDto.mapFromMulti(clients);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully updated client' })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') clientId: string, @Body() clientData: ClientUpdateDto) {
    const client = await this.clientsService.update(clientId, clientData);
    return ClientResponseDto.mapFrom(client);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ClientResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(@Param('id') clientId: string): Promise<ClientResponseDto> {
    const client = await this.clientsService.findById(clientId);
    return ClientResponseDto.mapFrom(client);
  }
}
