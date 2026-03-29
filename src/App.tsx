import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import FacilitiesPage from "./pages/FacilitiesPage.tsx";
import RatesPage from "./pages/RatesPage.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminGuard from "./components/AdminGuard.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminHomepage from "./pages/admin/AdminHomepage.tsx";
import AdminBedrooms from "./pages/admin/AdminBedrooms.tsx";
import AdminFacilities from "./pages/admin/AdminFacilities.tsx";
import AdminRates from "./pages/admin/AdminRates.tsx";
import AdminGallery from "./pages/admin/AdminGallery.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import AdminFAQ from "./pages/admin/AdminFAQ.tsx";
import AdminTestimonials from "./pages/admin/AdminTestimonials.tsx";
import AdminLocation from "./pages/admin/AdminLocation.tsx";
import AdminSocial from "./pages/admin/AdminSocial.tsx";
import AdminNavigation from "./pages/admin/AdminNavigation.tsx";
import AdminAccount from "./pages/admin/AdminAccount.tsx";
import { BlogPage, BlogPost } from "./pages/BlogPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="homepage" element={<AdminHomepage />} />
            <Route path="bedrooms" element={<AdminBedrooms />} />
            <Route path="facilities" element={<AdminFacilities />} />
            <Route path="rates" element={<AdminRates />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="location" element={<AdminLocation />} />
            <Route path="social" element={<AdminSocial />} />
            <Route path="navigation" element={<AdminNavigation />} />
            <Route path="account" element={<AdminAccount />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
