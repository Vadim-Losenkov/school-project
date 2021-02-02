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
    
    this.input()
  }
  
  input() {
    this.form.addEventListener('input', event => {
      const {type} = event.target.dataset
      const $el = this.form.querySelector(`[data-type="${type}"]`)
      const userValue = $el.value.trim().toLowerCase()
      if (type === 'counter') {
        const keyWords = ['катет', 'гипотенуза', 'площадь']
        keyWords.includes(userValue)
          ? this.trueClass($el) 
          : this.falseClass($el)
      } else if(type === 'value') {
        function isNumber() {
          return typeof +userValue === 'number' && +userValue !== NaN
        }
        true
          ? console.log(isNumber())//this.trueClass($el)
          : this.falseClass($el)
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