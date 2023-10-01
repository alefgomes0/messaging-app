import { useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

export const SignPage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="grid justify-items-center h-[100dvh] bg-[#190f1a] pb-[92px] font-[Cormonant]">
      <header className="flex justify-center w-full h-[222px] bg-fuchsia-900 px-[36px] pb-[92px]">
        <div className="w-[1000px] h-[500px] pt-[58px]">
          <h1 className="text-2xl text-bold text-fuchsia-50 ">THE ODIN ZAP</h1>
        </div>
      </header>
      <main className="grid grid-rows-2 w-[1000px] h-[500px] pt-[58px] mx-[36px] px-[25px] bg-[#eee7ee] z-10 translate-y-[-20%] rounded">
        <section>
          <h2 className="text-2xl text-neutral-800 font-semibold opacity-70 mb-6">
            Use The Odin Zap on your computer
          </h2>
          <p className="opacity-80 pb-4">
            {showRegisterForm
              ? "Fill the form bellow to register"
              : "Already have an account? Login bellow"}
          </p>
          {showRegisterForm ? <RegisterForm /> : <LoginForm />}
          <p
            className="opacity-80 pt-6 cursor-pointer underline underline-offset-4 decoration-blue-400"
            onClick={() => setShowRegisterForm(!showRegisterForm)}
          >
            {showRegisterForm
              ? "Already have an account? Click here to login"
              : "Don't have an account? Click here to register"}
          </p>
        </section>
      </main>
    </div>
  );
};
