function initialiseContentsPanelManager(documentObjectModel, globalPageState){
  var contentsPanelManager = {
    domainElement: documentObjectModel.getElementById("contents-panel"),
    gps: globalPageState,
    update: function updateBehaviour(){
      //Do whatever updates are required. change class (not id) based on state
      switch(this.gps.getDisplayMode()){
        case displayModes.LANDING:
          this.domainElement.className = "contents-panel-landing-state";
          break;
        case displayModes.PROJECT:
          this.domainElement.className = "contents-panel-project-state";
          break;
      }
    },
  }
  return contentsPanelManager
}
