import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService) =>
  ({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  }) as CorsOptions;
