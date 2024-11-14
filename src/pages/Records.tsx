import { PageLayout } from "@/components/layout/page-layout";
import { Icon, Link, Navbar, NavLeft, NavRight } from "framework7-react";
import RecordLists from "./RecordLists";
import { useRouter } from "@/hooks/useRouter";

const RecordsPage = (param:any) => {
  const router = useRouter();
  function handleClick(): void {
    router.navigate(`/account/${param?.accountId}/edit/`);
  }
  const handleBackClick =()=>{
    router.navigate(`/`);
  }
  return (
    <PageLayout requireAuth>
      <Navbar>
      <NavLeft backLink="back" backLinkForce={true} onBackClick={handleBackClick}>
        
       <Link  icon="material:Edit" panelOpen="right"></Link>
      </NavLeft>
      <NavRight>
   {param?.accountId && <Link  icon="material:menu" panelOpen="right" onClick={()=>handleClick()}> <Icon material="edit"  /></Link>}
  </NavRight>
  </Navbar>
      <RecordLists />
    </PageLayout>

  );
};

export default RecordsPage;
