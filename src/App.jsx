import { useState } from 'react'
import './App.css'
import Game from './TicTacToe'
import FilterableProductTable from './FilterableProductTable'

function App() {
  const [activeTab, setActiveTab] = useState('tic-tac-toe')

  return (
    <div className="app">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'tic-tac-toe' ? 'active' : ''}`}
          onClick={() => setActiveTab('tic-tac-toe')}>
          Tic Tac Toe
        </button>
        <button 
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}>
          Products Table
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'tic-tac-toe' && <Game />}
        {activeTab === 'thinking-in-react' && <FilterableProductTable />}
      </div>
    </div>
  )
}

export default App
