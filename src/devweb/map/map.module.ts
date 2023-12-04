import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { MapProvider } from './map.provider';

@Module({
  providers: [MapService, MapProvider],
  controllers: [MapController]
})
export class MapModule {}
