import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChapterDataProvider } from "@/contexts/ChapterDataContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Members from "./pages/Members";
import Schedule from "./pages/Schedule";
import KpiHallOfImpact from "./pages/KpiHallOfImpact";
import Contact from "./pages/Contact";
import MediaHub from "./pages/MediaHub";
import Register from "./pages/Register";
import MeetingRegister from "./pages/MeetingRegister";
import Referral from "./pages/Referral";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import PresidentReport from "./pages/dashboard/PresidentReport";
import VicePresidentReport from "./pages/dashboard/VicePresidentReport";
import SecretaryTrainingReport from "./pages/dashboard/SecretaryTrainingReport";
import EventsCommunicationsReport from "./pages/dashboard/EventsCommunicationsReport";
import VisitorsReport from "./pages/dashboard/VisitorsReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChapterDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/kpi-hall-of-impact" element={<KpiHallOfImpact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/media" element={<MediaHub />} />
            <Route path="/register" element={<Register />} />
            <Route path="/meeting-register" element={<MeetingRegister />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="president" element={<PresidentReport />} />
              <Route path="vice-president" element={<VicePresidentReport />} />
              <Route path="secretary-training" element={<SecretaryTrainingReport />} />
              <Route path="events-communications" element={<EventsCommunicationsReport />} />
              <Route path="visitors" element={<VisitorsReport />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ChapterDataProvider>
  </QueryClientProvider>
);

export default App;
