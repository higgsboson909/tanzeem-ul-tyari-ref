import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ChaiLeaderPage from "./pages/ChaiLeaderPage";
import QeemaHangoutPage from "./pages/QeemaHangoutPage";
import JoinUsPage from "./pages/JoinUsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chai-leader" element={<ChaiLeaderPage />} />
          <Route path="/qeema-hangout" element={<QeemaHangoutPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer */}
        <footer className="text-center py-8 mt-12">
          <p className="minecraft-text text-[8px] text-muted-foreground">
            TANZEEM-UL-TYARI
          </p>
          <p className="minecraft-text text-[7px] text-muted-foreground mt-2">
            United by Panic | Est. 5th Semester Finals
          </p>
          <p className="islamic-text text-sm text-accent mt-3">
            "We survived, somehow."
          </p>
        </footer>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
