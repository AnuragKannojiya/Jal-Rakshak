import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import { setAuthTokenGetter } from "@workspace/api-client-react";

setAuthTokenGetter(() => localStorage.getItem("jalrakshak_token"));

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import ReportIssue from "@/pages/report";
import Complaints from "@/pages/complaints";
import ComplaintDetail from "@/pages/complaint-detail";
import MapView from "@/pages/map";
import WaterStatus from "@/pages/water-status";
import Alerts from "@/pages/alerts";
import SafetyTips from "@/pages/safety-tips";
import Feedback from "@/pages/feedback";

// Admin
import AdminDashboard from "@/pages/admin/dashboard";
import AdminComplaints from "@/pages/admin/complaints";
import AdminComplaintDetail from "@/pages/admin/complaint-detail";
import AdminAreas from "@/pages/admin/areas";
import AdminAlerts from "@/pages/admin/alerts";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminUsers from "@/pages/admin/users";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 15_000,
      refetchIntervalInBackground: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/report" component={ReportIssue} />
        <Route path="/complaints" component={Complaints} />
        <Route path="/complaints/:id" component={ComplaintDetail} />
        <Route path="/feedback/:id" component={Feedback} />
        <Route path="/map" component={MapView} />
        <Route path="/water-status" component={WaterStatus} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/safety-tips" component={SafetyTips} />
        
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/complaints" component={AdminComplaints} />
        <Route path="/admin/complaints/:id" component={AdminComplaintDetail} />
        <Route path="/admin/areas" component={AdminAreas} />
        <Route path="/admin/alerts" component={AdminAlerts} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/users" component={AdminUsers} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
