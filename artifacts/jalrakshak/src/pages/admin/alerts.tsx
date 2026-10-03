import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useListAlerts, useCreateAlert, useUpdateAlert, useListAreas } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, AlertTriangle, Plus, CheckCircle, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const createAlertSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description needed"),
  area: z.string().min(1, "Select an area"),
  level: z.enum(["info", "warning", "danger", "critical"]),
});

export default function AdminAlerts() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data: alertsData, isLoading } = useListAlerts();
  const { data: areasData } = useListAreas();
  const createAlertMutation = useCreateAlert();
  const updateAlertMutation = useUpdateAlert();

  const alerts = alertsData || [];

  const form = useForm<z.infer<typeof createAlertSchema>>({
    resolver: zodResolver(createAlertSchema),
    defaultValues: {
      title: "",
      description: "",
      area: "",
      level: "warning",
    },
  });

  const onSubmit = (values: z.infer<typeof createAlertSchema>) => {
    createAlertMutation.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Alert broadcasted successfully" });
        setIsDialogOpen(false);
        form.reset();
        queryClient.invalidateQueries();
      },
      onError: (err) => {
        toast({ title: "Failed to create alert", description: "Operation failed", variant: "destructive" });
      }
    });
  };

  const resolveAlert = (id: number) => {
    updateAlertMutation.mutate({ id, data: { status: "resolved" } }, {
      onSuccess: () => {
        toast({ title: "Alert resolved" });
        queryClient.invalidateQueries();
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-display text-primary">Emergency Alerts</h1>
              <p className="text-slate-500 text-sm">Broadcast and manage community warnings</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-destructive hover:bg-destructive/90 text-white">
                <Plus className="h-4 w-4 mr-2" /> New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <ShieldAlert className="h-5 w-5" /> Broadcast New Alert
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alert Title</FormLabel>
                        <FormControl><Input placeholder="e.g. Boil Water Advisory" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Area</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {areasData?.map(a => <SelectItem key={a.id} value={a.areaName}>{a.areaName}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity Level</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="info">Info (Blue)</SelectItem>
                              <SelectItem value="warning">Warning (Yellow)</SelectItem>
                              <SelectItem value="danger">Danger (Orange)</SelectItem>
                              <SelectItem value="critical">Critical (Red)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message Content</FormLabel>
                        <FormControl><Textarea className="h-24" placeholder="Detailed instructions for citizens..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90" disabled={createAlertMutation.isPending}>
                    {createAlertMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Broadcast Immediately"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-500">Loading alerts...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4 text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Active Alerts
              </h3>
              <div className="space-y-4">
                {alerts.filter(a => a.status === "active").length === 0 && (
                  <p className="text-slate-500 italic p-4 bg-white rounded border border-dashed">No active alerts.</p>
                )}
                {alerts.filter(a => a.status === "active").map(alert => (
                  <Card key={alert.id} className="border-l-4 border-l-destructive shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{alert.title}</h4>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive">{alert.level}</Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-4">{alert.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-500">Area: <span className="font-medium text-slate-800">{alert.area}</span></div>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => resolveAlert(alert.id)}>
                          <CheckCircle className="mr-1 h-4 w-4" /> Mark Resolved
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-700 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Resolved History
              </h3>
              <div className="space-y-4 opacity-75">
                {alerts.filter(a => a.status === "resolved").map(alert => (
                  <Card key={alert.id} className="bg-slate-50 border-slate-200 shadow-none">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-700 strike-through line-through">{alert.title}</h4>
                        <Badge variant="outline" className="bg-slate-200 text-slate-600 border-none">Resolved</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Area: {alert.area}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}