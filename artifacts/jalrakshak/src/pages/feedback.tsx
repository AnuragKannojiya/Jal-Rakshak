import { useRoute, useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSubmitFeedback, useGetComplaint, getGetComplaintQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  rating: z.number().min(1, "Please provide a rating").max(5),
  comment: z.string().optional(),
});

export default function Feedback() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/feedback/:id");
  const complaintId = match && params?.id ? parseInt(params.id) : 0;
  
  const { data: complaint, isLoading: complaintLoading } = useGetComplaint(complaintId, {
    query: { enabled: !!complaintId, queryKey: getGetComplaintQueryKey(complaintId) }
  });
  
  const submitFeedbackMutation = useSubmitFeedback();
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitFeedbackMutation.mutate({ 
      data: { 
        complaintId,
        rating: values.rating,
        comment: values.comment || undefined
      } 
    }, {
      onSuccess: () => {
        toast({ title: "Feedback submitted successfully. Thank you!" });
        setLocation(`/complaints/${complaintId}`);
      },
      onError: () => {
        toast({
          title: "Failed to submit feedback",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (!match) {
    setLocation("/dashboard");
    return null;
  }

  if (complaintLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!complaint || complaint.status !== "resolved") {
    return (
      <div className="container mx-auto p-8 text-center max-w-md">
        <Card>
          <CardContent className="pt-6 text-red-500">
            Cannot provide feedback for this complaint. It may not be resolved yet.
          </CardContent>
          <div className="pb-6">
            <Button onClick={() => setLocation("/complaints")}>Back to Complaints</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 text-center">
          <CardTitle className="text-2xl font-display">Rate Resolution</CardTitle>
          <CardDescription className="text-base">
            For issue: {complaint.complaintTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel className="text-lg">How satisfied are you with the resolution?</FormLabel>
                    <div className="flex justify-center gap-2 mt-4 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none transition-transform hover:scale-110"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => form.setValue("rating", star, { shouldValidate: true })}
                        >
                          <Star 
                            className={`h-10 w-10 ${
                              (hoveredRating || field.value) >= star 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-slate-300"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us what went well or what could be improved..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-between gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={() => setLocation(`/complaints/${complaintId}`)}>Cancel</Button>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitFeedbackMutation.isPending}>
                  {submitFeedbackMutation.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}