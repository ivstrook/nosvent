// loginRequest.js
export const sendLoginRequest = (pubkey, sig) => {
    return fetch('https://yourdomain.com/api/login/extension', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pubkey, sig })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    });
};
