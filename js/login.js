const message = "ログインメッセージ"; // 署名するメッセージ

// 拡張機能のAPIを使ってログインする処理
document.getElementById('loginWithExtension').onclick = async () => {
    if (typeof window.nostr !== 'undefined' && typeof window.nostr.signMessage === 'function') {
        try {
            // 公開鍵を取得
            const pubkey = await window.nostr.getPublicKey();
            console.log('公開鍵:', pubkey);
            
            // 署名を取得
            const signature = await window.nostr.signMessage(message);

            // サーバーに署名と公開鍵を送信
            const response = await fetch('/api/login/extension', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    signature: signature.sig, // 署名を送信
                    message: message,
                    pubkey: pubkey // 公開鍵も送信
                }),
            });

            if (response.ok) {
                alert('ログイン成功');
            } else {
                alert('ログイン失敗');
            }
        } catch (err) {
            console.error('エラー:', err);
            alert('ログイン中にエラーが発生しました。');
        }
    } else {
        alert('Nostr APIが利用できません。拡張機能が正しくインストールされているか確認してください。');
    }
};