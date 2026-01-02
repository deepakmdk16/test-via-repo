import React, { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
  const [currentValue, setCurrentValue] = useState('0')
  const [hasCalculated, setHasCalculated] = useState(false)

  const appendToDisplay = (value) => {
    setCurrentValue((prev) => {
      let newValue = prev
      let calculated = hasCalculated

      if (calculated) {
        if (['+', '-', '*', '/'].includes(value)) {
          calculated = false
          setHasCalculated(false)
        } else {
          newValue = '0'
          calculated = false
          setHasCalculated(false)
        }
      }

      if (newValue === '0' && value !== '.') {
        return value
      } else if (value === '.' && newValue.includes('.')) {
        return newValue
      } else if (value === '.' && ['+', '-', '*', '/'].includes(newValue.slice(-1))) {
        return newValue + '0.'
      } else {
        return newValue + value
      }
    })
  }

  const clearDisplay = () => {
    setCurrentValue('0')
    setHasCalculated(false)
  }

  const deleteLast = () => {
    setCurrentValue((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1)
      } else {
        return '0'
      }
    })
    setHasCalculated(false)
  }

  const calculate = () => {
    try {
      const sanitizedExpression = currentValue.replace(/[^0-9+\-*/.]/g, '')

      if (['+', '-', '*', '/'].includes(sanitizedExpression.slice(-1))) {
        return
      }

      const result = eval(sanitizedExpression)

      if (!isFinite(result)) {
        setCurrentValue('Error')
      } else {
        setCurrentValue(result.toString())
      }

      setHasCalculated(true)
    } catch (error) {
      setCurrentValue('Error')
      setHasCalculated(true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key)
      } else if (event.key === '.') {
        appendToDisplay('.')
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key)
      } else if (event.key === 'Enter' || event.key === '=') {
        calculate()
      } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay()
      } else if (event.key === 'Backspace') {
        deleteLast()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentValue, hasCalculated])

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={currentValue} readOnly />
      </div>
      <div className="buttons">
        <button className="btn btn-clear" onClick={clearDisplay}>
          C
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('/')}>
          /
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('*')}>
          *
        </button>
        <button className="btn btn-operator" onClick={deleteLast}>
          ←
        </button>

        <button className="btn" onClick={() => appendToDisplay('7')}>
          7
        </button>
        <button className="btn" onClick={() => appendToDisplay('8')}>
          8
        </button>
        <button className="btn" onClick={() => appendToDisplay('9')}>
          9
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('-')}>
          -
        </button>

        <button className="btn" onClick={() => appendToDisplay('4')}>
          4
        </button>
        <button className="btn" onClick={() => appendToDisplay('5')}>
          5
        </button>
        <button className="btn" onClick={() => appendToDisplay('6')}>
          6
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('+')}>
          +
        </button>

        <button className="btn" onClick={() => appendToDisplay('1')}>
          1
        </button>
        <button className="btn" onClick={() => appendToDisplay('2')}>
          2
        </button>
        <button className="btn" onClick={() => appendToDisplay('3')}>
          3
        </button>
        <button className="btn btn-equals" onClick={calculate} style={{ gridRow: 'span 2' }}>
          =
        </button>

        <button className="btn" onClick={() => appendToDisplay('0')} style={{ gridColumn: 'span 2' }}>
          0
        </button>
        <button className="btn" onClick={() => appendToDisplay('.')}>
          .
        </button>
      </div>
    </div>
  )
}

export default Calculator
