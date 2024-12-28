import { useState } from 'react';
import { LoginForm } from "@/components/LoginForm";
import { ImageSlider } from "@/components/ImageSlider";

export function LoginPage() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Connecting People with Technology"
    },
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      title: "Streamline Your Business"
    }
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