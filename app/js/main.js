$(function(){
  $('.slider__carousel-inner').slick({
    autoplay: true,
    autoplaySpeed: 500
  })
  
  mixitup('.portfolio-items')
})

class Pagination {
  constructor(toolbar, elements = []) {
    this.toolbar = document.querySelector(toolbar)
    this.elements = elements.map($el => document.querySelector($el))

    this.headerListener()
  }

  headerListener() {
    this.toolbar.addEventListener('click', event => {
      event.preventDefault()

      const pageClass = event.target.dataset.class
      if (pageClass !== undefined) {
        this.open(document.querySelector(pageClass))
      }
      const body = document.querySelector('body')
      
      switch (pageClass) {
        case '.wrapper-main':
          body.style.backgroundColor = '#7ec1c1'
          break;
        case '.wrapper-about':
          body.style.backgroundColor = '#ddd8c8'
          break;
        case '.wrapper-portfolio':
          body.style.backgroundColor = '#e28968'
          break;
        case '.wrapper-blog':
          body.style.backgroundColor = '#dad7d4'
          break;
        case '.wrapper-contact':
          body.style.backgroundColor = '#4e5258'
          break;
      }
    })
  }
  open(page) {
    this.elements.forEach($el => $el.classList.remove('open'))
    page.classList.add('open')
  }
}
const pagination = new Pagination(
  '[data-toolbar="header"]',
  [
    '[data-type="main"]',
    '[data-type="about"]',
    '[data-type="portofolo"]',
    '[data-type="blog"]',
    '[data-type="contact"]'
  ]
)

class Calculator {
  constructor(form) {
    this.form = document.querySelector(form)
    this.value = null
    this.inputType = ''
    this.formula = 'Формула'
    
    this.catet = null
    this.catet2 = null
    this.gip = null
    
    this.render()
  }
  render() {
    const html = () => {
      const inputSide = {
        value1: '<input type="text" data-info="catet" data-type="value-1" placeholder="Катет" />',
        value2: '<input type="text" data-info="catet2" data-type="value-2" placeholder="Катет" />',
        value3: '<input type="text" data-info="gip" data-type="value-3" placeholder="Гипотенуза" />',
      }
      
      function template(value) {
        switch (value) {
          case 'gip':
            return `
            ${inputSide.value1}
            ${inputSide.value2}
            `
            break;
          case 'catet':
            return `
            ${inputSide.value1}
            ${inputSide.value3}
            `
            break;
          case 's':
            return `
            ${inputSide.value1}
            ${inputSide.value2}
            ${inputSide.value3}
            `
            break;
        }
        return ''
      }
      return `
      <input type="text" data-type="counter" placeholder="Гипотенуза / Катет / Площадь" class="true" value="${this.inputType}"/>
      ${template(this.value)}
      <textarea data-type="ansver" placeholder="Ответ: "></textarea>
      <button type="submit" data-type="submit">Посчитать!</button>
      <div class="contact__button">
        <span class="contact__button-link" data-type="formula">
          ${this.formula}
        </span>
      </div>
      `
    }
    this.form.innerHTML = html()
    this.input()
  }
  
  input() {
    this.form.addEventListener('input', event => {
      const {type, info} = event.target.dataset
      const $el = this.form.querySelector(`[data-type="${type}"]`)
      const userValue = $el.value.trim().toLowerCase()
      
      const keyWords = ['катет', 'гипотенуза', 'площадь']
      const inputValues = ['value-1', 'value-2', 'value-3']
      const formuls = [
        'c = <span>a<sup>2</sup> + b<sup>2</sup></span>',
        'a = <span>c<sup>2</sup> - b<sup>2</sup></span>',
        's = <span class="s">a<sup>2</sup> + b<sup>2</sup> + c<sup>2</sup></span>'
      ]
      if (type === 'counter') {
        if (keyWords.includes(userValue)) {
          this.trueClass($el) 
          switch (true) {
            case userValue === keyWords[0]:
              this.value = 'catet'
              this.inputType = 'Катет'
              this.formula = formuls[1]
              this.render()
              break;
            case userValue === keyWords[1]:
              this.inputType = 'Гипотенуза'
              this.value = 'gip'
              this.formula = formuls[0]
              this.render()
              break;
            case userValue === keyWords[2]:
              this.inputType = 'Площадь'
              this.value = 's'
              this.formula = formuls[2]
              this.render()
              break;
          }
        } else {
          this.falseClass($el)
        }
      } else if(inputValues.includes(type)) {
        const countValue = +userValue
        if (!Number.isNaN(countValue) || countValue === 0) {
          this.trueClass($el)
          switch (true) {
            case info === 'catet':
              this.catet = $el.value
              break;
            case info === 'catet2':
              this.catet2 = $el.value
              break;
            case info === 'gip':
              this.gip = $el.value
              break;
          }
        } else {
          this.falseClass($el)
        }
      }
    })
    this.submit()
  }
  
  submit() {
    const $button = this.form.querySelector('[data-type="submit"]')
    const $ansver = this.form.querySelector('[data-type="ansver"]')
    $button.addEventListener('click', event => {
      event.preventDefault()
      switch (true) {
        case this.value === 'catet':
          const calc = calcCatet(this.gip, this.catet)
          $ansver.textContent = Number.isNaN(calc)
            ? 'гипотенуза не может быть меньше катета'
            : calc
          break;
        case this.value === 'gip':
          $ansver.textContent = calcGip(this.catet, this.catet2)
          break;
        case this.value === 's':
          $ansver.textContent = calcS(this.gip, this.catet, this.catet2)
          break;
      }
    })
  } 

  trueClass(input) {
    input.classList.add('true')
    input.classList.remove('false')
  }
  
  falseClass(input) {
    input.classList.add('false')
    input.classList.remove('true')
  }
}

const calculator = new Calculator('[data-form="calculator"]')

const calcCatet = (gip, catet) => Math.sqrt(gip**2 - catet**2)
const calcGip = (catet, catet2) => Math.sqrt(catet2**2 + catet**2)
const calcS = (catet, catet2, gip) => Math.sqrt(gip**2 + catet**2 + catet2**2)

// switch (true) {
//   case this.catet <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.catet2 <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.gip <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
// }