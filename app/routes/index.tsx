import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative bg-slate-200 shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0"></div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-[#0f2d52] drop-shadow-md">
                  Mesa Project
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-[#0f2d52] sm:max-w-3xl">
                Check the README.md file for instructions on how to setup and
                complete this project.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
