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
    this._displayMode = mode
    this._updateListeners()
  },

  setDisplayModeToLanding: function(){
    this._updateDisplayModes(displayModes.LANDING)
  },

  setDisplayModeToProject: function(){
    this._updateDisplayModes(displayModes.PROJECT)
  },

  setDisplayModeToProjects: function(){
    this._updateDisplayModes(displayModes.PROJECTS)
  }
}
