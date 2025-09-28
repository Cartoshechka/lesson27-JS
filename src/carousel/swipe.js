import Carousel from './core.js'
import { DEFAULT_SETTINGS } from './helpers/config.js'

class SwipeCarousel extends Carousel {
  #swipeThreshold
  #swipeStartX
  #swipeEndX
  #slidesContainer
  
  constructor(options) {
    const swipeSettings = {...DEFAULT_SETTINGS, swipeThreshold: 100, ...options}
    super(swipeSettings)
    // Добавляем пороговое значение для свайпа
    this.#slidesContainer = this.slides[0]?.parentElement
    this.#swipeThreshold = swipeSettings.swipeThreshold
  }

  init() {
    super.init()
    this.container.addEventListener('dragstart', this.#preventDrag)
    this.#slidesContainer.addEventListener('touchstart', this.#swipeStartHandler.bind(this))
    this.#slidesContainer.addEventListener('mousedown', this.#swipeStartHandler.bind(this))
    this.#slidesContainer.addEventListener('touchend', this.#swipeEndHandler.bind(this))
    this.#slidesContainer.addEventListener('mouseup', this.#swipeEndHandler.bind(this))
    // Добавляем предотвращение скролла страницы при свайпе
    this.#slidesContainer.addEventListener('touchmove', (e) => e.preventDefault())
  }

  #preventDrag(e) {
    e.preventDefault()
    return false
  }

  #swipeStartHandler(e) {
    this.#swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
  }

  #swipeEndHandler(e) {
    this.#swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
    const swipeDistance = this.#swipeEndX - this.#swipeStartX
    if (swipeDistance > this.#swipeThreshold) {
      this.prev()
    } else if (swipeDistance < -this.#swipeThreshold) {
      this.next()
    }
  }
}

export default SwipeCarousel