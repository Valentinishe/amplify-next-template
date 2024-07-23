export const handler = async (event: any) => {
  console.log('body', event?.body);
  console.log('query', event?.query);
  console.log('params', event?.params);
  console.log('event', event);

  return {
    status: 200,
    body: event,
  };
};