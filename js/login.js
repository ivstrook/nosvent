// login.js
import { sendLoginRequest } from './loginRequest.js';

// どこかの処理で呼び出し
sendLoginRequest('your_pubkey', 'your_signature')
    .then(data => {
        console.log(data);
        // 成功時の処理
    })
    .catch(error => {
        console.error('Error:', error);
    });
