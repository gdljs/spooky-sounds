(function (){
  'use strict';

  Class(App.Nodes, 'TriggerableSample').inherits(Serpentity.Node)({
    types : {
      audioBank: App.Components.AudioBank,
      playbackProperties: App.Components.PlaybackProperties,
      trigger: App.Components.Trigger
    }
  });
}());
