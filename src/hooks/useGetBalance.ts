import { useEffect, useState } from "react";
import { axiosInstance, getAccessToken, getBalances } from "../utils/genericOps";

export default function useGetBalance(entityId: number) {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      try {
        const entityBalanceRequest = await getBalances(entityId)
        setBalance(entityBalanceRequest);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, []);

  return {
    balance,
    loading,
    error,
  };
}
