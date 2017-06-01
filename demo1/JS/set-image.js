/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener("click",function (event) {

        var loadSceneName = this.parentEl.dataset.src;
        var sceneToLoad = SCENES.filter(function(scene){
          if(scene.name===loadSceneName){
            return scene;
          }
        });
        if(sceneToLoad.length>0){
          document.querySelector('#cursor').emit('animate'); 
          document.querySelector('a-sky').emit('animate');
          loadScene(sceneToLoad[0].name,this);
        }
    });
  },


  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});


AFRAME.registerComponent('update-raycaster', {
  schema: {type: 'selector'},

  init: function () {
    var raycasterEl = this.data;
    raycasterEl.components.raycaster.refreshObjects();
  }
});
