import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/exception/expection.filter';
import { DevAppController } from './app.controller';
import { DevAppService } from './app.service';


@Module({
    imports: [],
    controllers: [DevAppController],    
    providers: [DevAppService,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})

export class DevAppModule {
}

