import { getSession } from 'next-auth/react';

async function fetchWithAuth(url, method = 'GET', payload = null) {
    const session = await getSession();
    if(!session) throw new Error('No session');
    const token = session.web3?.accessTokken;

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');

    const fetchOptions = {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : null,
    };

    if (method === 'GET') {
        delete fetchOptions.body; // GET requests don't have a body
    }

    try {
        const response = await fetch(url, fetchOptions);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow to allow caller to handle
    }
}
