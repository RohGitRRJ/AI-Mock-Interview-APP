import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="m-5 text-left text-gray-500">Welcome back, please enter your details.</p>
            <SignIn />

            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Don't have an account?
                <a href="/sign-up" className="underline-offset-4 font-semibold text-gray-900 underline">Sign up for free.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">"I have nothing in common with lazy people who blame others for their lack of success. Great things come from hard work and perseverance. No excuses."</p>
            <p className="mb-4 text-3xl font-semibold">-Kobe Bryant</p>
            {/* <p className="">Founder, InterviewMentor AI</p> */}
            {/* <p className="mb-7 text-sm opacity-70">Online AI Interview</p> */}
          </div>
          <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
        </div>
      </div>
    </div>
  );
}
