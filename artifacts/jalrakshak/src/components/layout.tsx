import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, X, User as UserIcon, LayoutDashboard, Map as MapIcon, AlertTriangle, ShieldAlert, HeartHandshake, FileText, Settings, LogOut } from "lucide-react";
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
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-1.5 rounded-md group-hover:bg-secondary transition-colors">
                <Droplets className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-primary">JalRakshak</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location === item.href ? "bg-primary/5 text-primary" : "text-slate-600 hover:text-primary hover:bg-slate-100"}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" className="hidden md:flex bg-secondary text-white hover:bg-secondary/90 shadow-sm font-semibold">
              <Link href="/report">Report Issue</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
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
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-white border-t">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${location === item.href ? "bg-primary/10 text-primary" : "text-slate-700"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white">
                <Link href="/report" onClick={() => setIsMobileMenuOpen(false)}>Report Issue</Link>
              </Button>
              {!user && (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
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
      <footer className="bg-primary text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6 text-secondary" />
              <span className="font-display font-bold text-xl tracking-tight">JalRakshak</span>
            </div>
            <p className="text-slate-300 text-sm max-w-sm">
              The government-grade civic tech platform for reporting and resolving water quality issues across India. Clean water is a right, not a privilege.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/report" className="hover:text-secondary transition-colors">Report an Issue</Link></li>
              <li><Link href="/map" className="hover:text-secondary transition-colors">Live Map</Link></li>
              <li><Link href="/water-status" className="hover:text-secondary transition-colors">Area Status</Link></li>
              <li><Link href="/safety-tips" className="hover:text-secondary transition-colors">Safety Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact Authority</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Emergency Helpline: 1916</li>
              <li>Email: support@jalrakshak.gov.in</li>
              <li>Working Hours: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-700/50 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center">
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