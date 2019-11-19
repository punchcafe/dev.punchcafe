
var wholeThing = () => {

  var bufferHeight = 50;

  var convertToCss = (int) => {
    return int.toString() + "px"
  }



var cartridges = document.getElementsByClassName("cartridge");

var top_buffer = document.getElementById("top-buffer");
top_buffer.style.height = convertToCss(bufferHeight)

state = "down"

var expandContents = () => {
  targetState = state == "down" ? "up" : "down"
  slideFrame(targetState, top_buffer)
  state = targetState
  //top_buffer.style.height = top_buffer.style.height == "50px" ? "800px" : "50px";
}

for( i = 0; i < cartridges.length; i++){
  cartridges[i].addEventListener("click", expandContents);
}


var slideFrame = (increment, element) => {
  base_pixels = 50
  top_pixels = 800
  if(increment == "up"){
    console.log("up!")
    var incrementer = setInterval(() => {
      element.style.height = convertToCss(bufferHeight);
      bufferHeight = bufferHeight -10
      if(bufferHeight <= 10){
        clearInterval(incrementer)
      }
    },1)
  } else if (increment == "down"){

    var incrementer = setInterval(() => {
      console.log("triggered")
      element.style.height = convertToCss(bufferHeight);
      bufferHeight = bufferHeight +10
      console.log("going down!")
      console.log(element.style.height)
      if(bufferHeight >= 800){
        clearInterval(incrementer)
      }
    },1)

  }
}
}

window.onload = wholeThing
