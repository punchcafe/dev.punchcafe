function initialiseLandingPanelManager(documentObjectModel, globalPageState){
  var landingPanelManager = {
    domainElement: documentObjectModel.getElementById("landing-panel"),
    gps: globalPageState,
    update: function updateBehaviour(){
      switch(this.gps.getDisplayMode()){
        case displayModes.LANDING:
          this.domainElement.className = "landing-panel-landing-state";
          break;
        case displayModes.PROJECT:
          this.domainElement.className = "landing-panel-project-state";
          break;
        case displayModes.PROJECTS:
          this.domainElement.className = "landing-panel-projects-state";
          break;
      }
      //Do whatever updates are required. change class (not id) based on state
    },
  }
  return landingPanelManager
}
