class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  clear() {
    document.getElementById("error").style.display = "none";
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete() {
    document.getElementById("error").style.display = "none";
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  changeSign() {
    return this.currentOperand = -(this.currentOperand)
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '^':
        computation = Math.pow(prev, current)
        break
      default:
        return
    }
    
  
    if (!isFinite(computation)) {
      console.log("pagavau klaida")
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = "error"
      this.currentOperand = ''
      console.log(this.currentOperand)
      //this.currentOperandTextElement.innerText = this.currentOperand
      //document.getElementById("er").innerHTML = 'error'
      this.currentOperandTextElement.innerText = this.currentOperand
      this.operation = undefined
      this.previousOperand = ''
    }
    else {
      this.currentOperand = parseFloat(computation.toFixed(10))
      this.operation = undefined
      this.previousOperand = ''
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    let length = (stringNumber + '').replace('.', '').replace('-', '').length;
     
    if (length > 10) {
      return stringNumber.slice(0, 10)
    }

    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    function isMinusZero(integerDigits) {
      return 1/integerDigits === -Infinity;
    }
   
      if(isMinusZero(integerDigits)){
        if (decimalDigits != null) {
          return `-0.${decimalDigits}`
        } else {
          return -integerDisplay
        }
    }
    
   

    if (isNaN(integerDigits)) {
      return integerDisplay = ''
    }

  
    else {
      integerDisplay = integerDigits  
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }
    else {
      this.previousOperandTextElement.innerText = ''
    }
  }


  sqrtNumber(){
    const current = parseFloat(this.currentOperand)
    let computation = Math.sqrt(current)
    console.log(computation)
    if (!isFinite(computation)){
      this.previousOperand = ''
      this.operation = undefined
      this.currentOperand = 'error'
      this.currentOperandTextElement.innerText = this.currentOperand
      this.currentOperand = ''
    }
    else{
      this.previousOperand = current;
      this.operation = '√'
      this.currentOperand = computation
      this.previousOperandTextElement.innerText =
      `${this.operation} ${this.getDisplayNumber(this.previousOperand)}`
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    }
  }
}
const numberButtons = document.querySelectorAll('[data-number]')
const signButtons = document.querySelectorAll('[data-sign]')
const sqrtButtons = document.querySelectorAll('[data-sqrt]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

signButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.changeSign()
    calculator.updateDisplay()
  })
})

sqrtButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log("pagavau sqrt")
    calculator.sqrtNumber()
    
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
  document.getElementById("error").innerHTML = ''
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
  document.getElementById("error").innerHTML = ''
})
