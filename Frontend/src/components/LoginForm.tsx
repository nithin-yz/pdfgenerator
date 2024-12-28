import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/products');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Logo />
      <Card className="border-0 shadow-2xl bg-gray-800/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Let the Journey Begin!</CardTitle>
          <CardDescription className="text-gray-400">
            This is basic login page which is used for levitation assignment purpose.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email ID"
                required
                className={cn(
                  "bg-gray-700/50 border-gray-600 text-white",
                  "placeholder:text-gray-400 focus:ring-lime-400/50"
                )}
              />
              <p className="text-sm text-gray-400">This email will be displayed with your inquiry</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Current Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter the Password"
                required
                className={cn(
                  "bg-gray-700/50 border-gray-600 text-white",
                  "placeholder:text-gray-400 focus:ring-lime-400/50"
                )}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login now"}
          </Button>
          <div className="flex justify-between items-center w-full text-sm">
            <a href="/signup" className="text-lime-400 hover:text-lime-300">
              Create account
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Forget password?
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}