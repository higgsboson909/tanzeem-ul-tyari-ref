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
        <footer className="max-w-4xl mx-auto px-4 py-8 mt-12 space-y-8">
          {/* The Leadership Council */}
          <div className="minecraft-border p-4 sm:p-6 md:p-8">
            <h2 className="minecraft-text text-[10px] sm:text-xs md:text-sm text-center mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-2 flex-wrap text-mc-light-green">
              🏆 THE LEADERSHIP COUNCIL 🏆
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Ghulam Mustafa', title: 'Leader & Founder', persona: 'Socialist Marxist Philosopher', icon: '👑' },
                { name: 'Mudassar Bhatti', title: 'The Big Dawg', persona: 'Masculine ex-leader; Red-pilled energy', icon: '💪' },
                { name: 'Ahsan Ilahi', title: 'The Genius', persona: 'The mind behind the madness', icon: '🧠' },
                { name: 'Jhangir Ahmed', title: 'Higgs Boson', persona: 'Group spokesperson', icon: '⚛️' },
                { name: 'Faizan Ali', title: 'The Manager', persona: 'Keeping the chaos organized', icon: '📋' },
              ].map((member) => (
                <div key={member.name} className="minecraft-border p-3 md:p-4 text-center space-y-1">
                  <span className="text-2xl">{member.icon}</span>
                  <p className="minecraft-text text-[8px] md:text-[9px] text-accent">{member.name}</p>
                  <p className="minecraft-text text-[7px] text-mc-light-green">{member.title}</p>
                  <p className="minecraft-text text-[6px] text-muted-foreground">{member.persona}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="minecraft-text text-[8px] text-muted-foreground">
              TANZEEM-UL-TYARI
            </p>
            <p className="minecraft-text text-[7px] text-muted-foreground">
              United by Panic | Est. 5th Semester Finals
            </p>
            <p className="minecraft-text text-[8px] text-accent mt-3">
              "We survived, somehow."
            </p>
          </div>
        </footer>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
