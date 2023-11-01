import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import z from 'zod';

export const schema = z.object({
    search: z.string()
});

export type FormData = z.infer<typeof schema>;

export interface Platform {
    name: string;
    slug: string;
    id: number;
  }

export interface PlatformDetails {
    platform: {
        id: number;
        name: string;
    };
}
  
export interface Order {
    name: string;
    slug: string;
    id: number;
  }

export interface Game {
  id: number;
  name: string;
  platformicons: IconDefinition[];
  background_image: string;
  metacritic: number;
  slug: string;
}

export interface Result {
    id: number;
    name: string;
    platforms: PlatformDetails[];
    background_image: string;
    metacritic: number;
    slug: string;
}

export interface Genre {
    id: number;
    image_background: string;
    name: string;
    slug: string;
}