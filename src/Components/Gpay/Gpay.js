
import GooglePayButton from '@google-pay/button-react';
import React from 'react';

const GPay = (props) => {
    return (
            <GooglePayButton
                environment="PRODUCTION"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                            },
                            tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                // parameters: {
                                //     gateway: 'example',
                                //     gatewayMerchantId: 'exampleGatewayMerchantId',
                                // },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: 'BCR2DN6TQ7E2DQSE',
                        merchantName: "cvvlogs.com",
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: props.totalPrice,
                        currencyCode: props.currencyCode,
                        // countryCode: props.currencyCode,
                    },
                    shippingAddressRequired: false,
                    callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={paymentRequest => {
                    console.log('Success', paymentRequest);
                }}
                onPaymentAuthorized={paymentData => {
                    console.log('Payment Authorised Success', paymentData)
                    return { transactionState: 'SUCCESS' }
                }
                }
                // onPaymentDataChanged={paymentData => {
                //     console.log('On Payment Data Changed', paymentData)
                //     return {}
                // }
                // }
                existingPaymentMethodRequired='false'
                buttonColor="black"
                buttonType="subscribe"
                buttonSizeMode="fill"
            />

    );
}


export default GPay