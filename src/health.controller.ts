import { Controller, Get } from "@nestjs/common";
import { Sequelize } from 'sequelize-typescript';

@Controller('/api')
export class HealthController {
    constructor(private sequelize: Sequelize) {}

    @Get('/ping')
    async ping(): Promise<string> {
        try {
            await this.sequelize.authenticate();
            return 'pong';
        } catch (error) {
            throw new Error('Database connection failed');
        }
    }
}