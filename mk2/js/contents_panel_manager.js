function initialiseContentsPanelManager(documentObjectModel, globalPageState){
  var contentsPanelManager = {
    domainElement: documentObjectModel.getElementById("contents-panel"),
    gps: globalPageState,
    update: function updateBehaviour(){
      //Do whatever updates are required. change class (not id) based on state
    },
  }
  return contentsPanelManager
}
