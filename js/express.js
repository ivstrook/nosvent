const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/login/extension', (req, res) => {
    const { signature, message, pubkey } = req.body;
    // ここで署名の検証や処理を行う
    if (signature && message && pubkey) {
        // 処理成功時のレスポンス
        res.json({ message: 'ログイン成功' });
    } else {
        res.status(400).json({ error: '無効なリクエスト' });
    }
});

