const SearchItem = ({ search, onSetSearch }) => {
    return (
        <form onSubmit={e => e.preventDefault()} className="flex gap-5 mt-3">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" placeholder="Search Items..." value={search} onChange={e => onSetSearch(e.target.value)} />
        </form>
    )
}

export default SearchItem