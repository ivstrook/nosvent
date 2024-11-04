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

// nsec1でログインする処理
document.getElementById('loginWithNsec1').onclick = () => {
    const secretKey = document.getElementById('secretKey').value;

    // 秘密キーを使って署名を生成する関数を呼び出す
    const signature = signMessageWithNsec1(secretKey, message); // 署名生成関数

    fetch('/api/login/nsec1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature }) // 署名をJSON形式で送信
    })
    .then(response => {
        if (response.ok) {
            alert('nsec1でのログイン成功');
        } else {
            alert('nsec1でのログイン失敗');
        }
    })
    .catch(err => {
        console.error('サーバーへの送信に失敗:', err);
        alert('nsec1でのログイン中にエラーが発生しました。');
    });
};
