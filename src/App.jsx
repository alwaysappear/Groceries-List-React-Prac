import { useState } from 'react';
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'

function App() {
  const getItemsFromLocalStorage = JSON.parse(localStorage.getItem('shoppinglist'))
  const getItems = getItemsFromLocalStorage === null ? [] : getItemsFromLocalStorage
  const [items, setItems] = useState(getItems)
  const [search, setSearch] = useState("");

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const checkItem = (id) => {
    const listItems = [...items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)]
    setAndSaveItems(listItems);
  }

  const deleteItem = (id) => {
    const listItems = [...items.filter(item => item.id !== id)]
    setAndSaveItems(listItems);
  }

  const addItem = (item) => {
    let id = 0;
    let newArr = [];
    const IDList = [];
    items.forEach(item => {
      IDList.push(item.id);
    })

    const getMax = Math.max(...IDList)

    for (let i = 1; i <= getMax; i++) {
      if (!IDList.includes(i)) {
        newArr.push(i)
      }
    }

    if (items.length === getMax || items.length === 0) {
      id = items.length + 1;
    } else {
      id = newArr[0]
    }
    const newItem = { id, checked: false, ...item }
    const listItems = [...items, newItem];
    setAndSaveItems(listItems);
  }

  return (
    <>
      <Header title="Groceries List" />
      <div className="container">
        <SearchItem search={search} onSetSearch={setSearch} />
        <AddItem onAdd={addItem} />
        <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={checkItem} handleDelete={deleteItem} />
      </div>
      <Footer length={items.length} />
    </>
  )
}

export default App;
