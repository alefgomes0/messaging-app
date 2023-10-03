import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const logoutUser = async () => {
    try {
      setAuth({
        id: "",
        accessToken: "",
      });
      await axios.get("/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={logoutUser}
      type="button"
      className="border-none outline-none bg-neutral-700 hover:bg-neutral-600 transition-colors text-neutral-200 w-min h-min px-6 py-1 rounded-full"
    >
      Logout
    </button>
  );
};
