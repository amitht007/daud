import Signin from "@/components/Auth/Signin";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <>
      <Breadcrumb pageName="Sign In" />

      <div className="flex items-center justify-center mt-40">
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card w-full max-w-md">
          <div className="w-fit w-full p-10">
              <Signin />
          </div>
        </div>
      </div>
    </>
  );
}
