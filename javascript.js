
var pageState = {
  activeCartridge : null,
  insertDelay : 900,
  ejectDelay : 200,
  bufferLimitTop : 10,
  bufferLimitBottom : 700,
  bufferIncrement : 1,
  bufferFrameDelay : 0.4,
  cartridgeFrame : "up",
  isSliding: false,
  animationInProgress: false
}

//TODO: use cartridge config for describing global state
//TODO: implement event cancelling based on page state

var CartridgeConfig = {
  INSERTED: 1,
  EJECTED: 2,
};

var cartConfig = {
   slideDist : 70,
   slideFrameDelay : 3.5,
   // Pause between slide and click
   pause : 300,
   clickDist : 30,
   clickFrameDelay : 0.2,
   ejectFrameDelay : 0.5
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

  var expandContents = () => {


    currentState = pageState.cartridgeFrame
    setTimeout(()=>{
    if(currentState === "up"){
      console.log("on the first try");
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
    console.log(event);
    // function provides the cartridge insertion animation

    var element = event.currentTarget;

    if (pageState.cartridgeFrame === "up"){
      var cartContainter = document.getElementsByClassName("cartridge-container")[0];
      // Insert cart
      var cumulativeDelay = 0;
      // set style to 0 if doesn't exist at start
      element.style.marginTop = element.style.marginTop === "" ? utilMethods.convertToCss(1) : element.style.marginTop;
      for(var i = 0; i < cartConfig.slideDist; i++){
        console.log(element.style.marginTop);
        // slide cart
        setTimeout(()=>{
          element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) + 1);
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
      // eject
      var cartContainter = document.getElementsByClassName("cartridge-container-active")[0];
      cumulativeDelay = 0;
      console.log(element.style.marginTop);
      var loopstart = utilMethods.convertFromCss(element.style.marginTop)
      console.log(loopstart);
      for( i = loopstart; i > 0; i--){
        console.log(i);
        var distance = i*1 //clone
        setTimeout(()=>{
          element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) - 1); //declone
          console.log(element.style.marginTop);
          console.log("***");
          console.log(i*1)
          console.log(distance)
        }, cumulativeDelay);
        cumulativeDelay += cartConfig.ejectFrameDelay;
      }
      cartContainter.className = "cartridge-container"
    }
  }

  var wrapperFunction = (event) => {
    if( pageState.animationInProgress ){
      return;
    }
    pageState.animationInProgress = true
    clickDown(event);
    expandContents();
    setTimeout(() => {
      pageState.animationInProgress = false
    }, 1500)
  }

  for( i = 0; i < cartridges.length; i++){
    cartridges[i].addEventListener("click", wrapperFunction);
  }


}

window.onload = portfolioPage
