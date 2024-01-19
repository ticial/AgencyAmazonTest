import Layout from "@/components/Layout/Layout";
import AccountsPage from "@/pages/Accounts/AccountsPage";
import CampaignsPage from "@/pages/Campaigns/CampaignsPage";
import ProfilesPage from "@/pages/Profiles/ProfilesPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  console.log("Routing");
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AccountsPage />} />
        <Route path="/account" element={<AccountsPage />} />
        <Route path="/account/:accountId" element={<AccountsPage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        <Route path="/profile/:profileId" element={<ProfilesPage />} />
        <Route path="/campaign" element={<CampaignsPage />} />
        <Route path="/campaign/:campaignId" element={<CampaignsPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
