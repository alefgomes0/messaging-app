import { axiosPrivate } from "../../api/axios";
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
        email: "",
        name: "",
      });
      await axiosPrivate.get("/logout");
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={logoutUser}
      type="button"
      className="border-none outline-none dark:bg-neutral-300 dark:hover:bg-neutral-100 bg-neutral-700 hover:bg-neutral-500 transition-colors text-xs text-neutral-200 dark:text-neutral-900 w-min h-min px-4 py-1 rounded-full"
    >
      Logout
    </button>
  );
};
