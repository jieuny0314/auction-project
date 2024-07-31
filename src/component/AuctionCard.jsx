import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionCountdown from "./AuctionCountdown";
import "../index.css";

const AuctionCard = ({
  id,
  item_name,
  description,
  current_price,
  image_url,
  end_time,
  created_by,
}) => {
  const [currentPrice, setCurrentPrice] = useState(current_price);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const socket = io(`http://localhost:5000`, {
      cors: { origin: "*" },
    });

    socket.on(`priceUpdated`, ({ currentPrice, updatedDate, id }) => {
      setCurrentPrice(currentPrice);
      setCurrentId(id);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentId]);

  const getImageUrlForAuction = (auctionId) => {
    const image = image_url?.find(
      (img) => img.auction_id === Number(auctionId)
    );
    return image ? image.image_url : "";
  };

  // const handleStartAuction = () => {
  //   const socket = io(`http://localhost:5000`, {
  //     cors: { origin: "*" },
  //   });
  //   socket.emit("startAuction");
  //   //alert(`${item_name}의 경매가 시작되었습니다.`);
  //   return () => {
  //     socket.disconnect();
  //   };
  // };

  return (
    <article className=" m-2 w-[300px] flex flex-col justify-between">
      <Link to={`/detail/${id}`} className="text-black no-underline">
        <img
          src={getImageUrlForAuction(id)}
          alt={item_name}
          className="w-full h-auto border border-gray-300 rounded-lg py-4"
        />
        <div className="p-4">
          <h3 className="mt-2 text-xl font-semibold">{item_name}</h3>
          <p className="mt-1 text-sm text-gray-700">{description}</p>
          <div className="flex text-center items-end mt-2">
            <p className="text-xl font-semibold">
              {currentId === id
                ? currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : current_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>원</p>
          </div>
          <div className="mt-2">
            <AuctionCountdown endTime={end_time} type={"main"} />
          </div>
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <p className="mr-1">판매자</p> <p>{created_by}</p>
          </div>
        </div>
      </Link>
      {/* <button
        className="bg-gray-500 p-2 rounded-lg text-white mt-2"
        onClick={handleStartAuction}
      >
        경매시작
      </button> */}
    </article>
  );
};

export default AuctionCard;
