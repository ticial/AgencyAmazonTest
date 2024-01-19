import { getProfilesData } from "@/api/profilesApi";
import TableWidget, { TableWidgetValues } from "@/components/TableWidget/TableWidget";
import { QueryParams } from "@/types/types";
import { StartStringFilter } from "@/utils/filters";

const headerNames = { id: "ID", country: "Country", marketplace: "Marketplace" };
const countryFilter = new StartStringFilter("country", "Search Country");
const marketplaceFilter = new StartStringFilter("marketplace", "Search Marketplace");
const defaultFilters = [countryFilter, marketplaceFilter];

const ProfilesPage = () => {
  console.log("ProfilesPage");

  const getValues = async (params: QueryParams) => {
    try {
      const { items, total } = await getProfilesData(params);
      const values = items.map(item => [String(item.id), item.country, item.marketplace]);
      return { values, total, filters: undefined } as TableWidgetValues;
    } catch (error) {
      console.log(error);
    }
    return { values: [], total: 0 };
  };

  return <TableWidget title="Profiles" headerNames={headerNames} getValues={getValues} filters={defaultFilters} />;
};

export default ProfilesPage;
