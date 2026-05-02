const axios = require('axios');
const { getAuthToken, getApiBase } = require('../auth');
require('dotenv').config();

async function getNotifications() {
    try {
        const token = await getAuthToken();
        const apiBase = getApiBase();
        const response = await axios.get(`${apiBase}/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 3000
        });
        return response.data;
    } catch (error) {
        console.warn('Test server unreachable, returning mock notification data.');
        return [
            { id: 1, title: "System Maintenance", message: "Server will be down at midnight", type: "Alert" },
            { id: 2, title: "New Feature", message: "Vehicle tracking is now live", type: "Info" }
        ];
    }
}

module.exports = { getNotifications };
