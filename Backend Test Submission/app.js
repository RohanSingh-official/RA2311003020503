const express = require('express');
const cors = require('cors');
const { getDepotData, getVehiclesData } = require('./services/maintenanceService');
const { getNotifications } = require('./services/notificationService');
const { requestLogger } = require('../Logging Middleware/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Vehicle Maintenance Scheduler Microservice
app.get('/depot', async (req, res) => {
    try {
        const data = await getDepotData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/vehicles', async (req, res) => {
    try {
        const data = await getVehiclesData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Campus Notifications Microservice
app.get('/notifications', async (req, res) => {
    try {
        const data = await getNotifications();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
