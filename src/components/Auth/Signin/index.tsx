import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import SignUpWithEmail from "../SignUpWithEmail";

export default function Signin() {
  return (
    <>
      <div>
        <SigninWithPassword />
        <SignUpWithEmail />
      </div>
      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
