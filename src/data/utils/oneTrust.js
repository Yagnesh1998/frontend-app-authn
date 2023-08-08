export const ONE_TRUST_GROUPS = {
  NECESSARY: 'C0001',
  PERFORMANCE: 'C0002',
  FUNCTIONAL: 'C0003',
  TARGETING: 'C0004',
};

const useOneTrustGroup = (oneTrustGroup) => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return false;
  }

  return window?.OnetrustActiveGroups?.includes(oneTrustGroup);
};

export default useOneTrustGroup;
