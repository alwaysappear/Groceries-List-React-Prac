import ItemList from './ItemList'

const Content = ({ handleCheck, handleDelete, items, handleLoading }) => {
    return (
        <>
            {items.length !== 0 ?
                <ItemList handleCheck={handleCheck} handleDelete={handleDelete} items={items} />
                : !handleLoading && <p className="font-medium text-xl tracking-widest">No Item.</p>}
        </>
    )
}

export default Content