// Код логіки слайдера пишемо тут

import { DEFAULT_SETTINGS, ELEMENT_IDS,CSS_CLASSES, KEYBOARD_CODES } from './helpers/config.js'

class Carousel {
  // Private state variables
  #currentSlide
  #timerID

  // Private DOM elements
  #pauseBtn
  #nextBtn
  #prevBtn
  #indicatorsContainer
  #indicatorsItems

  // Privete consts
  #SLIDES_COUNT
  #CODE_ARROW_RIGHT
  #CODE_ARROW_LEFT
  #CODE_SPACE
  #FA_PAUSE
  #FA_PLAY
  #FA_PREV
  #FA_NEXT

  constructor(options) {
    // const settings=this._initConfig(options)

    const settings = {...DEFAULT_SETTINGS, ...options}
    this.container = document.querySelector(settings.containerId)
    this.slides = this.container.querySelectorAll(settings.slideId)
    this.TIMER_INTERVAL = settings.interval
    this.isPlaying = settings.isPlaying
  }

  /*  _initConfig(objectWithInnerParams){
       /!* const defaultSettings = { containerId: '#carousel', slideId: '.slide', interval: 5000, isPlaying: true,
        }*!/

      // return { ...defaultSettings, ...objectWithInnerParams }

     /!* return {...{ containerId: '#carousel', slideId: '.slide', interval: 5000, isPlaying: true,
        }, ...objectWithInnerParams}*!/
      /!*
      if (objectWithInnerParams === undefined) {
        return defaultSettings
      }
      *!/

  /!*
      resultObject.containerId = objectWithInnerParams.containerId || defaultSettings.containerId
      resultObject.slideId = objectWithInnerParams.slideId || defaultSettings.slideId
      resultObject.interval = objectWithInnerParams.interval || defaultSettings.interval
      resultObject.isPlaying = objectWithInnerParams.isPlaying || defaultSettings.isPlaying
  *!/
    }*/

  _initProps(){
    // this.container = document.querySelector('#carousel')
    // this.slides = this.container.querySelectorAll('.slide')
    // this.slidesContainer = this.container.querySelector('#slides-container')


    this.#currentSlide = 0


    this.#SLIDES_COUNT = this.slides.length
    this.#CODE_ARROW_RIGHT = KEYBOARD_CODES.RIGHT_ARROW
    this.#CODE_ARROW_LEFT = KEYBOARD_CODES.LEFT_ARROW
    this.#CODE_SPACE = KEYBOARD_CODES.SPACE
    this.#FA_PAUSE = '<i class="fas fa-pause"></i>'
    this.#FA_PLAY = '<i class="fas fa-play"></i>'
    this.#FA_PREV = '<i class="fas fa-chevron-left"></i>'
    this.#FA_NEXT = '<i class="fas fa-chevron-right"></i>'
    // this.TIMER_INTERVAL = 2000


  }

  _initControls(){
    /*
     <div id="controls-container" class="controls">
      <div class="control control-pause" id="pause-btn">
        <i class="fas fa-pause"></i>
      </div>
      <div class="control control-prev" id="prev-btn">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div class="control control-next" id="next-btn">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
     */
    const controlsContainer = document.createElement('div')
    controlsContainer.classList.add(CSS_CLASSES.CONTROLS)
    controlsContainer.setAttribute('id', ELEMENT_IDS.CONTROLS_CONTAINER)

    const PAUSE_BTN = `<div class="control control-pause" id="${ELEMENT_IDS.PAUSE_BTN}">${ this.#FA_PAUSE }</div>`
    const PREV_BTN = `<div class="control control-prev" id="${ELEMENT_IDS.PREV_BTN}">${ this.#FA_PREV }</div>`
    const NEXT_BTN = `<div class="control control-next" id="${ELEMENT_IDS.NEXT_BTN}">${ this.#FA_NEXT }</div>`

    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN


    this.container.append(controlsContainer)

    this.#pauseBtn = this.container.querySelector(`#${ELEMENT_IDS.PAUSE_BTN}`)
    this.#prevBtn = this.container.querySelector(`#${ELEMENT_IDS.PREV_BTN}`)
    this.#nextBtn = this.container.querySelector(`#${ELEMENT_IDS.NEXT_BTN}`)
  }

  _initIndicators(){
    /*
     <div id="indicators-container" class="indicators">
          <div class="indicator active" data-slide-to="0"></div>
          <div class="indicator" data-slide-to="1"></div>
          <div class="indicator" data-slide-to="2"></div>
          <div class="indicator" data-slide-to="3"></div>
          <div class="indicator" data-slide-to="4"></div>
        </div>
      </div>
    */

    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.classList.add(CSS_CLASSES.INDICATORS)
    indicatorsContainer.setAttribute('id', ELEMENT_IDS.INDICATORS_CONTAINER)

    this.container.append(indicatorsContainer)

    for (let i = 0; i < this.#SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class',i ? CSS_CLASSES.INDICATOR: `${CSS_CLASSES.INDICATOR} ${CSS_CLASSES.ACTIVE}`)
      indicator.dataset.slideTo = `${i}`
      indicatorsContainer.append(indicator)
    }

    this.#indicatorsContainer = this.container.querySelector(`#${ELEMENT_IDS.INDICATORS_CONTAINER}`)
    this.#indicatorsItems = this.container.querySelectorAll(`.${CSS_CLASSES.INDICATOR}`)
  }

  _initEventListeners() {
    this.#pauseBtn.addEventListener('click', () => this.pausePlay())
    this.#nextBtn.addEventListener('click', () => this.next())
    this.#prevBtn.addEventListener('click', () => this.prev())
    this.#indicatorsContainer.addEventListener('click', (e) => this.#indicatorClick(e))
    document.addEventListener('keydown', (e) => this.#keydownHandler(e))
  }

  #gotoNthSlide(n) {
    this.slides[this.#currentSlide].classList.remove(CSS_CLASSES.ACTIVE)
    this.#indicatorsItems[this.#currentSlide].classList.remove(CSS_CLASSES.ACTIVE)
    this.#currentSlide = (n + this.#SLIDES_COUNT) % this.#SLIDES_COUNT
    this.slides[this.#currentSlide].classList.add(CSS_CLASSES.ACTIVE)
    this.#indicatorsItems[this.#currentSlide].classList.add(CSS_CLASSES.ACTIVE)
  }

  #gotoNextSlide() {
    this.#gotoNthSlide(this.#currentSlide + 1)
  }

  #gotoPrevSlide() {
    this.#gotoNthSlide(this.#currentSlide - 1)
  }

  _tick() {
    this.#timerID = setInterval(() => this.#gotoNextSlide(), this.TIMER_INTERVAL)
  }


  #indicatorClick(e) {
    const { target } = e
    if (target && target.classList.contains(CSS_CLASSES.INDICATOR)) {
      const slideTo = +target.dataset.slideTo
      this.pause()
      this.#gotoNthSlide(slideTo)
    }
  }

  #keydownHandler(e) {
    switch (e.code) {
      case this.#CODE_SPACE:
        e.preventDefault()
        this.pausePlay()
        break
      case this.#CODE_ARROW_RIGHT:
        e.preventDefault()
        this.next()
        break
      case this.#CODE_ARROW_LEFT:
        e.preventDefault()
        this.prev()
        break
    }
  }



  play() {
    this.#pauseBtn.innerHTML = this.#FA_PAUSE
    this.isPlaying = true
    this._tick()
  }

  pause() {
    if (!this.isPlaying) return
    this.isPlaying = false
    this.#pauseBtn.innerHTML = this.#FA_PLAY
    clearInterval(this.#timerID)
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  prev() {
    this.pause()
    this.#gotoPrevSlide()
  }

  next() {
    this.pause()
    this.#gotoNextSlide()
  }

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initEventListeners()
    this._tick()
  }
}

export default Carousel