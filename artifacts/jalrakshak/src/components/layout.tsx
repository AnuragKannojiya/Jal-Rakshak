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
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Header — dark navy with teal accents */}
      <header className="sticky top-0 z-40 w-full border-b border-border" style={{ background: "rgba(12,26,46,0.92)", backdropFilter: "blur(16px)" }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-lg flex items-center justify-center transition-all" style={{ background: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.35)" }}>
                <Droplets className="h-5 w-5" style={{ color: "#00B4D8" }} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">JalRakshak</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={location === item.href ? { background: "rgba(0,180,216,0.12)", color: "#00B4D8" } : {}}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Government Civic Platform badge — from slide design */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.3)", color: "#7DD3FC" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00B4D8" }} />
              Government Civic Platform
            </div>

            <Button
              asChild
              className="hidden md:flex font-semibold text-sm"
              style={{ background: "#00B4D8", color: "#fff" }}
            >
              <Link href="/report">Report Issue</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9" style={{ border: "1px solid rgba(0,180,216,0.4)" }}>
                      <AvatarFallback className="font-bold text-sm" style={{ background: "rgba(0,180,216,0.15)", color: "#00B4D8" }}>
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
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="font-semibold" style={{ background: "#00B4D8", color: "#fff" }}>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 border-t border-border" style={{ background: "rgba(12,26,46,0.97)" }}>
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location === item.href ? "text-foreground" : "text-muted-foreground"
                }`}
                style={location === item.href ? { background: "rgba(0,180,216,0.12)", color: "#00B4D8" } : {}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <Button asChild className="w-full font-semibold" style={{ background: "#00B4D8", color: "#fff" }}>
                <Link href="/report" onClick={() => setIsMobileMenuOpen(false)}>Report Issue</Link>
              </Button>
              {!user && (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full" style={{ background: "#00B4D8", color: "#fff" }}>
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
      <footer className="py-12 mt-auto border-t border-border" style={{ background: "rgba(9,20,34,0.95)" }}>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.3)" }}>
                <Droplets className="h-5 w-5" style={{ color: "#00B4D8" }} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">JalRakshak</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              The government-grade civic tech platform for reporting and resolving water quality issues across India. Clean water is a right, not a privilege.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/report" className="hover:text-secondary transition-colors" style={{ "--tw-text-opacity": "1" } as React.CSSProperties}>Report an Issue</Link></li>
              <li><Link href="/map" className="hover:text-secondary transition-colors">Live Map</Link></li>
              <li><Link href="/water-status" className="hover:text-secondary transition-colors">Area Status</Link></li>
              <li><Link href="/safety-tips" className="hover:text-secondary transition-colors">Safety Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Contact Authority</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Emergency Helpline: <span className="text-secondary font-medium">1916</span></li>
              <li>Email: support@jalrakshak.gov.in</li>
              <li>Working Hours: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} JalRakshak Initiative. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
