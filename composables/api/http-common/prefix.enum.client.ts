import type { IParams } from '../interfaces';
import { url_prefix } from './basic.urls';

const url = url_prefix.clients;

export const EndpointsEnumClient = {
  postAvatar: ({ clientId }: IParams) => `${url}/${clientId}/avatar`,
  updateClient: ({ clientId }: IParams) => `${url}/${clientId}`,
};
