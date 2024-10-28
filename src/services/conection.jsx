const API_BASE_URL = "http://127.0.0.1:8000";

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error in login function:', error);
        throw error;
    }
}

export async function register(name, lastname, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ name, lastname, email, password })
        });

        if (!response.ok) {
            const data = await response.json(); // Obtén los datos primero para manejar errores
            throw new Error(data.message || 'Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error in register function:', error);
        throw error;
    }
}

