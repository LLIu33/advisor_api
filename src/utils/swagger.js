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
    host: process.env.HOST || 'localhost:5000',
    basePath: '/api',
  },
  apis: ['./src/schemas/*.js', './src/routes/*.js'],
};

module.exports = swaggerSpec;
