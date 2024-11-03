// 拡張機能でログインする処理
document.getElementById('loginWithExtension').onclick = () => {
    const message = "ログインメッセージ"; // 署名するメッセージ

    if (typeof window.nostr !== 'undefined' && typeof window.nostr.signEvent === 'function') {
        // サンプルのイベントオブジェクトを作成
        const event = {
            kind: 1, // 例: kind 1 はテキスト
            content: message,
            tags: []
        };

        window.nostr.signEvent(event).then(signature => {
            // サーバーに署名を送信
            fetch('/api/login/extension', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ signature, event }),
            })
            .then(response => {
                if (response.ok) {
                    alert('ログイン成功');
                    window.location.href = 'calendar.html'; // カレンダーのページにリダイレクト
                } else {
                    alert('ログイン失敗');
                }
            }).catch(err => {
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
