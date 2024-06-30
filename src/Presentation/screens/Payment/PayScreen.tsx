import { View, Text } from 'react-native';
import React from 'react';

import CreditCard from 'react-native-credit-card-form-ui';

import PayViewModel from './PayViewModel';
import paymentStyles from './PaymentStyles';
import { RoundedButton } from '../../components/RoundedButton';

export const PayScreen = () =>{

    const {
        createOrder,
        creditCardRef,
        handleSubmit,
        create
    } = PayViewModel();
  
    return(
        <View style = {paymentStyles.container} >
            
            <View style = {paymentStyles.form}>
                <CreditCard
                    
                    ref={creditCardRef}

                    background = {'#7216F5'}
                    
                    labels= {{
                        holder: 'NOMBRE DEL TITULAR',
                        cvv: 'CVV',
                        expiration: 'FECHA VENCIMIENTO',
                    }}

                    placeholders={{
                        holder: 'NOMBRE DEL TITULAR',
                        cvv: 'CVV',
                        expiration: 'MM/AA',
                        number: '**** **** **** ****'
                    }}

                    placeholderTextColor='#fff'
                    expirationDateFormat='MM/YY'

                />

            </View>

            <View style= {paymentStyles.payButtom}>
                <RoundedButton 
                    text={'Pagar'}
                    onPress={handleSubmit}
                    key={'Pagar'}
                    
                />
            </View>    
        
        </View>
    )
}