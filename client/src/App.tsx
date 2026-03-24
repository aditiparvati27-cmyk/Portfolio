import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const Ooma = lazy(() => import("@/pages/ooma"));
const Profound = lazy(() => import("@/pages/profound"));
const OomaPortfolio = lazy(() => import("@/pages/ooma-portfolio"));
const ProfoundPortfolio = lazy(() => import("@/pages/profound-portfolio"));
const TypefacePortfolio = lazy(() => import("@/pages/typeface-portfolio"));
const AmplitudeIntro = lazy(() => import("@/pages/amplitude-intro"));
const ProfoundDeck = lazy(() => import("@/pages/profound-deck"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
      <p className="text-sm">Loading case study...</p>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ooma/intro" component={Ooma} />
        <Route path="/intro/profound" component={Profound} />
        <Route path="/profound/intro" component={Profound} />
        <Route path="/intro/amplitude" component={AmplitudeIntro} />
        <Route path="/profound" component={ProfoundDeck} />
        <Route path="/projects/ooma" component={OomaPortfolio} />
        <Route path="/projects/profound" component={ProfoundPortfolio} />
        <Route path="/projects/typeface" component={TypefacePortfolio} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
