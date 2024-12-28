import { SignUpForm } from "@/components/SignUpForm";

export function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <SignUpForm />
        
        {/* Right side - Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Technology office"
            className="rounded-2xl shadow-2xl w-full object-cover h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}