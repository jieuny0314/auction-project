import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchUsers() {
    return await axios.get(`http://localhost:3001/users`);
  },

  async fetchAuctions() {
    return await axios.get(`http://localhost:3001/auctions`);
  },

  async fetchImageList() {
    return await axios.get(`http://localhost:3001/auctionImages`);
  },
};
