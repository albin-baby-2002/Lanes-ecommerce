import OrdersView from "@/sections/admin/orders/views/orders-view";

interface TProps {
  searchParams: {
    search?: string;
  };
}

const OrdersPage = async ({ searchParams }: TProps) => {
  return <OrdersView search={searchParams.search || ""} />;
};

export default OrdersPage;
