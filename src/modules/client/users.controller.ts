import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './client.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '../../shared/entities/client.entity';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private clientsService: ClientService) {}

  @ApiResponse({ status: 200, type: Client })
  @Post()
  create(@Body() clientDto: CreateClientDto) {
    return this.clientsService.createClient(clientDto);
  }
}
