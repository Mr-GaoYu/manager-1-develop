import { rest, RequestHandler } from 'msw';
import { MockData } from 'src/dev-tools/mockDataController';
import { domainFactory } from 'src/factories';

export const makeResourcePage = (
  e: any[],
  override: { page: number; pages: number; total?: number } = {
    page: 1,
    pages: 1
  }
) => ({
  page: override.page ?? 1,
  pages: override.pages ?? 1,
  total: override.total ?? e.length,
  data: e
});

export const handlers = [
  rest.get('*/domains', (req, res, ctx) => {
    const domains = domainFactory.buildList(10);
    return res(ctx.json(makeResourcePage(domains)));
  })
];

export const mockDataHandlers: Record<
  keyof MockData,
  (count: number) => RequestHandler
> = {
  domain: (count) =>
    rest.get('*/domains', (req, res, ctx) => {
      const domains = domainFactory.buildList(count);
      return res(ctx.json(makeResourcePage(domains)));
    })
};
