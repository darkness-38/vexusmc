export type ProductCategory = "rank" | "item" | "boost";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface GameModeItem {
  key: string;
  name: string;
  description: string;
  online: number;
  gradient: string;
}

export interface RankPackage {
  name: string;
  price: string;
  perks: string[];
  popular?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  quantity: number;
}

export interface AuthUser {
  id: string;
  username: string;
  rank: string;
}

