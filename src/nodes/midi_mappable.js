(function (){
  'use strict';

  Class(App.Nodes, 'MIDIMappable').inherits(Serpentity.Node)({
    types : {
      midiMap : App.Components.MIDIMap
    }
  });
}());
