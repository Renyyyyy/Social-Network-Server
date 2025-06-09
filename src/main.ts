import { NestFactory } from "@nestjs/core";
import { HealthModule } from "src/health.module";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(HealthModule);

    app.enableCors();

    await app.listen(PORT, () => console.log(`pong on ${PORT}`))
}

start()