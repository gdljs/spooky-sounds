(function () {
  'use strict';

  /* globals BufferLoader */

  Module(App.Factories, 'SpookyFactory')({
    _context : null,

    /*
     * Creates a microphone audio node by calling getUserMedia.
     */
    createConfigurableMidiMap : function createConfigurableMidiMap(engine, map) {
      var entity;

      entity = new Serpentity.Entity();

      entity.addComponent(new App.Components.MIDIMap({
        map: map
      }));
      entity.addComponent(new Serpentity.Contrib.Components.Configuration());

      engine.addEntity(entity);

      return entity;
    },

    createTriggerableSample : function createTriggerableSample(engine, config) {
      return new Promise(function (resolve) {
        var context, entity, bufferLoader;

        context = new AudioContext();
        entity = new Serpentity.Entity();
        bufferLoader = new BufferLoader(context,
                                        config.files,
                                        this._onBuffersLoaded.bind(this, engine, entity, resolve));


        entity.addComponent(new App.Components.Trigger());
        entity.addComponent(new App.Components.PlaybackProperties());
        entity.addComponent(new App.Components.MIDIMap({
          map: config.map
        }));

        bufferLoader.load();
      }.bind(this));
    },

    createToggleableSample : function createToggleableSample(engine, config) {
      return new Promise(function (resolve) {
        var context, entity, bufferLoader;

        context = new AudioContext();
        entity = new Serpentity.Entity();
        bufferLoader = new BufferLoader(context,
                                        config.files,
                                        this._onBuffersLoaded.bind(this, engine, entity, resolve));


        entity.addComponent(new App.Components.PlaybackStatus());
        entity.addComponent(new App.Components.PlaybackProperties());
        entity.addComponent(new App.Components.MIDIMap({
          map: config.map
        }));

        bufferLoader.load();
      }.bind(this));
    },

    // When all buffers are loaded set them to an audio bank
    _onBuffersLoaded : function _onBuffersLoaded (engine, entity, callback, buffers) {
      entity.addComponent(new App.Components.AudioBank({
        buffers: buffers
      }));
      engine.addEntity(entity);

      callback(entity);
    }
  });
}());
