(function () {
  'use strict';

  /*
   * Main entry point and namespace for the app
   */
  Module('App')({

    // Namespaces for objects
    Components: {},
    Factories: {},
    Systems : {},
    Nodes : {},
    Util : {},

    // Properties
    _looping : false,  // Control loop state
    _t : 0, // Temp store for the time for diff calculation
    _fps : 25, // Target fps

    init : function init() {
      this.engine = new Serpentity();

      this._t = Date.now();

      this._initializeSystems();
      this._initializeEntities();
      this.startLoop();
    },

    /*
     * Stops the game loop.
     */
    pauseLoop : function pauseLoop() {
      this._looping = false;
    },

    /*
     * Starts the game loop.
     */
    startLoop : function startLoop() {
      this._looping = true;
      window.requestAnimationFrame(this._loop.bind(this));
    },

    /*
     * Game Loop, requests animation frame and waits for interval to
     * enforce fps. Calls serpentity update on each loop.
     */
    _loop : function update() {
      var interval, delta, now;

      if (!this._looping) {
        return;
      }

      window.requestAnimationFrame(this._loop.bind(this));
      interval = 1000 / this._fps;
      now = Date.now();
      delta = now - this._t;

      if (delta > interval) {
        this._t = now - (delta % interval);

        this.engine.update(delta);
      }
    },

    // Adds the systems to serpentity so they can be used
    _initializeSystems : function initializeSystems() {
      this.engine.addSystem(new App.Systems.MIDIMapper());
      this.engine.addSystem(new App.Systems.SamplePlayer());
      this.engine.addSystem(new App.Systems.BackgroundPlayer());
    },

    // Calls to the entity factory to create all initial
    // entities
    _initializeEntities : function initializeEntities() {
      this.Factories.MIDIFactory.createMIDIContainer(this.engine);
      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 48
            },
            target: {
              component: App.Components.Trigger,
              key: 'armed',
              value: App.Util.ConversionsUtil.midiToBoolean
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 16
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pan',
              value: App.Util.ConversionsUtil.midiToPan
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 0
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/test.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 49
            },
            target: {
              component: App.Components.PlaybackStatus,
              key: 'armed',
              value: App.Util.ConversionsUtil.midiToBoolean
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 17
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pan',
              value: App.Util.ConversionsUtil.midiToPan
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 1
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/test.mp3'
        ]
      }).then(function (entity) {
        window.entity = entity;
      });
    }
  });
}());
