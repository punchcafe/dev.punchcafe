
var pageState = {
  activeCartridge : null,
  insertDelay : 900,
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
  //top_buffer.style.height = utilMethods.convertToCss(bufferHeight)

  var expandContents = () => {
    currentState = pageState.cartridgeFrame
    setTimeout(()=>{
    if(currentState === "up"){
        // TODO: make sure these are the same way around
        var  topBuffer = document.getElementById("top-buffer");
        var  contentsContainer = document.getElementById("contents-container");
        topBuffer.id = "top-buffer-contracted";
        contentsContainer.id = "contents-container-expanded";
        pageState.cartridgeFrame = "down";
      } else {
        var  topBuffer = document.getElementById("top-buffer-contracted");
        var contentsContainer = document.getElementById("contents-container-expanded");
        topBuffer.id = "top-buffer";
        contentsContainer.id = "contents-container";
        pageState.cartridgeFrame = "up";
      }
    }, pageState.insertDelay)
  }

  var clickDown = (event) => {
    // Provides '64 esque cartridge clicking

    var element = event.currentTarget;
    if (pageState.cartridgeFrame == "up"){
      var cartContainter = document.getElementsByClassName("cartridge-container")[0];
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
      setTimeout(() => {
        cartContainter.className = "cartridge-container-active"
      }, cumulativeDelay);
      for(var i = 0; i < cartConfig.clickDist; i++){
        setTimeout(()=>{
          element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) + 1);
        },cumulativeDelay);
        cumulativeDelay += cartConfig.clickFrameDelay;
      }
    // element.style.marginTop = utilMethods.convertToCss(70);
    } else {
      // Add click mechanism
      var cartContainter = document.getElementsByClassName("cartridge-container-active")[0];
      element.style.marginTop = utilMethods.convertToCss(0);
      cartContainter.className = "cartridge-container"
    }
  }

  for( i = 0; i < cartridges.length; i++){
    cartridges[i].addEventListener("click", clickDown);
    cartridges[i].addEventListener("click", expandContents);
  }


}

window.onload = portfolioPage
