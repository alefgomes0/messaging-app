import "./App.css";
import { Conversation } from "./components/Conversation/Conversation";
import { UserContextProvider } from "./context/userContext";
import { SignPage } from "./pages/SignPage/SignPage";
import { MessengerPage } from "./pages/MessengerPage/MessengerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/sign" element={<SignPage />} />
            <Route
              path="/"
              element={
                <UserContextProvider>
                  <MessengerPage />
                </UserContextProvider>
              }
            >
              <Route path=":userId" element={<Conversation />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
