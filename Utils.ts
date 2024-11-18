// src/api/utils.ts
export const buildQueryString = (params: Record<string, any> = {}): string => {
    const query = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });
    
    const queryString = query.toString();
    return queryString ? `?${queryString}` : "";
  };
  