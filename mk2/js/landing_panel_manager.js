function initialiseLandingPanelManager(documentObjectModel, globalPageState){
  var landingPanelManager = {
    domainElement: documentObjectModel.getElementById("contents-panel"),
    gps: globalPageState,
    update: function updateBehaviour(){
      //Do whatever updates are required. change class (not id) based on state
    },
  }
  return landingPanelManager
}
