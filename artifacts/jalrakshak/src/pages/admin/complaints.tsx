import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useListComplaints, useUpdateComplaint, useListAreas } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Search, Filter, MoreHorizontal, MapPin, Eye, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getListComplaintsQueryKey } from "@workspace/api-client-react";

export default function AdminComplaints() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: areasData } = useListAreas();
  const { data: complaintsData, isLoading } = useListComplaints({
    status: statusFilter !== "all" ? statusFilter as any : undefined,
    priority: priorityFilter !== "all" ? priorityFilter as any : undefined,
    area: areaFilter !== "all" ? areaFilter : undefined,
  });

  const updateComplaintMutation = useUpdateComplaint();

  const complaints = complaintsData?.complaints || [];
  
  const filteredComplaints = complaints.filter(c => 
    c.complaintTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toString().includes(searchQuery)
  );

  const handleStatusUpdate = (id: number, newStatus: any) => {
    updateComplaintMutation.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => {
        toast({ title: `Complaint #${id} updated to ${newStatus}` });
        queryClient.invalidateQueries({ queryKey: getListComplaintsQueryKey() });
      },
      onError: (err) => {
        toast({ title: "Failed to update status", description: "Operation failed", variant: "destructive" });
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved": return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "assigned": return <Badge className="bg-purple-100 text-purple-800">Assigned</Badge>;
      case "rejected": return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline" className="text-slate-600">Review</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return <Badge variant="destructive">Critical</Badge>;
      case "high": return <Badge className="bg-orange-500">High</Badge>;
      case "medium": return <Badge className="bg-yellow-500 text-yellow-950">Med</Badge>;
      case "low": return <Badge className="bg-green-500">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Manage Complaints</h1>
            <p className="text-slate-500 text-sm">Review, assign, and update citizen reports</p>
          </div>
        </div>

        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search complaints..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Under Review</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {areasData?.map(area => (
                      <SelectItem key={area.id} value={area.areaName}>{area.areaName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Loading complaints...</div>
            ) : filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComplaints.map(complaint => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">#{complaint.id}</TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{complaint.complaintTitle}</div>
                          <div className="text-xs text-slate-500">{complaint.issueType}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-slate-700">
                            <MapPin className="h-3 w-3 text-slate-400" /> {complaint.area}
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                        <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/complaints/${complaint.id}`} className="cursor-pointer w-full flex items-center">
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel className="text-xs text-slate-500 font-medium">Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "assigned")}>
                                Mark Assigned
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "in_progress")}>
                                Mark In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "resolved")}>
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "rejected")} className="text-red-600">
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">No complaints found matching criteria.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}