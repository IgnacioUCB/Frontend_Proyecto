import { useContext, useEffect, useState } from "react"
import { Address } from "../../../../Domain/entities/Address"
import { User } from "../../../../Domain/entities/User"
import { AuthContext } from "../../../context/auth/AuthContext";
import { ClientShoppingCartNavigatorParamsList } from "../../../navigator/tabs/client/ClientShoppingCartNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { AddressConstext } from "../../../context/address/AddressContext";

interface Props extends StackScreenProps<ClientShoppingCartNavigatorParamsList, 'ProductListScreen'> { }

const showAddressViewModel = () => {
    
    //const [address, setAddress] = useState<Address[]>([]);

    const {address, getAllAddress} = useContext(AddressConstext);



    return {

        address 

    }


}

export default showAddressViewModel;