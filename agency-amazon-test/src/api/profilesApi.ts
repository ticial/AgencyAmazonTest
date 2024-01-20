import { Profile, QueryParams } from "@/types/types";
import data from "./data/profilesData.json";
import { sortByProp } from "@/utils/sortByProp";
import { API_DELAY, TABLE_ROW_COUNT } from "@/constants";

type ProfileData = typeof data[0]

const parseData = (el: ProfileData): Profile => ({
  id: el.id,
  country: el.country,
  marketplace: el.marketplace,
  accountId: el.accountId
})

export const getProfilesData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  const value = params?.value;
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || TABLE_ROW_COUNT;

  const itemsAll: Profile[] = data.map(parseData);

  sortByProp(sort, itemsAll)

  const items: Profile[] = [];
  let total = 0;

  for (const item of itemsAll) {
    
    if (value && !value.check(item)) continue;

    if (filters.every((filter) => filter.check(item))) {
      if (total >= offset && total < offset + count) {
        items.push(item);
      }
      total++;
    }
  }

  return { items, total };
};

export const getProfile = async (id: number) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  for (const el of data){
    if(el.id === id) {
      return parseData(el)
    }
  }
  return null
}
