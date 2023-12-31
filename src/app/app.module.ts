import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/exception/expection.filter';
import { DevAppModule } from 'src/devweb/app/app.module';
import { MananawebAppModule } from 'src/mananaweb/app/app.module';


@Module({
    imports: [
        MananawebAppModule,
        DevAppModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})

export class AppModule {
}

