import React, { useState, useEffect } from "react";
import saldo_img from "../assets/images/BackgroundSaldo.png";
import "../styles/Saldo.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, getSaldo } from "../store/slice/saldoSlice";

const Saldo = () => {
  const dispatch = useDispatch();
  const saldo = useSelector(getSaldo);
  const saldoStatus = useSelector((state) => state.saldo.status);
  const saldoError = useSelector((state) => state.saldo.error);

  console.log("saldo :", saldo);

  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (saldoStatus === "idle") {
      dispatch(fetchBalance());
    }
  }, [saldoStatus, dispatch]);

  const handleLihatSaldoClick = () => {
    setShowBalance(!showBalance);
  };

  const saldoText = showBalance
    ? `${saldo.data.balance.toLocaleString("id-ID")}`
    : "●●●●●●●●";

  return (
    <div className="saldo-container">
      <div className="container-page-saldo">
        <div className="text-saldo">
          <p className="saldo-title">Saldo anda</p>
          <div className="nominal-saldo">
            <h2 className="h2-spasi">Rp {saldoText}</h2>
            {/* <h2 className="h2-polos"></h2> */}
          </div>
          <p className="lihat-saldo" onClick={handleLihatSaldoClick}>
            Lihat saldo
          </p>
        </div>
        <img className="saldo" src={saldo_img} alt="Home" />
      </div>
    </div>
  );
};

export default Saldo;
