import React from "react";
import { useAddress } from "../../../context/AddressContext";
import { useNavigate } from "react-router-dom";

const AddressList = () => {
  const { addressState, addressDispatch } = useAddress();
  const navigate = useNavigate();
  const addAddressHandlerInCheckout = () => {
    navigate("/profile");
  };
  return (
    <div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {addressState.addresses?.map((address) => (
          <li className="address_item" key={address.id}>
            <label>
              <input
                type="radio"
                name="address"
                checked={addressState.seletedAddress.id === address.id}
                onChange={() =>
                  addressDispatch({
                    type: "SET_SELETED_ADDRESS",
                    payload: address,
                  })
                }
              />
              <h4 style={{ display: "inline-block", margin: "0" }}>
                {address.name}
              </h4>
              <br />
              {address.street}, {address.city}, {address.state},{" "}
              {address.zipcode}, {address.country}
              <br />
              Mobile No. : {address.mobile}
            </label>
          </li>
        ))}
      </ul>
      <button className="add_address" onClick={addAddressHandlerInCheckout}>
        Add New Address
      </button>
    </div>
  );
};

export default AddressList;
