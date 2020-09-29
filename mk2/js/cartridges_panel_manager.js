function initialiseCartridgePanelManager(documentObjectModel, globalPageState){

/*
RULES: 
  - Each click action is responsible for moving the anchor to the correct place. this is because it 
    needs to trigger the animation of moving the cartridge to the cartridge line, then inserting
  - Each updateBehaviour will reset the focus row for redundancy. each one of these calls _should_ return
    a 0 delay, since the cartridge container _should_ already be where it belongs
*/ 

  /*
  The next big step here is to make sure that responsibilities of any animations end when they
  change the global state, and it is then the job of the reaction update_behaviour to make sure
  the rest is correctly displayed. This will mean for this panel we cannot rely on class transitions
  as we need to have pin point precision on the transitions of buffer size as well as window height to keep 
  them in sync.
  !! For example, we need a utility method which can harmoniously shrink the div size while focusing on the base
  of one cartridge.
  */
  var cartridgePanelManager = {

    domainElement: documentObjectModel.getElementById("cartridge-panel"),
    absCartContainer: documentObjectModel.getElementById("cartridge-row-absolute-container"),
    floatingCartBox: documentObjectModel.getElementById("cartridge-row-absolute-container"),
    gps: globalPageState,
    currentDisplayMode: null,
    previousDisplayMode: null,

    idToRow: {},
    totalNumberOfRows: null,
    _focusedRow: null,

    // TODO get dynamically
    _cartridgeSize: 152,

    _timePerRowFocus: 200,
    // This is the id of the cartridge, currently being animated on. NOT the active
    // target. It's primary purpose is to stop any other opertations while one is already in process.
    clickedCartridgeId: null,

    update: function updateBehaviour(){
      switch(this.gps.getDisplayMode()){
        // TODO: ESTABLISH RESPONSIBILITIES OF EACH CASE
        case displayModes.LANDING:
          this.domainElement.className = "cartridge-panel-landing-state";
          this.focusOnRow(0);
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.LANDING;
          break;

        case displayModes.PROJECT:
          this.domainElement.className = "cartridge-panel-project-state";
          var row = this.idToRow[this.gps.activeCartridgeId]
          this.focusOnRow(row)
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.PROJECT;
          break;

        case displayModes.PROJECTS:
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.PROJECTS;
          this.focusOnRow(4)
          this.domainElement.className = "cartridge-panel-projects-state";
          break;
      }
    },

    clickOnShowAllProjectsEvent(event){
      if(cartridgePanelManager.currentDisplayMode == displayModes.PROJECT) {
        cartridgePanelManager.ejectCartridgeWithCallBack(
                              documentObjectModel.getElementById(cartridgePanelManager.gps.activeCartridgeId),
                              cartridgePanelManager.gps.setDisplayModeToProjects)
      } if ( cartridgePanelManager.currentDisplayMode == displayModes.LANDING){
        cartridgePanelManager.gps.setDisplayModeToProjects()
      } else if(cartridgePanelManager.currentDisplayMode == displayModes.PROJECTS){
        cartridgePanelManager.gps.setDisplayModeToLanding();
      }
    },

    //To be applied on the individual cartridge animation level, not the containing boc
    clickOnCartridgeEvent: (event) => {
      if(cartridgePanelManager.clickedCartridgeId != null){
        // Process already in progress
        return;
      }

      var cartridgeElement = event.currentTarget
      if(cartridgePanelManager.gps.activeCartridgeId === null){
        // Lock other cartridges from firing

        
        if(cartridgePanelManager.currentDisplayMode == displayModes.PROJECTS){
          var row = cartridgePanelManager.idToRow[cartridgeElement.id]
          cartridgePanelManager.focusOnCartridge(cartridgeElement.id);
          //var initialDelay = utilMethods.moveElementDown(0, cartridgePanelManager.floatingCartBox, window.innerHeight - (152*row) -150, 500);
          var delay = cartridgePanelManager.insertCartridgeWithCallback(cartridgeElement, cartridgePanelManager.gps.setDisplayModeToProject, 500)
          // WIP
          // TODO: make this done by obeserver callback REMOVE THIS
          //cartridgePanelManager.moveBufferToRow(1, delay);

        } else {
          var delay = cartridgePanelManager.insertCartridgeWithCallback(cartridgeElement, cartridgePanelManager.gps.setDisplayModeToProject)
          //TODO: move this to be the responsibility of UPDATE BEHAVIOUR.
          // !! EVERY METHOD SHOULD STOP MOVING AFTER IT'S CHANGED THE GLOBAL STATE. AFTER THAT IT IS THE
          // RESPONSIBILITY OF THE UPDATE REACTION.
          cartridgePanelManager.focusOnCartridge(cartridgeElement.id);
        }
      } else if(cartridgeElement.id === cartridgePanelManager.gps.activeCartridgeId) {
        var delay = cartridgePanelManager.ejectCartridgeWithCallBack(cartridgeElement, cartridgePanelManager.gps.setDisplayModeToLanding)
        cartridgePanelManager.resetBuffer();
      }
    },

    focusOnRow: function(targetRow, timeScale = 500, bottomPadding = 0){
    
      // This approach is slightly better than incrementing because it means you'll have fixed functional destiantaions

      // By keeping current offset directly extracted, we avoid ignoring any buffer when this was set
      var currentOffset = utilMethods.convertFromCss(this.absCartContainer.style.bottom)
      var targetOffset = this._rowToOffset(targetRow) + bottomPadding
      var distance = targetOffset - currentOffset
      var distancePerT = timeScale === 0 ? distance : distance/timeScale

      console.log(`current offset: ${currentOffset}`)
      console.log(`targetOffset: ${targetOffset}`)
      console.log(`distance: ${distance}`)
      console.log(`distanceperT: ${distancePerT}`)
      var originalHeight = utilMethods.convertFromCss(this.absCartContainer.style.bottom)
      for(var t = 0; t < timeScale; t++){
        setTimeout(() => {
          var newOffset = Math.floor(originalHeight + (distancePerT * t))
          console.log(`new offset: ${newOffset}`);
          this.absCartContainer.style.bottom = utilMethods.convertToCss(newOffset)
        }, 
        t)
      }

      return timeScale
    },


    focusOnCartridge: function(cartridgeElement, timeScale=0, bottomPadding = 0){
      // TODO: dyanmically return a time scale so that if you don't need to move a focus, it takes no time
      var targetRow = this.idToRow[cartridgeElement]
      console.log(this.focusOnRow)
      this.focusOnRow(targetRow, 500, bottomPadding)
    },

    _rowToOffset: function(row){
        console.log(row)
        return ((this.totalNumberOfRows - row) * -150) +120;
    },

    insertCartridgeWithCallback: function (cartridgeElement, callBack, delay = 0){
      cartridgePanelManager.clickedCartridgeId = cartridgeElement.id
        var delayCursor = utilMethods.moveElementDown(0, cartridgeElement, 50, 300)
        var pause = 700
        var finalTimeCursor = utilMethods.moveElementDown(delayCursor+pause, cartridgeElement, 30, 50)
        setTimeout(() => {
          //todo: remove this so that the whole method is done by a declarative global state method
          cartridgePanelManager.gps.activeCartridgeId = cartridgeElement.id
          // Unset the clicked cartridge so other cartridges may be pressed
          cartridgePanelManager.clickedCartridgeId = null
          callBack()
        }, finalTimeCursor)
        return finalTimeCursor;
    },

    ejectCartridgeWithCallBack: function (cartridgeElement, callBack, delay = 0){
      cartridgePanelManager.clickedCartridgeId = cartridgeElement.id
      var delayCursor = utilMethods.moveElementUp(0, cartridgeElement, 80, 100)
      setTimeout(()=>{
        cartridgePanelManager.gps.activeCartridgeId = null
        cartridgePanelManager.clickedCartridgeId = null
        callBack()
      }, delayCursor)
      return delayCursor
    },

    resetBuffer(){
      cartridgePanelManager.floatingCartBox.style.marginTop = utilMethods.convertToCss(0)
    },

    moveBufferToRow(rowNumber, startDelay, timeFrame = 100){
      var standardOffset = 80;
      var height = (rowNumber * cartridgePanelManager._cartridgeSize) + standardOffset
      var delay = utilMethods.moveElementUp(startDelay, cartridgePanelManager.floatingCartBox, height, timeFrame);
      return delay;
    }
  }



  // Set up listeners on container

  var idToRow = {}


  var showAllCartsButton = documentObjectModel.getElementById("show-all-projects-button");
  showAllCartsButton.addEventListener("click", cartridgePanelManager.clickOnShowAllProjectsEvent);


  var rows = cartridgePanelManager.domainElement.getElementsByClassName("cartridge-row");
  cartridgePanelManager.totalNumberOfRows = rows.length
  // FOCUS on bottom row to begin with. TODO: remove
  cartridgePanelManager._focusedRow = rows.length -1;
  for(var i = 0; i < rows.length; i++){
    var cartridgeContainers = rows[i].getElementsByClassName("cartridge-container");
    for(var j = 0; j < cartridgeContainers.length; j++){
      idToRow[cartridgeContainers[j].getElementsByClassName("cartridge")[0].id] = i
      cartridgeContainers[j].getElementsByClassName("cartridge")[0].addEventListener("click", cartridgePanelManager.clickOnCartridgeEvent)
    }
  }
  cartridgePanelManager.idToRow = idToRow

  // set cartrige listeners
  return cartridgePanelManager
}
