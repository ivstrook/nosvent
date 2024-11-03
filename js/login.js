// login.js
import { sendLoginRequest } from './loginRequest.js';

document.getElementById('loginButton').addEventListener('click', function() {
    const pubkey = 'your_pubkey'; // 実際のpubkeyを取得
    const sig = 'your_signature';   // 実際のsignatureを取得
    
    sendLoginRequest(pubkey, sig)
        .then(data => {
            console.log(data);
            // 成功時の処理
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
