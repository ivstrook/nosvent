tags: [], // タグは必要に応じて追加
created_at: Math.floor(Date.now() / 1000) // Unix時間
};
    

window.nostr.signEvent(event).then(signature => {
        // サーバーに署名を送信
        // サーバーに署名と必要なデータを送信
fetch('/api/login/extension', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signature, message }),
            body: JSON.stringify({ 
                signature: signature.sig, // 署名を送信
                message: message,
                pubkey: signature.pubkey // 公開鍵も送信
            }),
})
.then(response => {
if (response.ok) {
@@ -26,4 +30,4 @@ document.getElementById('loginWithExtension').onclick = () => {
}).catch(err => {
console.error('署名の取得に失敗:', err);
});
};
document.addEventListener("DOMContentLoaded", () => {
        document.getElementById('loginWithExtension').onclick = () => {
            // 拡張機能のログイン処理
        };
    
        document.getElementById('loginWithNsec1').onclick = () => {
            // nsec1のログイン処理
        };
    });
    