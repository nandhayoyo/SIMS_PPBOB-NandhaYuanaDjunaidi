import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MAX_TOPUP, MIN_TOPUP } from "../constants/variable";
import { ProfileService } from "../services/Profile";
import { useDispatch } from "react-redux";
import { fetchBalance } from "../store/slice/saldoSlice";

const NominalTopup = () => {
  const { postTopup } = ProfileService();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const valueRp = inputValue.toLocaleString("id-ID");

  const handleTopUp = async () => {
    if (inputValue < MIN_TOPUP) {
      toast.error("Minimum Top Up Rp 10.000");
      return;
    } else if (inputValue > MAX_TOPUP) {
      toast.error("Maksimum Top Rp 1.000.000");
      return;
    }
    try {
      const res = await postTopup(inputValue);
      dispatch(fetchBalance());
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="nominal-topup">
        <h5>Silahkan masukan</h5>
        <h2>Nominal Top Up</h2>
        <br />
        <div className="row">
          <div className="col-md-7">
            <div className="input-nominal">
              <input
                className="form-control "
                type="number"
                placeholder="masukan nominal Top Up"
                value={valueRp}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-primary button-topup"
                onClick={handleTopUp}
                disabled={!inputValue}
              >
                Top Up
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <button
              className=" button-nominal"
              onClick={() => setInputValue(10000)}
            >
              Rp 10.000
            </button>
            <button
              className=" button-nominal"
              onClick={() => setInputValue(20000)}
            >
              Rp 20.000
            </button>
            <button
              className=" button-nominal"
              onClick={() => setInputValue(50000)}
            >
              Rp 50.000
            </button>
            <button
              className=" bottom button-nominal"
              onClick={() => setInputValue(100000)}
            >
              Rp 100.000
            </button>
            <button
              className=" bottom button-nominal"
              onClick={() => setInputValue(250000)}
            >
              Rp 250.000
            </button>
            <button
              className=" bottom button-nominal"
              onClick={() => setInputValue(500000)}
            >
              Rp 500.000
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NominalTopup;
