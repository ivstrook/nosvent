// login.js
import { sendLoginRequest } from './loginRequest.js';

document.getElementById('loginButton').addEventListener('click', function() {
    // nos2xを使ってpubkeyやsigを取得
    const pubkey = nos2x.getPublicKey(); // 例: 正しい方法でpubkeyを取得
    const sig = nos2x.signEvent('ログインメッセージ'); // 例: 署名を生成
    
    sendLoginRequest(pubkey, sig)
        .then(data => {
            console.log(data);
            // 成功時の処理
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

