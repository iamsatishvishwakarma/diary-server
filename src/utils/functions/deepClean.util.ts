export function cleanFalsyFieldsDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map(item => cleanFalsyFieldsDeep(item))
      .filter(item => item !== undefined && item !== null);
  }

  if (typeof obj === 'object' && obj !== null) {
    const cleanedObj: any = {};
    for (const key in obj) {
      const value = cleanFalsyFieldsDeep(obj[key]);
      if (value) {
        cleanedObj[key] = value;
      }
    }
    return cleanedObj;
  }
  return obj;
}
