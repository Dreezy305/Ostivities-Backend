import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IResponse } from 'src/util/types';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@UseGuards(JwtAuthGuard)
@Controller('ticket')
@ApiTags('Ticket Service')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateTicketDto })
  @ApiOperation({ summary: 'Create ticket' })
  @ApiResponse({
    status: 201,
    description: 'Ticket created successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create_ticket')
  async createTicket(
    @Body() dto: CreateTicketDto,
    @GetCurrentUser('id') id: string | any,
  ): Promise<IResponse> {
    try {
      const data = await this.ticketService.createTicket({
        ...dto,
        userId: id?._id,
      });
      console.log(data, 'ddd');
      return {
        statusCode: HttpStatus.CREATED,
        data: data,
        message: 'Success',
      };
    } catch (error) {
      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiBody({ type: UpdateTicketDto })
  @ApiResponse({
    status: 200,
    description: 'Ticket updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update_ticket/:id')
  async updateTicket(
    @Param('id') id: string,
    @Body() dto: UpdateTicketDto,
    @GetCurrentUser('id') userId: string,
  ): Promise<IResponse> {
    const data = await this.ticketService.updateTicketById(id, {
      ...dto,
      userId,
    });
    return { statusCode: HttpStatus.OK, data: data, message: 'Success' };
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ticket' })
  @ApiParam({ name: 'id', description: 'Ticket id' })
  @ApiResponse({
    status: 200,
    description: 'Ticket retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('retrieve_ticket/:id')
  async getTicket(@Param('id') id: string): Promise<IResponse> {
    const data = await this.ticketService.getTicketById(id);
    return { statusCode: HttpStatus.OK, data: data, message: 'Success' };
  }
}
