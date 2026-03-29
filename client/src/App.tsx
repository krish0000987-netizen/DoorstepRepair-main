import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BrandPage from "@/pages/brand-page";
import ServicePage from "@/pages/service-page";
import AreasPage from "@/pages/areas-page";
import ServicesListingPage from "@/pages/services-listing-page";
import BrandsListingPage from "@/pages/brands-listing-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import PrivacyPolicyPage from "@/pages/privacy-policy-page";
import TermsConditionsPage from "@/pages/terms-conditions-page";
import AdminLogin from "@/pages/admin/admin-login";
import AdminLayout from "@/pages/admin/admin-layout";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdminHero from "@/pages/admin/admin-hero";
import AdminCTA from "@/pages/admin/admin-cta";
import AdminAbout from "@/pages/admin/admin-about";
import AdminContact from "@/pages/admin/admin-contact";
import AdminFooter from "@/pages/admin/admin-footer";
import AdminServices from "@/pages/admin/admin-services";
import AdminReviews from "@/pages/admin/admin-reviews";
import AdminBookings from "@/pages/admin/admin-bookings";
import AdminImages from "@/pages/admin/admin-images";
import AdminPrivacy from "@/pages/admin/admin-privacy";
import AdminTerms from "@/pages/admin/admin-terms";
import AdminBrandModels from "@/pages/admin/admin-brand-models";
import AdminBlogs from "@/pages/admin/admin-blogs";
import BlogPage from "@/pages/blog-page";
import BlogDetailPage from "@/pages/blog-detail-page";
import CopyrightPage from "@/pages/copyright-page";
import ScrollToTop from "@/components/scroll-to-top";

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesListingPage} />
      <Route path="/brands" component={BrandsListingPage} />
      <Route path="/areas" component={AreasPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-conditions" component={TermsConditionsPage} />
      <Route path="/copyright" component={CopyrightPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/brands/:slug" component={BrandPage} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/hero">{() => <AdminLayout><AdminHero /></AdminLayout>}</Route>
      <Route path="/admin/cta">{() => <AdminLayout><AdminCTA /></AdminLayout>}</Route>
      <Route path="/admin/about">{() => <AdminLayout><AdminAbout /></AdminLayout>}</Route>
      <Route path="/admin/contact">{() => <AdminLayout><AdminContact /></AdminLayout>}</Route>
      <Route path="/admin/footer">{() => <AdminLayout><AdminFooter /></AdminLayout>}</Route>
      <Route path="/admin/services">{() => <AdminLayout><AdminServices /></AdminLayout>}</Route>
      <Route path="/admin/reviews">{() => <AdminLayout><AdminReviews /></AdminLayout>}</Route>
      <Route path="/admin/bookings">{() => <AdminLayout><AdminBookings /></AdminLayout>}</Route>
      <Route path="/admin/images">{() => <AdminLayout><AdminImages /></AdminLayout>}</Route>
      <Route path="/admin/privacy">{() => <AdminLayout><AdminPrivacy /></AdminLayout>}</Route>
      <Route path="/admin/terms">{() => <AdminLayout><AdminTerms /></AdminLayout>}</Route>
      <Route path="/admin/brand-models">{() => <AdminLayout><AdminBrandModels /></AdminLayout>}</Route>
      <Route path="/admin/blogs">{() => <AdminLayout><AdminBlogs /></AdminLayout>}</Route>
      <Route path="/admin">{() => <AdminLayout><AdminDashboard /></AdminLayout>}</Route>
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
