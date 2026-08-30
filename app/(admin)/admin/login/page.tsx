"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

// Brand colors
const BLUE = "#0033cc";
const GREEN = "#16a34a";
const GREEN_LIGHT = "#22c55e";

export default function AdminLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusLine, setStatusLine] = useState("AWAITING CREDENTIALS");

  // Animated progress bar: 0 → 100 in real steps
  useEffect(() => {
    if (!isSuccess) return;

    const steps = [
      { pct: 18, msg: "Validando sesión..." },
      { pct: 42, msg: "Cargando permisos del sistema..." },
      { pct: 67, msg: "Sincronizando módulos..." },
      { pct: 88, msg: "Estableciendo canal seguro..." },
      { pct: 100, msg: "Acceso concedido — Bienvenido Sr. Sn4yber" },
    ];

    let i = 0;
    const tick = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i].pct);
        setStatusLine(steps[i].msg);
        i++;
      } else {
        clearInterval(tick);
        setTimeout(() => router.push("/admin"), 700);
      }
    }, 520);

    return () => clearInterval(tick);
  }, [isSuccess, router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await apiClient.post(endpoints.auth.login, { identifier, password });
      setIsSuccess(true);
    } catch {
      setError("Acceso denegado — credenciales inválidas.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-mono"
      style={{ background: "radial-gradient(ellipse at 55% 35%, #050d1f 0%, #030710 55%, #000 100%)" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,51,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,51,204,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Corner HUD labels */}
      <div className="absolute top-5 left-5 text-[10px] text-white/25 tracking-widest leading-5 pointer-events-none">
        <div>WEBLINE SAS // ADMIN TERMINAL</div>
        <div>v2.9.1 — ENCRYPTED SESSION</div>
      </div>
      <div className="absolute top-5 right-5 text-[10px] tracking-widest text-right leading-5 pointer-events-none text-white/25">
        <div>LAT 04.6097° N · LON 74.0817° W</div>
        <div style={{ color: isSuccess ? GREEN_LIGHT : BLUE }}>● {isSuccess ? "ACCESO CONCEDIDO" : "ONLINE"}</div>
      </div>
      <div className="absolute bottom-5 left-5 text-[10px] text-white/15 tracking-widest pointer-events-none">
        SYS.OVERRIDE_ENABLED // AES-256-GCM
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4"
        style={{
          background: "rgba(5,10,25,0.96)",
          border: `1px solid ${BLUE}40`,
          boxShadow: `0 0 0 1px ${BLUE}12, 0 32px 80px rgba(0,0,0,0.8), inset 0 1px 0 ${BLUE}20`,
        }}
      >
        {/* Top bar — azul sólido del brand */}
        <div className="h-[3px]" style={{ background: BLUE }} />

        <div className="p-7">
          {/* Logo + title */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 flex items-center justify-center flex-shrink-0"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}60` }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth={2}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: BLUE }}>
                WebLine SAS
              </p>
              <p className="text-[10px] text-white/30 tracking-widest">Panel de Control</p>
            </div>
          </div>

          <div className="mb-6 border-b border-white/[0.06] pb-5">
            <h1 className="text-xl font-bold text-white tracking-tight leading-snug">
              Autenticación de<br />
              <span style={{ color: BLUE }}>Administrador</span>
            </h1>
            <p className="text-[10px] text-white/30 tracking-widest uppercase mt-1">
              Acceso restringido — solo personal autorizado
            </p>
          </div>

          {/* ── SUCCESS STATE ── */}
          {isSuccess ? (
            <div className="space-y-5 py-2">
              {/* Check icon */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: `${GREEN}15`,
                    border: `2px solid ${GREEN}`,
                    boxShadow: `0 0 20px ${GREEN}40`,
                  }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={GREEN_LIGHT} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold tracking-widest uppercase" style={{ color: GREEN_LIGHT }}>
                    Identidad Verificada
                  </p>
                  <p className="text-[10px] text-white/35 tracking-widest uppercase mt-0.5">
                    Sr. Sn4yber — SUPER_ADMIN
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/40 tracking-wider truncate pr-2">
                    {statusLine}
                  </span>
                  <span
                    className="text-xs font-bold tabular-nums flex-shrink-0 transition-all duration-300"
                    style={{ color: GREEN_LIGHT }}
                  >
                    {progress}%
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GREEN}30` }}
                >
                  <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: GREEN,
                      boxShadow: `0 0 8px ${GREEN}80`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* ── FORM STATE ── */
            <>
              {error && (
                <div
                  className="mb-4 px-3 py-2.5 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2"
                  style={{ background: "rgba(209,0,0,0.08)", border: "1px solid rgba(209,0,0,0.35)", color: "#f87171" }}
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Identifier */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: BLUE }}>
                    Identificador
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="sn4yber"
                    autoComplete="username"
                    className="w-full text-sm text-white placeholder-white/20 outline-none transition-all duration-150"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${BLUE}30`,
                      padding: "10px 12px",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = `${BLUE}90`;
                      e.currentTarget.style.background = `${BLUE}08`;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = `${BLUE}30`;
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: BLUE }}>
                    Código de Acceso
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="w-full text-sm text-white placeholder-white/20 outline-none transition-all duration-150"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${BLUE}30`,
                        padding: "10px 40px 10px 12px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = `${BLUE}90`;
                        e.currentTarget.style.background = `${BLUE}08`;
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = `${BLUE}30`;
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-sm font-bold uppercase tracking-[0.18em] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: BLUE,
                      color: "#ffffff",
                      border: `1px solid ${BLUE}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) e.currentTarget.style.background = "#0028aa";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = BLUE;
                    }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                        </svg>
                        Verificando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Bottom accent — azul sólido */}
        <div className="h-[2px]" style={{ background: isSuccess ? GREEN : `${BLUE}60` }} />
      </div>
    </div>
  );
}
