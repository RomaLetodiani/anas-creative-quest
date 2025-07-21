import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { FloatingElements } from "./FloatingElements";
import { AnimatedGallery } from "./gallery/AnimatedGallery";
import { Footer } from "./Footer";

type HomePageViewProps = {
  challengeSlug?: string | null;
};

export const HomePageView = ({ challengeSlug }: HomePageViewProps) => (
  <SmoothScrollProvider>
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Gallery Section */}
      <AnimatedGallery challengeSlug={challengeSlug} />

      {/* Enhanced Footer */}
      <Footer />
    </div>
  </SmoothScrollProvider>
);
