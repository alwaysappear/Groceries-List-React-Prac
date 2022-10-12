import { FaPlus } from 'react-icons/fa'
import { useState, useRef } from 'react'

const AddItem = ({ onAddItem }) => {
    const [item, setItem] = useState("")
    const inputRef = useRef()

    const submit = (e) => {
        e.preventDefault()
        onAddItem({ item })
        setItem("")
    }

    return (
        <form onSubmit={submit} className="flex my-5 gap-3">
            <input type='text' autoFocus required placeholder="Add Item..." value={item} onChange={(e) => setItem(e.target.value)} className="grow" ref={inputRef} />

            <button type="submit" className='text-white text-xl bg-blue-600 mt-5 px-2 py-0.5 rounded-md cursor-pointer hover:bg-blue-300 hover:text-black trans' onClick={() => inputRef.current.focus()}>
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem