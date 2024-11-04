// login.js

document.addEventListener('DOMContentLoaded', () => {
    const extensionButton = document.getElementById('extensionButton');

    if (extensionButton) {
        extensionButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value; // 秘密鍵を取得

            if (!privateKey) {
                alert('秘密鍵を入力してください。');
                return;
            }

            try {
                // 拡張機能のAPIを呼び出す（仮の関数）
                const { pubkey, sig } = await loginWithExtension(privateKey);

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

// 拡張機能を使ってログインする仮の関数
async function loginWithExtension(privateKey) {
    // 拡張機能にリクエストを送信し、公開鍵と署名を取得
    return new Promise((resolve, reject) => {
        // ここで実際の拡張機能のAPI呼び出しを実装
        // 例: chrome.runtime.sendMessage({ type: 'login', privateKey }, (response) => {
        //     if (response.error) {
        //         return reject(response.error);
        //     }
        //     resolve(response);
        // });

        // 仮の値を返す（実際の実装に置き換えること）
        const pubkey = 'your_generated_pubkey'; // 仮の公開鍵
        const sig = 'your_signature'; // 仮の署名
        resolve({ pubkey, sig });
    });
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
