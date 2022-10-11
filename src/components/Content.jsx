import ItemList from './ItemList'

const Content = ({ handleCheck, handleDelete, items }) => {
    return (
        <main>
            {items.length !== 0 ?
                <ItemList handleCheck={handleCheck} handleDelete={handleDelete} items={items} />
                :
                <p className="font-medium text-xl tracking-widest">No Item.</p>}
        </main>
    )
}

export default Content