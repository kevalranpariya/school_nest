import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly EMAIL_USER = process.env.EMAIL_USER;
  private readonly EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
  private readonly EMAIL_SMTP = process.env.EMAIL_SMTP;
  private readonly SMTP_PORT = process.env.SMTP_PORT;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.EMAIL_SMTP,
      port: this.SMTP_PORT,
      secure: false,
      auth: {
        user: this.EMAIL_USER,
        pass: this.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: this.EMAIL_USER,
      to,
      subject,
      text,
    });
    return true;
  }
}
