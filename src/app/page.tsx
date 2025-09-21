'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const backgroundImages = [
  PlaceHolderImages.find((img) => img.id === 'art-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'community-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'training-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'events-placeholder'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

export default function Home() {
    const router = useRouter();

  const handleScrollClick = () => {
    router.push('/about');
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Carousel
        className="absolute inset-0 w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {backgroundImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-screen w-screen">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-fade-in-up">
          Cantiere Culturale
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 animate-fade-in-up animation-delay-300">
          Un'esperienza dove arte digitale e innovazione si incontrano per plasmare il futuro creativo europeo.
        </p>
      </div>

       <button
        onClick={handleScrollClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white animate-bounce"
      >
        <span className="text-sm font-medium uppercase tracking-widest">Scorri per scoprire</span>
        <ChevronDown className="h-6 w-6" />
      </button>
    </div>
  );
}
