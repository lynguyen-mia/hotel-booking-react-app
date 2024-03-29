import React, { useState, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { getToken } from "../../utils/authorizeToken";

const calculateTotalPrice = (rooms, duration) => {
  return rooms.reduce((acc, room) => room.price + acc, 0) * duration;
};

const Booking = (props) => {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cardRef = useRef();
  const paymentRef = useRef();
  const bookingRef = useRef();

  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookedDuration, setBookedDuration] = useState(0);
  const [cartRequired, setCartRequired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection"
    }
  ]);

  // Fetch user's information to populate form
  const curUserJSON = localStorage.getItem("curUser");
  const curUser = JSON.parse(curUserJSON);

  async function onChangeDates(item) {
    setRange([item.selection]);

    // Convert ISO 8601 formatted strings
    const startDate = item.selection.startDate.toISOString();
    const endDate = item.selection.endDate.toISOString();
    // console.log(startDate, endDate);

    // Calculate booked duration
    const daysDiff =
      1 +
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (24 * 60 * 60 * 1000);
    setBookedDuration(daysDiff);

    // Send data to server to fetch available room
    const res = await fetch(
      "https://hotel-booking-node-app.onrender.com/fetch-available-rooms",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.hotelId, startDate, endDate })
      }
    );

    if (!res.ok) {
      console.log("Couldn't fetch available rooms");
    }
    const availableRooms = await res.json();
    // console.log(availableRooms);
    setAvailableRooms(availableRooms);
  }

  function onPickRoom(e, roomId, num, price) {
    if (e.target.checked) {
      // Add a room & its price to the selected array when it's checked
      setSelectedRooms((prev) => [
        ...prev,
        { roomId, roomNumbers: num, price }
      ]);
    } else {
      // Remove a room from the selected array when it's unchecked
      setSelectedRooms((prev) => prev.filter((room) => room.num !== num));
    }
  }

  function onChooseMethod(e) {
    if (e.target.value === "visa") {
      setCartRequired(true);
    } else {
      setCartRequired(false);
    }
  }

  async function onReserve(e) {
    e.preventDefault();
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const payment = paymentRef.current.value;
    const card = cardRef.current.value;

    // validation
    if (selectedRooms.length === 0) {
      window.alert("Please choose rooms.");
      return;
    }
    if (!fullname || !email || !phone) {
      window.alert("Please input all fields in the form.");
      return;
    }
    if (!payment) {
      window.alert("Please choose payment method.");
      return;
    }

    const curUserJSON = localStorage.getItem("curUser");
    const curUser = JSON.parse(curUserJSON);

    const transaction = {
      user: curUser.id,
      hotel: props.hotelId,
      room: selectedRooms,
      dateStart: range[0].startDate,
      dateEnd: range[0].endDate,
      price: calculateTotalPrice(selectedRooms, bookedDuration),
      payment: payment,
      status: "Booked",
      createdAt: new Date()
    };
    // console.log(transaction);

    // Send transaction to backend to store
    const token = getToken();
    const res = await fetch(
      "https://hotel-booking-node-app.onrender.com/transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(transaction)
      }
    );

    if (!res.ok) {
      const err = await res.json();
      // console.log(err.message);
    }

    setShowAlert(true);
    window.scrollTo({
      top: 600,
      behavior: "smooth"
    });
    setTimeout(() => {
      props.toggle((prev) => !prev);
      setShowAlert((prev) => !prev);
    }, 2000);
    // props.toggle((prev) => !prev);
  }

  return (
    <div
      className="mt-5 d-flex flex-column gap-3 pb-5 position-relative"
      ref={bookingRef}
    >
      {!showAlert && (
        <div>
          {/* Date picker & user information */}
          <div className="row row-cols-2">
            <div className="col col-5">
              <h4 className="mb-3">
                <strong style={{ fontSize: "22px" }}>Dates</strong>
              </h4>
              <DateRange
                editableDateInputs={true}
                onChange={onChangeDates}
                moveRangeOnFirstSelection={false}
                ranges={range}
                minDate={new Date()}
              />
            </div>

            <div className="col col-7 ps-5">
              <h4 className="mb-3">
                <strong style={{ fontSize: "22px" }}>Reserve Info</strong>
              </h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Your Full Name<sup>*</sup> :
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="form-control"
                    defaultValue={curUser.fullname}
                    ref={fullnameRef}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your Email<sup>*</sup> :
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    defaultValue={curUser.email}
                    ref={emailRef}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Your Phone Number<sup>*</sup> :
                  </label>
                  <input
                    id="phone"
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control no-arrow"
                    defaultValue={curUser.phone}
                    ref={phoneRef}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="card" className="form-label">
                    Your Identity Card Number:
                  </label>
                  <input
                    id="card"
                    type="text"
                    name="card"
                    placeholder="Card Number"
                    className="form-control"
                    ref={cardRef}
                    required={cartRequired ? true : false}
                  />
                </div>

                {/* Payment method + reserve button */}
                <div
                  className="d-flex gap-4 position-absolute"
                  style={{ bottom: "0", left: "0" }}
                >
                  <select
                    name="payments"
                    id="payment"
                    className="dropdown btn btn-secondary px-4 py-2"
                    onChange={onChooseMethod}
                    ref={paymentRef}
                    required
                  >
                    <option value="" hidden>
                      Select Payment Method
                    </option>
                    <option value="Cash">Pay On Arrival</option>
                    <option value="Credit Card">Visa Card</option>
                    <option value="Paypal">Paypal</option>
                  </select>

                  <button
                    type="submit"
                    className="btn btn-md btn-primary"
                    style={{ backgroundColor: "#0071c2" }}
                    onClick={onReserve}
                  >
                    Reserve Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Room selection */}
          {availableRooms && availableRooms.length > 0 && (
            <div>
              <h4 className="mb-3">
                <strong style={{ fontSize: "22px" }}>Select Rooms</strong>
              </h4>
              <div className="row row-cols-2 gx-5 gy-4">
                {availableRooms.map((room) => {
                  return (
                    <div key={room._id} className="col">
                      {/* Room information */}
                      <div className="row row-cols-2 border-top pt-3">
                        <div className="col col-9 d-flex flex-column gap-1">
                          <strong>&#10073; {room.title}</strong>
                          <div style={{ fontSize: "15px" }}>
                            &#9755; {room.desc}
                          </div>
                          <div>
                            Max people:{" "}
                            <strong className="text-secondary">
                              {room.maxPeople}
                            </strong>
                          </div>
                          <strong>
                            <div className="text-secondary">${room.price}</div>
                          </strong>
                        </div>
                        {/* Room numbers */}
                        <div className="col col-3 d-flex gap-2 flex-wrap justify-content-start">
                          {room.roomNumbers.length === 0 && (
                            <div className="text-center text-secondary">
                              <i className="fa-solid fa-ban me-1" />
                              sold out
                            </div>
                          )}
                          {room.roomNumbers.length > 0 &&
                            room.roomNumbers.map((num) => {
                              return (
                                <div key={num} className="d-flex flex-column">
                                  <label
                                    htmlFor={num}
                                    className="text-secondary"
                                  >
                                    {num}
                                  </label>
                                  <input
                                    type="checkbox"
                                    id={num}
                                    name="roomnum"
                                    onChange={(e) =>
                                      onPickRoom(e, room._id, num, room.price)
                                    }
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Total bill */}
          <div>
            <h4 className="my-3">
              <strong style={{ fontSize: "22px" }}>
                Total Bill: $
                {calculateTotalPrice(selectedRooms, bookedDuration)}
              </strong>
            </h4>
          </div>
        </div>
      )}
      {/* Modal */}
      {showAlert && (
        <h4 className="text-center fw-bold text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="green"
            className="w-6 h-6"
            width="28px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          Reservation succeeded!
        </h4>
      )}
    </div>
  );
};

export default Booking;
