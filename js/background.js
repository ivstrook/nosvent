// background.js または popup.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'login') {
        const privateKey = request.privateKey;

        // 秘密鍵から公開鍵を生成し、署名を作成する処理
        const pubkey = generatePublicKey(privateKey); // ここで実際の公開鍵生成ロジックを実装
        const sig = signMessage('ログインメッセージ', privateKey); // ここで署名生成ロジックを実装

        sendResponse({ pubkey, sig });
    }
});
