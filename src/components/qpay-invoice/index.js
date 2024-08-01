import { useEffect } from "react";

const QpayInvoice = ({ price, busName }) => {
  useEffect(() => {
    return () => {
      console.log("qpay invoice");
    };
  }, []);
  return <div>Qpay</div>;
};
export default QpayInvoice;
