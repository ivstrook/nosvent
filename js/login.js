// 拡張機能でログインする処理
document.getElementById('loginWithExtension').onclick = () => {
    const message = "ログインメッセージ"; // 署名するメッセージ
    const event = {
    kind: 0,30315,31922, // イベントの種類
    content: getprofile,
    tags: [], // タグは必要に応じて追加
    created_at: Math.floor(Date.now() / 1000) // Unix時間
    };
    
    window.nostr.signEvent(event).then(signature => {
            // サーバーに署名と必要なデータを送信
    fetch('/api/login/extension', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
                    signature: signature.sig, // 署名を送信
                    message: message,
                    pubkey: signature.pubkey // 公開鍵も送信
                }),
    })
    .then(response => {
    if (response.ok) {
    }.catch(err => {
    console.error('署名の取得に失敗:', err);
    };
    }    
}