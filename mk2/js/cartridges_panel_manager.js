function initialiseCartridgePanelManager(documentObjectModel, globalPageState){

  var cartridgePanelManager = {
    domainElement: documentObjectModel.getElementById("cartridge-panel"),
    floatingCartBox: documentObjectModel.getElementById("cartridge-row-absolute-container"),
    gps: globalPageState,
    currentDisplayMode: null,
    previousDisplayMode: null,

    // TODO get dynamically
    _cartridgeSize: 152,

    // This is the id of the cartridge, currently being animated on. NOT the active
    // target. It's primary purpose is to stop any other opertations while one is already in process.
    clickedCartridgeId: null,

    update: function updateBehaviour(){
      console.log("I have been informed of the update to global state")
      console.log(this.gps.getDisplayMode())
      switch(this.gps.getDisplayMode()){
        // TODO: ESTABLISH RESPONSIBILITIES OF EACH CASE
        case displayModes.LANDING:
          cartridgePanelManager.resetBuffer();
          this.domainElement.className = "cartridge-panel-landing-state";
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.LANDING;
          break;
        case displayModes.PROJECT:
        // introduce strategies if previous state = landing or previous state = projects
          //TODO: add method for ensuring offset is correct
          this.domainElement.className = "cartridge-panel-project-state";
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.PROJECT;
          break;
          // TODO: introduce strategies for moving from landing -> project and project ->
        case displayModes.PROJECTS:
          cartridgePanelManager.resetBuffer();
          this.previousDisplayMode = this.currentDisplayMode;
          this.currentDisplayMode = displayModes.PROJECTS;
          this.domainElement.className = "cartridge-panel-projects-state";
          break;
        // ADD ANIMATION FOR SLIDING HERE
        //
      }
      //Do whatever updates are required. change class (not id) based on state
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

      // TODO: movement of absolute cartirdge container height to ensure it's at the correct level, before doing insertion
      // of cartrige

      // Close size of cartridge elements at the same rate absolute modified changes height so that it seamlessly lines up to
      // the top of the screen.

      // Consider adding previous state to help check to memory
      // may have to not rely on class transition for cartridges.

      //moveInsertSlot() if currentDisplayMode == PROJECTS;
      //resetInsertSlot
      //insertCartridge()

      var cartridgeElement = event.currentTarget
      if(cartridgePanelManager.gps.activeCartridgeId === null){
        // Lock other cartridges from firing

        var delay = cartridgePanelManager.insertCartridgeWithCallback(cartridgeElement, cartridgePanelManager.gps.setDisplayModeToProject)
        if(cartridgePanelManager.currentDisplayMode == displayModes.PROJECTS){
          // WIP
          cartridgePanelManager.moveBufferToRow(1, delay);
        } else {
          cartridgePanelManager.moveBufferToRow(0, delay);
        }
      } else if(cartridgeElement.id === cartridgePanelManager.gps.activeCartridgeId) {
        var delay = cartridgePanelManager.ejectCartridgeWithCallBack(cartridgeElement, cartridgePanelManager.gps.setDisplayModeToLanding)
        cartridgePanelManager.resetBuffer();
      }
    },

    insertCartridgeWithCallback: function (cartridgeElement, callBack){
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

    ejectCartridgeWithCallBack: function (cartridgeElement, callBack){
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

    moveBufferToRow(rowNumber, startDelay){
      var standardOffset = 80;
      var height = (rowNumber * cartridgePanelManager._cartridgeSize) + standardOffset
      var delay = utilMethods.moveElementUp(startDelay, cartridgePanelManager.floatingCartBox, height, 100);
      return delay;
    }
  }



  // Set up listeners on container

  var showAllCartsButton = documentObjectModel.getElementById("show-all-projects-button");
  console.log(showAllCartsButton)
  showAllCartsButton.addEventListener("click", cartridgePanelManager.clickOnShowAllProjectsEvent);


  var rows = cartridgePanelManager.domainElement.getElementsByClassName("cartridge-row");
  for(var i = 0; i < rows.length; i++){
    var cartridgeContainers = rows[i].getElementsByClassName("cartridge-container");
    for(var j = 0; j < cartridgeContainers.length; j++){
      cartridgeContainers[j].getElementsByClassName("cartridge")[0].addEventListener("click", cartridgePanelManager.clickOnCartridgeEvent)
    }
  }
  // set cartrige listeners
  return cartridgePanelManager
}
