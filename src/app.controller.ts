import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

interface HealthResponse {
  status: string;
}

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): HealthResponse[] {
    return this.appService.getHealth();
  }
}