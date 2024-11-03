document.getElementById('loginWithExtension').onclick = () => {
    const message = "ログインメッセージ"; // 署名するメッセージ
    const event = {
        kind: 1,
        content: message, // メッセージを設定
        tags: [],
        created_at: Math.floor(Date.now() / 1000)
    };

    // 拡張機能の確認
    if (typeof window.nostr === 'undefined' || typeof window.nostr.signEvent !== 'function') {
        alert('拡張機能が正しく読み込まれていないか、実行できません。');
        return;
    }

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
                window.location.href = './calendar/calendar.html'; // カレンダーのページにリダイレクト
            } else {
                return response.json().then(errData => {
                    alert(`ログイン失敗: ${errData.message || '不明なエラー'}`);
                });
            }
        })
        .catch(err => {
            console.error('リクエスト中にエラーが発生:', err);
            alert('サーバーへのリクエスト中にエラーが発生しました。');
        });
    }).catch(err => {
        console.error('署名の取得に失敗:', err);
        alert('署名の取得に失敗しました。拡張機能が正しく動作しているか確認してください。');
    });
};
app.post('/api/login/extension', (req, res) => {
    // ログイン処理...
    if (成功) {
        res.json({ message: 'ログイン成功' });
    } else {
        res.status(400).json({ message: 'ログイン失敗' });
    }
});
fetch('/api/login/extension', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        signature: signature.sig, 
        message: message,
        pubkey: signature.pubkey 
    }),
})
.then(response => {
    return response.text().then(text => {
        if (!response.ok) {
            console.error('エラーレスポンス:', text);
            throw new Error(text || '不明なエラー');
        }
        return JSON.parse(text);
    });
})
