import { ApiTimeResolutionValue } from '../constants';

export type DefinedApiResponse<T> = {
  [key: string]: T;
};

export type DefinedApiTimeResolution =
  (typeof ApiTimeResolutionValue)[keyof typeof ApiTimeResolutionValue];

export type PairId = `${string}:${string}`;

export type WebsocketSink<T> = {
  next: (data: T) => void;
  error?: (error: unknown) => void;
  complete?: () => void;
};
