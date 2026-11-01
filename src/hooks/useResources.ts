import { useContext } from 'react';
import { ResourceContext, type ResourceContextType } from '../contexts/resourceContextDef';

export const useResources = (): ResourceContextType => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
};
