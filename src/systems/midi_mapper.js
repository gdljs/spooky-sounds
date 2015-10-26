(function () {
  'use strict';

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

        for (var keyFragment of keyFragments.slice(0, keyFragments.length - 2)) {
          target = target[keyFragment] = target[keyFragment] || {};
        }

        target[keyFragments[keyFragments.length - 1]] = value;
      }
    }
  });
}());
