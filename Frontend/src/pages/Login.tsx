import { useState } from 'react';
import { LoginForm } from "@/components/LoginForm";
import { ImageSlider } from "@/components/ImageSlider";
import first from "./../assets/Frame 1707478310.png"
import second from "./../assets/slider.png";

export function LoginPage() {
  const slides = [
    {
      url: second, // Corrected: Directly use the imported variable
      title: "Connecting People with Technology",
    },
    {
      url: first, // Corrected: Directly use the imported variable
      title: "Streamline Your Business",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <LoginForm />
        <div className="hidden md:block h-[600px] w-full">
          <ImageSlider slides={slides} />
        </div>
      </div>
    </div>
  );
}
