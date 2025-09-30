import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL 


// Fetch all monasteries
export const getMonasteries = () =>
  axios.get(`${API_URL}/monasteries`).then(res => res.data);

// Approve a monastery
export const approveMonastery = (id, token) =>
  axios
    .put(`${API_URL}/monasteries/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);

    