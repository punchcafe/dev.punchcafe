window.onload = () => {
  var cartManager = initialiseCartridgePanelManager(document, globalPageState)
  var landingManager = initialiseLandingPanelManager(document, globalPageState)
  var contentsManager = initialiseContentsPanelManager(document, globalPageState)
  globalPageState.addListener(landingManager)
  globalPageState.addListener(cartManager)
  globalPageState.addListener(contentsManager)
  globalPageState.setDisplayModeToLanding()
  setInterval(()=>{document.getElementById("page-container").style.height = window.innerHeight},100)
};
