import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Add new placeholder images here
const newImages: ImagePlaceholder[] = [
    {
        "id": "chess-placeholder",
        "description": "Una scacchiera in legno con pezzi posizionati, vista dall'alto, con una luce soffusa che crea un'atmosfera intensa e strategica.",
        "imageUrl": "https://images.unsplash.com/photo-1580541832626-2a716d8425af?q=80&w=600&h=400&auto=format&fit=crop",
        "imageHint": "chess board"
    }
]


export const PlaceHolderImages: ImagePlaceholder[] = [...data.placeholderImages, ...newImages];
