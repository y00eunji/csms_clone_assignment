import LoginForm from '@/feature/login/ui/LoginForm.tsx';

export default function LoginPage() {
  return (
    <div className="bg-[url('/img-eviqcsms.png')] bg-cover h-screen relative">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative z-10 flex h-screen w-full">
        <div className="fixed left-4 top-8 flex gap-4 items-center">
          <img src="/ci_ocpp_16.png" alt="icon" className="w-[80px] h-[50px]" />
          <img src="/ci-ocpp.png" alt="icon" className="w-[80px] h-[40px]" />
          <div className="text-white text-[15px] leading-4">
            Fully Certificate
            <br /> OCPP 1.6 & OCPP 2.0.1
          </div>
        </div>
        <div className="w-[65%] flex flex-col items-center justify-center text-white pl-[50px]">
          <div className="flex flex-col">
            <h1 className="text-5xl">
              스마트한 EV를 위한
              <p className="font-extrabold">충전 인프라 통합관제서비스</p>
            </h1>
          </div>
          <div className="text-[20px] font-light mt-6">EVIQ is an all-in-one EV information and charging platform.</div>
        </div>
        <div className="w-[35%] bg-[#131722] font-light flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <div className="mb-9">
              <img src="/ci-eviq-white.png" alt="logo" className="w-[200px] h-[60px]" />
              <div className="text-white font-semibold text-2xl mt-4">관리자시스템 로그인</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <LoginForm />
              <p className="mt-[40px] text-white opacity-80">02-2125-4060</p>
            </div>
          </div>
          <div className="text-white fixed bottom-8">
            All Rights Reserved with <span className="font-semibold"> EVIQ </span>
          </div>
        </div>
      </div>
    </div>
  );
}
