import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout({ amount = "10.00" }) {
  const chitietpdg = JSON.parse(localStorage.getItem("xemctpdg"))
  const user = JSON.parse(localStorage.getItem("userInfo"))
  return (
<   PayPalScriptProvider options={{ "client-id": "AbtJbLzo7b6sZ_Y1LZeP55KDInEwwA4wyiLn67gEnW8aW2QNfMR6Xhm3AyogBVKa9gmUlfHiiG_Y_cPG", currency: "USD" }}>
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("http://localhost:3005/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              amount: (parseFloat(chitietpdg.phithamgia) + parseFloat(chitietpdg.tiencoc)).toString(),
              idtk: user.user.idtk,// ← hoặc email, hoặc username
              idphiendg: chitietpdg.idphiendg, 
              thoigianktdk:chitietpdg.thoigianktdk 
            })
          });
          const data = await res.json();
          return data.id; // return orderID
        }}
        onApprove={async (data) => {
          const res = await fetch(`http://localhost:3005/api/capture-order/${data.orderID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: (parseFloat(chitietpdg.phithamgia) + parseFloat(chitietpdg.tiencoc)).toString(),
              idtk: user.user.idtk,
              idphiendg: chitietpdg.idphiendg,
              thoigianktdk: chitietpdg.thoigianktdk
            })
          });
          const details = await res.json();
          console.log(details);
          alert("Thanh toán thành công cho: " + details.payer);
        }}
        onError={(err) => {
          console.error("Lỗi thanh toán:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalCheckout;
