import React from "react";
import logo from "/logo.png";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen flex font-sans bg-slate-950">
      {/* Left Panel - Readora Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
              <img src={logo} alt="logo" />
            </div>

            <h1 className="text-xl font-semibold text-white">Readora</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight">
              Discover articles that matter to you.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Join Readora to get personalized article feeds based on your
              interests and preferences.
            </p>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>Copyright © 2025 Readora Inc.</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950 relative">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-emerald-600">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-white">Readora</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
