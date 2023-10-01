import React from "react";
import Header from "../components/Header";
import "./../styles/Test.scss";

export default function Test() {
  return (
    <>
      <Header />
      <div className="row">
        <div col-6 className="box1">
          <div className="row">
            <h1>Box 1</h1>
          </div>
        </div>
        <div col-4 className="box2">
          <h1>box2</h1>
        </div>
        <div col-4 className="box2-hijau">
          <h1>box2</h1>
        </div>
        <div col-4 className="box2-">
          <h1>box2</h1>
        </div>
      </div>
    </>
  );
}
