import { useEffect, useState } from 'react';

import { getConfig } from '@edx/frontend-platform';

import { filterLocationRestriction } from '../utils';

export default function useStaticRecommendations(countryCode, shouldFetch) {
  const [isLoading, setLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const popular = filterLocationRestriction(JSON.parse(getConfig().POPULAR_PRODUCTS), countryCode);
    const trending = filterLocationRestriction(JSON.parse(getConfig().TRENDING_PRODUCTS), countryCode);

    setPopularProducts(popular);
    setTrendingProducts(trending);
    setLoading(false);
  }, [countryCode]);

  return { popularProducts, trendingProducts, isLoading };
}
