import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/SiteLayout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Applications from "./pages/Applications";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Industries from "./pages/Industries";
import MaritimeApplications from "./pages/MaritimeApplications";
import OilGasApplications from "./pages/OilGasApplications";
import PowerGenerationApplications from "./pages/PowerGenerationApplications";
import PetrochemicalApplications from "./pages/PetrochemicalApplications";
import BuildingStructuresApplications from "./pages/BuildingStructuresApplications";
import Products from "./pages/Products";
import Services from "./pages/Services";

function PublicSite() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/applications" component={Applications} />
        <Route path="/maritime" component={MaritimeApplications} />
        <Route path="/oil-gas" component={OilGasApplications} />
        <Route path="/power-generation" component={PowerGenerationApplications} />
        <Route path="/petrochemical" component={PetrochemicalApplications} />
        <Route path="/building-structures" component={BuildingStructuresApplications} />
        <Route path="/industries" component={Industries} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Owner-only admin panel — rendered outside the public layout */}
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      {/* Everything else uses the public marketing layout */}
      <Route component={PublicSite} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
