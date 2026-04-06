import { useRoute } from "wouter";
import { useGetComplaint, getGetComplaintQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, FileText, CheckCircle2, User, Camera, MessageSquare, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ComplaintDetail() {
  const [, params] = useRoute("/complaints/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: complaint, isLoading } = useGetComplaint(id, { 
    query: { enabled: !!id, queryKey: getGetComplaintQueryKey(id) } 
  });

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading details...</div>;
  }

  if (!complaint) {
    return <div className="container mx-auto p-8 text-center text-red-500">Complaint not found</div>;
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "resolved": return { color: "bg-green-100 text-green-800", label: "Resolved" };
      case "in_progress": return { color: "bg-blue-100 text-blue-800", label: "In Progress" };
      case "assigned": return { color: "bg-purple-100 text-purple-800", label: "Assigned to Team" };
      case "rejected": return { color: "bg-red-100 text-red-800", label: "Rejected" };
      default: return { color: "bg-slate-100 text-slate-800", label: "Under Review" };
    }
  };

  const statusInfo = getStatusInfo(complaint.status);
  
  // Create a timeline based on history
  const stages = ["submitted", "under_review", "assigned", "in_progress", "resolved"];
  const currentStageIndex = stages.indexOf(complaint.status);
  const isRejected = complaint.status === "rejected";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">{complaint.complaintTitle}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-medium">Ticket #{complaint.id}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Reported on {new Date(complaint.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full font-bold text-sm ${statusInfo.color}`}>
          {statusInfo.label}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-slate-800 whitespace-pre-wrap">{complaint.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</h4>
                  <p className="text-slate-800 font-medium">{complaint.area}</p>
                  <p className="text-slate-600 text-sm mt-1">{complaint.address}</p>
                  {complaint.latitude && complaint.longitude && (
                    <div className="mt-2 text-xs font-mono bg-slate-100 p-2 rounded inline-block">
                      GPS: {complaint.latitude}, {complaint.longitude}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Classification</h4>
                  <p className="text-slate-800 font-medium">{complaint.issueType}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Priority: {complaint.priority}</Badge>
                    <Badge variant="outline">Severity: {complaint.severityScore}/10</Badge>
                  </div>
                </div>
              </div>

              {complaint.imageUrl && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Camera className="h-4 w-4" /> Attached Evidence</h4>
                  <div className="mt-2 rounded-lg overflow-hidden border">
                    <img src={complaint.imageUrl} alt="Complaint evidence" className="w-full h-auto max-h-[400px] object-cover" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Remark if exists */}
          {complaint.adminRemark && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                  <MessageSquare className="h-5 w-5" /> Official Authority Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-900">{complaint.adminRemark}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Resolution Evidence if resolved */}
          {complaint.status === "resolved" && complaint.resolvedImage && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="h-5 w-5" /> Resolution Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-2 rounded-lg overflow-hidden border border-green-200">
                  <img src={complaint.resolvedImage} alt="Resolved issue" className="w-full h-auto max-h-[400px] object-cover" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b pb-4">
              <CardTitle className="text-lg">Status Tracking</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isRejected ? (
                <div className="text-center py-4">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                  <h3 className="font-bold text-red-700">Complaint Rejected</h3>
                  <p className="text-sm text-slate-600 mt-2">This issue could not be processed. Please check the official response for details.</p>
                </div>
              ) : (
                <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 ml-4">
                  {stages.map((stage, index) => {
                    const isCompleted = index <= currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    
                    let label = "";
                    switch (stage) {
                      case "submitted": label = "Report Submitted"; break;
                      case "under_review": label = "Under Review"; break;
                      case "assigned": label = "Assigned to Team"; break;
                      case "in_progress": label = "Work In Progress"; break;
                      case "resolved": label = "Issue Resolved"; break;
                    }

                    // Find history entry for this stage
                    const historyEntry = complaint.history?.find(h => h.newStatus === stage);
                    // Special case for submitted (use complaint creation time)
                    const timeString = stage === "submitted" 
                      ? new Date(complaint.createdAt).toLocaleString()
                      : (historyEntry ? new Date(historyEntry.timestamp).toLocaleString() : null);

                    return (
                      <div key={stage} className="relative">
                        <div className={`absolute -left-[31px] h-4 w-4 rounded-full border-2 bg-white ${
                          isCurrent ? "border-primary ring-4 ring-primary/20" : 
                          isCompleted ? "border-primary bg-primary" : "border-slate-300"
                        }`} />
                        <div>
                          <h4 className={`font-semibold ${isCompleted ? "text-slate-900" : "text-slate-400"}`}>{label}</h4>
                          {timeString && (
                            <p className="text-xs text-slate-500 mt-1">{timeString}</p>
                          )}
                          {historyEntry?.remark && (
                            <p className="text-sm text-slate-600 mt-1 italic">"{historyEntry.remark}"</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg text-slate-700">Reported By</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{complaint.userName || "Citizen"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}