const PRODUCTION = 'production';

export const isProductionBuild = process.env.NODE_ENV === PRODUCTION;
