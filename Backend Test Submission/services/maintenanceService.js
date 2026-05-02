const axios = require('axios');
const { getAuthToken, getApiBase } = require('../auth');
require('dotenv').config();

async function getDepotData() {
    try {
        const token = await getAuthToken();
        const apiBase = getApiBase();
        const url = `${apiBase}/depot`;
        
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 3000
        });
        return response.data;
    } catch (error) {
        console.warn('Test server unreachable, returning mock depot data.');
        return {
            depotName: "Main Campus Depot",
            location: "Zone A, Building 4",
            capacity: 50,
            availableSlots: 12,
            lastMaintenance: new Date().toISOString()
        };
    }
}

async function getVehiclesData() {
    try {
        const token = await getAuthToken();
        const apiBase = getApiBase();
        const url = `${apiBase}/vehicles`;
        
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 3000
        });
        return response.data;
    } catch (error) {
        console.warn('Test server unreachable, returning mock vehicles data.');
        return [
            { id: "V001", model: "Ford Transit", status: "Due", priority: "High" },
            { id: "V002", model: "Toyota Hiace", status: "Scheduled", priority: "Medium" },
            { id: "V003", model: "Mercedes Sprinter", status: "Overdue", priority: "Critical" }
        ];
    }
}

module.exports = { getDepotData, getVehiclesData };
