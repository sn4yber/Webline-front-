"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { SolicitudActivacion } from "@/types/admin.types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardList, CheckCircle2, Clock, XCircle, CheckCheck, Copy, Check, RotateCw, Smartphone, Send } from "lucide-react";

const BLUE = "#0033cc";
const GREEN = "#16a34a";
const AMBER = "#d97706";
const RED = "#dc2626";

const STATUS_MAP = {
  PENDIENTE: { label: "Pendiente", color: AMBER, icon: Clock },
  APROBADA: { label: "Aprobada", color: GREEN, icon: CheckCircle2 },
  RECHAZADA: { label: "Rechazada", color: RED, icon: XCircle },
};

type FilterType = "TODOS" | "PENDIENTE" | "APROBADA";

export default function RequestsPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudActivacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("TODOS");
  const [approving, setApproving] = useState<string | null>(null);

  // Activation Modal & Invitations State
  const [invitacionesMap, setInvitacionesMap] = useState<Record<string, string>>({});
  const [approvedData, setApprovedData] = useState<{
    solicitudId?: string;
    negocioId?: string;
    invitacionId?: string;
    tokenInvitacion?: string;
    codigoActivacion: string;
    codigoActivacionExpiraEn?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [rotando, setRotando] = useState<string | null>(null);

  const fetchSolicitudes = () => {
    setLoading(true);
    apiClient
      .get<SolicitudActivacion[]>(endpoints.admin.solicitudes.listar)
      .then((data) => setSolicitudes(data.filter((s) => s.estado !== "RECHAZADA")))
      .catch(() => setError("Error al cargar las solicitudes."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;
    apiClient
      .get<SolicitudActivacion[]>(endpoints.admin.solicitudes.listar)
      .then((data) => {
        if (active) setSolicitudes(data.filter((s) => s.estado !== "RECHAZADA"));
      })
      .catch(() => {
        if (active) setError("Error al cargar las solicitudes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleAprobar = async (id: string) => {
    setApproving(id);
    try {
      const res = await apiClient.post<any>(endpoints.admin.solicitudes.aprobar(id), {});
      fetchSolicitudes();

      const invId = res?.invitacionId || res?.id;
      if (invId) {
        setInvitacionesMap((prev) => ({ ...prev, [id]: invId }));
      }

      setApprovedData({
        solicitudId: id,
        negocioId: res?.negocioId,
        invitacionId: invId,
        tokenInvitacion: res?.tokenInvitacion,
        codigoActivacion: res?.codigoActivacion || "ABCD1234",
        codigoActivacionExpiraEn: res?.codigoActivacionExpiraEn,
      });
    } catch (err: any) {
      alert(err?.message || "No se pudo aprobar la solicitud.");
    } finally {
      setApproving(null);
    }
  };

  const handleRotarCodigo = async (solicitudId: string, customInvitacionId?: string) => {
    const invId = customInvitacionId || invitacionesMap[solicitudId];
    if (!invId) {
      alert("Para rotar un código de activación se requiere el ID de la invitación generada al aprobar. Por favor aprueba una nueva solicitud para obtener su código.");
      return;
    }
    setRotando(solicitudId);
    try {
      const res = await apiClient.post<any>(endpoints.admin.invitaciones.rotarCodigo(invId), {});
      const newCode = res?.codigoActivacion || "NUEVO8CH";
      setApprovedData({
        solicitudId,
        invitacionId: res?.invitacionId || invId,
        codigoActivacion: newCode,
        codigoActivacionExpiraEn: res?.codigoActivacionExpiraEn,
      });
    } catch (err: any) {
      alert(err?.message || "No se pudo rotar el código de activación.");
    } finally {
      setRotando(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [rejecting, setRejecting] = useState<string | null>(null);

  const handleRechazar = async (id: string) => {
    if (!confirm("¿Rechazar esta solicitud? Esta acción no se puede deshacer.")) return;
    setRejecting(id);
    try {
      await apiClient.post(endpoints.admin.solicitudes.rechazar(id), {});
      fetchSolicitudes();
    } catch {
      alert("No se pudo rechazar la solicitud.");
    } finally {
      setRejecting(null);
    }
  };

  const filtered = filter === "TODOS" ? solicitudes : solicitudes.filter((s) => s.estado === filter);
  const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE").length;

  const FILTERS: FilterType[] = ["TODOS", "PENDIENTE", "APROBADA"];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardList className="w-5 h-5" style={{ color: BLUE }} />
            Solicitudes de Activación
          </h1>
          <p className="text-xs text-white/35 font-mono mt-0.5">
            {loading ? "Cargando..." : `${pendientes} pendientes · ${solicitudes.length} totales`}
          </p>
        </div>
        {pendientes > 0 && !loading && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest"
            style={{ background: `${AMBER}10`, color: AMBER, border: `1px solid ${AMBER}30` }}
          >
            <Clock className="w-3 h-3" />
            {pendientes} requieren atención
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 text-xs font-mono" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}>
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "TODOS" ? solicitudes.length : solicitudes.filter((s) => s.estado === f).length;
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
              {f === "TODOS" ? "Todos" : STATUS_MAP[f as keyof typeof STATUS_MAP].label}
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
                {["Negocio", "Propietario", "Email", "Tipo", "Fecha", "Estado", ""].map((h) => (
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
                    {[...Array(7)].map((_, j) => (
                      <TableCell key={j} className="py-3">
                        <Skeleton className="h-4 bg-white/5" style={{ width: j === 0 ? "120px" : j === 6 ? "60px" : "80px" }} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center text-xs text-white/25 font-mono">
                    No hay solicitudes en esta categoría
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => {
                  const { label, color, icon: Icon } = STATUS_MAP[s.estado];
                  const isPending = s.estado === "PENDIENTE";
                  return (
                    <TableRow
                      key={s.id}
                      className="transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <TableCell className="py-3 font-medium text-sm text-white">{s.nombreNegocio}</TableCell>
                      <TableCell className="py-3 text-sm text-white/60">{s.nombrePropietario}</TableCell>
                      <TableCell className="py-3 text-xs text-white/40 font-mono">{s.emailPropietario}</TableCell>
                      <TableCell className="py-3">
                        <code
                          className="text-[10px] font-mono tracking-widest px-2 py-0.5"
                          style={{ background: `${BLUE}15`, color: BLUE, border: `1px solid ${BLUE}25` }}
                        >
                          {s.tipoNegocio}
                        </code>
                      </TableCell>
                      <TableCell className="py-3 text-xs text-white/35 font-mono">
                        {new Date(s.creadoEn).toLocaleDateString("es-CO", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5" style={{ color }} />
                          <span className="text-xs font-medium" style={{ color }}>{label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        {isPending && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAprobar(s.id)}
                              disabled={approving === s.id || rejecting === s.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 disabled:opacity-40"
                              style={{
                                background: `${GREEN}15`,
                                color: GREEN,
                                border: `1px solid ${GREEN}35`,
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = `${GREEN}25`)}
                              onMouseLeave={(e) => (e.currentTarget.style.background = `${GREEN}15`)}
                            >
                              <CheckCheck className="w-3 h-3" />
                              {approving === s.id ? "..." : "Aprobar"}
                            </button>
                            <button
                              onClick={() => handleRechazar(s.id)}
                              disabled={approving === s.id || rejecting === s.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 disabled:opacity-40"
                              style={{
                                background: `${RED}15`,
                                color: RED,
                                border: `1px solid ${RED}35`,
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = `${RED}25`)}
                              onMouseLeave={(e) => (e.currentTarget.style.background = `${RED}15`)}
                            >
                              <XCircle className="w-3 h-3" />
                              {rejecting === s.id ? "..." : "Rechazar"}
                            </button>
                          </div>
                        )}

                        {!isPending && s.estado === "APROBADA" && (
                          <button
                            onClick={() => handleRotarCodigo(s.id, s.invitacionId || undefined)}
                            disabled={rotando === s.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 border cursor-pointer"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              color: "#fff",
                              borderColor: "rgba(255,255,255,0.1)",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                          >
                            <RotateCw className={`w-3 h-3 ${rotando === s.id ? "animate-spin" : ""}`} />
                            {rotando === s.id ? "..." : "Rotar Código"}
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Resultado Código de Activación */}
      {approvedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
          <div
            className="w-full max-w-lg p-6 space-y-5 border shadow-2xl relative"
            style={{ background: "#000", borderColor: "rgba(255,255,255,0.15)" }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5" style={{ color: GREEN }} />
                Código de Activación Móvil
              </h2>
              <button
                onClick={() => setApprovedData(null)}
                className="text-white/40 hover:text-white text-xs font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-center">
              <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono uppercase tracking-widest">
                ✓ Solicitud Aprobada Exitosamente
              </div>

              <p className="text-xs text-white/70 font-mono">
                Entrega este **código de 8 caracteres** al dueño del negocio para que se registre en la App Móvil de WebLine:
              </p>

              {/* Big Brutalist Code Box */}
              <div 
                className="p-5 border bg-white/[0.03] flex flex-col items-center justify-center space-y-2 relative"
                style={{ borderColor: BLUE }}
              >
                <span className="text-3xl font-mono font-black text-white tracking-[0.25em] select-all">
                  {approvedData.codigoActivacion}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                  ⏱️ Vence en 72 horas (Single-Use)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleCopyCode(approvedData.codigoActivacion)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer border"
                  style={{
                    background: copied ? GREEN : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    borderColor: copied ? GREEN : "rgba(255,255,255,0.15)",
                  }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "¡Copiado!" : "Copiar Código"}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `¡Hola! Tu solicitud en WebLine ha sido aprobada. Tu Código de Activación para registrarte en la App Móvil es: *${approvedData.codigoActivacion}* (Válido por 72 horas).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-bold text-white transition-all cursor-pointer"
                  style={{ background: "#25D366" }}
                >
                  <Send className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {approvedData.invitacionId && (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>¿Expiró o requiere renovarse?</span>
                  <button
                    onClick={() => handleRotarCodigo(approvedData.invitacionId!)}
                    disabled={rotando === approvedData.invitacionId}
                    className="text-white hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className={`w-3 h-3 ${rotando === approvedData.invitacionId ? "animate-spin" : ""}`} />
                    Rotar Código
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                onClick={() => setApprovedData(null)}
                className="px-5 py-2 text-xs font-mono uppercase tracking-widest text-white font-bold cursor-pointer"
                style={{ background: BLUE }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
