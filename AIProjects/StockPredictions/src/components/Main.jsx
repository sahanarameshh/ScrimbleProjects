import React, { useState, useRef } from 'react'
import { dates } from '../utils/dates'

export default function Main() {
  const [tickers, setTickers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState('Querying Stocks API...')
  const report = useState('')
  const inputRef = useRef()
  const labelRef = useRef()

  function getInput(e) {
    e.preventDefault()
    const newTicker = inputRef.current.value.trim()
    if (newTicker.length > 2) {
      setTickers((prev) => [...prev, newTicker.toUpperCase()])
      inputRef.current.value = ''
      if (labelRef.current) {
        labelRef.current.style.color = ''
        labelRef.current.textContent =
          'Add up to 3 stock tickers below to get a super accurate stock predictions report👇'
      }
    } else {
      if (labelRef.current) {
        labelRef.current.style.color = 'red'
        labelRef.current.textContent =
          'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
      }
    }
  }

  async function fetchStockData() {
    if (tickers.length === 0) return
    setIsLoading(true)
    setApiMessage('Querying Stocks API...')
    try {
      const stockData = await Promise.all(
        tickers.map(async (ticker) => {
          const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.POLYGON_API_KEY}`
          const response = await fetch(url)
          const data = await response.text()
          if (response.status === 200) {
            setApiMessage('Creating report...')
            return data
          } else {
            setApiMessage('There was an error fetching stock data.')
            return null
          }
        })
      )
      // Filter out nulls in case of errors
      const filteredData = stockData.filter(Boolean)
      fetchReport(filteredData.join(''))
    } catch (err) {
      setApiMessage('There was an error fetching stock data.')
      console.error('error: ', err)
    }
  }

  async function fetchReport(data) {
    /** AI goes here **/
  }

  return (
    <main>
      {!isLoading && (
        <section className="action-panel">
          <form onSubmit={getInput} id="ticker-input-form">
            <label ref={labelRef} htmlFor="ticker-input">
              Add up to 3 stock tickers below to get a super accurate stock
              predictions report👇
            </label>
            <div className="form-input-control">
              <input
                ref={inputRef}
                type="text"
                id="ticker-input"
                placeholder="MSFT"
                maxLength={5}
              />
              <button className="add-ticker-btn" type="submit">
                <img src="src/assets/add.svg" className="add-ticker-svg" alt="add" />
              </button>
            </div>
          </form>
          <div className="ticker-choice-display">
            {tickers.length > 0 ? (
              tickers.map((ticker, i) => (
                <span className="ticker" key={i}>
                  {ticker}
                </span>
              ))
            ) : (
              <>Your tickers will appear here...</>
            )}
          </div>
          <button
            onClick={fetchStockData}
            className="generate-report-btn"
            type="button"
            disabled={tickers.length === 0}
          >
            Generate Report
          </button>
          <p className="tag-line">Always correct 15% of the time!</p>
        </section>
      )}

      {isLoading && (
        <section className="loading-panel">
          <img src="src/assets/loader.svg" alt="loading" />
          <div id="api-message">{apiMessage}</div>
        </section>
      )}
    </main>
  )
}