//----------------------------------------------------------//

const START = 1;            // First anchor starts with 1
const PREFIX_ANCHOR = "a"   // id = "a1" (see HTML-code below)
const TIME_WAIT = 500       // blocking-time (ms) between every scroll/slide event
const ELEMENT_SLIDE = "scroll-page" // HTML-element for every slide

//----------------------------------------------------------//

const HASH = "#"
var anchor;
var containers;
var mouse_y;
var scroll_locked = false;
var timeout_scroll_lock = null;

function sideshow_wheel(event) {
  if (event !== undefined) event.preventDefault()
  if (scroll_locked == true) return
  scroll_locked = true
  window.clearTimeout(timeout_scroll_lock)
  timeout_scroll_lock = window.setTimeout(function(){
    scroll_locked = false
  }, TIME_WAIT);

  if (event !== undefined){
    if (event.deltaY > 0) anchor++
    else if (event.deltaY < 0) anchor--
  }
  if (anchor > containers) anchor = containers
  else if (anchor < START) anchor = START;
  window.location = HASH + PREFIX_ANCHOR + parseInt(anchor)
}

function sideshow_init(){
containers = document.getElementsByTagName(ELEMENT_SLIDE).length
if(containers < 1){
  console.error("No "+ELEMENT_SLIDE+"-elements found!")
  return
}
anchor = parseInt(location.hash.substring(location.hash.length -1))
if (isNaN(anchor)) anchor = START;

mouse_y = 0;
sideshow_wheel()
}

function sideshow_mousedown(event){
  mouse_y = event.screenY;
}

function sideshow_mouseup(event){
 event.deltaY = mouse_y - event.screenY;
 sideshow_wheel(event);
}

window.onload = sideshow_init
window.onwheel = sideshow_wheel
window.onmousedown = sideshow_mousedown
window.onmouseup = sideshow_mouseup