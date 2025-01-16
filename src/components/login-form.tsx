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
import { login, signup } from "@/app/login/actions";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props} dir="rtl">
      <Card className="z-10">
        <CardHeader>
          <CardTitle className="text-2xl">
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
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">كلمة المرور</Label>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="mr-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </a>
                  )}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button
                type="submit"
                formAction={isSignUp ? signup : login}
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
