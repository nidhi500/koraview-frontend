import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getContributions = (token) =>
  axios
    .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data); // <- important

export const approveContribution = (id, type, token) =>
  axios
    .put(`${API_URL}/${id}/approve`, { type }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const rejectContribution = (id, type, token) =>
  axios
    .put(`${API_URL}/${id}/reject`, { type }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
