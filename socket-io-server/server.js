const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // cors 패키지 import

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let currentPrice = 100; // 초기 입찰가 설정
let updatedDate = new Date().toISOString();
let id = "";

// cors 미들웨어 적용
app.use(cors());

// Socket.io 관련 처리는 그대로 유지
io.on("connection", (socket) => {
  console.log("클라이언트가 연결되었습니다.");

  socket.on("startAuction", () => {
    console.log("경매가 시작되었습니다.");
    window.alert("dd");
  });

  // 클라이언트로부터의 입찰 가격 변경 요청
  socket.on("bidPriceChange", (newPrice) => {
    currentPrice = newPrice;
    updatedDate = new Date().toLocaleString();
    id =
      // 변경된 입찰 정보를 모든 클라이언트에게 전송
      io.emit("priceUpdated", { currentPrice, updatedDate, id });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
