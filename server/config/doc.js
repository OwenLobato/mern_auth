import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

export const swaggerDocs = (app) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  const modelsPath = `${path.join(dirName, '../doc/models/*.yaml')}`;
  const componentsPath = `${path.join(dirName, '../doc/components/*.yaml')}`;

  const options = {
    definition: {
      openai: '3.0.0',
      info: {
        title: 'MERN authentication',
        description: 'Authentication sample server',
        version: '1.0.0',
        contact: {
          name: 'Owen Lobato',
          email: 'owenlobatov@gmail.com',
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: 'Development server',
        },
        {
          url: `${process.env.URL_PRODUCTION}`,
          description: 'Production server',
        },
      ],
      definitions: {}, // models/schemas
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    apis: [modelsPath, componentsPath], // endpoints
  };

  const swaggerSpec = swaggerJSDoc(options);

  const apiVersion = process.env.API_VERSION;
  app.use(`${apiVersion}/doc`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get(`${apiVersion}/doc.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const docURL =
    process.env.NODE_ENV === 'production'
      ? process.env.URL_PRODUCTION
      : `http://localhost:${process.env.PORT}`;

  console.log(
    `Docs are available at: ${docURL}${apiVersion}/doc and ${docURL}${apiVersion}/doc`
  );
};
