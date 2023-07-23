import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as Hass from 'home-assistant-js-websocket';
import { Domain, EntityId, Service, StateChangeHandler } from './hass.types';

@Injectable()
export class HassClient implements OnApplicationShutdown {

  private readonly auth: Hass.Auth;
  private connection!: Hass.Connection;

  constructor(
    private readonly server: string,
    private readonly authToken: string,
  ) {

    this.auth = Hass.createLongLivedTokenAuth(
      server,
      authToken,
    );
  }

  async onApplicationShutdown() {
    this.connection.close();
  }

  async connect(): Promise<void> {
    this.connection = await Hass.createConnection({
      auth: this.auth,
    });
  }

  subscribeToEntity(entityId: EntityId, listener: StateChangeHandler): Hass.UnsubscribeFunc {
    return Hass.subscribeEntities(this.connection, listener);
  }

  async callService(
    domain: Domain,
    service: Service,
    data: object | undefined = undefined,
    target: Hass.HassServiceTarget | undefined = undefined,
  ) {
    Hass.callService(
      this.connection,
      domain,
      service,
      data,
      target,
    );
  }
}