"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Shield, Ban, CheckCircle } from "lucide-react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { Usuario } from "@/types/admin.types";
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
  BLOQUEADO: { label: "Bloqueado", color: RED, icon: Ban },
  INACTIVO: { label: "Inactivo", color: GRAY, icon: Ban },
};

type FilterType = "TODOS" | "ACTIVO" | "BLOQUEADO" | "INACTIVO";

export default function AdminUsersPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("TODOS");
  const [changingState, setChangingState] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      // NOTE: backend needs to support this endpoint correctly
      const data = await apiClient.get<any>(endpoints.admin.usuarios.listar);
      const arr = Array.isArray(data) ? data : (data?.content || data?.data || []);
      setUsuarios(arr);
    } catch (err: any) {
      console.error("Error al cargar usuarios:", err);
      setError(err.message || "Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    if (!confirm(`¿Estás seguro de cambiar el estado de este usuario?`)) return;
    setChangingState(id);
    try {
      // Assuming { estado: newState } payload based on standard patterns
      const newState = currentStatus === "ACTIVO" ? "BLOQUEADO" : "ACTIVO";
      await apiClient.patch(endpoints.admin.usuarios.cambiarEstado(id), { estado: newState });
      fetchUsuarios();
    } catch {
      alert("No se pudo actualizar el estado del usuario.");
    } finally {
      setChangingState(null);
    }
  };

  const filtered = filter === "TODOS" ? usuarios : usuarios.filter((u) => u.estado === filter);
  const FILTERS: FilterType[] = ["TODOS", "ACTIVO", "BLOQUEADO", "INACTIVO"];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: BLUE }} />
            Usuarios Globales
          </h1>
          <p className="text-xs text-white/35 font-mono mt-0.5">
            {loading ? "Cargando..." : `${usuarios.length} usuarios en el sistema`}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-150"
          style={{ background: BLUE, color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#002bb3")}
          onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
        >
          <Plus className="w-4 h-4" />
          Nuevo Usuario
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
          const count = f === "TODOS" ? usuarios.length : usuarios.filter((u) => u.estado === f).length;
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 flex items-center gap-1.5"
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
                {["ID", "Nombre", "Email", "Roles", "Estado", "Acciones"].map((h) => (
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
                        <Skeleton className="h-4 bg-white/5" style={{ width: j === 1 || j === 2 ? "140px" : "80px" }} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-xs text-white/25 font-mono">
                    No hay usuarios para mostrar
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => {
                  const statusInfo = STATUS_MAP[u.estado] || { label: u.estado, color: GRAY, icon: Ban };
                  const Icon = statusInfo.icon;
                  return (
                    <TableRow
                      key={u.id}
                      className="transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <TableCell className="py-3 text-xs text-white/40 font-mono">
                        {u.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="py-3 font-medium text-sm text-white">{u.nombre}</TableCell>
                      <TableCell className="py-3 text-xs text-white/60 font-mono">{u.email}</TableCell>
                      <TableCell className="py-3">
                        {u.roles && u.roles.length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {u.roles.map((r) => (
                              <code
                                key={r}
                                className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1"
                                style={{
                                  background: r.includes("ADMIN") ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)",
                                  color: r.includes("ADMIN") ? "#f87171" : "#fff",
                                  border: `1px solid ${r.includes("ADMIN") ? "rgba(220,38,38,0.25)" : "rgba(255,255,255,0.1)"}`,
                                }}
                              >
                                {r.includes("ADMIN") && <Shield className="w-2.5 h-2.5" />}
                                {r.replace("ROLE_", "")}
                              </code>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-white/20">-</span>
                        )}
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
                          onClick={() => handleToggleStatus(u.id, u.estado)}
                          disabled={changingState === u.id}
                          className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 disabled:opacity-40"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        >
                          {changingState === u.id ? "..." : (u.estado === "ACTIVO" ? "Bloquear" : "Activar")}
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
    </div>
  );
}
