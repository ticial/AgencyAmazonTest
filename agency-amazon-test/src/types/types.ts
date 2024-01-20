import { Filter } from "@/types/filters";
import PropValue from "@/types/PropValue";

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

export interface QueryParams {
  value?: PropValue;
  sort?: string;
  filters?: Filter[];
  offset?: number;
  count?: number;
}
