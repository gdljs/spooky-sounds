(function (){
  'use strict';

  Class(App.Nodes, 'ToggleableSample').inherits(Serpentity.Node)({
    types : {
      audioBank: App.Components.AudioBank,
      playbackProperties: App.Components.PlaybackProperties,
      playbackStatus: App.Components.PlaybackStatus
    }
  });
}());
