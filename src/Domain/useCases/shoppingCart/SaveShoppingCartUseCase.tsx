import { createContext, useEffect, useState } from "react";
import { Product } from "../../entities/Product";
import { LocalStorage } from "../../../Data/sources/local/LocalStorage";


const saveShoppingCart = async (shoppingCart: Product[]) => {
    const { save } = LocalStorage();
    await save('shopping_cart', JSON.stringify(shoppingCart));
}

export const saveShoppingCartUsecase = async (shoppingCart: Product[]) => {
    return await saveShoppingCart(shoppingCart);
}