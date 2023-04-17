import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    moneyList: [],
    type: 'Income',
    totalIncome: 0,
    totalExpense: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onSubmitForm = event => {
    const {title, amount, type} = this.state
    event.preventDefault()

    const newItem = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      moneyList: [...prevState.moneyList, newItem],
      title: '',
      amount: '',
      type: 'Income',
      totalIncome:
        prevState.totalIncome + (type === 'Income' && parseInt(amount)),
      totalExpense:
        prevState.totalExpense + (type === 'Expenses' && parseInt(amount)),
    }))
  }

  onDelete = id => {
    const {moneyList} = this.state
    const filteredList = moneyList.filter(each => each.id !== id)
    const deletedList = moneyList.find(each => each.id === id)
    const {amount, type} = deletedList
    this.setState(prevState => ({
      moneyList: filteredList,
      totalIncome:
        prevState.totalIncome - (type === 'Income' && parseInt(amount)),
      totalExpense:
        prevState.totalExpense - (type === 'Expenses' && parseInt(amount)),
    }))
  }

  render() {
    const {
      moneyList,
      type,
      title,
      amount,
      totalExpense,
      totalIncome,
    } = this.state
    return (
      <div className="money-manager-container">
        <div className="profile-container">
          <h1 className="richard-head">Hi, Richard</h1>
          <p className="richard-para">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails expense={totalExpense} income={totalIncome} />

        <div className="transaction-history-container">
          <form className="transaction-container" onSubmit={this.onSubmitForm}>
            <h1 className="transaction-head">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              className="title-input"
              type="text"
              id="title"
              placeholder="TITLE"
              onChange={this.onChangeTitle}
              value={title}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="number"
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
              value={amount}
            />
            <label htmlFor="type">TYPE</label>
            <select
              id="type"
              className="select-container"
              onChange={this.onChangeType}
              value={type}
            >
              {transactionTypeOptions.map(eachType => (
                <option key={eachType.optionId} className="option-item">
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="history-head">History</h1>
            <ul className="transaction-container1">
              <li className="transaction-item-label">
                <p className="title">Title</p>
                <p className="amount">Amount</p>
                <p className="type">Type</p>
              </li>
              {moneyList.map(each => (
                <TransactionItem
                  key={each.id}
                  each={each}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
