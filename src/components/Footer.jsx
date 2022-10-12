const Footer = ({ count }) => {
    return (
        <footer>
            <p>{count <= 1 ? `${count} List Item.` : `${count} List Items.`}</p>
        </footer>
    )
}

export default Footer
