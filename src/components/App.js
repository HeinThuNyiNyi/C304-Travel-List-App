
import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
  // Declare state and state setter functions
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);

    // Clear the entry for description and quantity
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">add</button>
    </form>
  );
}

function PackingList({ itemsProp }) {
  return (
    <div className="list">
      <ul>
        {itemsProp.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
      {item.description} ({item.quantity})
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  // Activity 9a - Lift the state up to the parent App component
  const [items, setItems] = useState([]);

  // Activity 9c - Move handleAddItems to App
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList itemsProp={items} />
      <Stats />
    </div>
  );
}

export default App;
