const displayModes = {
    LANDING: 'landing',
    PROJECT: 'project',
    PROJECTS: 'projects'
}

var globalPageState = {
  activeCartridgeId: null,
  _displayMode: displayModes.LANDING,
  listeners: [],

  addListener: function(listener){
    this.listeners.push(listener)
  },

  getDisplayMode: function(){
    return this._displayMode
  },

  _updateListeners: function(){
    for(var i = 0; i < this.listeners.length; i++){
      this.listeners[i].update()
    }
  },

  _updateDisplayModes: function(mode){
    globalPageState._displayMode = mode
    globalPageState._updateListeners()
  },

  setDisplayModeToLanding: function(){
    globalPageState._updateDisplayModes(displayModes.LANDING)
  },

  setDisplayModeToProject: function(){
    globalPageState._updateDisplayModes(displayModes.PROJECT)
  },

  setDisplayModeToProjects: function(){
    globalPageState._updateDisplayModes(displayModes.PROJECTS)
  }
}
