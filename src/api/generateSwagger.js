const fs = require('fs');
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "RODX",
      version:"1.0.0",
      description: "API Information",
      contact: {
        name: "Developer name"
      }
    },
    servers: [     
      {       
        "url": "http://localhost:3000/"     
      }   
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ["./controllers/*.js"] 
};



const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Write the JSON documentation to a file
fs.writeFile('swagger.json', JSON.stringify(swaggerSpec), (err) => {
    if (err) throw err;
    console.log('The swagger.json file has been written!');
});
