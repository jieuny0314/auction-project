import AuctionCard from "../component/AuctionCard";
import apiData from "../api/apiData";
import { useState, useEffect } from "react";
import "../index.css";

const ItemList = () => {
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    apiData.fetchUsers().then((res) => {
      setUsers(res.data);
    });

    apiData.fetchAuctions().then((res) => {
      setAuctions(res.data);
    });

    apiData.fetchImageList().then((res) => {
      setImageList(res.data);
    });
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-[100%] text-center py-5">
        <p className="font-bold text-4xl">ITEM LIST</p>
      </div>
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          id={auction.id}
          item_name={auction.item_name}
          description={auction.description}
          current_price={auction.current_price}
          image_url={imageList}
          end_time={auction.end_time}
          created_by={auction.created_by}
        />
      ))}
    </div>
  );
};

export default ItemList;
