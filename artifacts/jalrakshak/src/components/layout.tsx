import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, X, LayoutDashboard, Map as MapIcon, AlertTriangle, ShieldAlert, FileText, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout: clearAuth } = useAuth();
  const [location, setLocation] = useLocation();
  const logoutMutation = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location === "/";

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();
        setLocation("/login");
        toast({ title: "Logged out successfully" });
      },
      onError: () => {
        clearAuth();
        setLocation("/login");
      }
    });
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/map", label: "Map View", icon: MapIcon },
    { href: "/complaints", label: "My Reports", icon: FileText },
    { href: "/water-status", label: "Water Status", icon: Droplets },
    { href: "/alerts", label: "Alerts", icon: AlertTriangle },
    { href: "/safety-tips", label: "Safety Tips", icon: ShieldAlert },
  ];

  return (
    <div className={`min-h-[100dvh] flex flex-col ${isHome ? "bg-[#081827]" : "bg-[#F3FAFC]"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 w-full border-b transition-colors ${isHome ? "border-[#7EE2E7]/15 bg-[#081827]/88 shadow-[0_10px_30px_rgba(2,12,22,0.12)] backdrop-blur-xl" : "border-[#CFE0E4] bg-[#F3FAFC]/90 shadow-sm backdrop-blur-xl"}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" data-testid="link-brand-home" className="group flex items-center gap-2.5 rounded-md">
              <div className={`${isHome ? "bg-[#00D5E8] text-[#06202B] group-hover:bg-[#7EE2E7]" : "bg-primary text-primary-foreground group-hover:bg-secondary"} rounded-lg p-1.5 transition-colors`}>
                <Droplets className="h-5 w-5" />
              </div>
              <span className={`font-display text-xl font-bold tracking-tight ${isHome ? "text-[#F1FCFC]" : "text-primary"}`}>JalRakshak</span>
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Primary navigation" className="ml-6 hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(" ", "-")}`} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${location === item.href ? (isHome ? "bg-[#00D5E8]/[0.12] text-[#BDF4F4]" : "bg-primary/5 text-primary") : (isHome ? "text-[#91B1B8] hover:bg-white/[0.07] hover:text-[#F1FCFC]" : "text-slate-600 hover:bg-primary/[0.06] hover:text-primary")}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
              <Button asChild variant="secondary" data-testid="button-header-report" className={`hidden font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 md:flex ${isHome ? "bg-[#00D5E8] text-[#06202B] hover:bg-[#7EE2E7]" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}>
               <Link href="/report">Report issue</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" data-testid="button-account-menu" aria-label="Open account menu" className={`relative h-9 w-9 rounded-full ${isHome ? "hover:bg-white/10" : ""}`}>
                    <Avatar className={`h-9 w-9 border ${isHome ? "border-white/20" : "border-slate-200"}`}>
                      <AvatarFallback className={`${isHome ? "bg-[#00B4D8]/20 text-[#7DD3FC]" : "bg-primary/10 text-primary"} font-bold`}>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer w-full flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Portal</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <div className="hidden items-center gap-2 md:flex">
                 <Button asChild variant="ghost" data-testid="button-header-login" className={isHome ? "text-[#C6E1E4] hover:bg-white/10 hover:text-white" : ""}>
                   <Link href="/login">Log in</Link>
                </Button>
                 <Button asChild data-testid="button-header-signup" className={isHome ? "bg-[#B9E864] font-semibold text-[#09202A] hover:bg-[#D6F59C]" : ""}>
                   <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} className={`md:hidden ${isHome ? "text-[#E7FAFA] hover:bg-white/10" : ""}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 top-16 z-30 border-t md:hidden ${isHome ? "border-[#7EE2E7]/15 bg-[#081827]/98 backdrop-blur-xl" : "border-[#CFE0E4] bg-[#F3FAFC]"}`}>
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                 data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                 className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium ${location === item.href ? (isHome ? "bg-[#00D5E8]/[0.12] text-[#BDF4F4]" : "bg-primary/10 text-primary") : (isHome ? "text-[#B5D2D6] hover:bg-white/[0.07] hover:text-white" : "text-slate-700 hover:bg-primary/[0.05]")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              <Button asChild data-testid="button-mobile-report" className={`w-full ${isHome ? "bg-[#00D5E8] text-[#06202B] hover:bg-[#7EE2E7]" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}>
                 <Link href="/report" onClick={() => setIsMobileMenuOpen(false)}>Report issue</Link>
              </Button>
              {!user && (
                <>
                   <Button asChild variant="outline" data-testid="button-mobile-login" className={`w-full ${isHome ? "border-[#7EE2E7]/30 bg-transparent text-[#E7FAFA] hover:bg-white/10 hover:text-white" : ""}`}>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                   <Button asChild data-testid="button-mobile-signup" className={`w-full ${isHome ? "bg-[#B9E864] text-[#09202A] hover:bg-[#D6F59C]" : ""}`}>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${isHome ? "border-t border-[#7EE2E7]/15 bg-[#06131F]" : "bg-primary text-primary-foreground"} mt-auto py-12`}>
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Droplets className={`h-6 w-6 ${isHome ? "text-[#00D5E8]" : "text-secondary"}`} />
              <span className="font-display font-bold text-xl tracking-tight">JalRakshak</span>
            </div>
             <p className={`max-w-sm text-sm ${isHome ? "text-[#87A8B0]" : "text-slate-300"}`}>
              The government-grade civic tech platform for reporting and resolving water quality issues across India. Clean water is a right, not a privilege.
            </p>
          </div>
          <div>
             <h4 className="mb-4 font-bold text-white">Quick links</h4>
             <ul className={`space-y-2 text-sm ${isHome ? "text-[#87A8B0]" : "text-slate-300"}`}>
               <li><Link href="/report" className={`transition-colors ${isHome ? "hover:text-[#B9E864]" : "hover:text-secondary"}`}>Report an issue</Link></li>
               <li><Link href="/map" className={`transition-colors ${isHome ? "hover:text-[#B9E864]" : "hover:text-secondary"}`}>Live map</Link></li>
               <li><Link href="/water-status" className={`transition-colors ${isHome ? "hover:text-[#B9E864]" : "hover:text-secondary"}`}>Area status</Link></li>
               <li><Link href="/safety-tips" className={`transition-colors ${isHome ? "hover:text-[#B9E864]" : "hover:text-secondary"}`}>Safety tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact Authority</h4>
             <ul className={`space-y-2 text-sm ${isHome ? "text-[#87A8B0]" : "text-slate-300"}`}>
              <li>Emergency Helpline: 1916</li>
              <li>Email: support@jalrakshak.gov.in</li>
              <li>Working Hours: 24/7</li>
            </ul>
          </div>
        </div>
        <div className={`container mx-auto mt-8 flex flex-col items-center justify-between border-t px-4 pt-8 text-sm md:flex-row ${isHome ? "border-[#7EE2E7]/10 text-[#668992]" : "border-slate-700/50 text-slate-400"}`}>
          <p>© {new Date().getFullYear()} JalRakshak Initiative. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}