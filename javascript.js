
var pageState = {
  activeCartridge : null,
  insertDelay : 300,
  bufferLimitTop : 10,
  bufferLimitBottom : 700,
  bufferIncrement : 1,
  bufferFrameDelay : 0.4
}

var wholeThing = () => {

  //Have a global state of 'clicked'

  var bufferHeight = 50;

  var convertToCss = (int) => {
    return int.toString() + "px"
  }

  var convertFromCss = (string) => {
    return parseInt(string.slice(0,-2))
  }

// function for '64 cartridge animation
  var clickDown = (event) => {
    var element = event.currentTarget;
    if (state == "up"){
    element.style.marginTop = convertToCss(70);
  } else {
    // Add click mechanism
    element.style.marginTop = convertToCss(0);
  }
    console.log(element.style.height)
  }


var cartridges = document.getElementsByClassName("cartridge");

var cartridgesHolder = document.getElementsByClassName("cartridges")[0];

var top_buffer = document.getElementById("top-buffer");
top_buffer.style.height = convertToCss(bufferHeight)

state = "up"

var expandContents = () => {
  targetState = state == "down" ? "up" : "down"
  slideFrameTwo(targetState, top_buffer)
  state = targetState
  //top_buffer.style.height = top_buffer.style.height == "50px" ? "800px" : "50px";
}

var slideFrameTwo = (targetState, top_buffer) => {
  var actions = (pageState.bufferLimitBottom - pageState.bufferLimitTop) / pageState.bufferIncrement;
  var delay = pageState.insertDelay*1;
  var increment = pageState.bufferIncrement * (targetState == "up" ? 1 : -1);
  // make it go up or down
  for(var i = 0; i < actions; i++){
    setTimeout(()=>{
      top_buffer.style.height = convertToCss(convertFromCss(top_buffer.style.height) + increment)
    }, delay);
    delay += pageState.bufferFrameDelay;
  }
  // calculate needed times before, then set that many timeouts with insertDelay
}

for( i = 0; i < cartridges.length; i++){
  cartridges[i].addEventListener("click", clickDown);
  cartridges[i].addEventListener("click", expandContents);
}

var insertCart = (cartridge) => {
}


}

window.onload = wholeThing
