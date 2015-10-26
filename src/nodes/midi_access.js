(function (){
  'use strict';

  Class(App.Nodes, 'MIDIAccess').inherits(Serpentity.Node)({
    types : {
      midiAccess : App.Components.MIDIAccess
    }
  });
}());
