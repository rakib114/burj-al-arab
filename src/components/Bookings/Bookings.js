import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:5000/bookings?email=" + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => setBookings(data));
    }, [loggedInUser.email]);
    return (
        <div>
            <h2>You've {bookings.length} Bookings</h2>
            {bookings.map((booking) => (
                <li key={booking._id}>
                    {booking.name} from:{" "}
                    {new Date(booking.checkIn).toDateString("dd/MM/yyyy")} to:{" "}
                    {new Date(booking.CheckOut).toDateString("dd/MM/yyyy")}{" "}
                </li>
            ))}
        </div>
    );
};

export default Bookings;
