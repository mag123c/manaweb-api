import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: "JWT",
      in: "header",
    },
    'token' //컨트롤러 토큰 검증 (해당 이름 사용해서)
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger/swagger-ui', app, document, {
    swaggerOptions: { 
      //bearer token 유지 - 편의성
      persistAuthorization: true
    }
  });
}