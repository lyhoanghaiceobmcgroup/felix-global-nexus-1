
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
