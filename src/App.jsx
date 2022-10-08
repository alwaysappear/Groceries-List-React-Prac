import { useState } from 'react';
import Header from './components/Header'
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Jollof Rice & Meat"
    },
    {
      id: 2,
      checked: true,
      item: "Yam & Fried Egg"
    },
    {
      id: 3,
      checked: true,
      item: "Noodles & Egg"
    },
    {
      id: 4,
      checked: false,
      item: "Pounded Yam & Vegetable"
    }
  ])

  const checkItem = (id) => {
    const newItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems([...newItems]);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id)
    setItems([...newItems]);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  return (
    <>
      <Header title="Groceries List" />
      <Content handleCheck={checkItem} handleDelete={deleteItem} items={items} />
      <Footer length={items.length} />
    </>
  )
}

export default App;
