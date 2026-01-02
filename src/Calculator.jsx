import React, { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
  const [currentValue, setCurrentValue] = useState('0')
  const [hasCalculated, setHasCalculated] = useState(false)
  const [memory, setMemory] = useState(0)
  const [angleMode, setAngleMode] = useState('deg')

  const toRadians = (degrees) => (degrees * Math.PI) / 180
  const toDegrees = (radians) => (radians * 180) / Math.PI

  const appendToDisplay = (value) => {
    setCurrentValue((prev) => {
      let newValue = prev
      let calculated = hasCalculated

      if (calculated) {
        if (['+', '-', '*', '/', '^', '('].includes(value)) {
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
      } else if (value === '.' && newValue.split(/[\+\-\*\/\^\(\)]/).pop().includes('.')) {
        return newValue
      } else if (value === '.' && ['+', '-', '*', '/', '^', '('].includes(newValue.slice(-1))) {
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

  const clearEntry = () => {
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

  const handleScientificFunction = (func) => {
    try {
      const value = parseFloat(currentValue)
      if (isNaN(value)) return

      let result
      switch (func) {
        case 'sin':
          result = angleMode === 'deg' ? Math.sin(toRadians(value)) : Math.sin(value)
          break
        case 'cos':
          result = angleMode === 'deg' ? Math.cos(toRadians(value)) : Math.cos(value)
          break
        case 'tan':
          result = angleMode === 'deg' ? Math.tan(toRadians(value)) : Math.tan(value)
          break
        case 'asin':
          result = angleMode === 'deg' ? toDegrees(Math.asin(value)) : Math.asin(value)
          break
        case 'acos':
          result = angleMode === 'deg' ? toDegrees(Math.acos(value)) : Math.acos(value)
          break
        case 'atan':
          result = angleMode === 'deg' ? toDegrees(Math.atan(value)) : Math.atan(value)
          break
        case 'sinh':
          result = Math.sinh(value)
          break
        case 'cosh':
          result = Math.cosh(value)
          break
        case 'tanh':
          result = Math.tanh(value)
          break
        case 'sqrt':
          result = Math.sqrt(value)
          break
        case 'cbrt':
          result = Math.cbrt(value)
          break
        case 'square':
          result = value * value
          break
        case 'cube':
          result = value * value * value
          break
        case 'reciprocal':
          result = 1 / value
          break
        case 'ln':
          result = Math.log(value)
          break
        case 'log':
          result = Math.log10(value)
          break
        case 'log2':
          result = Math.log2(value)
          break
        case 'exp':
          result = Math.exp(value)
          break
        case 'factorial':
          result = factorial(value)
          break
        case 'abs':
          result = Math.abs(value)
          break
        case 'negate':
          result = -value
          break
        default:
          return
      }

      if (!isFinite(result)) {
        setCurrentValue('Error')
      } else {
        setCurrentValue(formatResult(result))
      }
      setHasCalculated(true)
    } catch (error) {
      setCurrentValue('Error')
      setHasCalculated(true)
    }
  }

  const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN
    if (n === 0 || n === 1) return 1
    if (n > 170) return Infinity
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const formatResult = (value) => {
    if (Math.abs(value) < 1e-10 && value !== 0) {
      return value.toExponential(10)
    }
    const str = value.toString()
    if (str.length > 12) {
      return parseFloat(value.toPrecision(12)).toString()
    }
    return str
  }

  const insertConstant = (constant) => {
    let value
    switch (constant) {
      case 'pi':
        value = Math.PI
        break
      case 'e':
        value = Math.E
        break
      default:
        return
    }
    setCurrentValue(formatResult(value))
    setHasCalculated(true)
  }

  const calculate = () => {
    try {
      let expression = currentValue
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/\^/g, '**')

      if (['+', '-', '*', '/', '**'].some(op => expression.endsWith(op))) {
        return
      }

      const result = eval(expression)

      if (!isFinite(result)) {
        setCurrentValue('Error')
      } else {
        setCurrentValue(formatResult(result))
      }

      setHasCalculated(true)
    } catch (error) {
      setCurrentValue('Error')
      setHasCalculated(true)
    }
  }

  const memoryAdd = () => {
    const value = parseFloat(currentValue)
    if (!isNaN(value)) {
      setMemory(prev => prev + value)
    }
  }

  const memorySubtract = () => {
    const value = parseFloat(currentValue)
    if (!isNaN(value)) {
      setMemory(prev => prev - value)
    }
  }

  const memoryRecall = () => {
    setCurrentValue(memory.toString())
    setHasCalculated(true)
  }

  const memoryClear = () => {
    setMemory(0)
  }

  const toggleAngleMode = () => {
    setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key)
      } else if (event.key === '.') {
        appendToDisplay('.')
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key)
      } else if (event.key === '(' || event.key === ')') {
        appendToDisplay(event.key)
      } else if (event.key === '^') {
        appendToDisplay('^')
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
    <div className="calculator scientific">
      <div className="display">
        <div className="mode-indicator">
          <span className={memory !== 0 ? 'active' : ''}>M</span>
          <span>{angleMode.toUpperCase()}</span>
        </div>
        <input type="text" value={currentValue} readOnly />
      </div>
      <div className="buttons scientific-buttons">
        <button className="btn btn-function" onClick={toggleAngleMode}>
          {angleMode.toUpperCase()}
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('sin')}>
          sin
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('cos')}>
          cos
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('tan')}>
          tan
        </button>
        <button className="btn btn-clear" onClick={clearDisplay}>
          C
        </button>
        <button className="btn btn-clear" onClick={clearEntry}>
          CE
        </button>

        <button className="btn btn-function" onClick={() => insertConstant('pi')}>
          π
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('asin')}>
          sin⁻¹
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('acos')}>
          cos⁻¹
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('atan')}>
          tan⁻¹
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('(')}>
          (
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay(')')}>
          )
        </button>

        <button className="btn btn-function" onClick={() => insertConstant('e')}>
          e
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('sinh')}>
          sinh
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('cosh')}>
          cosh
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('tanh')}>
          tanh
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('^')}>
          x^y
        </button>
        <button className="btn btn-operator" onClick={deleteLast}>
          ←
        </button>

        <button className="btn btn-function" onClick={() => handleScientificFunction('square')}>
          x²
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('cube')}>
          x³
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('sqrt')}>
          √x
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('cbrt')}>
          ³√x
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('/')}>
          ÷
        </button>
        <button className="btn btn-operator" onClick={() => appendToDisplay('*')}>
          ×
        </button>

        <button className="btn btn-memory" onClick={memoryClear}>
          MC
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
          −
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('factorial')}>
          n!
        </button>

        <button className="btn btn-memory" onClick={memoryRecall}>
          MR
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
        <button className="btn btn-function" onClick={() => handleScientificFunction('reciprocal')}>
          1/x
        </button>

        <button className="btn btn-memory" onClick={memoryAdd}>
          M+
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
        <button className="btn btn-function" onClick={() => handleScientificFunction('log')}>
          log
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('ln')}>
          ln
        </button>

        <button className="btn btn-memory" onClick={memorySubtract}>
          M−
        </button>
        <button className="btn" onClick={() => appendToDisplay('0')}>
          0
        </button>
        <button className="btn" onClick={() => appendToDisplay('.')}>
          .
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('negate')}>
          ±
        </button>
        <button className="btn btn-function" onClick={() => handleScientificFunction('exp')}>
          e^x
        </button>
        <button className="btn btn-equals" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  )
}

export default Calculator
