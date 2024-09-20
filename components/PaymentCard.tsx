'use client';
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export function PaymentCard() {
  const [isPaid, setIsPaid] = useState(false);

  const config = {
    public_key: 'FLWPUBK_TEST-3cd14315fedbff83d51f02f62bb436f6-X',
    tx_ref: Date.now().toString(),
    amount: 500,
    currency: 'XAF',
    payment_options: 'mobilemoney',
    customer: {
      email: 'user@example.com',
      phone_number: '070********',
      name: 'John Doe',
    },
    customizations: {
      title: 'Apple Watch Payment',
      description: 'Payment for Apple Watch',
      logo: 'https://flowbite.com/docs/images/products/apple-watch.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          setIsPaid(true);
          
        }
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  return (
    <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
      <img
        src="https://flowbite.com/docs/images/products/apple-watch.png"
        alt="Article cover"
        width="400"
        height="200"
        className="w-full h-48 object-cover"
        style={{ aspectRatio: "400/200", objectFit: "cover" }}
      />
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Apple Watch</h3>
          <p className="text-muted-foreground">This article is worth 500XAF, a great value.</p>
        </div>
        <div className="flex items-center">
          <Button
            variant={isPaid ? "outline" : "default"}
            className={`justify-start ${isPaid ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
            onClick={handlePayment}
            disabled={isPaid}
          >
            {isPaid ? 'Paid' : 'Pay Now'}
          </Button>
          {isPaid && (
            <Check className="ml-2 text-green-500" size={24} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}