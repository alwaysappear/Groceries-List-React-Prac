import { useState, useEffect } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'
import apiRequest from './apiRequest'

function App() {
  const API_URL = "http://localhost:3500/items"

  //Initialization
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  // Fetch data from API server
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("Couldn't fetch data.")
        const listItems = await res.json()
        setItems(listItems)
        setFetchErr(null)
      } catch (err) {
        setFetchErr(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      (async () => await fetchItems())()
    }, 2000)
  }, [])



  // Handle Delete
  const deleteItem = async id => {
    const listItems = [...items.filter(item => item.id !== id)]
    setItems([...listItems])

    const remOption = {
      method: 'DELETE'
    }

    const requestUrl = `${API_URL}/${id}`
    const result = await apiRequest(requestUrl, remOption)
    if (result) setFetchErr(result)
  }


  // Handle Check
  const checkItem = async id => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)

    const newItem = listItems.filter(item => item.id === id)

    const requestUrl = `${API_URL}/${id}`
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: newItem[0].checked })
    }

    const result = await apiRequest(requestUrl, updateOptions)
    if (result) setFetchErr(result)
  }


  // Handle Add Item
  const addItem = async item => {
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

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchErr(result)
  }

  return (
    <>
      <Header title="Groceries List" />
      <div className="container">
        <SearchItem search={search} onSetSearch={setSearch} />
        <AddItem onAddItem={addItem} />
        <main>
          {isLoading && <p>Loading Items...</p>}
          {fetchErr && <p className='text-xl text-red-600'>{`Error: ${fetchErr}`}</p>}
          {!fetchErr && !isLoading && <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={checkItem} handleDelete={deleteItem} handleLoading={isLoading} />}
        </main>
      </div>
      <Footer count={items.length} />
    </>
  )
}

export default App
