import { Account, QueryParams } from "@/types/types";
import { sortByProp } from "@/utils/sortByProp";
import data from "./data/accountsData.json";
import { Interval } from "@/utils/range";

export const getAccountsData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, 500)); // fake delay
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || 10;

  const itemsAll: Account[] = data.map(el => ({
    id: el.id,
    email: el.email,
    authToken: el.authToken,
    creationDate: Date.parse(el.creationDate),
  }));

  sortByProp(sort, itemsAll)

  const items: Account[] = [];
  let total = 0;

  const dateRange = new Interval()

  for (const item of itemsAll) {
    dateRange.check(item.creationDate)

    if (filters.every((filter) => filter.check(item))) {
      if (total >= offset && total < offset + count) {
        items.push(item);
      }
      total++;
    }
  }
  
  return { items, total, dateRange };
};

