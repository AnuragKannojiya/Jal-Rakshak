import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useGetComplaint, useUpdateComplaint } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, MapPin, Clock, FileText, Camera, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetComplaintQueryKey } from "@workspace/api-client-react";

const updateSchema = z.object({
  status: z.enum(["submitted", "under_review", "assigned", "in_progress", "resolved", "rejected"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  adminRemark: z.string().optional(),
  resolvedImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function AdminComplaintDetail() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/admin/complaints/:id");
  const id = match && params?.id ? parseInt(params.id) : 0;
  const queryClient = useQueryClient();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data: complaint, isLoading } = useGetComplaint(id, {
    query: { enabled: !!id, queryKey: getGetComplaintQueryKey(id) }
  });

  const updateMutation = useUpdateComplaint();

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      status: "submitted",
      priority: "low",
      adminRemark: "",
      resolvedImage: "",
    }
  });

  useEffect(() => {
    if (complaint) {
      form.reset({
        status: complaint.status as any,
        priority: complaint.priority as any,
        adminRemark: complaint.adminRemark || "",
        resolvedImage: complaint.resolvedImage || "",
      });
    }
  }, [complaint, form]);

  const onSubmit = (values: z.infer<typeof updateSchema>) => {
    const dataToSubmit = {
      ...values,
      resolvedImage: values.resolvedImage || undefined,
      adminRemark: values.adminRemark || undefined,
    };
    
    updateMutation.mutate({ id, data: dataToSubmit }, {
      onSuccess: () => {
        toast({ title: "Complaint updated successfully" });
        queryClient.invalidateQueries({ queryKey: getGetComplaintQueryKey(id) });
      },
      onError: (err) => {
        toast({ title: "Update failed", description: "Operation failed", variant: "destructive" });
      }
    });
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!complaint) return <div className="p-8 text-center text-red-500">Complaint not found</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/complaints"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Resolve Complaint #{id}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-slate-100/50 pb-4 border-b">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{complaint.complaintTitle}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{complaint.issueType}</Badge>
                  <Badge className="bg-slate-800">Severity: {complaint.severityScore}/10</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded border text-sm">{complaint.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Area</h4>
                    <p className="text-sm font-medium">{complaint.area}</p>
                    <p className="text-xs text-slate-600 mt-1 truncate" title={complaint.address}>{complaint.address}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Reported By</h4>
                    <p className="text-sm font-medium">{complaint.userName}</p>
                    <p className="text-xs text-slate-600 mt-1">{new Date(complaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {complaint.imageUrl && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Camera className="h-3 w-3" /> Citizen Evidence</h4>
                    <div className="mt-1 rounded overflow-hidden border">
                      <a href={complaint.imageUrl} target="_blank" rel="noreferrer">
                        <img src={complaint.imageUrl} alt="Evidence" className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {complaint.feedback && (
              <Card className="border-green-200 bg-green-50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-800">Citizen Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-yellow-500">★ {complaint.feedback.rating}/5</span>
                  </div>
                  {complaint.feedback.comment && <p className="text-sm text-green-900 italic">"{complaint.feedback.comment}"</p>}
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="shadow-sm border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-100 pb-4">
                <CardTitle className="text-lg text-blue-900">Official Authority Action</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Workflow Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="submitted">Under Review</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="adminRemark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official Remark / Resolution Note</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Notes visible to the citizen..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>Explain what is being done or has been done.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("status") === "resolved" && (
                      <FormField
                        control={form.control}
                        name="resolvedImage"
                        render={({ field }) => (
                          <FormItem className="animate-in fade-in slide-in-from-top-4">
                            <FormLabel>Resolution Proof Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Updating...</> : "Save Official Update"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}