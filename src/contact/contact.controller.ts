import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact-request.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendMessage(@Body() dto: CreateContactDto) {
    return this.contactService.createContact(dto);
  }

  @Get()
  async showContacts() {
    return this.contactService.findAllContacts();
  }
}
