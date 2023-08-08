import { useEffect, useState } from 'react';

import algoliasearchHelper from 'algoliasearch-helper';

import { getLocationRestrictionFilter, getPrecisionRadius, initializeSearchClient } from '../../../data/algolia';

const INDEX_NAME = process.env.ALGOLIA_AUTHN_RECOMMENDATIONS_INDEX;
const LEVEL_FACET = 'level';

export default function useAlgoliaRecommendations(userCountry, educationLevel, shouldFetch) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const getSearchFiltersQueryString = () => {
      if (userCountry) {
        return getLocationRestrictionFilter(userCountry);
      }
      return '';
    };

    const algoliaSearchParams = {
      facets: [LEVEL_FACET],
      filters: getSearchFiltersQueryString(),
      aroundLatLngViaIP: true,
      aroundRadius: 'all',
      aroundPrecision: [{ from: 0, value: getPrecisionRadius() }],
    };

    const searchClient = initializeSearchClient();
    const searchHelper = algoliasearchHelper(
      searchClient,
      INDEX_NAME,
      algoliaSearchParams,
    );

    if (educationLevel) {
      searchHelper.addFacetRefinement(LEVEL_FACET, educationLevel);
    }

    const searchIndex = () => {
      setIsLoading(true);
      searchHelper.search();
    };

    searchIndex();

    searchHelper.on('result', ({ results }) => {
      console.log('test results', results);
      setRecommendations(results);
      setIsLoading(false);
    });

    searchHelper.on('error', () => setIsLoading(false));
  }, [educationLevel, functionalCookiesEnabled, userCountry]);

  return {
    recommendations,
    isLoading,
  };
}
