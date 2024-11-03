// login.ts
import { sendLoginRequest } from './loginRequest';

// ボタンのクリックイベントを設定
const loginButton = document.getElementById('loginButton') as HTMLButtonElement;

if (loginButton) {
    loginButton.addEventListener('click', async () => {
        const pubkey: string = 'your_pubkey'; // 実際のpubkeyを取得する必要があります
        const sig: string = 'your_signature';   // 実際のsignatureを取得する必要があります

        console.log('Attempting to log in with:', { pubkey, sig });

        try {
            const data = await sendLoginRequest(pubkey, sig);
            console.log('Login response:', data);
            // 成功時の処理
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
}
