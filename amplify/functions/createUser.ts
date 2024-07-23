import { generateClient } from 'aws-amplify/data';
import { type Schema  } from '../data/resource';

export const handler = async (event: any) => {



  const client = generateClient<Schema>();

  const { errors, data: newTodo } = await client.models.Users.create({
    username: "My new todo",
    address: '1234 Main St',
  })
  // const { username, password } = JSON.parse(event.body);

  console.log('newTodo', newTodo);
  console.log('errors', errors);

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};