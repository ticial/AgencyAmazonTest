import { getAccount } from "@/api/accountsApi";
import { getProfile } from "@/api/profilesApi";
import CampaignsTable from "@/pages/Campaigns/CampaignsTable/CampaignsTable";
import { Account, Profile } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfileDetailsPage = () => {
  const { profileId } = useParams();
  const id = Number(profileId);
  const [account, setAccount] = useState<Account | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const title = account && profile ? account.email + "/" + profile.marketplace + ": Campaigns" : "";

  useEffect(() => {
    getProfile(id).then(profile => {
      if (!profile) return;
      setProfile(profile);
      getAccount(profile.accountId).then(account => {
        setAccount(account);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CampaignsTable title={title} profileId={id} />;
};

export default ProfileDetailsPage;
