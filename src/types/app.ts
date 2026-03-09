export type FoodCategory = '한식' | '중식' | '일식/회' | '양식/기타';
export type TastePreference = '매콤하게' | '느끼하지 않게' | '가볍게' | '든든하게';

export interface Restaurant {
  id: string;
  name: string;
  category: FoodCategory;
  taste: TastePreference[];
  menu: string;
  rating: number;
  address: string;
  phone: string;
  distance: string;
  reviewCount: number;
  imageUrl?: string;
}

export interface RecommendationHistory {
  id: string;
  restaurant: Restaurant;
  date: string;
  userRating?: number;
  isFavorite: boolean;
}
