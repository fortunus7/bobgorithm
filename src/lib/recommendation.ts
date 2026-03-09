import { Restaurant, RecommendationHistory, FoodCategory, TastePreference } from '@/types/app';
import { MOCK_RESTAURANTS } from '@/lib/constants';

interface CalculateRecommendationParams {
    categoryCounts: Record<FoodCategory, number>;
    tasteCounts: Record<TastePreference, number>;
    history: RecommendationHistory[];
    todayRecommendedIds: string[];
    currentRecommendation: Restaurant | null;
}

export const getRecommendation = ({
    categoryCounts,
    tasteCounts,
    history,
    todayRecommendedIds,
    currentRecommendation
}: CalculateRecommendationParams): Restaurant | null => {
    const totalCatClicks = (Object.values(categoryCounts) as number[]).reduce((a, b) => a + b, 0);
    const totalTasteClicks = (Object.values(tasteCounts) as number[]).reduce((a, b) => a + b, 0);

    const excludedIds = history.filter(h => h.userRating === 1).map(h => h.restaurant.id);

    let candidates = MOCK_RESTAURANTS.filter(r => !excludedIds.includes(r.id));
    candidates = candidates.filter(r => !todayRecommendedIds.includes(r.id));

    if (candidates.length === 0) {
        return null;
    }

    // Exclude the last recommended to prevent consecutive duplicates if we have more than 1 option left
    if (currentRecommendation && candidates.length > 1) {
        candidates = candidates.filter(r => r.id !== currentRecommendation.id);
    }

    // Weight by category and taste preferences
    const weighted = candidates.map(r => {
        let weight = 1;
        if (totalCatClicks > 0) {
            weight += (categoryCounts[r.category] || 0) * 2;
        }
        if (totalTasteClicks > 0) {
            r.taste.forEach(t => {
                weight += (tasteCounts[t] || 0);
            });
        }

        // 별점 5점을 준 이력이 있는 경우 가중치 10% 증가
        const hasFiveStarRating = history.some(h => h.restaurant.id === r.id && h.userRating === 5);
        if (hasFiveStarRating) {
            weight *= 1.1;
        }

        return { restaurant: r, weight };
    });

    const totalWeight = weighted.reduce((a, b) => a + b.weight, 0);
    let random = Math.random() * totalWeight;
    let selected = weighted[0].restaurant;
    for (const w of weighted) {
        random -= w.weight;
        if (random <= 0) {
            selected = w.restaurant;
            break;
        }
    }

    return selected;
};

export const hasAvailableRecommendations = (history: RecommendationHistory[], todayRecommendedIds: string[]): boolean => {
    const excludedIds = history.filter(h => h.userRating === 1).map(h => h.restaurant.id);
    const candidates = MOCK_RESTAURANTS.filter(r => !excludedIds.includes(r.id) && !todayRecommendedIds.includes(r.id));
    return candidates.length > 0;
};
