import { useState } from "react";
import { Link } from "wouter";
import { useListComplaints } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Complaints() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: complaintsData, isLoading } = useListComplaints({ 
    myOnly: true,
    status: statusFilter !== "all" ? statusFilter as any : undefined
  });

  const complaints = complaintsData?.complaints || [];
  
  const filteredComplaints = complaints.filter(c => 
    c.complaintTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toString().includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">Resolved</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1">In Progress</Badge>;
      case "assigned": return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-3 py-1">Assigned</Badge>;
      case "rejected": return <Badge variant="destructive" className="px-3 py-1">Rejected</Badge>;
      default: return <Badge variant="outline" className="text-slate-600 border-slate-300 px-3 py-1">Under Review</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return <Badge variant="destructive" className="bg-red-600">Critical</Badge>;
      case "high": return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
      case "medium": return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-yellow-950">Medium</Badge>;
      case "low": return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">My Reports</h1>
          <p className="text-slate-600">Track the status of your reported water issues</p>
        </div>
        <Button asChild>
          <Link href="/report">New Report</Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center bg-slate-50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by title, type, or ID..." 
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto ml-auto">
            <Filter className="h-4 w-4 text-slate-500 hidden md:block" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">Under Review</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-20 text-slate-500">Loading your reports...</div>
      ) : filteredComplaints.length > 0 ? (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="overflow-hidden hover:border-slate-300 transition-colors shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="p-5 md:w-3/4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">
                        <Link href={`/complaints/${complaint.id}`} className="hover:underline hover:text-secondary">
                          {complaint.complaintTitle}
                        </Link>
                      </h3>
                      <div className="md:hidden">
                        {getStatusBadge(complaint.status)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-slate-600 bg-slate-50">ID: #{complaint.id}</Badge>
                      <Badge variant="outline" className="text-slate-600 bg-slate-50">{complaint.issueType}</Badge>
                      {getPriorityBadge(complaint.priority)}
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {complaint.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {new Date(complaint.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {complaint.area}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-5 md:w-1/4 border-t md:border-t-0 md:border-l border-slate-100 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
                  <div className="hidden md:block">
                    {getStatusBadge(complaint.status)}
                  </div>
                  <Button variant="outline" className="w-full md:w-auto" asChild>
                    <Link href={`/complaints/${complaint.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-dashed">
          <div className="mx-auto bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-900 mb-2">No reports found</h3>
          <p className="text-slate-500 mb-6">
            {searchQuery || statusFilter !== 'all' 
              ? "Try adjusting your search or filters." 
              : "You haven't submitted any reports yet."}
          </p>
          {!(searchQuery || statusFilter !== 'all') && (
            <Button asChild>
              <Link href="/report">Report an Issue Now</Link>
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}