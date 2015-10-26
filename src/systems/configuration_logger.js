(function () {
  'use strict';

  /* eslint no-console: 0*/

  Class(App.Systems, 'ConfigurationLogger').inherits(Serpentity.System)({
    prototype : {
      configurables : null,

      added : function added(engine) {
        this.configurables = engine.getNodes(Serpentity.Contrib.Nodes.Configurable);
      },
      removed : function removed() {
        this.configurables = null;
      },
      update : function update() {
        for (var node of this.configurables) {
          console.log(node.configuration);
        }
      }
    }
  });
}());

