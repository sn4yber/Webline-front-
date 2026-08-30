"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Ban, CheckCircle } from "lucide-react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { Negocio } from "@/types/admin.types";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// Brutalist Colors
const BLUE = "#0033cc";
const GREEN = "#22c55e";
const RED = "#ef4444";
const AMBER = "#f59e0b";
const GRAY = "#4b5563";

const STATUS_MAP: Record<string, { label: string; color: string; icon: any }> = {
  ACTIVO: { label: "Activo", color: GREEN, icon: CheckCircle },
  SUSPENDIDO: { label: "Suspendido", color: AMBER, icon: Ban },
  INACTIVO: { label: "Inactivo", color: GRAY, icon: Ban },
};

type FilterType = "TODOS" | "ACTIVO" | "SUSPENDIDO" | "INACTIVO";

export default function AdminBusinessesPage() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("TODOS");
  const [changingState, setChangingState] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    slug: "",
    emailOwner: "",
    planCodigo: "STARTER",
  });

  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get<any>(endpoints.admin.negocios.listar);
      const arr = Array.isArray(data) ? data : (data?.content || data?.data || []);
      setNegocios(arr);
    } catch (err: any) {
      console.error("Error al cargar negocios:", err);
      setError(err.message || "Error al cargar la lista de negocios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    if (!confirm(`¿Estás seguro de cambiar el estado de este negocio?`)) return;
    setChangingState(id);
    try {
      const newState = currentStatus === "ACTIVO" ? "SUSPENDIDO" : "ACTIVO";
      await apiClient.patch(endpoints.admin.negocios.cambiarEstado(id), { estado: newState });
      fetchNegocios();
    } catch {
      alert("No se pudo actualizar el estado del negocio.");
    } finally {
      setChangingState(null);
    }
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Los negocios se crean automáticamente aprobando una Solicitud de Activación desde la sección 'Solicitudes'. Te redirigiremos allí.");
    setIsModalOpen(false);
    window.location.href = "/admin/requests";
  };

  const filtered = filter === "TODOS" ? negocios : negocios.filter((n) => n.estado === filter);
  const FILTERS: FilterType[] = ["TODOS", "ACTIVO", "SUSPENDIDO", "INACTIVO"];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5" style={{ color: BLUE }} />
            Negocios
          </h1>
          <p className="text-xs text-white/35 font-mono mt-0.5">
            {loading ? "Cargando..." : `${negocios.length} negocios registrados`}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-150 cursor-pointer"
          style={{ background: BLUE, color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#002bb3")}
          onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
        >
          <Plus className="w-4 h-4" />
          Crear Negocio
        </button>
      </div>

      {error && (
        <div className="px-4 py-3 text-xs font-mono" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}>
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "TODOS" ? negocios.length : negocios.filter((n) => n.estado === f).length;
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              style={{
                background: isActive ? BLUE : "rgba(255,255,255,0.04)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${isActive ? BLUE : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {f === "TODOS" ? "Todos" : STATUS_MAP[f]?.label || f}
              <span
                className="px-1 py-0.5 text-[9px]"
                style={{ background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <Card className="border" style={{ background: "#000", borderColor: "rgba(255,255,255,0.07)" }}>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {["ID", "Nombre", "Slug", "Fecha Creación", "Estado", "Acciones"].map((h) => (
                  <TableHead key={h} className="text-[10px] font-mono uppercase tracking-widest text-white/30 py-3">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i} style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j} className="py-3">
                        <Skeleton className="h-4 bg-white/5" style={{ width: j === 1 ? "150px" : "80px" }} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-xs text-white/25 font-mono">
                    No hay negocios para mostrar
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((n) => {
                  const statusInfo = STATUS_MAP[n.estado] || { label: n.estado, color: GRAY, icon: Ban };
                  const Icon = statusInfo.icon;
                  return (
                    <TableRow
                      key={n.id}
                      className="transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <TableCell className="py-3 text-xs text-white/40 font-mono">
                        {n.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="py-3 font-medium text-sm text-white">{n.nombre}</TableCell>
                      <TableCell className="py-3 text-sm text-white/60">
                        {n.slug ? (
                          <code className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded">/{n.slug}</code>
                        ) : (
                          <span className="text-white/20">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-xs text-white/35 font-mono">
                        {n.creadoEn ? new Date(n.creadoEn).toLocaleDateString("es-CO", {
                          day: "2-digit", month: "short", year: "numeric",
                        }) : "-"}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5" style={{ color: statusInfo.color }} />
                          <span className="text-xs font-medium" style={{ color: statusInfo.color }}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <button
                          onClick={() => handleToggleStatus(n.id, n.estado)}
                          disabled={changingState === n.id}
                          className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 disabled:opacity-40 cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        >
                          {changingState === n.id ? "..." : (n.estado === "ACTIVO" ? "Suspender" : "Activar")}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Crear Negocio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div 
            className="w-full max-w-md p-6 space-y-4 border shadow-2xl relative"
            style={{ background: "#000", borderColor: "rgba(255,255,255,0.15)" }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Building2 className="w-4 h-4" style={{ color: BLUE }} />
                Creación de Negocios
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <p className="text-white/70 leading-relaxed">
                En el flujo de WebLine, los negocios **no se crean de forma manual**, sino automáticamente al **Aprobar una Solicitud de Activación**.
              </p>
              
              <div className="p-3 bg-blue-950/20 border border-blue-500/20 text-blue-300 rounded-none space-y-1 text-[11px]">
                <p className="font-bold">💡 Flujo oficial de onboarding:</p>
                <ol className="list-decimal list-inside space-y-1 opacity-80">
                  <li>El cliente envía su solicitud de plan.</li>
                  <li>Tú la revisas en <strong>Solicitudes</strong>.</li>
                  <li>Al presionar <strong>"Aprobar"</strong>, el backend crea el negocio y genera las credenciales automáticamente.</li>
                </ol>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white cursor-pointer"
                >
                  Cerrar
                </button>
                <a
                  href="/admin/requests"
                  className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-white font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  style={{ background: BLUE }}
                >
                  Ir a Solicitudes →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
