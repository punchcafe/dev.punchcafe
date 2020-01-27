
var pageState = {
  activeCartridge : null,
  insertDelay : 800,
  ejectDelay : 200,
  bufferLimitTop : 10,
  bufferLimitBottom : 700,
  bufferIncrement : 1,
  bufferFrameDelay : 0.4,
  cartridgeFrame : "up"
}

var cartConfig = {
   slideDist : 70,
   slideFrameDelay : 3.5,
   pause : 300,
   clickDist : 30,
   clickFrameDelay : 0.2
}

var utilMethods = {
  convertToCss : (int) => {
    return int.toString() + "px"
  },
  convertFromCss : (string) => {
    return parseInt(string.slice(0,-2))
  }
}

var portfolioPage = () => {

  var bufferHeight = pageState.bufferLimitBottom;

  var cartridges = document.getElementsByClassName("cartridge");
  var cartridgesHolder = document.getElementsByClassName("cartridges")[0];

  var top_buffer = document.getElementById("top-buffer");
  console.log(top_buffer)
  top_buffer.style.height = utilMethods.convertToCss(bufferHeight)


  var expandContents = () => {
    targetState = pageState.cartridgeFrame == "down" ? "up" : "down"
    slideFrame(targetState, top_buffer)
    pageState.cartridgeFrame = targetState
  }

  var slideFrame = (targetState, top_buffer) => {
    // Slide frame holding cartridges up or down the screen.
    var actions = (pageState.bufferLimitBottom - pageState.bufferLimitTop) / pageState.bufferIncrement;
    var delay = pageState.insertDelay*1;
    var increment = pageState.bufferIncrement * (targetState == "up" ? 1 : -1);
    // make it go up or down
    for(var i = 0; i < actions; i++){

      setTimeout(()=>{
        top_buffer.style.height = utilMethods.convertToCss(utilMethods.convertFromCss(top_buffer.style.height) + increment)
      }, delay);

      delay += pageState.bufferFrameDelay;
    }
  }

  var clickDown = (event) => {
    // Provides '64 esque cartridge clicking
    var element = event.currentTarget;
    if (pageState.cartridgeFrame == "up"){
      // Insert cart
      var cumulativeDelay = 0;
      for(var i = 0; i < cartConfig.slideDist; i++){
        // slide cart
        setTimeout(()=>{
          element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) + 1);
          console.log(element.style.marginTop)
        },cumulativeDelay);
        cumulativeDelay += cartConfig.slideFrameDelay;
      }
      cumulativeDelay += cartConfig.pause
      for(var i = 0; i < cartConfig.clickDist; i++){
        setTimeout(()=>{
          element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) + 1);
        },cumulativeDelay);
        cumulativeDelay += cartConfig.clickFrameDelay;
      }
    // element.style.marginTop = utilMethods.convertToCss(70);
    } else {
      // Add click mechanism
      element.style.marginTop = utilMethods.convertToCss(0);
    }
  }

  for( i = 0; i < cartridges.length; i++){
    cartridges[i].addEventListener("click", clickDown);
    cartridges[i].addEventListener("click", expandContents);
  }


}

window.onload = portfolioPage
