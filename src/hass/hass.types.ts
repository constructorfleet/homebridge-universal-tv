import { HassEntities } from 'home-assistant-js-websocket';

export type Domain = `${Lowercase<string>}`;

export type Identifier = `${Lowercase<string>}`;

export type Service = Identifier;

export type EntityId = `${Lowercase<Domain>}.${Lowercase<Identifier>}`;

export type StateChangeHandler = (state: HassEntities) => void;