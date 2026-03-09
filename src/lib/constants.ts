import { FoodCategory, TastePreference, Restaurant } from '@/types/app';

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
    // 한식
    { id: '1', name: '명동교자', category: '한식', taste: ['든든하게', '느끼하지 않게'], menu: '칼국수', rating: 4.8, address: '서울시 강남구 역삼동 12-1', phone: '02-123-4567', distance: '150m', reviewCount: 1542 },
    { id: '2', name: '은주정', category: '한식', taste: ['매콤하게', '든든하게'], menu: '김치찌개', rating: 4.5, address: '서울시 강남구 역삼동 34-2', phone: '02-234-5678', distance: '210m', reviewCount: 890 },
    { id: '3', name: '할매순대국', category: '한식', taste: ['든든하게'], menu: '순대국밥', rating: 4.2, address: '서울시 강남구 역삼동 56-3', phone: '02-345-6789', distance: '80m', reviewCount: 450 },
    { id: '4', name: '평양면옥', category: '한식', taste: ['가볍게', '느끼하지 않게'], menu: '평양냉면', rating: 4.6, address: '서울시 강남구 역삼동 78-4', phone: '02-456-7890', distance: '320m', reviewCount: 1200 },
    { id: '5', name: '고기리막국수', category: '한식', taste: ['가볍게', '느끼하지 않게'], menu: '들기름 막국수', rating: 4.7, address: '서울시 강남구 역삼동 90-5', phone: '02-567-8901', distance: '500m', reviewCount: 2100 },
    { id: '6', name: '소문난 성수 감자탕', category: '한식', taste: ['매콤하게', '든든하게'], menu: '감자탕', rating: 4.6, address: '서울시 강남구 역삼동 11-6', phone: '02-678-9012', distance: '400m', reviewCount: 1840 },
    { id: '7', name: '육전식당', category: '한식', taste: ['든든하게'], menu: '삼겹살', rating: 4.7, address: '서울시 강남구 역삼동 22-7', phone: '02-789-0123', distance: '250m', reviewCount: 1320 },
    { id: '8', name: '새마을식당', category: '한식', taste: ['매콤하게', '든든하게'], menu: '열탄불고기', rating: 4.3, address: '서울시 강남구 역삼동 33-8', phone: '02-890-1234', distance: '100m', reviewCount: 560 },
    { id: '9', name: '신전떡볶이', category: '한식', taste: ['매콤하게', '가볍게'], menu: '치즈떡볶이', rating: 4.4, address: '서울시 강남구 역삼동 44-9', phone: '02-901-2345', distance: '120m', reviewCount: 780 },
    { id: '10', name: '하동관', category: '한식', taste: ['든든하게', '느끼하지 않게'], menu: '곰탕', rating: 4.8, address: '서울시 강남구 역삼동 55-0', phone: '02-012-3456', distance: '300m', reviewCount: 2200 },
    // 중식
    { id: '11', name: '홍콩반점0410', category: '중식', taste: ['매콤하게', '든든하게'], menu: '짬뽕', rating: 4.2, address: '서울시 강남구 역삼동 66-1', phone: '02-111-2222', distance: '90m', reviewCount: 650 },
    { id: '12', name: '딘타이펑', category: '중식', taste: ['느끼하지 않게', '가볍게'], menu: '샤오롱바오', rating: 4.6, address: '서울시 강남구 역삼동 77-2', phone: '02-222-3333', distance: '350m', reviewCount: 1420 },
    { id: '13', name: '탕화쿵푸마라탕', category: '중식', taste: ['매콤하게', '든든하게'], menu: '마라탕', rating: 4.5, address: '서울시 강남구 역삼동 88-3', phone: '02-333-4444', distance: '180m', reviewCount: 980 },
    { id: '14', name: '일일향', category: '중식', taste: ['든든하게'], menu: '탕수육 및 볶음밥', rating: 4.4, address: '서울시 강남구 역삼동 99-4', phone: '02-444-5555', distance: '270m', reviewCount: 430 },
    { id: '15', name: '우육면관', category: '중식', taste: ['든든하게'], menu: '우육면', rating: 4.6, address: '서울시 강남구 역삼동 10-5', phone: '02-555-6666', distance: '400m', reviewCount: 710 },
    { id: '16', name: '몽중헌', category: '중식', taste: ['느끼하지 않게'], menu: '딤섬 세트', rating: 4.7, address: '서울시 강남구 역삼동 21-6', phone: '02-666-7777', distance: '550m', reviewCount: 890 },
    { id: '17', name: '이가네양꼬치', category: '중식', taste: ['매콤하게', '든든하게'], menu: '양갈비, 양꼬치', rating: 4.5, address: '서울시 강남구 역삼동 32-7', phone: '02-777-8888', distance: '220m', reviewCount: 620 },
    // 일식/회
    { id: '18', name: '은행골', category: '일식/회', taste: ['가볍게', '느끼하지 않게'], menu: '특미초밥', rating: 4.4, address: '서울시 강남구 역삼동 43-8', phone: '02-888-9999', distance: '110m', reviewCount: 1150 },
    { id: '19', name: '우동 카덴', category: '일식/회', taste: ['가볍게', '느끼하지 않게'], menu: '붓카케 우동', rating: 4.6, address: '서울시 강남구 역삼동 54-9', phone: '02-999-0000', distance: '280m', reviewCount: 950 },
    { id: '20', name: '정돈', category: '일식/회', taste: ['든든하게'], menu: '안심 돈카츠', rating: 4.8, address: '서울시 강남구 역삼동 65-0', phone: '02-000-1111', distance: '340m', reviewCount: 2300 },
    { id: '21', name: '칸다소바', category: '일식/회', taste: ['든든하게'], menu: '마제소바', rating: 4.7, address: '서울시 강남구 역삼동 76-1', phone: '02-121-2323', distance: '210m', reviewCount: 1750 },
    { id: '22', name: '지구당', category: '일식/회', taste: ['든든하게', '느끼하지 않게'], menu: '규동 (소고기덮밥)', rating: 4.3, address: '서울시 강남구 역삼동 87-2', phone: '02-232-3434', distance: '130m', reviewCount: 520 },
    { id: '23', name: '어회장댁', category: '일식/회', taste: ['가볍게', '매콤하게'], menu: '물회', rating: 4.5, address: '서울시 강남구 역삼동 98-3', phone: '02-343-4545', distance: '420m', reviewCount: 460 },
    { id: '24', name: '오복수산', category: '일식/회', taste: ['느끼하지 않게', '가볍게'], menu: '카이센동', rating: 4.7, address: '서울시 강남구 역삼동 19-4', phone: '02-454-5656', distance: '310m', reviewCount: 1380 },
    // 양식/기타
    { id: '25', name: '쉑쉑버거', category: '양식/기타', taste: ['든든하게'], menu: '쉑버거', rating: 4.5, address: '서울시 강남구 역삼동 20-5', phone: '02-565-6767', distance: '250m', reviewCount: 3100 },
    { id: '26', name: '샐러디', category: '양식/기타', taste: ['가볍게', '느끼하지 않게'], menu: '탄단지 샐러드', rating: 4.4, address: '서울시 강남구 역삼동 31-6', phone: '02-676-7878', distance: '60m', reviewCount: 890 },
    { id: '27', name: '서브웨이', category: '양식/기타', taste: ['가볍게', '느끼하지 않게'], menu: '이탈리안 비엠티', rating: 4.3, address: '서울시 강남구 역삼동 42-7', phone: '02-787-8989', distance: '50m', reviewCount: 1240 },
    { id: '28', name: '에머이', category: '양식/기타', taste: ['느끼하지 않게', '가볍게'], menu: '양지 쌀국수', rating: 4.5, address: '서울시 강남구 역삼동 53-8', phone: '02-898-9090', distance: '190m', reviewCount: 1650 },
    { id: '29', name: '감성타코', category: '양식/기타', taste: ['매콤하게', '든든하게'], menu: '파히타', rating: 4.6, address: '서울시 강남구 역삼동 64-9', phone: '02-909-0101', distance: '380m', reviewCount: 2100 },
    { id: '30', name: '롤링파스타', category: '양식/기타', taste: ['느끼하지 않게'], menu: '매운 우삼겹 토마토 파스타', rating: 4.2, address: '서울시 강남구 역삼동 75-0', phone: '02-010-1212', distance: '120m', reviewCount: 760 },
    { id: '31', name: '엽기떡볶이', category: '한식', taste: ['매콤하게', '든든하게'], menu: '엽기반반', rating: 4.6, address: '서울시 강남구 역삼동 86-1', phone: '02-121-3434', distance: '400m', reviewCount: 3400 },
    { id: '32', name: '바스버거', category: '양식/기타', taste: ['든든하게'], menu: '머쉬룸 버거', rating: 4.5, address: '서울시 강남구 역삼동 97-2', phone: '02-232-4545', distance: '180m', reviewCount: 920 }
];
