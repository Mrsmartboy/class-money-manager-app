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
    titleInput: '',
    amountInput: '',

    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeInput = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeInput

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getIncomeAmount = () => {
    const {transactionList} = this.state
    let income = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        income += eachItem.amount
      }
    })
    return income
  }

  getExpenseAmount = () => {
    const {transactionList} = this.state
    let expense = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[1].displayText) {
        expense += eachItem.amount
      }
    })
    return expense
  }

  getBalanceAmount = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmount = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachItem.amount
      } else {
        expenseAmount += eachItem.amount
      }
    })

    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  onDelete = id => {
    const {transactionList} = this.state
    const filteredResults = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: filteredResults})
  }

  render() {
    const {titleInput, amountInput, transactionList, optionId} = this.state

    const getBalance = this.getBalanceAmount()
    const getIncome = this.getIncomeAmount()
    const getExpense = this.getExpenseAmount()

    return (
      <div className="money-manager-container">
        <div className="profile-container">
          <h1 className="richard-head">Hi, Richard</h1>
          <p className="richard-para">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balance={getBalance}
          income={getIncome}
          expense={getExpense}
        />

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
              value={titleInput}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
              value={amountInput}
            />
            <label htmlFor="select">TYPE</label>
            <select
              id="select"
              className="select-container"
              onChange={this.onChangeType}
              value={optionId}
            >
              {transactionTypeOptions.map(eachType => (
                <option
                  key={eachType.optionId}
                  className="option-item"
                  value={eachType.optionId}
                >
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

              {transactionList.map(each => (
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
