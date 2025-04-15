import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [rooms, setRooms] = useState([]); // Ensure it's an array initially
  const [roomData, setRoomData] = useState({
    id: null,
    title: '',
    description: '',
    maxOccupants: '',
    bedCount: '',
    price: '',
    imageUrl: '',
    items: {
      tv: false,
      phone: false,
      wifi: false,
      miniBar: false,
      fridge: false,
      shower: false,
      furniture: false,
      microwave: false,
      roomService: false,
      hairdryer: false,
      oneTimeUseItems: {
        toothbrush: false,
        toothpaste: false,
        shampoo: false,
      },
      teaAndCoffee: false,
    },
  });
  const [error, setError] = useState('');

  // Fetch rooms from the API
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be logged in to view rooms');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/rooms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      // Ensure that response.data is an array
      if (Array.isArray(response.data)) {
        setRooms(response.data); // Set rooms to state
      } else {
        setError('Received data is not in the expected format');
      }
    } catch (err) {
      setError('Failed to fetch rooms: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  // Handle adding or editing a room
  const handleSaveRoom = async (e) => {
    e.preventDefault();

    try {
      const roomDataToSave = {
        ...roomData,
        items: JSON.stringify(roomData.items), // Convert items to a JSON string
      };

      if (roomData.id) {
        // Update existing room
        await axios.put(`http://localhost:5000/api/rooms/${roomData.id}`, roomDataToSave);
      } else {
        // Add new room
        await axios.post('http://localhost:5000/api/rooms', roomDataToSave);
      }
      fetchRooms(); // Refresh the room list after saving
      setRoomData({
        id: null,
        title: '',
        description: '',
        maxOccupants: '',
        bedCount: '',
        price: '',
        imageUrl: '',
        items: {
          tv: false,
          phone: false,
          wifi: false,
          miniBar: false,
          fridge: false,
          shower: false,
          furniture: false,
          microwave: false,
          roomService: false,
          hairdryer: false,
          oneTimeUseItems: {
            toothbrush: false,
            toothpaste: false,
            shampoo: false,
          },
          teaAndCoffee: false,
        },
      });
    } catch (err) {
      setError('Failed to save room');
    }
  };

  // Handle room deletion
  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      fetchRooms(); // Refresh room list after deletion
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  // Handle form changes for room data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  // Handle item checkbox changes
  const handleItemChange = (e) => {
    const { name, checked } = e.target;
    if (name in roomData.items) {
      setRoomData({
        ...roomData,
        items: { ...roomData.items, [name]: checked },
      });
    } else {
      setRoomData({
        ...roomData,
        items: {
          ...roomData.items,
          oneTimeUseItems: {
            ...roomData.items.oneTimeUseItems,
            [name]: checked,
          },
        },
      });
    }
  };

  useEffect(() => {
    fetchRooms(); // Fetch rooms on initial load
  }, []);

  return (
    <div>
      <h1>Admin Panel - Manage Rooms</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to add or edit room */}
      <form onSubmit={handleSaveRoom}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={roomData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={roomData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Max Occupants</label>
          <input
            type="number"
            name="maxOccupants"
            value={roomData.maxOccupants}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bed Count</label>
          <input
            type="number"
            name="bedCount"
            value={roomData.bedCount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={roomData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={roomData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Items Section */}
        <h3>Items</h3>
        {Object.keys(roomData.items).map((key) => (
          key !== 'oneTimeUseItems' ? (
            <div key={key}>
              <label>{key}</label>
              <input
                type="checkbox"
                name={key}
                checked={roomData.items[key]}
                onChange={handleItemChange}
              />
            </div>
          ) : (
            <div key={key}>
              <h4>One-time use items</h4>
              {Object.keys(roomData.items[key]).map((subKey) => (
                <div key={subKey}>
                  <label>{subKey}</label>
                  <input
                    type="checkbox"
                    name={subKey}
                    checked={roomData.items[key][subKey]}
                    onChange={handleItemChange}
                  />
                </div>
              ))}
            </div>
          )
        ))}
        
        <button type="submit">{roomData.id ? 'Update Room' : 'Add Room'}</button>
      </form>

      {/* List of rooms */}
      <h2>Rooms</h2>
      <ul>
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.id}>
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <p>{room.maxOccupants} people, {room.bedCount} beds</p>
              <p>{room.price}</p>
              <img src={room.imageUrl} alt={room.title} width="100" />
              <div>
                <button onClick={() => setRoomData(room)}>Edit</button>
                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
