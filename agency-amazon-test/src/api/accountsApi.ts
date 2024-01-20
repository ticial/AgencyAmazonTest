import { Account, QueryParams } from "@/types/types";
import { sortByProp } from "@/utils/sortByProp";
import data from "./data/accountsData.json";
import MinMax from "@/types/MinMax";
import { API_DELAY, TABLE_ROW_COUNT } from "@/constants";

type AccountData = typeof data[0]

const parseData = (el: AccountData): Account => ({
  id: el.id,
  email: el.email,
  authToken: el.authToken,
  creationDate: Date.parse(el.creationDate),
})

export const getAccountsData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  const value = params?.value;
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || TABLE_ROW_COUNT;

  const itemsAll: Account[] = data.map(parseData);

  sortByProp(sort, itemsAll)

  const items: Account[] = [];
  let total = 0;

  const dateRange = new MinMax()

  for (const item of itemsAll) {
    if (value && !value.check(item)) continue;

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

export const getAccount = async (id: number) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  for (const el of data){
    if(el.id === id) {
      return parseData(el)
    }
  }
  return null
}