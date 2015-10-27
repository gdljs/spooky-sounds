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

    /*
     * Adds the systems to serpentity so they can be used
     */
    _initializeSystems : function initializeSystems() {
      this.engine.addSystem(new App.Systems.MIDIMapper());
      this.engine.addSystem(new App.Systems.SamplePlayer());
      this.engine.addSystem(new App.Systems.BackgroundPlayer());
      this.engine.addSystem(new App.Systems.GhostRenderer());
      this.engine.addSystem(new App.Systems.LightningRenderer());
    },

    /*
     * to the entity factory to create all initial entities
     */
    _initializeEntities : function initializeEntities() {
      this.Factories.MIDIFactory.createMIDIContainer(this.engine);
      this._createSampleEntities();
      this._createBackgroundEntities();
      this._createGhost();
      this._createLightning();
    },

    /*
     * Create the sampling entities.
     */
    _createSampleEntities : function () {
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
          '/samples/trigger/zombie.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 50
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
              note: 18
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
              note: 2
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/trigger/door.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 52
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
              note: 19
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
              note: 3
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/trigger/knives.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 53
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
              note: 20
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
              note: 4
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/trigger/monster.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 55
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
          '/samples/trigger/suspense.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 57
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
              note: 18
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
              note: 2
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pitch',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          }
        ],
        files: [
          '/samples/trigger/witches.mp3'
        ]
      });
    },

    /*
     * Creates toggle background playing entities
     */
    _createBackgroundEntities : function () {
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
          '/samples/bg/rain-night.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 51
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
          '/samples/bg/rain.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 54
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
          '/samples/bg/ambiance.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 56
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
          '/samples/bg/chains.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 58
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
          '/samples/bg/raven.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 61
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
          '/samples/bg/water.mp3'
        ]
      });

      this.Factories.SpookyFactory.createToggleableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 63
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
          '/samples/bg/wolves.mp3'
        ]
      });
    },

    /*
     * Creates two entities representing a ghost
     */
    _createGhost : function _createGhost() {
      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 72
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
              note: 23
            },
            target: {
              component: App.Components.PlaybackProperties,
              key: 'pan',
              value: App.Util.ConversionsUtil.midiToPan
            }
          }
        ],
        files: [
          '/samples/trigger/ghost.mp3'
        ]
      });

      this.Factories.SpookyFactory.createTriggerableImage(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 72
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
              note: 7
            },
            target: {
              component: App.Components.Scale,
              key: 'scale',
              value: App.Util.ConversionsUtil.midiToPitch
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 23
            },
            target: {
              component: Serpentity.Contrib.Components.Position,
              key: 'x',
              value: App.Util.ConversionsUtil.midiToPosition.bind(null, 'x')
            }
          },
          {
            source: {
              controller: 'nanoKONTROL2 SLIDER/KNOB',
              channel: 176,
              note: 22
            },
            target: {
              component: Serpentity.Contrib.Components.Position,
              key: 'y',
              value: App.Util.ConversionsUtil.midiToPosition.bind(App.Util.ConversionsUtil, 'y')
            }
          }
        ],
        image: '/images/ghost.png'
      }).then(function (entity) {
        window.image = entity;
      });
    },

    /*
     * Creates two entities representing lightning
     */
    _createLightning : function _createLightning() {
      this.Factories.SpookyFactory.createTriggerableSample(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 71
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
              note: 5
            },
            target: {
              component: App.Components.AudioBank,
              key: 'currentSample',
              value: App.Util.ConversionsUtil.midiToIntScale.bind(null, 3)
            }
          }
        ],
        files: [
          '/samples/trigger/thunder1.mp3',
          '/samples/trigger/thunder2.mp3',
          '/samples/trigger/thunder3.mp3',
          '/samples/trigger/thunder4.mp3'
        ]
      });

      this.Factories.SpookyFactory.createLightning(this.engine, {
        map: [
          {
            source: {
              controller: 'QuNexus Port 1',
              channel: 144,
              note: 71
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
              note: 5
            },
            target: {
              component: App.Components.Intensity,
              key: 'intensity'
            }
          }
        ]
      });
    }
  });
}());
