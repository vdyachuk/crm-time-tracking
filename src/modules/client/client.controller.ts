import { Body, Controller, Post, Delete, HttpStatus, Param } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './client.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '../../shared/entities/client.entity';
import { ClientData, ClientInput } from './model';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private clientsService: ClientService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: Client })
  create(@Body() clientDto: CreateClientDto) {
    return this.clientsService.createClient(clientDto);
  }
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ClientData })
  async delete(@Param() params) {
    return await this.clientsService.deleteClient(params.id);
  }
}
