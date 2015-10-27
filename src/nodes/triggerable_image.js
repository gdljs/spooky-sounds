(function (){
  'use strict';

  Class(App.Nodes, 'TriggerableImage').inherits(Serpentity.Node)({
    types : {
      image: App.Components.Image,
      position: Serpentity.Contrib.Components.Position,
      scale: App.Components.Scale,
      trigger: App.Components.Trigger
    }
  });
}());
