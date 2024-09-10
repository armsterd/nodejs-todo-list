import express from 'express';
import connect from './schemas/index.js';
import todosRouter from './routes/todo.router.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json()); // 첫 번째 미들웨어
app.use(express.urlencoded({ extended: true })); // 두 번째 미들웨어
app.use(express.static('./assets')); // 세 번째 미들웨어

const router = express.Router();

// 네 번째 미들웨어, 다섯 번째 밑으로 코드위치를 옮기면 실행이 되지않음. todosRouter는 next가 존재하지 않기 때문에
app.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl, ' - ', new Date());
    next();
});

router.get('/', (req, res) => {
    return res.json({ message: 'Hi!' });
});

// 다섯 번째 미들웨어
app.use('/api', [router, todosRouter]);

// 에러 처리 미들웨어를 등록
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
