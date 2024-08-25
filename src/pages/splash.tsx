import { PageLayout } from "@/components/layout/page-layout";
import { useAuth } from "@/features/auth/api/login";
import { useRouter } from "@/hooks/useRouter";
import { useEffect } from "react";


const SplashPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.navigate("/dashboard/", {
        transition: "f7-circle",
      });
    } else {
      router.navigate("/auth/", {
        transition: "f7-circle",
      });
    }
  }, [user]);
  return <PageLayout name="loading"></PageLayout>;
};
export default SplashPage;
