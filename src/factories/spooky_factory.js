(function () {
  'use strict';

  /* globals BufferLoader */

  /*
   * Factory for the main types of spooky object used by the app.
   */
  Module(App.Factories, 'SpookyFactory')({
    _context : null,

    /*
     * Creates a test entity that has a configuration object and a midi map
     * It receives a map object. (See the midi_mapper system for more info)
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

    /*
     * Creates an entity that has playback properties, trigger, midi map
     * and an audio bank. Used for background playing. The config should have
     * a map key containing the midi map object, as well as a files array
     * with the paths to the files to load.
     */
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

    /*
     * Creates an entity that has playback properties, playback state, midi map
     * and an audio bank. Used for background playing. The config should have
     * a map key containing the midi map object, as well as a files array
     * with the paths to the files to load
     */
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

    createTriggerableImage : function createTriggerableImage(engine, config) {
      return new Promise(function (resolve) {
        var entity;

        entity = new Serpentity.Entity();
        entity.addComponent(new Serpentity.Contrib.Components.Position());
        entity.addComponent(new App.Components.Scale());
        entity.addComponent(new App.Components.Trigger());
        entity.addComponent(new App.Components.MIDIMap({
          map: config.map
        }));
        entity.addComponent(new App.Components.Image({
          image: config.image
        }));

        engine.addEntity(entity);

        resolve(entity);

      }.bind(this));
    },

    createLightning : function createLightning(engine, config) {
      return new Promise(function (resolve) {
        var entity;

        entity = new Serpentity.Entity();
        entity.addComponent(new App.Components.Intensity());
        entity.addComponent(new App.Components.Trigger());
        entity.addComponent(new App.Components.MIDIMap({
          map: config.map
        }));

        engine.addEntity(entity);

        resolve(entity);

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
