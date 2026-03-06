import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Ooma from "@/pages/ooma";
import Profound from "@/pages/profound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ooma/intro" component={Ooma} />
      <Route path="/intro/profound" component={Profound} />
      <Route path="/profound/intro" component={Profound} />
      <Route component={NotFound} />
    </Switch>
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
