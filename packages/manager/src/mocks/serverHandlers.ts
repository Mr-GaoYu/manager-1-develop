import { rest, RequestHandler } from 'msw';
import { MockData } from 'src/dev-tools/mockDataController';
import { domainFactory, accountFactory } from 'src/factories';

export const makeResourcePage = (
  e: any[],
  override: { page: number; pages: number; results?: number } = {
    page: 1,
    pages: 1
  }
) => ({
  page: override.page ?? 1,
  pages: override.pages ?? 1,
  results: override.results ?? e.length,
  data: e
});

export const handlers = [
  rest.get('*/domains', (req, res, ctx) => {
    const domains = domainFactory.buildList(10);
    return res(ctx.json(makeResourcePage(domains)));
  }),
  rest.post('*/domains', (req, res, ctx) => {
    const payload = req.body as any;
    const newDomains = domainFactory.build(payload);
    return res(ctx.json(newDomains));
  }),
  rest.get('*/account', (req, res, ctx) => {
    const account = accountFactory.build({
      balance: 50,
      active_since: '2019-11-05'
    });
    return res(ctx.json(account));
  }),
  rest.put('*/account', (req, res, ctx) => {
    return res(ctx.json({ ...accountFactory.build(), ...(req.body as any) }));
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
