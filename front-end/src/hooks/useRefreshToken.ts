import axios from "../api/axios";
import { useAuthContext } from "../context/useAuthContext";

export const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth({
      name: response.data.name,
      email: response.data.email,
      accessToken: response.data.accessToken,
      id: response.data.id,
    });
    return response.data.accessToken;
  };
  return refresh;
};
