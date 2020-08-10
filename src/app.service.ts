import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    return Math.floor(Math.random() * 100);
  }
}
