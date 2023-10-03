import "./App.css";
import { Conversation } from "./components/Conversation/Conversation";
import { UserContextProvider } from "./context/userContext";
import { SignPage } from "./pages/SignPage/SignPage";
import { MessengerPage } from "./pages/MessengerPage/MessengerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PersistLogin } from "./components/PersistLogin/PersistLogin";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignPage />} />
            <Route element={<PersistLogin />}>
              <Route
                path=":userId"
                element={
                  <UserContextProvider>
                    <MessengerPage />
                  </UserContextProvider>
                }
              >
                <Route
                  path="conversation/:contactId"
                  element={<Conversation />}
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
