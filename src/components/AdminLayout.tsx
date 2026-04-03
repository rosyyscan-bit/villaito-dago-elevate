import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Home, Bed, Image, Settings, FileText, HelpCircle, Star,
  DollarSign, Menu, LogOut, User, MapPin, Share2, LayoutDashboard, X
} from "lucide-react";
import logo from "@/assets/logo.png";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Homepage", icon: Home, path: "/admin/homepage" },
  { label: "Bedrooms", icon: Bed, path: "/admin/bedrooms" },
  { label: "Facilities", icon: Settings, path: "/admin/facilities" },
  { label: "Floor Plans", icon: Map, path: "/admin/floorplans" },
  { label: "Rates", icon: DollarSign, path: "/admin/rates" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Blog", icon: FileText, path: "/admin/blog" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
  { label: "Location", icon: MapPin, path: "/admin/location" },
  { label: "Social Media", icon: Share2, path: "/admin/social" },
  { label: "Navigation", icon: Menu, path: "/admin/navigation" },
  { label: "Account", icon: User, path: "/admin/account" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Villaito" className="h-8 w-8" />
              <span className="font-display text-sm font-bold gold-gradient-text">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground md:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            {sidebarItems.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`mb-1 flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center border-b border-border px-4 py-3 md:px-6">
          <button onClick={() => setSidebarOpen(true)} className="mr-4 text-foreground md:hidden">
            <Menu size={24} />
          </button>
          <h2 className="font-display text-lg font-semibold text-foreground">
            {sidebarItems.find((i) => i.path === location.pathname)?.label || "Admin"}
          </h2>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
