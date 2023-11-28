import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const getCorsConfig = {
  origin: '*', //set what you need
  credentials: true,
} as CorsOptions;
