import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slices/authSlice';
import Swal from 'sweetalert2'; // SweetAlert2 import
import { useNavigate } from 'react-router-dom'; // Use this for redirection

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // To display any error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form submitted"); // Check if this logs
    setIsLoading(true);
    setError(null); // Clear any previous errors

    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    console.log("Form Data:", { name, email, password }); // Check form data

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      console.log("API Response:", response.data); // Check API response

      Swal.fire({
        title: 'Registration Successful!',
        text: 'You have successfully registered. Please log in.',
        icon: 'success',
        confirmButtonText: 'Login',
      }).then(() => {
        // Redirect to the login page after successful registration
        navigate('/login');
      });
    } catch (error: any) {
      console.error("Registration error:", error); // Check the error
      setError(error.response?.data?.message || 'Registration failed');
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Registration failed, please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Logo />
      <Card className="border-0 shadow-2xl bg-gray-800/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Sign up to begin journey</CardTitle>
          <CardDescription className="text-gray-400">
            This is basic signup page which is used for levitation assignment purpose.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Enter your name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className={cn(
                  "bg-gray-700/50 border-gray-600 text-white",
                  "placeholder:text-gray-400 focus:ring-lime-400/50"
                )}
              />
              <p className="text-sm text-gray-400">This name will be displayed with your inquiry</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className={cn(
                  "bg-gray-700/50 border-gray-600 text-white",
                  "placeholder:text-gray-400 focus:ring-lime-400/50"
                )}
              />
              <p className="text-sm text-gray-400">This email will be displayed with your inquiry</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className={cn(
                  "bg-gray-700/50 border-gray-600 text-white",
                  "placeholder:text-gray-400 focus:ring-lime-400/50"
                )}
              />
              <p className="text-sm text-gray-400">Any further updates will be forwarded on this Email ID</p>
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <div className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-lime-400 hover:text-lime-300">
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
