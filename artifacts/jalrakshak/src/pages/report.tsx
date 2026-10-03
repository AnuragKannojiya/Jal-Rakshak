import { useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateComplaint, useListAreas } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, Loader2, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const issueTypes = [
  "Contaminated Water / Discoloration",
  "Sewage Mixing",
  "No Water Supply",
  "Low Pressure",
  "Broken Pipe / Leakage",
  "Illegal Connection",
  "Other"
];

const formSchema = z.object({
  complaintTitle: z.string().min(5, "Title must be at least 5 characters"),
  issueType: z.string().min(1, "Please select an issue type"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
  address: z.string().min(5, "Please provide a complete address"),
  area: z.string().min(1, "Please select an area"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

export default function ReportIssue() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const createComplaintMutation = useCreateComplaint();
  const { data: areasData } = useListAreas();
  const [gettingLocation, setGettingLocation] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaintTitle: "",
      issueType: "",
      description: "",
      address: "",
      area: user?.area || "",
      imageUrl: "",
      urgency: "medium",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert empty string to undefined for imageUrl to match API expectation
    const submissionData = {
      ...values,
      imageUrl: values.imageUrl || undefined,
    };
    
    createComplaintMutation.mutate({ data: submissionData }, {
      onSuccess: (data) => {
        toast({ title: "Issue reported successfully", description: "Your complaint has been registered and assigned tracking ID #" + data.id });
        setLocation("/complaints");
      },
      onError: () => {
        toast({
          title: "Failed to report issue",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleGetLocation = () => {
    setGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          toast({ title: "Location captured successfully" });
          setGettingLocation(false);
        },
        (error) => {
          toast({ title: "Could not get location", description: error.message, variant: "destructive" });
          setGettingLocation(false);
        }
      );
    } else {
      toast({ title: "Geolocation not supported", variant: "destructive" });
      setGettingLocation(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FilePlus2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-display">Report an Issue</CardTitle>
          </div>
          <CardDescription className="text-base">
            Submit details about the water issue you're facing. Our AI system will analyze the severity and route it to the appropriate authorities.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {issueTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perceived Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low (Minor inconvenience)</SelectItem>
                          <SelectItem value="medium">Medium (Requires attention soon)</SelectItem>
                          <SelectItem value="high">High (Health risk or major leak)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="complaintTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Yellow water from kitchen tap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe what you observed, when it started, and any other relevant details..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone / Area</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select affected area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {areasData?.map((area) => (
                            <SelectItem key={area.id} value={area.areaName}>
                              {area.areaName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exact Address</FormLabel>
                      <FormControl>
                        <Input placeholder="House/Building no., Street name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium text-slate-800 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> Location Data (Optional)
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">Providing exact GPS coordinates helps authorities locate the issue faster.</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleGetLocation}
                    disabled={gettingLocation}
                  >
                    {gettingLocation ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <MapPin className="h-4 w-4 mr-2" />}
                    {form.watch("latitude") ? "Update Location" : "Capture Location"}
                  </Button>
                </div>
                {form.watch("latitude") && form.watch("longitude") && (
                  <div className="mt-3 text-xs font-mono bg-slate-200 text-slate-700 px-3 py-2 rounded inline-block">
                    {form.watch("latitude")?.toFixed(6)}, {form.watch("longitude")?.toFixed(6)}
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>Link to an image showing the issue</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setLocation("/dashboard")}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={createComplaintMutation.isPending}>
                  {createComplaintMutation.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : "Submit Report"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}