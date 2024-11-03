// 拡張機能でログインする処理
document.getElementById('loginWithExtension').onclick = () => {
    const message = "ログインメッセージ"; // 署名するメッセージ

    if (typeof window.nostr !== 'undefined' && typeof window.nostr.signMessage === 'function') {
        // 拡張機能のAPIを呼び出して署名を取得
        window.nostr.signMessage(message).then(signature => {
            // サーバーに署名を送信
            fetch('/api/login/extension', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ signature, message }),
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
        console.log(window.nostr);
        alert('Nostr APIが利用できません。拡張機能が正しくインストールされているか確認してください。');
    }
};

// nsec1でログインする処理
document.getElementById('loginWithNsec1').onclick = () => {
    const secretKey = document.getElementById('secretKey').value;
    const message = "ログインメッセージ"; // 署名するメッセージ

    // 秘密キーを使って署名を生成する関数を呼び出す
    const signature = signMessageWithNsec1(secretKey, message); // 署名生成関数
    
    // サーバーに署名を送信
    fetch('/api/login/nsec1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature, message }),
    })
    .then(response => {
        if (response.ok) {
            alert('ログイン成功');
            window.location.href = 'calendar.html'; // カレンダーのページにリダイレクト
        } else {
            alert('ログイン失敗');
        }
    });
};

// nsec1を使って署名を生成する仮の関数
const signMessageWithNsec1 = (nsec1, message) => {
    // 実際にはnsec1を使った署名生成のロジックをここに実装する
    return "仮の署名"; // 仮の結果
};
