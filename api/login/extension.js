// extension.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/login/extension', (req, res) => {
    const { pubkey, sig } = req.body;

    // ここにログイン処理を実装（例: 公開鍵と署名の検証）
    if (pubkey && sig) {
        // 成功レスポンス
        res.status(200).json({ message: 'Login successful', pubkey });
    } else {
        // エラーレスポンス
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

// サーバーのポートを指定
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
