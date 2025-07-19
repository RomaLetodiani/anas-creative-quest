import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { FloatingElements } from "./FloatingElements";
import { AnimatedGallery } from "./AnimatedGallery";
import { Footer } from "./Footer";

type HomePageViewProps = {
  challengeId?: string | null;
};

export const HomePageView = ({ challengeId }: HomePageViewProps) => (
  <SmoothScrollProvider>
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Gallery Section */}
      <AnimatedGallery challengeId={challengeId} />

      {/* Enhanced Footer */}
      <Footer />
    </div>
  </SmoothScrollProvider>
);
