// login.ts
import { sendLoginRequest } from './loginRequest';

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            try {
                const pubkey: string = await getPublicKey(); // 実際のpubkeyを取得する関数を定義
                const sig: string = await signMessage('ログインメッセージ'); // 署名を生成する関数を定義

                console.log('Attempting to log in with:', { pubkey, sig });

                const data = await sendLoginRequest(pubkey, sig);
                console.log('Login response:', data);
                // 成功時の処理
            } catch (error) {
                console.error('Error during login:', error);
            }
        });
    }
});

// 公開鍵を取得する関数
async function getPublicKey(): Promise<string> {
    // ここにpubkeyを取得するロジックを実装
    return 'your_pubkey'; // 仮の返り値
}

// メッセージに署名する関数
async function signMessage(message: string): Promise<string> {
    // ここに署名を生成するロジックを実装
    return 'your_signature'; // 仮の返り値
}
