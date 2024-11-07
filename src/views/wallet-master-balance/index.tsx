import useGetBalance from "../../hooks/useGetBalance";
import { entityMaster } from "../../utils/constants";
import "./index.css";
import CardBalance from "../../components/card-balance";
import { useEffect, useState } from "react";
import { AddPaymentMethod, getBalances } from "../../utils/genericOps";


export default function WalletMasterBalance() {
    const { balance, loading, error }: any = useGetBalance(entityMaster);
    const [listBalance, setListBalance] = useState(balance || []);

    // Sincronizar balance inicial con el estado local cuando `balance` cambia
    useEffect(() => {
        if (balance) {
            setListBalance(balance);
        }
    }, [balance]);

    const handleAddBalance = async () => {
        await AddPaymentMethod();
        const entityBalanceRequest = await getBalances(entityMaster)
        setListBalance(entityBalanceRequest)
    };

    return (
        <div className="master-wallet-balance">
            <h3>Métodos de pago: {listBalance.length}</h3>
            {loading && <h1>Cargando...</h1>}
            {error && <h1>Error al cargar el balance</h1>}
            <button onClick={handleAddBalance}>Agregar balance</button>
            <div className="cards-container">
                {listBalance.map((paymentMethod: any) => (
                    <CardBalance
                        key={paymentMethod?.paymentMethodReference}
                        paymentMethod={paymentMethod}
                    />
                ))}
            </div>
        </div>
    );
}
