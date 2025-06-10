import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class HealthService {
    constructor(
            private sequelize: Sequelize, 
    ) {}
    async ping(): Promise<string> {
        try {
            await this.sequelize.authenticate();
            return 'pong';
        } catch (error) {
            throw new Error('Database connection failed');
        }
    }
}