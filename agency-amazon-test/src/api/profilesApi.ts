import { Profile, QueryParams } from "@/types/types";
import data from "./data/profilesData.json";
import { sortByProp } from "@/utils/sortByProp";

export const getProfilesData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, 500)); // fake delay
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || 10;

  const itemsAll: Profile[] = data.map(el => ({
    id: el.id,
    country: el.country,
    marketplace: el.marketplace,
    accountId: el.accountId
  }));

  sortByProp(sort, itemsAll)

  const items: Profile[] = [];
  let total = 0;

  for (const item of itemsAll) {

    if (filters.every((filter) => filter.check(item))) {
      if (total >= offset && total < offset + count) {
        items.push(item);
      }
      total++;
    }
  }

  return { items, total };
};
