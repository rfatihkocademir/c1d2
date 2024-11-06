// src/services/apiService.js
import { logError, displayErrorMessage } from './errorLogger';

const API_BASE_URL = 'http://localhost:5000';

export const runTest = async (url, scenario) => {
    try {
        const response = await fetch(`${API_BASE_URL}/run-test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, actions: scenario })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Hata kaydı ve anlamlı mesaj döndürme
        logError(error);
        return { success: false, message: displayErrorMessage(error) };
    }
};
