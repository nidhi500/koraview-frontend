import axios from "axios";

const API_URL = "http://localhost:5000/api/monasteries";

// Fetch all monasteries
export const getMonasteries = () =>
  axios.get(API_URL).then(res => res.data);

// Approve a monastery
export const approveMonastery = (id, token) =>
  axios
    .put(`${API_URL}/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
