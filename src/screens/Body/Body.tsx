import { ArrowLeftIcon, BellIcon, MenuIcon, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { supabase } from "../../lib/supabase";

export const Body = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: formData.get('fullName'),
          },
        },
      });

      if (signUpError) throw signUpError;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-r from-blue-50 to-white">
      <div className="relative h-full max-w-6xl mx-auto flex flex-col items-center px-8">
        {/* Top navigation icons */}
        <div className="w-full flex justify-between items-center pt-8">
          <ArrowLeftIcon className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />
          <BellIcon className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>

        {/* Logo and branding */}
        <div className="flex flex-col items-center mt-32">
          <div className="w-24 h-24 flex items-center justify-center">
            <img
              className="w-24 h-24"
              alt="CareCircle Logo"
              src="/frame-1.svg"
            />
          </div>

          <h1 className="mt-8 font-bold text-5xl text-blue-900 font-sans">
            CareCircle
          </h1>

          <p className="mt-6 text-blue-600 text-2xl text-center font-sans">
            Your Health, Connected
          </p>
        </div>

        {/* Description */}
        <Card className="mt-12 max-w-2xl border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <p className="text-gray-600 text-xl text-center font-sans leading-relaxed">
              Welcome to a smarter way to manage your healthcare journey
            </p>
          </CardContent>
        </Card>

        {/* Call to action */}
        <div className="mt-24 max-w-md w-full flex flex-col items-center">
          <Button 
            onClick={() => setShowModal(true)}
            className="w-full h-16 bg-blue-500 hover:bg-blue-600 rounded-full text-xl font-semibold shadow-[0px_10px_15px_#0000001a,0px_4px_6px_#0000001a] transition-all hover:transform hover:scale-105"
          >
            Get Started
          </Button>

          <p className="mt-6 text-gray-500 text-base text-center font-sans">
            By continuing, you agree to our Terms &amp; Privacy Policy
          </p>
        </div>

        {/* Bottom navigation icons */}
        <div className="w-full flex justify-between items-center absolute bottom-8">
          <MenuIcon className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />
          <StarIcon className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>

        {/* Auth Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-blue-900">
                {isLogin ? "Login to CareCircle" : "Create your account"}
              </DialogTitle>
            </DialogHeader>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {isLogin ? (
              // Login Form
              <form className="mt-4 space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            ) : (
              // Signup Form
              <form className="mt-4 space-y-4" onSubmit={handleSignup}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="signupEmail">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="signupPassword">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};