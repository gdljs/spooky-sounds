(function () {
  'use strict';

  /*
   * Given a set of objects with triggers, position and an image,
   * display the lightnings in the correct intensity
   */
  Class(App.Systems, 'LightningRenderer').inherits(Serpentity.System)({
    prototype : {
      lightnings : null,
      duration: [50, 1000],
      _drawing: false,
      _drawTime: 0,

      added : function added(engine) {
        this._rendered = [];
        this.lightnings = engine.getNodes(App.Nodes.Lightning);
      },
      removed : function removed() {
        this._rendered = [];
        this.lightnings = null;
      },
      update : function update(dt) {
        var lightning;

        for (lightning of this.lightnings) {
          if (lightning.trigger.armed && !lightning.trigger.locked) {
            this._drawing = 1;
            this._intensity = lightning.intensity.intensity;
            lightning.trigger.locked = true;
            continue;
          }

          if (!lightning.trigger.armed) {
            lightning.trigger.locked = false;
          }
        }

        if (this._drawing) {
          this._drawTime += dt;
        }

        this._drawLightning(lightning);
      },

      /*
       * Turns the screen white, sets animation.
       */
      _drawLightning : function _drawLightning() {
        var flashScale, fadeScale;

        flashScale = App.Util.ConversionsUtil.midiToIntScale(1200, this._intensity);
        fadeScale = App.Util.ConversionsUtil.midiToIntScale(2000, this._intensity);

        if (this._drawing) {
          document.body.style.transition = null;
          document.body.style.backgroundColor = 'white';

          if (this._drawTime >= this.duration[0] + flashScale) {
            document.body.style.transition = 'background-color ' + (this.duration[1] + fadeScale) + 'ms linear';
            document.body.style.backgroundColor = 'black';
            this._drawing = false;
            this._drawTime = 0;
          }
        }
      }
    }
  });
}());
