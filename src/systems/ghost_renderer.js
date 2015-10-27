(function () {
  'use strict';

  /*
   * Given a set of objects with triggers, position and an image,
   * display the ghost in the correct place.
   */
  Class(App.Systems, 'GhostRenderer').inherits(Serpentity.System)({
    prototype : {
      ghosts : null,
      duration : 50,
      _rendered : null,

      added : function added(engine) {
        this._rendered = [];
        this.ghosts = engine.getNodes(App.Nodes.TriggerableImage);
      },
      removed : function removed() {
        this._rendered = [];
        this.ghosts = null;
      },
      update : function update() {
        var i, ghost;

        for (ghost of this.ghosts) {
          if (ghost.trigger.armed && !ghost.trigger.locked) {
            this._drawGhost(ghost);
            ghost.trigger.locked = true;
            continue;
          }

          if (!ghost.trigger.armed) {
            ghost.trigger.locked = false;
          }
        }

        for ( i = this._rendered.length - 1; i >= 0; i--) {
          ghost = this._rendered[i];

          if (Date.now() - ghost.timestamp >= this.duration) {
            this._removeGhost(i, ghost);
          }
        }
      },

      /*
       * Displays a ghost by creating and positioning an image element
       */
      _drawGhost : function _drawGhost(ghost) {
        var image;

        image = document.createElement('img');
        image.src = ghost.image.image;
        image.style.position = 'absolute';
        image.style.left = ghost.position.x + 'px';
        image.style.top = ghost.position.y + 'px';
        image.style.transform = 'scale(' + ghost.scale.scale + ', ' + ghost.scale.scale + ')';

        this._rendered.push({
          image: image,
          timestamp: Date.now()
        });

        document.body.appendChild(image);
      },

      /*
       * Removes image from DOM and array
       */
      _removeGhost : function _removeGhost(i, ghost) {
        ghost.image.remove();
        this._rendered.splice(i,1);
      }
    }
  });
}());
