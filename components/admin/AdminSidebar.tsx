"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  ClipboardList,
  Building2,
  Users,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Planes", href: "/admin/plans", icon: CreditCard },
  { label: "Solicitudes", href: "/admin/requests", icon: ClipboardList },
  { label: "Negocios", href: "/admin/businesses", icon: Building2 },
  { label: "Usuarios", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post(endpoints.auth.logout, {});
    } catch {
      // ignore
    } finally {
      router.push("/admin/login");
    }
  };

  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen border-r"
      style={{
        background: "#000",
        borderColor: "rgba(0,51,204,0.2)",
      }}
    >
      {/* Logo */}
      <div
        className="flex flex-col justify-center px-5 py-5 border-b"
        style={{ borderColor: "rgba(0,51,204,0.2)" }}
      >
        <Image 
          src="/images/wb3.png" 
          alt="WebLine Logo" 
          width={120} 
          height={40}
          className="object-contain w-auto h-8 mb-1 -ml-1"
          priority
        />
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: "#0033cc" }}
        >
          Admin Terminal
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon, disabled }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={disabled ? "#" : href}
              aria-disabled={disabled}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150 group ${
                disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
              }`}
              style={{
                background: active ? "rgba(0,51,204,0.15)" : "transparent",
                color: active ? "#ffffff" : "rgba(255,255,255,0.45)",
                borderLeft: active ? "2px solid #0033cc" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active && !disabled) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active && !disabled) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {disabled && (
                <span className="text-[9px] font-mono tracking-widest opacity-60">SOON</span>
              )}
              {active && <ChevronRight className="w-3 h-3 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-3 py-4 border-t"
        style={{ borderColor: "rgba(0,51,204,0.2)" }}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
