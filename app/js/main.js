$(function(){
  $('.slider__carousel-inner').slick({
    autoplay: true,
    autoplaySpeed: 1000
  })
  $('.blog-items__button-link').on('click', e => {
    e.preventDefault()
    $('body, html').animate({scrollTop: top}, 0)
  });
  const icon = $('[data-icon="bars"]')
  icon.on('click', () => {
    $('[data-menu="bars"]').toggleClass('open')
    $('[data-menu="title"]').toggleClass('close')
    icon.toggleClass('open')
  })
  mixitup('.portfolio-items')
  /*if ($('.wrapper-main.open')) {
    $('.home').css()
  } */
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
new Pagination(
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
    
    this.formuls = [
      'c = <span>a<sup>2</sup> + b<sup>2</sup></span>',
      'a = <span>c<sup>2</sup> - b<sup>2</sup></span>',
      's = (A × B)/2 '
    ]
    
    this.render()
  }
  render() {
    const html = () => {
      const inputSide = {
        value1: '<input type="text" data-info="catet" data-type="value-1" placeholder="Катет" />',
        value2: '<input type="text" data-info="catet2" data-type="value-2" placeholder="Катет" />',
        value3: '<input type="text" data-info="gip" data-type="value-3" placeholder="Гипотенуза" />',

        s1: '<input type="text" data-info="catet" data-type="value-1" placeholder="1 сторона" />',
        s2: '<input type="text" data-info="catet2" data-type="value-2" placeholder="2 сторона" />'
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
            ${inputSide.s1}
            ${inputSide.s2}
            `
            break;
        }
        return ''
      }
      return `
      <div id="select-wrapper">
        <div class="select" data-type="select">
          <div class="select__item" data-id="cat">
            Катет
          </div>
          <div class="select__item" data-id="gip">
            Гипотенуза
          </div>
          <div class="select__item" data-id="s">
            Площадь
          </div>
        </div>
        <input type="text" data-type="counter" placeholder="Гипотенуза / Катет / Площадь" class="true main" value="${this.inputType}"/>
      </div>
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
    this.clickHandler()
  }
  
  clickHandler() {
    const select = this.form.querySelector('[data-type="select"]')
    document.addEventListener('click', event => {
      const {type, id} = event.target.dataset
      if (type === 'counter') {
        selectOpener(select).open()
        this.clearValueError(this.form)
      } else {
        selectOpener(select).close()
      }
    })
    select.addEventListener('click', event => {
      const {id} = event.target.dataset
      this.clearValueError(this.form)
      if (id === 'cat') {
        this.value = 'catet'
        this.inputType = 'Катет'
        this.formula = this.formuls[1]
        this.render()
      }
      if (id === 'gip') {
        this.inputType = 'Гипотенуза'
        this.value = 'gip'
        this.formula = this.formuls[0]
        this.render()
      }
      if (id === 's') {
        this.inputType = 'Площадь'
        this.value = 's'
        this.formula = this.formuls[2]
        this.render()
      }
    })
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
        's = (A × B)/2 '
      ]
      if (type === 'counter') {
        if (keyWords.includes(userValue)) {
          this.trueClass($el) 
          switch (true) {
            case userValue === keyWords[0]:
              this.value = 'catet'
              this.inputType = 'Катет'
              this.formula = this.formuls[1]
              this.render()
              break;
            case userValue === keyWords[1]:
              this.inputType = 'Гипотенуза'
              this.value = 'gip'
              this.formula = this.formuls[0]
              this.render()
              break;
            case userValue === keyWords[2]:
              this.inputType = 'Площадь'
              this.value = 's'
              this.formula = this.formuls[2]
              this.render()
              break;
          }
        } else {
          this.falseClass($el)
        }
      } else if(inputValues.includes(type)) {
        const countValue = +userValue
        if (!Number.isNaN(countValue)) {
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
          this.submit(true)
        }
      }
    })
    this.submit()
  }
  
  submit(err) {
    const $button = this.form.querySelector('[data-type="submit"]')
    const $ansver = this.form.querySelector('[data-type="ansver"]')
    
    $button.addEventListener('click', event => {
      if (err) {
        $ansver.textContent = this.valueError('введены некорректные значения')
      } else {
        event.preventDefault()
        switch (true) {
          case this.value === 'catet':
            let calc = calcCatet(this.gip, this.catet)
            $ansver.textContent = Number.isNaN(calc)
              ? this.valueError('гипотенуза не может быть меньше катета')
              : this.clearValueError(calc)
            break;
          case this.value === 'gip':
            $ansver.textContent = calcGip(this.catet, this.catet2)
            break;
          case this.value === 's':
            const calculate = calcS(this.catet, this.catet2)
            $ansver.textContent = calculate
            break;
        }
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

  valueError (text) {
    this.form.classList.add('error')
    return text
  }
  clearValueError (value) {
    this.form.classList.remove('error')
    return value
  }
}

const calculator = new Calculator('[data-form="calculator"]')

const calcCatet = (gip, catet) => Math.sqrt(gip**2 - catet**2)
const calcGip = (catet, catet2) => Math.sqrt(catet2**2 + catet**2)
const calcS = (catet, catet2) => (catet*catet2)/2

function selectOpener(select) {
  function toggle() {
    isOpen() ? close() : open()
  }
  function isOpen() {
    return select.classList.contains('open')
  }
  function open() {
    return select.classList.add('open')
  }
  function close() {
    return select.classList.remove('open')
  }
  
  return {
    open,
    close,
    toggle
  }
}

class Gallery {
  constructor($main, $overlay) {
    this.$main = document.querySelector($main)
    this.$overlay = this.$main.querySelector($overlay)
    this.img = ''
    
    this.init()
  }
  
  overlayHandler () {
    this.$overlay.addEventListener('click', event => {
      selectOpener(this.$img).close()
      selectOpener(this.$overlay).close()
      document.querySelector('body').style.overflow = 'visible'
      this.$img.style.display = 'none'
    })
  }
  
  clickHandler(event) {
    event.preventDefault()
    const $el = event.target.closest('[data-type="gallery-item"]')
    const index = $el.dataset.order
    this.$img = document.querySelector(`.portfolio-item__img-${index}`)
    
    selectOpener(this.$img).open()
    selectOpener(this.$overlay).open()
    document.querySelector('body').style.overflow = 'hidden'
    if (this.$img.classList.contains('open')) {
      this.$img.style.display = 'block'
      this.$img.style.zIndex = '3000'
    }
  }
  
  init() {
    this.$main.addEventListener('click', event => this.clickHandler(event))
    this.overlayHandler()
  }
  
  destroy() {
    this.$main.removeEventListener('click', event => this.clickHandler(event))
  }
}

new Gallery('.portfolio-items', '[data-overlay="img"]')


// switch (true) {
//   case this.catet <= 0:
//     $ansver.textConten.t = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.catet2 <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.gip <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
// }