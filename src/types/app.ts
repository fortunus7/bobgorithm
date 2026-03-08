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

export const CATEGORY_EMOJIS: Record<FoodCategory, string> = {
  '한식': '🍚',
  '중식': '🥢',
  '일식/회': '🍣',
  '양식/기타': '🍝',
};

export const TASTE_EMOJIS: Record<TastePreference, string> = {
  '매콤하게': '🌶️',
  '느끼하지 않게': '🥗',
  '가볍게': '🌊',
  '든든하게': '🍗',
};

export const MOCK_RESTAURANTS: Restaurant[] = [
  { id: '1', name: '김치찌개 명가', category: '한식', taste: ['매콤하게', '든든하게'], menu: '김치찌개 정식', rating: 4.5, address: '서울시 강남구 역삼동 123', phone: '02-1234-5678', distance: '150m', reviewCount: 234 },
  { id: '2', name: '맛있는 짬뽕', category: '중식', taste: ['매콤하게', '든든하게'], menu: '짬뽕', rating: 4.2, address: '서울시 강남구 역삼동 456', phone: '02-2345-6789', distance: '200m', reviewCount: 189 },
  { id: '3', name: '스시 오마카세', category: '일식/회', taste: ['가볍게'], menu: '런치 스시 세트', rating: 4.8, address: '서울시 강남구 역삼동 789', phone: '02-3456-7890', distance: '350m', reviewCount: 312 },
  { id: '4', name: '파스타 하우스', category: '양식/기타', taste: ['느끼하지 않게'], menu: '토마토 파스타', rating: 4.3, address: '서울시 강남구 역삼동 101', phone: '02-4567-8901', distance: '100m', reviewCount: 156 },
  { id: '5', name: '순두부찌개집', category: '한식', taste: ['매콤하게', '가볍게'], menu: '순두부찌개', rating: 4.1, address: '서울시 강남구 역삼동 202', phone: '02-5678-9012', distance: '250m', reviewCount: 98 },
  { id: '6', name: '탕수육 달인', category: '중식', taste: ['느끼하지 않게', '든든하게'], menu: '탕수육 정식', rating: 4.4, address: '서울시 강남구 역삼동 303', phone: '02-6789-0123', distance: '180m', reviewCount: 267 },
  { id: '7', name: '라멘 이치방', category: '일식/회', taste: ['든든하게', '매콤하게'], menu: '돈코츠 라멘', rating: 4.6, address: '서울시 강남구 역삼동 404', phone: '02-7890-1234', distance: '300m', reviewCount: 445 },
  { id: '8', name: '샐러드 팜', category: '양식/기타', taste: ['가볍게', '느끼하지 않게'], menu: '치킨 시저 샐러드', rating: 4.0, address: '서울시 강남구 역삼동 505', phone: '02-8901-2345', distance: '120m', reviewCount: 78 },
  { id: '9', name: '비빔밥 천국', category: '한식', taste: ['가볍게', '느끼하지 않게'], menu: '전주 비빔밥', rating: 4.3, address: '서울시 강남구 역삼동 606', phone: '02-9012-3456', distance: '220m', reviewCount: 167 },
  { id: '10', name: '마라탕 마스터', category: '중식', taste: ['매콤하게', '든든하게'], menu: '마라탕', rating: 4.5, address: '서울시 강남구 역삼동 707', phone: '02-0123-4567', distance: '280m', reviewCount: 389 },
];
