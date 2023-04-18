import './index.css'

const MoneyDetails = props => {
  const {balance, income, expense} = props

  return (
    <ul className="money-details-container">
      <li className="balance-item-container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="balance-img"
        />
        <div className="balance-container">
          <p className="balance">Your Balance</p>
          <p className="balance-amount" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </li>
      <li className="balance-item-container2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="balance-img"
        />
        <div className="balance-container">
          <p className="income">Your Income</p>
          <p className="income-amount" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </li>
      <li className="balance-item-container3">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="balance-img"
        />
        <div className="balance-container">
          <p className="expense">Your Expenses</p>
          <p className="expense-amount" data-testid="expensesAmount">
            Rs {expense}
          </p>
        </div>
      </li>
    </ul>
  )
}
export default MoneyDetails
