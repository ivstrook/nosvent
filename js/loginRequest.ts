// loginRequest.ts
export const sendLoginRequest = async (pubkey: string, sig: string): Promise<any> => {
    const response = await fetch('https://yourdomain.com/api/login/extension', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pubkey, sig })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }

    return await response.json();
};