import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
// import { useCartContext } from '../context/cartContext2';

const PaymentSuccess = () => {
  const trx_id = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  // const { clearCart } = useCartContext();

  useEffect(() => {
    toast.success('Payment Completed Successfully');
    navigate('/dashboard/user/orders');
  }, [trx_id]);

  return;
};

export default PaymentSuccess;
