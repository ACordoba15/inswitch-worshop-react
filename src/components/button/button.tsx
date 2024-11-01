import { useState } from "react";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import { walletId } from "../../utils/constants";

export default function Button () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  
  const addPaymentMethod = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const entityBalanceRequest = await axiosInstance.post(
        `${import.meta.env.VITE_PUBLIC_API_WALLET}/${walletId}/paymentmethods`,
        {
          paymentMethodAlias: "My USD emoney account",
          paymentMethodType: "emoney-usd",
          paymentMethodStatus: "active",
          inactiveReason: null,
          paymentMethodData: {
            ACCOUNT_ID: "13848",
            maxBalance: "999999999",
            overdraft: "0",
          },
          paymentMethodLinkData: [
            {
              key: "string",
              value: "string",
            },
          ],
          paymentMethodMetadata: [
            {
              key: "string",
              value: "string",
            },
          ],
        },
        {
          headers: {
            "X-User-Bearer": `Bearer ${token}`,
          },
        }
      );
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={addPaymentMethod}>
      Agregar metodo de pago
    </button>
  ); 
}