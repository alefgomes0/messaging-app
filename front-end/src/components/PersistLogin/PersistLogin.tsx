import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuthContext } from "../../context/useAuthContext";
import { LoadingSpinner } from "../svg/LoadingSpinner";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`Access Token: ${JSON.stringify(auth?.accessToken)}`);
    console.log(`id: ${auth.id}`);
  }, [isLoading]);

  return (
    <>{isLoading ? <LoadingSpinner width={18} height={18} /> : <Outlet />}</>
  );
};
