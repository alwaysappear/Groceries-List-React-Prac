import { FaTrashAlt } from 'react-icons/fa'

const LineItem = ({ item, handleCheck, handleDelete }) => {
    return (
        <li className="flex justify-between items-center bg-slate-400 px-3 py-0.5 rounded-md">
            <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} />
            <label onDoubleClick={() => handleCheck(item.id)}
                className={`cursor-pointer text-2xl ${item.checked ? 'line-through' : ''}`}>
                {item.item}
            </label>
            <button onClick={() => handleDelete(item.id)} title={`Delete ${item.item}`}
                className="bg-blue-600 text-white rounded-md p-0.5 tracking-wider hover:bg-red-600 hover:text-black transition-all duration-300 ease-linear">
                {<FaTrashAlt />}
            </button>
        </li>
    )
}

export default LineItem