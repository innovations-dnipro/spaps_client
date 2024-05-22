import type { IParams } from '../interfaces';
import { url_prefix } from './basic.urls';

const url = url_prefix.clients;

export const EndpointsEnumRentor = {
  updateRentor: ({ rentorId }: IParams) => `${url}/${rentorId}`,
};
