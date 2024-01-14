import { ForbiddenException, Injectable } from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/event.dto';
import { Events } from './schema/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Events.name) private eventModel: Model<Events>) {}

  async createEvent(dto: CreateEventDto): Promise<Events> {
    try {
      const createdEvent = new this.eventModel({
        eventName: dto.eventName,
        eventDetails: dto.eventDetails,
        state: dto.state,
        address: dto.address,
        eventURL: dto.eventURL,
        supportingDocument: dto.supportingDocument,
        eventType: dto.eventType,
        timeZone: dto.timeZone,
        frequency: dto.frequency,
        startDate: dto.startDate,
        endDate: dto.endDate,
        socials: dto.socials,
        eventImage: dto.eventImage,
        evenTicket: {
          singleTicket: dto.evenTicket.singleTicket,
          collectiveTicket: dto.evenTicket.collectiveTicket,
        },
      });
      const savedEvent = await createdEvent.save();
      return savedEvent;
    } catch (error) {
      throw new ForbiddenException(FORBIDDEN_MESSAGE);
    }
  }

  async getEvents() {
    try {
      const events = await this.eventModel.find().exec();
      return events;
    } catch (error) {
      throw new ForbiddenException(FORBIDDEN_MESSAGE);
    }
  }
}
