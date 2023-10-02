import React, { useEffect, useState } from "react";
import { fetchRestaurantById } from "../services/restaurant";
import { getOrdersForCurrentRestaurant, destroyOrder } from "../services/order";
import { useParams } from "react-router";
import MenuItem from "../components/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import { BiCart } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const { restaurantId } = useParams();
  const { user } = useAuth0();
  const [currentOrderForUsers, setCurrentOrderForUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newOrderPlaced, setNewOrderPlaced] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handlePlaceOrder = () => {
    if (currentOrderForUsers) {
      destroyOrder(currentOrderForUsers?.[0]?._id);
      setShowModal(false);
      window.location.reload();
      setNewOrderPlaced(false);
    }
  };

  useEffect(() => {
    if (restaurant && user) {
      fetchCurrentOrders(restaurant?._id, user?.sub);
    }
  }, [restaurant, user, newOrderPlaced]);

  useEffect(() => {
    getRestaurant(restaurantId);
  }, [restaurantId]);
  async function getRestaurant(id) {
    const response = await fetchRestaurantById(id);
    console.log("response", response);
    if (response?.data) {
      setRestaurant(response.data);
      setLoading(false);
    }
  }

  const fetchCurrentOrders = async (restaurantId, userId) => {
    const response = await getOrdersForCurrentRestaurant(restaurantId, userId);
    if (response?.data && Array.isArray(response?.data)) {
      setNewOrderPlaced(false);
      setCurrentOrderForUsers(response?.data);
    }
  };
  console.log("current items for users", currentOrderForUsers);

  if (loading) {
    // return <Loader width={50} height={50} />;
    return "loading...";
  }
  return (
    <div className="container">
      <img
        className="img-fluid banner"
        style={{ width: "100%", height: "200px", marginTop: "20px" }}
        alt="banner for restaurant"
        src={restaurant?.bannerImage}
      ></img>
      <h5>{restaurant?.name}</h5>
      {currentOrderForUsers && (
        <button
          // style={{ float: "right" }}
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClick}
        >
          Current Orders <BiCart></BiCart>
        </button>
      )}
      {restaurant?.menu?.map(({ name, price, image, _id }) => (
        <MenuItem
          key={_id}
          name={name}
          price={price}
          image={image}
          restaurantId={restaurant?._id}
          itemId={_id}
          userId={user?.sub}
          setNewOrderPlaced={setNewOrderPlaced}
        ></MenuItem>
      ))}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Current Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Total Price : {currentOrderForUsers?.[0]?.totalAmount}
          {currentOrderForUsers?.[0]?.orderItems?.map((order) => (
            <li className="list-group-item">
              {order?.foodItem?.name} -{" "}
              <span className="badge badge-secondary">{order?.quantity}</span> -
              ${order?.foodItem?.price * order?.quantity}
            </li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Add additional buttons or actions as needed */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
