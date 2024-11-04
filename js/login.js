const message = "ログインメッセージ"; // 署名するメッセージ

if (typeof window.nostr !== 'undefined' && typeof window.nostr.signMessage === 'function') {
        // 拡張機能のAPIを呼び出して署名を取得
window.nostr.signMessage(message).then(signature => {
// サーバーに署名を送信
fetch('/api/login/extension', {
@@ -17,21 +18,24 @@ document.getElementById('loginWithExtension').onclick = () => {
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


// nsec1でログインする処理
document.getElementById('loginWithNsec1').onclick = () => {
const secretKey = document.getElementById('secretKey').value;
const message = "ログインメッセージ"; // 署名するメッセージ
    

// 秘密キーを使って署名を生成する関数を呼び出す
const signature = signMessageWithNsec1(secretKey, message); // 署名生成関数
