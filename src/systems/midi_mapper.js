(function () {
  'use strict';

  /**
   * ## What is a MIDI Map object?
   *
   * A midi map object is an array of objects that have a `source` and
   * a `target`. The values of the source will be set to the values
   * of the target. Every individual entry of the array looks like this:
   *
   * ```
   * {
   *   source: {
   *     controller: <string> the name of the controller to use,
   *                 as it shows in midi access,
   *     channel: <number> the channel to listen for,
   *     note: <number> the note in the channel that contains the value
   *   },
   *   target: {
   *     component: <Serpentity.Component> a reference to the class of the type
   *                of component, (eg. `Serpentity.Contrib.Components.Config`),
   *     key: <string> the key path, separated by periods of the key to
   *          write( eg. `config.example.path`),
   *     value: [<function>] an optional function that will be applied to the
   *            midi value before being assigned
   *   }
   * }
   * ```
   */

  /**
   * Given a set of midi access objects, and given a set of entities
   * with midi maps, assign values to the maps accordingly.
   */
  Class(App.Systems, 'MIDIMapper').inherits(Serpentity.System)({
    prototype : {
      midiAccess : null,
      midiMappables : null,
      values : null,

      added : function added(engine) {
        this.midiAccess = engine.getNodes(App.Nodes.MIDIAccess);
        this.midiMappables = engine.getNodes(App.Nodes.MIDIMappable);
        this.values = {};
      },
      removed : function removed() {
        this.midiAccess = null;
        this.midiMappables = null;
        this.values = null;
      },
      update : function update() {

        // Add listeners for missing devices.
        for (var node of this.midiAccess) {
          for (var inputs of node.midiAccess.midi.inputs.values()) {
            if (!inputs.onmidimessage) {
              inputs.onmidimessage = this._onMIDIMessage.bind(this);
            }
          }
        }

        // Check maps and assign values.
        for (var mappable of this.midiMappables) {
          for (var map of mappable.midiMap.map) {
            this._map(map, mappable.entity);
          }
        }
      },

      /*
       * When we get a midi message, we should update our values.
       */
      _onMIDIMessage : function _onMIDIMessage(midiMessage) {
        var deviceName, data, device, channel;

        deviceName = midiMessage.currentTarget.name;
        data = midiMessage.data;
        device = this.values[deviceName] = this.values[deviceName] || {};
        channel = device[data[0]] = device[data[0]] || {};
        channel[data[1]] = data[2];
      },

      /*
       * Given a source midi value, assign it to an entity.
       */
      _map : function _map(map, entity) {
        var sourceValue, component;

        sourceValue = this._getValue(map.source);
        component = entity.getComponent(map.target.component);

        if (typeof sourceValue === 'undefined') {
          return;
        }

        if (map.target.value) {
          sourceValue = map.target.value(sourceValue);
        }

        // Only set if entity has the component
        if (component) {
          this._setValue(sourceValue, component, map.target.key);
        }
      },

      _getValue : function _getValue(source) {
        try {
          return this.values[source.controller][source.channel][source.note];
        // Inaccessible value, just return 0. whatever.
        } catch (err) {
          return source.default || 0;
        }
      },

      _setValue : function _setValue(value, component, key) {
        var keyFragments, target;

        keyFragments = key.split('.');
        target = component;

        // Drill down the object, assign after we're done.
        for (var keyFragment of keyFragments.slice(0, keyFragments.length - 2)) {
          target = target[keyFragment] = target[keyFragment] || {};
        }

        target[keyFragments[keyFragments.length - 1]] = value;
      }
    }
  });
}());
