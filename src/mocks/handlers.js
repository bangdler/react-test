import { rest } from 'msw';

const orderResults = [];

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json([
        { name: 'America', imagePath: 'http://localhost:3000/images/america.jpeg' },
        { name: 'England', imagePath: 'http://localhost:3000/images/england.jpeg' },
      ])
    );
  }),
  rest.get('/options', (req, res, ctx) => {
    return res(ctx.status(200, 'Mocked status'), ctx.json([{ name: 'Insurance' }, { name: 'Dinner' }]));
  }),
  rest.post('/order', async (req, res, ctx) => {
    const data = await req.json();
    orderResults.push({ orderNumber: Math.random().toString().substring(3, 7), price: data.totals.total });
    return res(ctx.json(orderResults));
  }),
];
