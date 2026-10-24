import { Copyright } from "@/components/layout/Copyright";
import { HomeClient } from "@/components/layout/HomeClient";
import { SiteShell } from "@/components/layout/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <HomeClient copyrightSlot={<Copyright />} />
    </SiteShell>
  );
}