import { useState } from "react"
import { LoginForm } from "../../components/LoginForm/LoginForm";

export const LoginPage = () => {
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
          <h2 className="text-xl text-neutral-800 opacity-80 mb-6">
            Use The Odin Zap on your computer
          </h2>
          <LoginForm />
        </section>
      </main>
    </div>
  );
};
