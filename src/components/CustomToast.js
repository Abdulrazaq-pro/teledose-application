// src/components/CustomToast.js

import * as ToastPrimitive from "@radix-ui/react-toast";
import { useState } from "react";

const CustomToast = ({ title, description, open, onOpenChange }) => (
  <ToastPrimitive.Provider swipeDirection="right">
    <ToastPrimitive.Root
      className="bg-gray-800 text-white p-4 rounded shadow-lg"
      open={open}
      onOpenChange={onOpenChange}
    >
      <ToastPrimitive.Title className="font-bold">{title}</ToastPrimitive.Title>
      <ToastPrimitive.Description className="mt-1 text-sm">
        {description}
      </ToastPrimitive.Description>
      <ToastPrimitive.Action asChild altText="Close">
        <button className="ml-4 text-red-500">Close</button>
      </ToastPrimitive.Action>
    </ToastPrimitive.Root>
    <ToastPrimitive.Viewport className="fixed bottom-4 right-4 w-72" />
  </ToastPrimitive.Provider>
);

export default CustomToast;
