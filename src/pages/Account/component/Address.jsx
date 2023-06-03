import { useContext, useState } from "react";
import { faker } from "@faker-js/faker";
import { state as stateArray } from "../../../utils/Constants";
import "../Account.css";
import { addressContext } from "../../../contexts/AddressContext";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export function Address() {
  const { addresses, setAddresses } = useContext(addressContext);
  const initialForm = {
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    city: "",
    alternateNum: "",
    state: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const randomDataHandler = (e) => {
    e.preventDefault();
    setFormData({
      id: uuid(),
      name: faker.person.fullName(),
      mobile: faker.phone.number("##########"),
      pincode: faker.location.zipCode("######"),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      alternateNum: faker.phone.number("##########"),
      state: stateArray[Math.floor(Math.random() * (stateArray.length - 1))],
    });
  };

  const formOnChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setAddresses((prev) => [...prev, { id: uuid(), ...formData }]);
    setTimeout(() => {
      setFormData(initialForm);
      toast.success("Address added successfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 500);
    setFormData(initialForm);
  };
  const resetDataHandler = () => {
    setFormData(initialForm);
  };
  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <form onSubmit={submitHandler} autoComplete="off">
        <div className="address-container">
          <div className="input-container">
            <input
              value={formData.name}
              onChange={formOnChangeHandler}
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              value={formData.mobile}
              onChange={formOnChangeHandler}
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="input-container">
            <input
              value={formData.pincode}
              onChange={formOnChangeHandler}
              type="number"
              min="1"
              name="pincode"
              max={999999}
              placeholder="Pin Code"
              required
            />
            <input
              value={formData.city}
              onChange={formOnChangeHandler}
              type="text"
              name="city"
              placeholder="City"
              required
            />
          </div>
          <textarea
            value={formData.address}
            id=""
            onChange={formOnChangeHandler}
            cols="30"
            rows="10"
            placeholder="Address"
            name="address"
            required
          ></textarea>
          <div className="input-container">
            <input
              value={formData.alternateNum}
              onChange={formOnChangeHandler}
              type="tel"
              name="alternateNum"
              placeholder="Alternate Phone (Optional)"
            />
            <select
              value={formData.state}
              onChange={formOnChangeHandler}
              name="state"
              id=""
              required
            >
              <option value="" disabled>
                Choose State
              </option>
              {stateArray.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
            </select>
          </div>
          <div className="address-actions">
            <button type="submit">Add</button>
            <button onClick={randomDataHandler}>Random Data</button>
            <button type="button" onClick={resetDataHandler}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="addresses-list">
        {addresses.map((address) => (
          <div key={address.id} className="addresses-list__address">
            <h3>{address.name}</h3>
            <span>{address.mobile}</span>
            <address>{address.address}</address>
            <span>{address.city}</span>
            <span>{address.state}</span>
            <div className="addresses-list__address-actions">
              <button onClick={() => deleteAddress(address.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
