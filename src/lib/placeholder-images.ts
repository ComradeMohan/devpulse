import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const allImages: ImagePlaceholder[] = data.placeholderImages;

export const placeholderImages = allImages.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
}, {} as Record<string, ImagePlaceholder>);
