import React, { useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const BidInput = ({ auctionId, currentPrice }) => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBidSubmit = async (event) => {
    event.preventDefault();

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0 || amount <= currentPrice) {
      alert("유효하지 않은 입찰가입니다.");
      return;
    }
    try {
      socket.emit("bidPriceChange", parseFloat(bidAmount), auctionId);

      setBidAmount("");

      await axios.patch(`http://localhost:3001/auctions/${auctionId}`, {
        current_price: amount,
        updated_date: new Date().toISOString(),
      });

      const bidData = {
        auction_id: auctionId,
        bid_amount: amount,
        bid_time: new Date().toISOString(),
        user_id: 1,
      };
      await axios.post("http://localhost:3001/bids", bidData);

      alert("입찰이 완료되었습니다.");
      setBidAmount("");
    } catch (error) {
      console.error("입찰 처리 중 오류 발생:", error);
      alert("입찰 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className="flex flex-col w-[100%] p-5" onSubmit={handleBidSubmit}>
      <label className="mb-2 flex items-center justify-around">
        <p className="mr-2">희망 입찰가</p>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
          className="w-[50%] p-2 text-base border border-gray-300 rounded-md box-border ml-2"
        />
      </label>
      <button
        type="submit"
        className="w-full mt-2 px-2 py-4 bg-green-500 text-white border-none rounded-md cursor-pointer text-base hover:bg-green-600"
      >
        입찰하기
      </button>
    </form>
  );
};

export default BidInput;
