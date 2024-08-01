const express = require("express");
const http = require("http");
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

// cors 에러 해결
app.use(cors());

// Socket.io
io.on("connection", (socket) => {
  socket.on("startAuction", () => {
    window.alert("dd");
  });

  // 클라이언트로부터의 입찰 가격 변경 요청
  socket.on("bidPriceChange", (newPrice, id) => {
    try {
      currentPrice = newPrice;
      updatedDate = new Date().toLocaleString();
      io.emit("priceUpdated", { currentPrice, updatedDate, id });
    } catch (error) {
      console.error("Error emitting priceUpdated:", error);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
