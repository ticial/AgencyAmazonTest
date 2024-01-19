import { Filter } from "@/utils/filters";

export type Account = {
  id: number;
  email: string;
  authToken: string;
  creationDate: number;
};

export type Profile = {
  id: number;
  country: string;
  marketplace: string;
  accountId: number;
};

export type Campaign = {
  id: number;
  clicks: number;
  cost: number;
  date: number;
  profileId: number;
};

export type StringPropsObject = { [K in string]: unknown };

export interface QueryParams {
  query?: string;
  sort?: string;
  filters?: Filter[];
  offset?: number;
  count?: number;
}
