chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received request:', request); // デバッグ用ログ

    if (request.type === 'login') {
        const privateKey = request.privateKey;

        try {
            const pubkey = generatePublicKey(privateKey); // 公開鍵を生成
            const sig = signMessage('ログインリクエスト', privateKey); // 署名を生成

            sendResponse({ pubkey, sig });
        } catch (error) {
            console.error('Error during login:', error); // エラーをコンソールに出力
            sendResponse({ error: error.message });
        }
    }
});
