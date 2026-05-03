import { useOrders } from "../../api/orderQuery";
import ErrorState from "../../components/IsErrorState";
import OrderTable from "../../components/OrderTable";

const Orders = () => {
  const { data, isPending, isError, error } = useOrders();

  // console.log(data.orders);
  if (isPending) return <p>Loading orders...</p>;
  console.log(error);

  if (isError) return <ErrorState />;
  return (
    <div>
      <h1>Orders</h1>
      <OrderTable orders={data.orders} />
    </div>
  );
};

export default Orders;
