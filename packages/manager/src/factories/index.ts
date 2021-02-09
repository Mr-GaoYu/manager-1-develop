export * from './domain';

export * from './account';

export const normalizeEntities = (entities: any[]) => {
  return entities.reduce((acc, thisThing) => {
    return { ...acc, [thisThing.id]: thisThing };
  }, {});
};
