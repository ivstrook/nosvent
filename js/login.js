// login.js

document.addEventListener('DOMContentLoaded', () => {
    const extensionButton = document.getElementById('extensionButton');

    if (extensionButton) {
        extensionButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value;

            if (!privateKey) {
                alert('秘密鍵を入力してください。');
                return;
            }

            // 拡張機能にメッセージを送信
            try {
                const response = await loginWithExtension(privateKey);
                console.log('Login response:', response);
                alert('ログイン成功');
            } catch (error) {
                console.error('Error during login:', error);
                alert('ログインに失敗しました: ' + error.message);
            }
        });
    }
});

// 拡張機能を使ってログインする関数
async function loginWithExtension(privateKey) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            { type: 'login', privateKey },
            (response) => {
                if (chrome.runtime.lastError || response.error) {
                    return reject(response.error || chrome.runtime.lastError.message);
                }
                resolve(response);
            }
        );
    });
}
