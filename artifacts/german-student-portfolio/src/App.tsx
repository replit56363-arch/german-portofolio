import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import News from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Media from "@/pages/media";
import Jakarta from "@/pages/jakarta";
import Services from "@/pages/services";
import EmployerInquiry from "@/pages/employer-inquiry";
import References from "@/pages/references";
import Placements from "@/pages/placements";
import ContentEditor from "@/pages/content-editor";
import CmsOverviewPage from "@/pages/admin-cms/index";
import HomeCms from "@/pages/admin-cms/home-cms";
import NewsCms from "@/pages/admin-cms/news-cms";
import MediaCms from "@/pages/admin-cms/media-cms";
import ServicesCms from "@/pages/admin-cms/services-cms";
import JakartaCms from "@/pages/admin-cms/jakarta-cms";
import ReferencesCms from "@/pages/admin-cms/references-cms";
import PlacementsCms from "@/pages/admin-cms/placements-cms";
import PartnerCms from "@/pages/admin-cms/partner-cms";
import NavbarCms from "@/pages/admin-cms/navbar-cms";
import FooterCms from "@/pages/admin-cms/footer-cms";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Students from "@/pages/students";
import StudentDetail from "@/pages/student-detail";
import StudentEdit from "@/pages/student-edit";
import StudentNew from "@/pages/student-new";
import { LanguageProvider } from "@/lib/language-context";
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
        <Route path="/berita" component={News} />
        <Route path="/berita/:id" component={NewsDetail} />
        <Route path="/media" component={Media} />
        <Route path="/jakarta" component={Jakarta} />
        <Route path="/layanan" component={Services} />
        <Route path="/ag-anfrage" component={EmployerInquiry} />
        <Route path="/referensi" component={References} />
        <Route path="/penempatan-berhasil" component={Placements} />
        <Route path="/dashboard">
          <AppShell><Dashboard /></AppShell>
        </Route>
        <Route path="/admin/content">
          <AppShell><HomeCms /></AppShell>
        </Route>
        <Route path="/admin/cms">
          <AppShell><CmsOverviewPage /></AppShell>
        </Route>
        <Route path="/admin/cms/home">
          <AppShell><HomeCms /></AppShell>
        </Route>
        <Route path="/admin/cms/news">
          <AppShell><NewsCms /></AppShell>
        </Route>
        <Route path="/admin/cms/media">
          <AppShell><MediaCms /></AppShell>
        </Route>
        <Route path="/admin/cms/services">
          <AppShell><ServicesCms /></AppShell>
        </Route>
        <Route path="/admin/cms/jakarta">
          <AppShell><JakartaCms /></AppShell>
        </Route>
        <Route path="/admin/cms/references">
          <AppShell><ReferencesCms /></AppShell>
        </Route>
        <Route path="/admin/cms/placements">
          <AppShell><PlacementsCms /></AppShell>
        </Route>
        <Route path="/admin/cms/partner">
          <AppShell><PartnerCms /></AppShell>
        </Route>
        <Route path="/admin/cms/navbar">
          <AppShell><NavbarCms /></AppShell>
        </Route>
        <Route path="/admin/cms/footer">
          <AppShell><FooterCms /></AppShell>
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
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
