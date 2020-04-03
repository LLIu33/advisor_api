const host = `http://${process.env.IP}:${process.env.PORT}`;

const swaggerSpec = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fobe API documentation',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
  },
  apis: ['./src/routes/*.js'],
  host,
  basePath: '/',
};

module.exports = swaggerSpec;
