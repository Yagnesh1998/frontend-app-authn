import { useSelector } from 'react-redux';

import useAlgoliaRecommendations from './useAlgoliaRecommendations';
import useStaticRecommendations from './useStaticRecommendations';
import useOneTrustGroup, { ONE_TRUST_GROUPS } from '../../../data/utils/oneTrust';

const ALGOLIA_RECOMMENDATIONS = 'algolia_recommendations';
const STATIC_RECOMMENDATIONS = 'algolia_recommendations';

export default function useRecommendations(educationLevel) {
  const userCountry = useSelector((state) => state.register.backendCountryCode);
  const functionalCookiesEnabled = useOneTrustGroup(ONE_TRUST_GROUPS.FUNCTIONAL);
  const algoliaRecommendations = useAlgoliaRecommendations(userCountry, educationLevel, functionalCookiesEnabled);
  const staticRecommendations = useStaticRecommendations(userCountry, !functionalCookiesEnabled);

  if (functionalCookiesEnabled && false) {
    return { ...algoliaRecommendations, type: ALGOLIA_RECOMMENDATIONS };
  }
  return { ...staticRecommendations, type: STATIC_RECOMMENDATIONS };
}
