import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HassClient } from './hass.client';

@Module({})
export class HassModule {
  static register(
    server: string,
    authToken: string,
  ): DynamicModule {
    return {
      module: HassModule,
      providers: [{
        provide: HassClient,
        useValue: new HassClient(server, authToken),
      }],
      exports: [HassClient],
    };
  }
}