(function (){
  'use strict';

  Class(App.Nodes, 'Lightning').inherits(Serpentity.Node)({
    types : {
      trigger : App.Components.Trigger,
      intensity : App.Components.Intensity
    }
  });
}());
