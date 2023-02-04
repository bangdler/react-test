import { rest } from 'msw';

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
    return res(ctx.status(200, 'Mocked status'), ctx.json([{ name: 'Insurance' }, { name: 'Diner' }]));
  }),
];
