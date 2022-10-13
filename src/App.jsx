import { useState, useEffect } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'

function App() {
  const API_URL = "http://localhost:5050/items"
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [fetchErr, setFetchErr] = useState(null);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("High Latency!")
        const listItems = await res.json()
        setItems(listItems)
        setFetchErr(null)
      } catch (err) {
        console.log(err.message)
      }
    }

    (async () => await fetchItems())()
  }, [])

  const checkItem = id => {
    const listItems = [...items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)]
    setItems(listItems)
  }

  const deleteItem = id => {
    const listItems = [...items.filter(item => item.id !== id)]
    setItems(listItems)
  }

  const addItem = item => {
    let id = 0
    const [IDList, newArr] = [[], []]
    items.forEach(item => {
      IDList.push(item.id)
    })

    const getMax = Math.max(...IDList)

    for (let i = 1; i <= getMax; i++) {
      if (!IDList.includes(i)) {
        newArr.push(i)
      }
    }

    if (items.length === getMax || items.length === 0) {
      id = items.length + 1
    } else {
      id = newArr[0]
    }
    const newItem = { id, checked: false, ...item }
    const listItems = [...items, newItem]
    setItems(listItems)
  }

  return (
    <>
      <Header title="Groceries List" />
      <div className="container">
        <SearchItem search={search} onSetSearch={setSearch} />
        <AddItem onAddItem={addItem} />
        <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={checkItem} handleDelete={deleteItem} />
      </div>
      <Footer count={items.length} />
    </>
  )
}

export default App
