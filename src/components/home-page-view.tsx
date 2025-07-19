import { challenges } from "$/lib/images";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { FloatingElements } from "./FloatingElements";
import { AnimatedGallery } from "./AnimatedGallery";
import { Footer } from "./Footer";

export const HomePageView = () => (
  <SmoothScrollProvider>
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Gallery Section */}
      <AnimatedGallery challenges={challenges} />

      {/* Enhanced Footer */}
      <Footer />
    </div>
  </SmoothScrollProvider>
);
