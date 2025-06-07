import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/contact-request.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async createContact(dto: CreateContactDto): Promise<Contact> {
    const newMessage = this.contactRepo.create(dto);
    return this.contactRepo.save(newMessage);
  }

  // Optional: Get all messages (for admin maybe)
  findAllContacts() {
    return this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }
}
