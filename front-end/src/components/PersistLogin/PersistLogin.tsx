import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuthContext } from "../../context/useAuthContext";
import { LoadingSpinner } from "../svg/LoadingSpinner";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuthContext();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : (
        <>
          {isLoading ? <LoadingSpinner width={18} height={18} /> : <Outlet />}
        </>
      )}
    </>
  );
};
