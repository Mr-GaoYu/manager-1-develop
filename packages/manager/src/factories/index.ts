export * from './domain';

export const normalizeEntities = (entities: any[]) => {
  return entities.reduce((acc, thisThing) => {
    return { ...acc, [thisThing.id]: thisThing };
  }, {});
};
