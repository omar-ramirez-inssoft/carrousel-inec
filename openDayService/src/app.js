require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors'); // Importa el paquete cors
const authMiddleware = require('./middlewares/authMiddleware');
//const pool = require('./config/db');


const app = express();

app.use(cors()); // Esto permite solicitudes desde cualquier origen

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'OpenPay API',
      version: '1.0.0',
      description: 'API for processing payments with OpenPay',
    },
    servers: [{ url: 'http://localhost:3000' }],    
  },
  apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/*const chargeRoutes = require('./routes/chargeRoutes');
app.use('/api/charges', chargeRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes); // Rutas relacionadas con clientes*/

// Rutas públicas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas protegidas
const chargeRoutes = require('./routes/chargeRoutes');
app.use('/api/charges', authMiddleware, chargeRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes);

const ordersRoutes = require('./routes/ordersRoutes');
app.use('/api/orders', ordersRoutes);


const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);


const selectStudentRoutes = require('./routes/selectStudentRoutes');
app.use('/api/student', selectStudentRoutes);
// Error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
