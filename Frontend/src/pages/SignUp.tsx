import { SignUpForm } from "@/components/SignUpForm";
import Header from "./../components/header";
import { Bg } from "./../assets";

export function SignUpPage() {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full h-screen flex flex-col md:flex-row">
        {/* Left Section: SignUpForm */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <SignUpForm />
        </div>

        {/* Right Section: Image - Visible only on medium and larger screens */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center p-4">
          <img
            src={Bg}
            alt="Technology office"
            className="rounded-tl-[60px] rounded-bl-[60px] shadow-2xl w-full object-cover h-[600px]"
          />
        </div>
      </div>
    </>
  );
}


{/* <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
  <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">

    <SignUpForm />
  
    <div className="hidden md:block">
      <img
        src={Bg}
        alt="Technology office"
        className="rounded-2xl shadow-2xl w-full object-cover h-[600px]"
      />
    </div>
  </div>
</div>  */}
