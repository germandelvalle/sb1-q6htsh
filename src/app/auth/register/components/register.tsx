import Link from "next/link";

export default function RegisterForm() {
  return (
    <div>
      <div>
        If you would like to register or have forgotten your password, please contact support at
        support@digifianz.com.
      </div>
      <div className="text-sm text-gray-500 mt-4">
        <Link href="/auth/login" className="hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
