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
            <h2 className="minecraft-text text-mc-small sm:text-xs md:text-sm text-center mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-2 flex-wrap text-mc-light-green">
              🏆 THE LEADERSHIP COUNCIL 🏆
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Ghulam Mustafa', title: 'Leader & Founder', persona: 'Socialist Marxist Philosopher', icon: '👑' },
                { name: 'Mudassar Bhatti', title: 'The Big Dawg', persona: 'Masculine ex-leader; Red-pilled energy', icon: '💪' },
                { name: 'Ahsan Ilahi', title: 'The Genius', persona: 'The mind behind the madness', icon: '🧠' },
                { name: 'Jhangir Ahmed', title: 'Higgs Boson', persona: 'Group spokesperson', icon: '⚛️' },
                { name: 'Faizan Ali', title: 'The Manager', persona: 'Keeping the chaos organized', icon: '📋' },
                { name: 'Usman Tariq', title: 'The Night Owl', persona: 'Studies only after midnight', icon: '🦉' },
                { name: 'Hamza Sheikh', title: 'The Negotiator', persona: 'Gets extensions from every professor', icon: '🤝' },
                { name: 'Ali Raza', title: 'The Clutch Player', persona: 'Passes every exam by 1 mark', icon: '🎯' },
                { name: 'Zain Abbas', title: 'The Meme Lord', persona: 'Copes through humor exclusively', icon: '😂' },
              ].map((member) => (
                <div
                  key={member.name}
                  className="minecraft-border p-3 md:p-4 text-center space-y-1 card-hover group cursor-default transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_hsla(var(--gold),0.3)]"
                >
                  <span className="text-2xl block transition-transform duration-300 group-hover:scale-125 group-hover:animate-bounce">{member.icon}</span>
                  <p className="minecraft-text text-mc-pixel md:text-mc-pixel-md text-accent transition-colors group-hover:text-gold-light">{member.name}</p>
                  <p className="minecraft-text text-mc-tiny text-mc-light-green">{member.title}</p>
                  <p className="minecraft-text text-mc-micro text-muted-foreground opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">{member.persona}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="minecraft-text text-mc-pixel text-muted-foreground">
              TANZEEM-UL-TYARI
            </p>
            <p className="minecraft-text text-mc-tiny text-muted-foreground">
              United by Panic | Est. 5th Semester Finals
            </p>
            <p className="minecraft-text text-mc-pixel text-accent mt-3">
              "We survived, somehow."
            </p>
          </div>
        </footer>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
