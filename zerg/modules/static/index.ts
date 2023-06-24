export default {
  fetch() {
    return new Response(
      JSON.stringify({
        data: {
          version: '1.0',
        },
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  },
};
