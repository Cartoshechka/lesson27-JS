export  const DEFAULT_SETTINGS = {
  containerId: '#carousel',
  slideId: '.slide',
  interval: 5000,
  isPlaying: true,
  // swipeThreshold: 100
  // keyboardControl: true
  // infinite: true
  // autoPlay: true
}

export const CSS_CLASSES = {
  ACTIVE: 'active',
  INDICATORS: 'indicators',
  INDICATOR: 'indicator',
  CONTROLS: 'controls',
  PAUSE_BTN: 'control control-pause',
  PREV_BTN: 'control control-prev',
  NEXT_BTN: 'control control-next',
}

export const ELEMENT_IDS={
  INDICATORS_CONTAINER: 'indicators-container',
  CONTROLS_CONTAINER: 'controls-container',
  PAUSE_BTN: 'pause-btn',
  PREV_BTN: 'prev-btn',
  NEXT_BTN: 'next-btn',
}

export const KEYBOARD_CODES = {
  SPACE: 'Space',
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
}

export default {DEFAULT_SETTINGS, CSS_CLASSES, ELEMENT_IDS, KEYBOARD_CODES}