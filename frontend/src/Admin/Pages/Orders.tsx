import { useOrders } from "../../api/orderQuery";
import OrderTable from "../../components/OrderTable";

const Orders = () => {
  const { data, isPending, isError, error } = useOrders();
  if (isPending) return <p>Loading orders...</p>;

  if (isError) return <p>{(error as Error).message}</p>;
  return (
    <div>
      <h1>Orders</h1>
      <OrderTable orders={data} />
    </div>
  );
};

export default Orders;
