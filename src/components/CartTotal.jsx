import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded p-4 shadow-md">
      <Title text1="CART" text2="TOTALS" />

      <div className="text-sm mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-700">Shipping Fee</span>
          <span className="font-medium">{currency}{delivery_fee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t pt-4 font-semibold text-base">
          <span>Total</span>
          <span>{currency}{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
