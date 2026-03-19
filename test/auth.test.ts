import { handler } from '../src/auth';


test('valid input', async () => {
  const res = await handler({
    email: 'test@test.com',
    password: '12345678'
  });

  expect(res.success).toBe(true);
});

test('invalid input', async () => {
  const res = await handler({
    email: 'test',
    password: '123'
  });

  expect(res.success).toBe(false);
});