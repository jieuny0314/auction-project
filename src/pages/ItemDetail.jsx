import AuctionDetail from "../component/AuctionDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiData from "../api/apiData";

const ItemDetail = () => {
  const [auction, setAuction] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const params = useParams();
  const auctionId = params.id;

  useEffect(() => {
    apiData.fetchAuctions().then((res) => {
      setAuction(res.data.find((auction) => auction.id === auctionId));
    });

    apiData.fetchImageList().then((res) => {
      setImageUrl(res.data.find((img) => img.auction_id === Number(auctionId)));
    });
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <AuctionDetail auction={auction} imageUrl={imageUrl} />
    </div>
  );
};

export default ItemDetail;
