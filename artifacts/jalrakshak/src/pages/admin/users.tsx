import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useListUsers } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, User, Shield } from "lucide-react";

export default function AdminUsers() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data, isLoading } = useListUsers({ limit: 50 });

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Registered Citizens</h1>
            <p className="text-slate-500 text-sm">View platform users and their roles</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Loading users...</div>
            ) : data?.users && data.users.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.users.map(u => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{u.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{u.email}</div>
                          {u.phone && <div className="text-xs text-slate-500">{u.phone}</div>}
                        </TableCell>
                        <TableCell>
                          {u.area || <span className="text-slate-400 italic">Not specified</span>}
                        </TableCell>
                        <TableCell>
                          {u.role === "admin" ? (
                            <Badge className="bg-secondary text-white"><Shield className="h-3 w-3 mr-1" /> Admin</Badge>
                          ) : (
                            <Badge variant="outline" className="text-slate-600">Citizen</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">No users found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}