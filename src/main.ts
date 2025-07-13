import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Social Network Backend')
        .setDescription('Backend documentation')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.setGlobalPrefix('api')
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    await app.listen(PORT, () => console.log(`pong on ${PORT}`))
}

start()