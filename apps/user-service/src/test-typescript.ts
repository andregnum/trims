import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  test() {
    const message: string = "TypeScript is working!";
    return { message, timestamp: new Date() };
  }
}