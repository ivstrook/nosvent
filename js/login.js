document.addEventListener('DOMContentLoaded', () => {
    const extensionButton = document.getElementById('extensionButton');
    const loginButton = document.getElementById('loginButton');

    if (extensionButton) {
        extensionButton.addEventListener('click', async () => {
            console.log('拡張機能ログインボタンが押されました');
            const privateKey = document.getElementById('privateKey').value;

            if (!privateKey) {
                alert('秘密鍵を入力してください。');
                return;
            }

            try {
                const response = await loginWithExtension(privateKey);
                console.log('Login response:', response);
                alert('ログイン成功');
                // ここに成功後の処理を追加
            } catch (error) {
                console.error('Error during login:', error);
                alert('ログインに失敗しました: ' + error.message);
            }
        });
    }

    // 通常のログイン処理
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const privateKey = document.getElementById('privateKey').value;
            // 通常のログイン処理をここに追加
            alert('通常のログイン機能はまだ実装されていません。');
        });
    }
});

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
