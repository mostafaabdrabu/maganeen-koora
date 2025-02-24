"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, phoneLogin, signup } from "@/app/login/actions";
import { useActionState, useState } from "react";
import useUserStore from "@/store/userStore"; // Import Zustand store
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSignUp, setIsSignUp] = useState(false);
  const setUser = useUserStore((state) => state.setUser); // Get the setUser function from Zustand
  const router = useRouter();

  // Handle form submission for login
  const [loginState, loginFormAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const user = await login(formData); // Call the login server action
      if (user) {
        setUser(user); // Update Zustand store with the user data
        router.push("/account"); // Redirect to the profile page
      }
      return user;
    },
    null
  );
  const [phoneLoginState, phoneLoginFormAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const user = await phoneLogin(formData); // Call the login server action
      if (user) {
        setUser(user); // Update Zustand store with the user data
        router.push("/account"); // Redirect to the profile page
      }
      return user;
    },
    null
  );

  // Handle form submission for signup
  const [signupState, signupFormAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const user = await signup(formData); // Call the signup server action
      if (user) {
        setUser(user); // Update Zustand store with the user data
        router.push("/account");
      }
      return user;
    },
    null
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props} dir="rtl">
      <Card className="z-10">
        <CardHeader>
          <CardTitle className="text-2xl">
            <div className="flex justify-center animate-bounce mt-4">
              <Image
                src="/logo.png"
                alt="Football"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>
            {isSignUp ? "إنشاء حساب" : "تسجيل الدخول"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "املأ الحقول أدناه لإنشاء حساب جديد"
              : "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {isSignUp && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">الاسم الأول</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="الاسم الأول"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">الاسم الأخير</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="الاسم الأخير"
                      required
                    />
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="phone">رقم الموبيل</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  // placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">كلمة المرور</Label>
                  {/* {!isSignUp && (
                    <a
                      href="#"
                      className="mr-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </a>
                  )} */}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button
                type="submit"
                formAction={isSignUp ? signupFormAction : phoneLoginFormAction} // Use the appropriate form action
                className="w-full"
              >
                {isSignUp ? "إنشاء حساب" : "تسجيل الدخول"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isSignUp ? (
                <>
                  لديك حساب بالفعل؟{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="underline underline-offset-4"
                  >
                    تسجيل الدخول
                  </button>
                </>
              ) : (
                <>
                  ليس لديك حساب؟{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="underline underline-offset-4"
                  >
                    إنشاء حساب
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
