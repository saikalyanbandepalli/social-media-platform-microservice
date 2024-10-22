import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../hooks/axiosInstance'; // Ensure this points to your axios setup
import { useAuth } from '../context/AuthContext'; // Import your AuthContext to check authentication

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); 
  const {loggedUser} = useAuth();// Get authentication state and username from AuthContext

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return; // Exit early if not authenticated
      }

      try {
        console.log("this is from expense context"+loggedUser)
        // Include the username as a request parameter
        const response = await axiosInstance.get('/api/expenses/allexpenses', {
          params: { loggedUser } // Pass username as a query parameter
        });
        setExpenses(response.data);
        console.log("Fetched expenses:", response.data);
      } catch (error) {
        setError('Failed to load expenses.');
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [isAuthenticated, loggedUser]); // Dependency array checks for authentication and username before making the API call

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, loading, error }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
