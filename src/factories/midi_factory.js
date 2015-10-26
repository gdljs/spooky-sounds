(function () {
  'use strict';

  Module(App.Factories, 'MIDIFactory')({
    _context : null,

    /*
     * Creates an entity with a midi access object
     */
    createMIDIContainer : function createMicAnalyser(engine) {
      var entity;

      entity = new Serpentity.Entity();

      return navigator.requestMIDIAccess().then(
        this._onMIDIAccess.bind(this, engine, entity),
        this._onMIDIError.bind(this)
      );
    },

    /*
     * Handler for the midi access request
     */
    _onMIDIAccess : function _onUserMedia(engine, entity, midiAccess) {
      entity.addComponent(new App.Components.MIDIAccess({
        midi: midiAccess
      }));

      engine.addEntity(entity);

      return entity;
    },

    /*
     * Error handler for the midi access call
     */
    _onMIDIError : function _onUserMediaError(error) {
      throw error;
    }
  });
}());
