// app.js

import express from 'express';

const app = express();
const PORT = 3000;

// 1
app.use((req, res, next) => {
    console.log('첫번째 미들웨어');
    next();
});

// 2
app.use((req, res, next) => {
    console.log('두번째 미들웨어');
    next();
});

// 3
app.get('/', (req, res, next) => {
    console.log('GET / 요청이 발생했습니다.');
    next();
});

// 4, 여기서 끝
app.use((req, res, next) => {
    console.log('세번째 미들웨어');
    res.json({ message: 'Hi' });
});

app.use((req, res, next) => {
    console.log('네번째 미들웨어');
    res.json({ message: '마지막 미들웨어 입니다.' });
});

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
