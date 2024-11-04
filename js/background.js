// background.js または popup.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'login') {
        const privateKey = request.privateKey;

        // 秘密鍵から公開鍵を生成し、署名を作成
        try {
            const pubkey = generatePublicKey(privateKey);
            const sig = signMessage('ログインリクエスト', privateKey);

            sendResponse({ pubkey, sig });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }
});

// 公開鍵を生成するロジック（実装が必要）
function generatePublicKey(privateKey) {
    // 実際の公開鍵生成ロジックを実装
    return '生成された公開鍵';
}

// メッセージに署名するロジック（実装が必要）
function signMessage(message, privateKey) {
    // 署名生成ロジックを実装
    return '生成された署名';
}
