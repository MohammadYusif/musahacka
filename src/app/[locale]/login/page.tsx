"use client";

import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/ui/animated-page";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

type FieldErrors = Record<string, string>;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, t("validation.emailInvalid")).email(t("validation.emailInvalid")),
        password: z.string().min(1, t("validation.passwordRequired")),
      }),
    [t]
  );

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = issue.message;
      });
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setServerError(t("validation.serverError"));
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/3 px-4 py-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl-flip" />
            {t("backToHome")}
          </Link>

          <Card className="border-0 shadow-xl shadow-primary/8">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-t-[calc(var(--radius)+1px)]" />

            <CardHeader className="text-center pt-8 pb-2">
              <div className="flex justify-center mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                  <span className="text-primary-foreground font-black text-xl tracking-tight">W</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">{t("loginTitle")}</CardTitle>
              <CardDescription className="text-sm mt-1">{t("loginSubtitle")}</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("email")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`pl-9 rtl:pl-3 rtl:pr-9 h-10 ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("password")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className={`px-9 h-10 ${fieldErrors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2.5 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full h-11 font-semibold shadow-sm shadow-primary/20" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      {t("signingIn")}
                    </span>
                  ) : tc("signIn")}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-xs text-muted-foreground">{t("orContinueWith")}</span>
                </div>
              </div>

              {/* Google */}
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg className="me-2 h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {t("continueWithGoogle")}
              </Button>
            </CardContent>

            <CardFooter className="justify-center pb-8">
              <p className="text-sm text-muted-foreground">
                {t("noAccount")}{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline underline-offset-4">
                  {tc("register")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}
