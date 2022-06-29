import { Controller, Body, HttpStatus, Post, Get, Put, Param, HttpCode, Delete, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ClientCreateDto, ClientResponseDto, ClientUpdateDto } from './dto';
import { ClientsService } from './client.service';

@Controller('clients')
@ApiTags('Clients')
export class ClientController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: ClientResponseDto })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: ClientCreateDto): Promise<ClientResponseDto> {
    const project = await this.clientsService.create(data);
    return ClientResponseDto.mapFrom(project);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ClientResponseDto, isArray: true })
  public async getAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientsService.getAll();
    return ClientResponseDto.mapFromMulti(clients);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ClientResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any client with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id', ParseUUIDPipe) clientId: string, @Body() clientData: ClientUpdateDto) {
    const client = await this.clientsService.update(clientId, clientData);
    return ClientResponseDto.mapFrom(client);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ClientResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(@Param('id', ParseUUIDPipe) clientId: string): Promise<ClientResponseDto> {
    const client = await this.clientsService.findById(clientId);
    return ClientResponseDto.mapFrom(client);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: `There isn't any client with id` })
  async delete(@Param('id', ParseUUIDPipe) clientId: string) {
    await this.clientsService.delete(clientId);
  }
}
