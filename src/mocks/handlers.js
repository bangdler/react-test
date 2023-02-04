import { rest } from 'msw';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'America', imagePath: '/images/america.jpeg' },
        { name: 'England', imagePath: '/images/england.jpeg' },
      ])
    );
  }),
  rest.get('/options', (req, res, ctx) => {
    return res(ctx.json([{ name: 'Insurance' }, { name: 'Diner' }]));
  }),
];
