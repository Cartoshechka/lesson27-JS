import SwipeCarousel from './carousel/index.js'

const carousel = new SwipeCarousel({
  containerId:'#mycarousel',
  slideId: '.item',
  interval: 1000
})

carousel.init()

// Код логіки слайдера пишемо тут
//
// function Carousel() {}
//
// Carousel.prototype = {
//   _initProps(){
//     this.container = document.querySelector('#carousel')
//     this.slidesContainer = this.container.querySelector('#slides-container')
//     this.slides = this.container.querySelectorAll('.slide')
//     this.indicatorsContainer = this.container.querySelector('#indicators-container')
//     this.indicators = this.container.querySelectorAll('.indicator')
//     this.pauseBtn = this.container.querySelector('#pause-btn')
//     this.prevBtn = this.container.querySelector('#prev-btn')
//     this.nextBtn = this.container.querySelector('#next-btn')
//
//     this.SLIDES_COUNT = this.slides.length
//     this.CODE_ARROW_RIGHT = 'ArrowRight'
//     this.CODE_ARROW_LEFT = 'ArrowLeft'
//     this.CODE_SPACE = 'Space'
//     this.FA_PAUSE = '<i class="fas fa-pause"></i>'
//     this.FA_PLAY = '<i class="fas fa-play"></i>'
//     this.TIMER_INTERVAL = 2000
//     this.SWIPE_THRESHOLD = 100
//
//     this.currentSlide = 0
//     this.isPlaying = true
//     this.timerID = null
//     this.swipeStartX = null
//     this.swipeEndX = null
//   },
//
//   _initControls(){
//     // TODO
//   },
//
//   _initIndicators(){
//     // TODO
//   },
//
//   _initEventListeners() {
//     this.pauseBtn.addEventListener('click', () => this.pausePlayHandler())
//     this.nextBtn.addEventListener('click', () => this.nextHandler())
//     this.prevBtn.addEventListener('click', () => this.prevHandler())
//     this.indicatorsContainer.addEventListener('click', (e) => this._indicatorClickHandler(e))
//     document.addEventListener('keydown', (e) => this._keydownHandler(e))
//   },
//
//   _gotoNthSlide(n) {
//     this.slides[this.currentSlide].classList.remove('active')
//     this.indicators[this.currentSlide].classList.remove('active')
//     this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
//     this.slides[this.currentSlide].classList.add('active')
//     this.indicators[this.currentSlide].classList.add('active')
//   },
//
//   _gotoNextSlide() {
//     this._gotoNthSlide(this.currentSlide + 1)
//   },
//
//   _gotoPrevSlide() {
//     this._gotoNthSlide(this.currentSlide - 1)
//   },
//
//   _tick() {
//     this.timerID = setInterval(() => this._gotoNextSlide(), this.TIMER_INTERVAL)
//   },
//
//
//   _indicatorClickHandler(e) {
//     const { target } = e
//     if (target && target.classList.contains('indicator')) {
//       const slideTo = +target.dataset.slideTo
//       this.pauseHandler()
//       this._gotoNthSlide(slideTo)
//     }
//   },
//
//   _keydownHandler(e) {
//     switch (e.code) {
//       case this.CODE_SPACE:
//         e.preventDefault()
//         this.pausePlayHandler()
//         break
//       case this.CODE_ARROW_RIGHT:
//         e.preventDefault()
//         this.nextHandler()
//         break
//       case this.CODE_ARROW_LEFT:
//         e.preventDefault()
//         this.prevHandler()
//         break
//     }
//   },
//
//
//
//   playHandler() {
//     this.pauseBtn.innerHTML = this.FA_PAUSE
//     this.isPlaying = true
//     this._tick()
//   },
//
//   pauseHandler() {
//     if (!this.isPlaying) return
//     this.isPlaying = false
//     this.pauseBtn.innerHTML = this.FA_PLAY
//     clearInterval(this.timerID)
//   },
//
//   pausePlayHandler() {
//     this.isPlaying ? this.pauseHandler() : this.playHandler()
//   },
//
//   prevHandler() {
//     this.pauseHandler()
//     this._gotoPrevSlide()
//   },
//
//   nextHandler() {
//     this.pauseHandler()
//     this._gotoNextSlide()
//   },
//
//   init() {
//     this._initProps()
//     this._initEventListeners()
//     this._tick()
//   }
// }
//
// Carousel.prototype.constructor = Carousel
//
// function SwiperCarousel() {
//   Carousel.apply(this)
// }
//
// SwiperCarousel.prototype = Object.create(Carousel.prototype)
// SwiperCarousel.prototype.constructor = SwiperCarousel
//
// SwiperCarousel.prototype._initEventListeners = function() {
//   Carousel.prototype._initEventListeners.apply(this)
//   this.slidesContainer.addEventListener('touchstart', (e) => this._swipeStartHandler(e))
//   this.slidesContainer.addEventListener('mousedown', (e) => this._swipeStartHandler(e))
//   this.slidesContainer.addEventListener('touchend', (e) => this._swipeEndHandler(e))
//   this.slidesContainer.addEventListener('mouseup', (e) => this._swipeEndHandler(e))
// }
//
// SwiperCarousel.prototype._swipeStartHandler = function(e) {
//   this.swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
// }
//
// SwiperCarousel.prototype._swipeEndHandler = function(e) {
//   this.swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
//   const swipeDistance = this.swipeEndX - this.swipeStartX
//   switch (true) {
//     case swipeDistance > this.SWIPE_THRESHOLD:
//       this.prevHandler()
//       break
//     case swipeDistance < -this.SWIPE_THRESHOLD:
//       this.nextHandler()
//       break
//   }
// }
//
//
// const carousel = new SwiperCarousel()
// carousel.init()