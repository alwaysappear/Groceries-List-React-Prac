import React from 'react';
import LineItem from './LineItem'

const itemList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul className="flex flex-col gap-2 w-[90vw] max-w-[500px] my-2">
            {items.map(item => (
                <LineItem item={item} key={item.id} handleCheck={handleCheck} handleDelete={handleDelete} />
            ))}
        </ul>
    )
}

export default itemList