// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            try {
                const pubkey = await getPublicKey(); // 公開鍵を取得
                const sig = await signMessage('ログインメッセージ'); // 署名を生成

                console.log('Attempting to log in with:', { pubkey, sig });

                const data = await sendLoginRequest(pubkey, sig);
                console.log('Login response:', data);
                alert('ログイン成功');
            } catch (error) {
                console.error('Error during login:', error);
                alert('ログインに失敗しました');
            }
        });
    }
});

// 公開鍵を取得する関数
async function getPublicKey() {
    // 実際には、ここでNostrから鍵を取得するロジックを実装
    return 'your_pubkey'; // 仮の公開鍵
}

// メッセージに署名する関数
async function signMessage(message) {
    // 実際には、ここでメッセージに署名するロジックを実装
    return 'your_signature'; // 仮の署名
}

// リクエストを送信する関数
async function sendLoginRequest(pubkey, sig) {
    const response = await fetch('/api/login/extension', {
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
}
