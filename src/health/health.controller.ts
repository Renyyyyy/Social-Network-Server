import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller('/api')
export class HealthController {

    constructor(
        private readonly healthService: HealthService
    ) {}

    @Get('/ping')
    async ping(): Promise<string> {
        return this.healthService.ping()
    }
}