var utilMethods = {
  convertToCss : (int) => {
    return int.toString() + "px"
  },
  convertFromCss : (string) => {
    var result = parseInt(string.slice(0,-2))
    if(!result){
      return 0
    }
    return result
  },
  //increment may be positive or negative
  //physiucal increment is 1 or -1
  // times is distance because hte physical increment is one
  // temporal is how often this needs to happen to make the time
  moveMargin: function moveMargin(startingDelay, element, physicalIncrement, times, temporalIncrement){
    startingDelayCopy = startingDelay*1
    var initialMargin = utilMethods.convertFromCss(element.style.marginTop)
    for(var i=0; i < times; i++){
      setTimeout(() => {
        element.style.marginTop = utilMethods.convertToCss(utilMethods.convertFromCss(element.style.marginTop) + physicalIncrement);
        console.log("activTED")
      }, startingDelayCopy);
      startingDelayCopy += temporalIncrement
      console.log("starting delay:"+startingDelayCopy)
    }
    return startingDelayCopy
  },

  moveElementUp: function moveElementUp(startingDelay, element, distance, timeFrame){
    var requiredTemportalIncrement = (distance*1.0/timeFrame)
    return this.moveMargin(startingDelay, element, -1, distance, requiredTemportalIncrement)
  },

  //moves up by increasing marginTop
  moveElementDown: function moveElementDown(startingDelay, element, distance, timeFrame){
    console.log(element)
    var requiredTemportalIncrement = (timeFrame/distance)
    return this.moveMargin(startingDelay, element, 1, distance, requiredTemportalIncrement)
  }


}

/*


returns the resultant time cursor
*/
//moves up by reducing marginTop
