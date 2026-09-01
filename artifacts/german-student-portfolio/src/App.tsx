import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import ContentEditor from "@/pages/content-editor";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Students from "@/pages/students";
import StudentDetail from "@/pages/student-detail";
import StudentEdit from "@/pages/student-edit";
import StudentNew from "@/pages/student-new";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/">
          <Landing />
        </Route>
        <Route path="/dashboard">
          <AppShell><Dashboard /></AppShell>
        </Route>
        <Route path="/admin/content">
          <AppShell><ContentEditor /></AppShell>
        </Route>
        <Route path="/students">
          <AppShell><Students /></AppShell>
        </Route>
        <Route path="/students/:id">
          <AppShell><StudentDetail /></AppShell>
        </Route>
        <Route path="/admin/students/new">
          <AppShell><StudentNew /></AppShell>
        </Route>
        <Route path="/admin/students/:id/edit">
          <AppShell><StudentEdit /></AppShell>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
