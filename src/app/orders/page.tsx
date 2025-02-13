import OrdersView from "@/sections/admin/orders/views/orders-view";

interface TProps {
  searchParams: {
    search?: string;
  };
}

const Cart = async ({ searchParams }: TProps) => {

  const searchValue = searchParams.search || "";

  return <OrdersView search={searchValue} />;
};

export default Cart;