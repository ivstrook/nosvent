// login.js

document.addEventListener('DOMContentLoaded', () => {
    const extensionButton = document.getElementById('extensionButton');
    const loginButton = document.getElementById('loginButton');

    if (extensionButton) {
        extensionButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value;

            if (!privateKey) {
                alert('秘密鍵を入力してください。');
                return;
            }

            try {
                const loginEvent = await createLoginEvent(privateKey);
                const data = await sendLoginRequest(loginEvent);
                console.log('Login response:', data);
                alert('ログイン成功');
            } catch (error) {
                console.error('Error during login:', error);
                alert('ログインに失敗しました: ' + error.message);
            }
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const privateKey = document.getElementById('privateKey').value;
            // 通常のログイン処理を実装（必要に応じて）
        });
    }
});

// NIP-07に基づくログインイベントを作成する関数
async function createLoginEvent(privateKey) {
    const pubkey = generatePublicKey(privateKey); // 公開鍵を生成
    const event = {
        kind: 1, // Kind 1は「テキストノート」などのイベントタイプを表す
        content: 'ログインリクエスト',
        tags: [['p', pubkey]], // タグとして公開鍵を追加
        created_at: Math.floor(Date.now() / 1000), // UNIXタイムスタンプ
        pubkey: pubkey, // 公開鍵を含める
        id: '', // ここは後で生成される
        sig: '' // 署名も後で追加
    };

    // イベントのIDと署名を生成する
    event.id = generateEventId(event);
    event.sig = signEvent(event, privateKey); // イベントを署名する関数

    return event;
}

// リクエストを送信する関数
async function sendLoginRequest(event) {
    const response = await fetch('/api/login/extension', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }

    return await response.json();
}

// 公開鍵を生成する関数（実装が必要）
function generatePublicKey(privateKey) {
    // 実際の鍵生成ロジックを実装
    return '生成された公開鍵';
}

// イベントのIDを生成する関数（実装が必要）
function generateEventId(event) {
    // ID生成ロジックを実装
    return '生成されたイベントID';
}

// イベントに署名する関数（実装が必要）
function signEvent(event, privateKey) {
    // 署名ロジックを実装
    return '生成された署名';
}
