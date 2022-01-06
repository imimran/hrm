import React from "react";
import { useAlert } from 'react-alert'

function HomeScreen() {
  const alert = useAlert()
  return (
    <>
      <div className="card card-body p-5 m-5  mx-auto">
        Welcome to HR Management
      </div>
      <button className="btn btn-primary"
      onClick={() => {
        alert.show('Thanks')
      }}
    >
      Message
    </button>
    </>
  );
}

export default HomeScreen;
