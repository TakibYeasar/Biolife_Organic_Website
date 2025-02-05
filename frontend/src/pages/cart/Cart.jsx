import React from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaTrash,
} from "react-icons/fa";
import {
  useFetchMyCartQuery,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useDeleteCartProductMutation,
  useDeleteFullCartMutation,
} from "../../store/features/cart/cartApi";

const Cart = () => {
  const { data: cartData, error, isLoading } = useFetchMyCartQuery();
  const [increaseCartProduct] = useIncreaseCartProductMutation();
  const [decreaseCartProduct] = useDecreaseCartProductMutation();
  const [deleteCartProduct] = useDeleteCartProductMutation();
  const [deleteFullCart] = useDeleteFullCartMutation();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
          Your Shopping Cart
        </h1>

        {cartData?.cart_products?.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 border-b">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Subtotal</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.cart_products.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 px-4 flex items-center space-x-4">
                        <img
                          className="h-16 w-16 object-cover rounded-md"
                          src={item.product.main_image}
                          alt={item.product.title}
                        />
                        <div>
                          <h3 className="text-gray-800 font-semibold">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-through">
                            £{item.product.old_price}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-semibold">
                        £{item.product.price}
                      </td>
                      <td className="py-4 px-4 flex items-center space-x-2">
                        <button
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                          onClick={() => increaseCartProduct(item.id)}
                        >
                          <FaCaretUp />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                          onClick={() => decreaseCartProduct(item.id)}
                        >
                          <FaCaretDown />
                        </button>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-semibold">
                        £{item.subtotal}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteCartProduct(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-wrap justify-between items-center mt-6">
                <a href="/" className="text-green-600 hover:text-green-800 font-semibold">
                  ← Continue Shopping
                </a>
                <button
                  className="bg-red-500 hover:bg-red-600 mx-2 text-white px-6 py-2 rounded shadow"
                  type="button"
                  onClick={() => deleteFullCart()}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p className="text-gray-600">Subtotal: £{cartData.total}</p>
              <p className="text-gray-600">Shipping: Free</p>
              <div className="mt-4">
                <a
                  href="/checkout"
                  className="block bg-green-500 hover:bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold"
                >
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <p>Your cart is empty.</p>
            <a href="/" className="text-green-600 hover:underline mt-2 block">
              ← Continue Shopping
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
