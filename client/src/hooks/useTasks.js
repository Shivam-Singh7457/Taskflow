import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tasks`;

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const { token, logout } = useAuth();

  const getHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` }
  }), [token]);

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      logout();
    }
    throw err;
  };

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_URL, getHeaders());
      setTasks(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [token, getHeaders]);

  const createTask = async (taskData) => {
    try {
      const res = await axios.post(API_URL, taskData, getHeaders());
      setTasks(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      handleAuthError(err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates, getHeaders());
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
      return res.data;
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getHeaders());
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      handleAuthError(err);
    }
  };

  return { tasks, fetchTasks, createTask, updateTask, deleteTask };
}
