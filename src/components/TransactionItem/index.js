import './index.css'

const TransactionItem = props => {
  const {each, onDelete} = props
  const {title, amount, type, id} = each

  const onClickDelete = () => {
    onDelete(id)
  }
  console.log(title, amount, type)
  return (
    <li className="item-container-transaction">
      <>
        <p className="title1">{title}</p>
        <p className="amount1">{amount}</p>
        <p className="type1">{type}</p>
      </>
      <button
        type="button"
        className="delete-btn"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
