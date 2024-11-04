// nsec1でログインする処理
            document.getElementById('loginWithNsec1').onclick = () => {
                const secretKey = document.getElementById('secretKey').value;
                const message = "ログインメッセージ"; // 署名するメッセージ
                
                // 秘密キーを使って署名を生成する関数を呼び出す
                const signature = signMessageWithNsec1(secretKey, message); // 署名生成関数
    
                fetch('/api/login/nsec1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ signature }) // 署名をJSON形式で送信
                })
                .then(response => {
                    if (response.ok) {
                        alert('nsec1でのログイン成功');
                    } else {
                        alert('nsec1でのログイン失敗');
                    }
                })
                .catch(err => {
                    console.error('サーバーへの送信に失敗:', err);
                    alert('nsec1でのログイン中にエラーが発生しました。');
                });
            };

            import { connect } from 'nostr-login';

async function handleLogin() {
  try {
    const user = await connect(); // Nostrログイン
    console.log('Login successful:', user); // ログイン成功時のログを出力

    // ユーザー情報をローカルストレージに保存
    localStorage.setItem('user', JSON.stringify(user));

    // カレンダーページに遷移
    window.location.href = '/calendar'; 
  } catch (error) {
    console.error('Login failed:', error); // エラーログ出力
  }
}

// HTMLにボタンを追加（すでにボタンがある場合は必要ありません）
document.getElementById('loginButton').addEventListener('click', handleLogin);
