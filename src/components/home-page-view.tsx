import { FloatingElements } from './FloatingElements';
import { Footer } from './Footer';
import { AnimatedGallery } from './gallery/AnimatedGallery';
import { SmoothScrollProvider } from './SmoothScrollProvider';

type HomePageViewProps = {
  challengeSlug?: string | null;
};

export const HomePageView = ({ challengeSlug }: HomePageViewProps) => (
  <SmoothScrollProvider>
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-gray-900">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Gallery Section */}
      <AnimatedGallery challengeSlug={challengeSlug} />

      {/* Enhanced Footer */}
      <Footer />
    </div>
  </SmoothScrollProvider>
);
