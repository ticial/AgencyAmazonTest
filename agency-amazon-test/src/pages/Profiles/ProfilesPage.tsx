import { getProfilesData } from "@/api/profilesApi";
import TableRow from "@/components/Table/TableRow/TableRow";
import TableWidget from "@/components/TableWidget/TableWidget";
import { QueryParams } from "@/types/types";
import { StartStringFilter } from "@/utils/filters";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const headerNames = { id: "ID", country: "Country", marketplace: "Marketplace" };
const countryFilter = new StartStringFilter("country", "Search Country");
const marketplaceFilter = new StartStringFilter("marketplace", "Search Marketplace");
const defaultFilters = [countryFilter, marketplaceFilter];

const ProfilesPage = () => {
  console.log("ProfilesPage");
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [valuesList, setValuesList] = useState<string[][]>([]);

  const loadValues = async (params: QueryParams) => {
    try {
      const { items, total } = await getProfilesData(params);
      const values = items.map(item => [String(item.id), item.country, item.marketplace]);
      setValuesList(values);
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
    return { values: [], total: 0 };
  };

  return (
    <TableWidget title="Profiles" total={total} headerNames={headerNames} onChange={loadValues} filtersParams={defaultFilters}>
      {valuesList.map(values => (
        <TableRow key={values[0]} values={values} onClick={() => navigate("/profile/" + values[0])} />
      ))}
    </TableWidget>
  );
};

export default ProfilesPage;
