// login.js

document.addEventListener('DOMContentLoaded', () => {
    const extensionButton = document.getElementById('extensionButton');
    const loginButton = document.getElementById('loginButton');

    if (extensionButton) {
        extensionButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value; // 秘密鍵を取得

            if (!privateKey) {
                alert('秘密鍵を入力してください。');
                return; // 入力がない場合は処理を中断
            }

            try {
                // 拡張機能のAPIを呼び出す
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

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value; // 秘密鍵を取得
            // 通常のログイン処理を実装（必要であれば）
        });
    }
});

// 拡張機能を使ってログインする関数
async function loginWithExtension(privateKey) {
    return new Promise((resolve, reject) => {
        // 実際の拡張機能のAPI呼び出しを実装
        chrome.runtime.sendMessage(
            { type: 'login', privateKey },
            (response) => {
                if (chrome.runtime.lastError || response.error) {
                    return reject(response.error || chrome.runtime.lastError);
                }
                resolve(response);
            }
        );
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
