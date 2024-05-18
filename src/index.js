import express from 'express';

const app = express();
const port = 3000;

// 정적 파일 서빙
app.use(express.static('public'));

// 미들웨어 예시
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

// 기본 라우트
app.get('/', (req, res) => {
  console.log("테스트중 TIME : ", now())
  res.send('Hello, World!');
});

// 추가 라우트
app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/contact', (req, res) => {
  res.send('Contact page');
});

// JSON API
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }]);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

