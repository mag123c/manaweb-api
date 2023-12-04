import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MapService } from './map.service';

@Controller('dev/map')
@ApiTags('지도')
export class MapController {
    constructor(
        private readonly mapService: MapService,       
    ) {}

    @Get()
    @ApiQuery({ type: 'string', name: 'query' })
    @ApiOperation({ description: '검색 결과' })
    async getQueryData(@Query('query') query: string) {
        return await this.mapService.getQueryData(query);
    }
}
