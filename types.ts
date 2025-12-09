export type UserProfileType = 'primerizo' | 'clasico' | 'premium' | 'regalo' | null;

export enum ProductCategory {
  MATE = 'mate',
  BOMBILLA = 'bombilla',
  YERBA = 'yerba',
  TERMO = 'termo',
  PACK = 'pack',
  ACCESORIO = 'accesorio'
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: ProductCategory;
  description: string;
  features: string[];
  image: string;
  tags: string[]; // e.g., 'beginner_friendly', 'premium', 'gift_ready'
  rating: number;
  reviews: number;
  stock: boolean;
  discountPrice?: number;
  color?: string;
  model?: string;
  customizable?: boolean;
}

export interface CustomizationData {
  text?: string;
  font?: string;
  image?: string; // Base64 or URL
  location?: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
  customization?: CustomizationData;
}

export interface WizardState {
  step: number;
  answers: {
    forWho?: 'me' | 'gift';
    experience?: 'beginner' | 'daily' | 'expert';
    priority?: 'price' | 'design' | 'durability';
    hasItems?: string[];
  };
}

export interface SetBuilderState {
  step: number; // 0: Start, 1: Mate, 2: Bombilla, 3: Yerba, 4: Extras, 5: Review
  selections: {
    mate: Product | null;
    bombilla: Product | null;
    yerba: Product | null;
    extras: Product[];
  };
}