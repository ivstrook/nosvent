        // 拡張機能でログインする処理
        document.getElementById('loginWithExtension').onclick = () => {
                const message = "ログインメッセージ"; // 署名するメッセージ
                const event = {
                    kind: 1, // イベントの種類
                    content: message,
                    tags: [], // タグは必要に応じて追加
                    created_at: Math.floor(Date.now() / 1000) // Unix時間
                };
                
                if (typeof window.nostr !== 'undefined' && typeof window.nostr.signEvent === 'function') {
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
                                alert('ログイン成功');
                            } else {
                                alert('ログイン失敗');
                            }
                        })
                        .catch(err => {
                            console.error('サーバーへの送信に失敗:', err);
                            alert('ログイン中にエラーが発生しました。');
                        });
                    }).catch(err => {
                        console.error('署名の取得に失敗:', err);
                        alert('署名の取得に失敗しました。');
                    });
                } else {
                    alert('Nostr APIが利用できません。拡張機能が正しくインストールされているか確認してください。');
                }
            };
    
            // nsec1でログインする処理
            document.getElementById('loginWithNsec1').onclick = () => {
                const secretKey = document.getElementById('secretKey').value;
                const message = "ログインメッセージ"; // 署名するメッセージ
                
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