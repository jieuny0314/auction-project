import React, { useEffect, useState } from "react";
import AuctionCountdown from "../component/AuctionCountdown";
import { io } from "socket.io-client";
import BidInput from "./BidInput";

const AuctionDetail = ({ auction, imageUrl }) => {
  const socket = io.connect(`http://localhost:5000`, {
    cors: { origin: "*" },
  });

  const [currentPrice, setCurrentPrice] = useState(0);
  const [updatedDate, setUpdatedDate] = useState("");

  useEffect(() => {
    setCurrentPrice(auction.current_price);
    setUpdatedDate(new Date(auction.updated_date).toLocaleString());
    // 서버로부터 'auctionStarted' 이벤트를 받았을 때 처리
    socket.on("auctionStarted", () => {
      alert("Auction has started!");
    });

    socket.on("priceUpdated", ({ currentPrice, updatedDate, id }) => {
      setCurrentPrice(currentPrice);
      setUpdatedDate(updatedDate);
    });

    return () => {
      socket.off("auctionStarted");
    };
  }, [auction.current_price]);
  return (
    <div className="border p-10 flex-col flex items-center w-[100%]">
      <div className=" text-2xl font-bold mb-20 mt-10 w-[100%] border-b-2 pb-4">
        {auction?.item_name}
      </div>
      <div className="flex flex-row justify-around w-[100%]">
        <div className="py-4 border-gray-300 border flex items-center">
          <img
            src={imageUrl?.image_url}
            alt={auction?.item_name}
            className="max-w-[500px] h-auto"
          />
        </div>
        <div className="border flex flex-col items-center w-[40%]">
          <div className="mb-2 flex items-center p-3 justify-around w-[100%]">
            <p className="text-lg">현재가</p>

            <p className="font-semibold ml-3 mr-1  text-3xl">
              {currentPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </p>
          </div>
          <div className="p-10 bg-gray-50 rounded-md w-[100%]">
            <AuctionCountdown endTime={auction?.end_time} type={"detail"} />
            <div className="flex my-2">
              <p className="mr-2 w-[25%] text-gray-500">제품 설명 </p>
              <p className=""> {auction?.description}</p>
            </div>
            <div className="flex mb-2">
              <p className="mr-2 w-[25%] text-gray-500">시작가</p>
              <p className="">{auction?.start_price} 원</p>
            </div>
            <div className="flex mb-2">
              <p className="mr-2 w-[25%] text-gray-500">시작 시간</p>
              <p>{new Date(auction?.start_time).toLocaleString()}</p>
            </div>
            <div className="mb-2 flex">
              <p className="mr-2 w-[25%] text-gray-500">종료 시간</p>
              <p> {new Date(auction?.end_time).toLocaleString()}</p>
            </div>
            <div className="mb-2 flex">
              <p className="mr-2 w-[25%] text-gray-500">판매자</p>
              <p> {auction?.created_by}</p>
            </div>
            <div className="mb-2 flex">
              <p className="mr-2 w-[25%] text-gray-500">등록 시간 </p>
              <p> {new Date(auction?.created_date).toLocaleString()}</p>
            </div>
            <div className="mb-2 flex items-center">
              <p className="mr-2 w-[25%] text-gray-500">마지막 입찰 시간</p>{" "}
              <p>{updatedDate}</p>
            </div>
          </div>
          <BidInput
            auctionId={auction.id}
            currentPrice={auction?.current_price}
            endTime={auction?.end_time}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
