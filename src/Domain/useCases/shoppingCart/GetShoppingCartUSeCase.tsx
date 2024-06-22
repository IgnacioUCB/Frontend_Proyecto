import { createContext, useEffect, useState } from "react";
import { Product } from "../../entities/Product";
import { LocalStorage } from "../../../Data/sources/local/LocalStorage";

const getShoppingCart = async () => {
    const { getItem } = LocalStorage();
    const data = await getItem('shopping_cart');
    const ArrayShoppingCart: Product[] = JSON.parse(data);
    
}

export const getShoppingCartUsecase = async () => {
    return await getShoppingCart();
}