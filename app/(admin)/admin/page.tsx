"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Plan, SolicitudActivacion } from "@/types/admin.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CreditCard,
  ClipboardList,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const BLUE = "#0033cc";
const GREEN = "#16a34a";
const AMBER = "#d97706";
const RED = "#dc2626";

const chartConfig = {
  solicitudes: { label: "Solicitudes", color: BLUE },
  aprobadas: { label: "Aprobadas", color: GREEN },
} satisfies ChartConfig;

function StatCard({
  title,
  value,
  icon: Icon,
  accent,
  loading,
  sub,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  accent: string;
  loading?: boolean;
  sub?: string;
}) {
  return (
    <Card
      className="border"
      style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-20 bg-white/5" />
            ) : (
              <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
            )}
            {sub && !loading && (
              <p className="text-[11px] text-white/30 mt-1.5 font-mono">{sub}</p>
            )}
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0 ml-3"
            style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SolicitudRow({ s }: { s: SolicitudActivacion }) {
  const stateMap = {
    PENDIENTE: { label: "Pendiente", color: AMBER, icon: Clock },
    APROBADA: { label: "Aprobada", color: GREEN, icon: CheckCircle2 },
    RECHAZADA: { label: "Rechazada", color: RED, icon: XCircle },
  };
  const { label, color, icon: Icon } = stateMap[s.estado];

  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-0"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{s.nombreNegocio}</p>
        <p className="text-[11px] text-white/35 font-mono mt-0.5">{s.emailPropietario}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        <span
          className="text-[10px] font-mono tracking-widest uppercase px-2 py-1"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {s.tipoNegocio}
        </span>
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" style={{ color }} />
          <span className="text-xs font-medium" style={{ color }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudActivacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get<Plan[]>(endpoints.admin.planes.listar),
      apiClient.get<SolicitudActivacion[]>(endpoints.admin.solicitudes.listar),
    ])
      .then(([p, s]) => {
        setPlanes(p);
        setSolicitudes(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE").length;
  const aprobadas = solicitudes.filter((s) => s.estado === "APROBADA").length;
  const rechazadas = solicitudes.filter((s) => s.estado === "RECHAZADA").length;
  const planesActivos = planes.filter((p) => p.activo).length;
  const planesPublicados = planes.filter((p) => p.publicado).length;

  // Chart data: solicitudes por plan
  const solicitudesPorPlan = [
    ...planes.map((p) => ({
      plan: p.codigo,
      total: solicitudes.filter((s) => s.planId === p.id).length,
      aprobadas: solicitudes.filter((s) => s.planId === p.id && s.estado === "APROBADA").length,
    })),
    {
      plan: "SIN PLAN",
      total: solicitudes.filter((s) => !s.planId).length,
      aprobadas: solicitudes.filter((s) => !s.planId && s.estado === "APROBADA").length,
    }
  ].filter(d => d.total > 0 || d.plan !== "SIN PLAN");

  // Pie data
  const pieData = [
    { name: "Pendientes", value: pendientes, color: AMBER },
    { name: "Aprobadas", value: aprobadas, color: GREEN },
    { name: "Rechazadas", value: rechazadas, color: RED },
  ].filter((d) => d.value > 0);

  const recentSolicitudes = [...solicitudes]
    .sort((a, b) => new Date(b.creadoEn || (b as any).fechaSolicitud || 0).getTime() - new Date(a.creadoEn || (a as any).fechaSolicitud || 0).getTime())
    .slice(0, 6);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Panel de <span style={{ color: BLUE }}>Administración</span>
          </h1>
          <p className="text-xs text-white/35 font-mono mt-0.5 tracking-wide">
            WebLine SAS — Vista general del sistema
          </p>
        </div>
        <div
          className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 flex items-center gap-2"
          style={{ background: `${GREEN}10`, color: GREEN, border: `1px solid ${GREEN}30` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />
          Sistema operativo
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Planes activos" value={loading ? "-" : planesActivos} icon={CreditCard} accent={BLUE} loading={loading} sub={`${planesPublicados} publicados · ${planes.length} totales`} />
        <StatCard title="Solicitudes pendientes" value={loading ? "-" : pendientes} icon={Clock} accent={AMBER} loading={loading} />
        <StatCard title="Negocios aprobados" value={loading ? "-" : aprobadas} icon={CheckCircle2} accent={GREEN} loading={loading} />
        <StatCard title="Total solicitudes" value={loading ? "-" : solicitudes.length} icon={ClipboardList} accent="#6366f1" loading={loading} />
      </div>

      {/* Charts + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart: solicitudes por plan */}
        <Card
          className="lg:col-span-2 border"
          style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <CardHeader className="pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: BLUE }} />
                Solicitudes por Plan
              </CardTitle>
              <Link
                href="/admin/requests"
                className="text-[10px] font-mono tracking-widest uppercase transition-colors"
                style={{ color: BLUE }}
              >
                Ver todas →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            {loading ? (
              <Skeleton className="h-44 w-full bg-white/5" />
            ) : solicitudesPorPlan.length === 0 ? (
              <div className="h-44 flex items-center justify-center text-xs text-white/25 font-mono">
                Sin datos disponibles
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-44 w-full">
                <BarChart data={solicitudesPorPlan} barGap={4}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="plan"
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent className="bg-[#000] border border-white/10 text-white rounded-none shadow-[4px_4px_0px_0px_#0033cc]" />} 
                    cursor={{ fill: "rgba(255,255,255,0.06)" }} 
                  />
                  <Bar dataKey="total" fill={BLUE} radius={[2, 2, 0, 0]} name="Total" />
                  <Bar dataKey="aprobadas" fill={GREEN} radius={[2, 2, 0, 0]} name="Aprobadas" />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Pie chart: estado de solicitudes */}
        <Card
          className="border"
          style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <CardHeader className="pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <CardTitle className="text-sm font-bold text-white tracking-tight">
              Estado de Solicitudes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <Skeleton className="h-44 w-full bg-white/5" />
            ) : pieData.length === 0 ? (
              <div className="h-44 flex items-center justify-center text-xs text-white/25 font-mono">
                Sin solicitudes
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ChartContainer config={chartConfig} className="h-36 w-full">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={64}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent className="bg-[#000] border border-white/10 text-white rounded-none shadow-[4px_4px_0px_0px_#0033cc]" hideLabel />} />
                  </PieChart>
                </ChartContainer>
                <div className="w-full space-y-1.5 mt-2">
                  {pieData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-white/50">{d.name}</span>
                      </div>
                      <span className="font-bold text-white tabular-nums">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent solicitudes */}
      <Card
        className="border"
        style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <CardHeader className="pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-white tracking-tight">
              Solicitudes Recientes
            </CardTitle>
            <Link
              href="/admin/requests"
              className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: BLUE }}
            >
              Gestionar →
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-3 pb-1">
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-white/5" />
              ))}
            </div>
          ) : recentSolicitudes.length === 0 ? (
            <div className="py-10 text-center text-xs text-white/25 font-mono">
              No hay solicitudes registradas
            </div>
          ) : (
            recentSolicitudes.map((s) => <SolicitudRow key={s.id} s={s} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
