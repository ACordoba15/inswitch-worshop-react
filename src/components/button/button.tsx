
import { AddPaymentMethod} from "../../utils/genericOps";

export default function Button () {
  const addPaymentMethod = async () => {
    const addPaymentMethod = await AddPaymentMethod()
  };

  return (
    <button onClick={addPaymentMethod}>
      Agregar metodo de pago
    </button>
  ); 
}