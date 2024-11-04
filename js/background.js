chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'login') {
        const privateKey = request.privateKey;

        try {
            const pubkey = generatePublicKey(privateKey); // 公開鍵を生成
            const sig = signMessage('ログインリクエスト', privateKey); // 署名を生成

            sendResponse({ pubkey, sig });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }
});

function generatePublicKey(privateKey) {
    // 実際の鍵生成ロジックを実装
    return '生成された公開鍵'; // 適切な公開鍵を返すように実装する
}

function signMessage(message, privateKey) {
    // 署名生成ロジックを実装
    return '生成された署名'; // 適切な署名を返すように実装する
}
