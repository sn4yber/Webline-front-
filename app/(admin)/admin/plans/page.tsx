"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Plan } from "@/types/admin.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  FlaskConical,
  Globe,
  EyeOff,
} from "lucide-react";

const BLUE = "#0033cc";
const GREEN = "#16a34a";
const AMBER = "#d97706";

function PlanCard({ plan }: { plan: Plan }) {
  const isPrueba = plan.planPrueba;
  const isPublicado = plan.publicado;

  return (
    <Card
      className="border relative overflow-hidden"
      style={{
        background: "#000",
        borderColor: isPrueba ? `${AMBER}40` : "rgba(255,255,255,0.07)",
        boxShadow: isPrueba ? `0 0 20px ${AMBER}06` : "none",
      }}
    >
      {isPrueba && (
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: AMBER }} />
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <CardTitle className="text-base font-bold text-white">{plan.nombre}</CardTitle>
              {isPrueba && (
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest"
                  style={{ background: `${AMBER}15`, color: AMBER, border: `1px solid ${AMBER}30` }}
                >
                  <FlaskConical className="w-2.5 h-2.5" />
                  Prueba
                </div>
              )}
            </div>
            <code
              className="text-[10px] font-mono tracking-widest px-1.5 py-0.5"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
            >
              {plan.codigo}
            </code>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {/* Activo */}
            <div className="flex items-center gap-1">
              {plan.activo ? (
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: GREEN }} />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-500" />
              )}
              <span
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: plan.activo ? GREEN : "#f87171" }}
              >
                {plan.activo ? "Activo" : "Inactivo"}
              </span>
            </div>

            {/* Publicado */}
            <div className="flex items-center gap-1">
              {isPublicado ? (
                <Globe className="w-3 h-3 text-white/30" />
              ) : (
                <EyeOff className="w-3 h-3 text-white/20" />
              )}
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                {isPublicado ? "Publicado" : "Oculto"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Precio */}
        <div
          className="p-3 border"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mb-1">
            Precio · {plan.periodoFacturacion}
          </p>
          {plan.precio != null ? (
            <p className="text-2xl font-bold text-white">
              <span className="text-sm text-white/40 mr-1">{plan.moneda}</span>
              {plan.precio.toLocaleString("es-CO")}
            </p>
          ) : (
            <p className="text-lg font-bold" style={{ color: BLUE }}>
              A convenir
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white/35">Moneda</span>
            <span className="font-mono text-white/60">{plan.moneda}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/35">Facturación</span>
            <span className="font-mono text-white/60">{plan.periodoFacturacion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/35">Creado</span>
            <span className="font-mono text-white/40 text-[11px]">
              {new Date(plan.creadoEn).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PlansPage() {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Plan[]>(endpoints.admin.planes.listar)
      .then(setPlanes)
      .catch(() => setError("No se pudieron cargar los planes."))
      .finally(() => setLoading(false));
  }, []);

  const activos = planes.filter((p) => p.activo).length;
  const publicados = planes.filter((p) => p.publicado).length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div
        className="flex items-center justify-between border-b pb-5"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5" style={{ color: BLUE }} />
            Planes
          </h1>
          <p className="text-xs text-white/35 font-mono mt-0.5">
            {loading
              ? "Cargando..."
              : `${activos} activos · ${publicados} publicados · ${planes.length} totales`}
          </p>
        </div>
      </div>

      {error && (
        <div
          className="px-4 py-3 text-xs font-mono"
          style={{
            background: "rgba(220,38,38,0.08)",
            border: "1px solid rgba(220,38,38,0.3)",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? [...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="border"
                style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-2/3 bg-white/5" />
                  <Skeleton className="h-16 w-full bg-white/5" />
                  <Skeleton className="h-16 w-full bg-white/5" />
                </CardContent>
              </Card>
            ))
          : planes.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </div>
  );
}
