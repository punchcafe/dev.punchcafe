function initialiseCartridgePanelManager(documentObjectModel, globalPageState){

  var cartridgePanelManager = {
    domainElement: documentObjectModel.getElementById("cartridge-panel"),
    gps: globalPageState,

    // This is the id of the cartridge, currently being animated on. NOT the active
    // target. It's primary purpose is to stop any other opertations while one is already in process.
    clickedCartridgeId: null,

    update: function updateBehaviour(){
      console.log("I have been informed of the update to global state")
      //Do whatever updates are required. change class (not id) based on state
    },

    //To be applied on the individual cartridge animation level, not the containing boc
    clickOnCartridgeEvent: (event) => {
      if(cartridgePanelManager.clickedCartridgeId != null){
        console.log("already clicked!")
        // Process already in progress
        return;
      }
      var cartridgeElement = event.currentTarget
      // Lock other cartridges from firing
      cartridgePanelManager.clickedCartridgeId = cartridgeElement.id
      var delayCursor = utilMethods.moveElementDown(0, cartridgeElement, 50, 300)
      var pause = 700
      var finalTimeCursor = utilMethods.moveElementDown(delayCursor+pause, cartridgeElement, 30, 50)
      setTimeout(() => {
        //todo: remove this so that the whole method is done by a declarative global state method
        cartridgePanelManager.gps.activeCartridgeId = cartridgeElement.id
        // Unset the clicked cartridge so other cartridges may be pressed
        cartridgePanelManager.clickedCartridgeId = null
        cartridgePanelManager.gps.setDisplayModeToProject()
      }, finalTimeCursor)
      //TODO: cartridge logic
    },
  }

  // Set up listeners on container

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
