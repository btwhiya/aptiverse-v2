"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Sparkles,
  Target,
  Compass,
  User,
  GraduationCap,
  Layers,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  authenticateUser,
  setDemoStudentSession,
  setDemoAdminSession,
  registerNewUser,
} from "@/lib/auth-storage";

const supportedExams = [
  { id: "cat", label: "CAT 2026", color: "from-indigo-500/20 to-blue-500/10 text-indigo-300 border-indigo-500/30" },
  { id: "xat", label: "XAT 2026", color: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30" },
  { id: "gmat", label: "GMAT 2026", color: "from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30" },
  { id: "snap", label: "SNAP 2026", color: "from-blue-500/20 to-teal-500/10 text-blue-300 border-blue-500/30" },
  { id: "nmat", label: "NMAT GMAC", color: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30" },
  { id: "cmat", label: "CMAT / NTA", color: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30" },
];

function AuthGateway() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  // Active tab: "signin" | "signup" | "demo"
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "demo">("signin");

  // Sign In Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up Form States
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [targetExam, setTargetExam] = useState("cat");
  const [prepLevel, setPrepLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");

  // UI state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<"student" | "admin" | "submit" | null>(null);

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSuccessfulAuth = async (
    userEmail: string,
    role: "STUDENT" | "ADMIN",
    isDemo = false,
    demoRole?: "student" | "admin"
  ) => {
    try {
      // 1. Call server auth endpoint to establish HTTP session cookie
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          password: loginPassword || "password123",
          isDemoStudent: demoRole === "student",
          isDemoAdmin: demoRole === "admin",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      // 2. Synchronize client storage
      if (demoRole === "student") {
        setDemoStudentSession();
      } else if (demoRole === "admin") {
        setDemoAdminSession();
      } else {
        authenticateUser(userEmail, loginPassword);
      }

      setSuccessMessage("Authentication successful! Entering AptiVerse workspace...");

      // 3. Redirect
      setTimeout(() => {
        let destination = returnTo;
        if (role === "ADMIN" && destination === "/dashboard") {
          destination = "/admin";
        }
        if (typeof window !== "undefined") {
          window.location.href = destination;
        } else {
          router.push(destination);
        }
      }, 300);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to establish authenticated session.");
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!loginEmail.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!loginPassword) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setActiveAction("submit");
    await handleSuccessfulAuth(loginEmail.trim().toLowerCase(), "STUDENT", false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!registerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!registerPassword || registerPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setActiveAction("submit");

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName.trim(),
          email: registerEmail.trim().toLowerCase(),
          password: registerPassword,
          targetExam,
          prepLevel,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Registration failed");
      }

      registerNewUser({
        name: registerName.trim(),
        email: registerEmail.trim().toLowerCase(),
        password: registerPassword,
        targetExam,
        prepLevel,
      });

      setSuccessMessage("Account created successfully! Preparing your custom workspace...");

      setTimeout(() => {
        const destination = returnTo && returnTo !== "/sign-in" ? returnTo : "/dashboard";
        if (typeof window !== "undefined") {
          window.location.href = destination;
        } else {
          router.push(destination);
        }
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to register account.");
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleDemoStudent = async () => {
    setIsLoading(true);
    setActiveAction("student");
    setErrorMessage("");
    await handleSuccessfulAuth("aman.sharma@aptiverse.ai", "STUDENT", true, "student");
  };

  const handleDemoAdmin = async () => {
    setIsLoading(true);
    setActiveAction("admin");
    setErrorMessage("");
    await handleSuccessfulAuth("admin@aptiverse.ai", "ADMIN", true, "admin");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetSuccess(false);
      setResetEmail("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10 selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Mesh Glow Backgrounds */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[650px] h-[450px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/3 w-[550px] h-[380px] bg-cyan-600/12 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Brand Bar */}
      <div className="max-w-6xl w-full mx-auto mb-6 flex items-center justify-between z-10">
        <Link href="/sign-in" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">AptiVerse</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 tracking-wider">
              PRO
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline">Official Exam Simulator OS</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side Presentation Banner (Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-6 pr-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Intelligent Management Entrance Preparation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Prepare Smarter. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                Score with Precision.
              </span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Sign in to unlock personalized adaptive drills, official section-locked mock tests, and deterministic diagnostic insights.
            </p>
          </div>

          {/* Supported Blueprint Tags */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Calibrated For 8+ Premier Blueprints
            </p>
            <div className="flex flex-wrap gap-2">
              {supportedExams.map((ex) => (
                <div
                  key={ex.id}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r ${ex.color} border backdrop-blur-md shadow-xs`}
                >
                  {ex.label}
                </div>
              ))}
            </div>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold text-white">Zero Answer Leakage</span>
              </div>
              <p className="text-[11px] text-slate-400">Verified server-side telemetry validation</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-indigo-400">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-bold text-white">Adaptive Remediation</span>
              </div>
              <p className="text-[11px] text-slate-400">AI pinpointing accuracy traps & speed bottlenecks</p>
            </div>
          </div>
        </div>

        {/* Right Side: Elevated Interactive Auth Portal Card */}
        <div className="lg:col-span-6 w-full max-w-lg mx-auto">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/30 relative">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signin");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authMode === "signin"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authMode === "signup"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("demo");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  authMode === "demo"
                    ? "bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md"
                    : "text-amber-400/90 hover:text-amber-300"
                }`}
              >
                <Zap className="h-3 w-3" />
                <span>1-Click Demo</span>
              </button>
            </div>

            {/* Error / Success Notifications */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {authMode === "signin" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="aspirant@aptiverse.ai"
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Password</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 pr-11 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  id="btn-sign-in-submit"
                  type="submit"
                  variant="accent"
                  disabled={isLoading}
                  className="w-full h-12 text-sm font-bold gap-2 shadow-xl shadow-indigo-600/25 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl cursor-pointer transition-all duration-200"
                >
                  {isLoading && activeAction === "submit" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  <span>
                    {isLoading && activeAction === "submit" ? "Authenticating..." : "Sign In & Enter Dashboard"}
                  </span>
                </Button>

                {/* Quick test credentials hints */}
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                    <span>Quick Autofill Test Accounts:</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail("aman.sharma@aptiverse.ai");
                        setLoginPassword("password123");
                      }}
                      className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 text-left transition-all"
                    >
                      <p className="text-[11px] font-bold text-indigo-300 truncate">Aman (Student)</p>
                      <p className="text-[10px] text-slate-400 truncate">aman.sharma@aptiverse.ai</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail("admin@aptiverse.ai");
                        setLoginPassword("admin123");
                      }}
                      className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 text-left transition-all"
                    >
                      <p className="text-[11px] font-bold text-amber-300 truncate">Dr. Rajesh (Admin)</p>
                      <p className="text-[10px] text-slate-400 truncate">admin@aptiverse.ai</p>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER / SIGN UP */}
            {authMode === "signup" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Aman Sharma"
                      className="w-full h-10 px-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="aspirant@gmail.com"
                      className="w-full h-10 px-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Create Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full h-10 px-3 pr-10 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showRegisterPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                {/* Target Exam selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Primary Target Exam</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "cat", label: "CAT 2026" },
                      { id: "xat", label: "XAT 2026" },
                      { id: "gmat", label: "GMAT 2026" },
                      { id: "snap", label: "SNAP 2026" },
                      { id: "nmat", label: "NMAT 2026" },
                      { id: "cmat", label: "CMAT 2026" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTargetExam(item.id)}
                        className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                          targetExam === item.id
                            ? "bg-indigo-600/30 border-indigo-500 text-indigo-200"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prep stage */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Preparation Stage</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setPrepLevel(lvl)}
                        className={`py-1.5 rounded-xl text-center border text-xs font-semibold transition-all ${
                          prepLevel === lvl
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-200"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={isLoading}
                  className="w-full h-11 text-sm font-bold gap-2 shadow-xl shadow-indigo-600/25 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl mt-2 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  <span>{isLoading ? "Creating Account..." : "Create Account & Start Preparing"}</span>
                </Button>
              </form>
            )}

            {/* TAB 3: INSTANT 1-CLICK DEMO */}
            {authMode === "demo" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Student Aspirant Profile</h3>
                      <p className="text-[11px] text-slate-400">CAT 2026 candidate with 12-day streak & diagnostic drills</p>
                    </div>
                  </div>
                  <Button
                    id="btn-demo-student-hero"
                    type="button"
                    onClick={handleDemoStudent}
                    disabled={isLoading}
                    className="w-full h-11 text-xs font-bold gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20"
                  >
                    {isLoading && activeAction === "student" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UserCheck className="h-4 w-4" />
                    )}
                    <span>{isLoading && activeAction === "student" ? "Entering as Student..." : "Launch Student Workspace"}</span>
                  </Button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Academic Lead / Admin Profile</h3>
                      <p className="text-[11px] text-slate-400">Curriculum reviewer with question publishing & audit tools</p>
                    </div>
                  </div>
                  <Button
                    id="btn-demo-admin-hero"
                    type="button"
                    onClick={handleDemoAdmin}
                    disabled={isLoading}
                    className="w-full h-11 text-xs font-bold gap-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-600/20"
                  >
                    {isLoading && activeAction === "admin" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-4 w-4" />
                    )}
                    <span>{isLoading && activeAction === "admin" ? "Entering as Admin..." : "Launch Admin Console"}</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="sm:max-w-md bg-slate-900/95 border-slate-800 text-white backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-400" />
              <span>Password Recovery</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Enter your registered email. We will send you an instant reset verification link.
            </DialogDescription>
          </DialogHeader>

          {resetSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-emerald-300">Reset email sent!</p>
              <p className="text-xs text-slate-400">
                Please check your inbox at <span className="text-white font-mono">{resetEmail}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Registered Email</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForgotModal(false)}
                  className="border-slate-700 text-slate-300"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm">
                  Send Recovery Link
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060911] flex items-center justify-center text-slate-400 text-sm">
          Loading AptiVerse Gateway...
        </div>
      }
    >
      <AuthGateway />
    </Suspense>
  );
}
