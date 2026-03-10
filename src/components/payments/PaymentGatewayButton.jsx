'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

/**
 * Generic Payment Button that calls the backend checkout initialization
 */
export default function PaymentGatewayButton({ gateway, courseId, amount, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mapping gateway keys to visual aesthetics
  const styles = {
    bkash:  'bg-[#e2136e] hover:bg-[#c91262] text-white',
    nagad:  'bg-[#f37021] hover:bg-[#d9651e] text-white',
    stripe: 'bg-[#635bff] hover:bg-[#524be3] text-white',
    bank:   'bg-neutral-800 hover:bg-neutral-900 text-white',
  };

  const labels = {
    bkash:  'Pay with bKash',
    nagad:  'Pay with Nagad',
    stripe: 'Pay with Card',
    bank:   'Manual Bank Transfer',
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await api.post('/payments/checkout', {
        courseId,
        paymentMethod: gateway,
        isInstallment: false, // Defaulting to full payment for now
      });

      if (res.data?.success) {
        if (gateway === 'bank') {
          // Manual bank transfers require a different UI flow (modal with file upload)
          toast.success('Please fill out the manual transfer form');
          // Emit event or handle modal state in parent
          return;
        }
        
        // Redirect to external gateway URL
        if (res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl;
        } else {
          toast.error('Payment URL missing from response');
        }
      } else {
        toast.error(res.data?.message || 'Failed to initialize checkout');
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      isLoading={loading}
      className={`w-full flex justify-center items-center gap-2 font-bold py-6 text-lg transition-transform hover:scale-[1.02] shadow-md ${styles[gateway]}`}
    >
      {/* Optional icon injection via children vs predefined based on gateway */}
      {children || labels[gateway]}
    </Button>
  );
}
