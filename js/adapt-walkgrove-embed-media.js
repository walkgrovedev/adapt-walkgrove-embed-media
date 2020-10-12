define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var EmbedMediaView = ComponentView.extend({

    // events: {
    //   "click .js-embed-media-select": "onSelect"
    // },
    
    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.setReadyStatus();

      this.setupInview();
    },

    setupInview: function() {
      var selector = this.getInviewElementSelector();
      if (!selector) {
        this.setCompletionStatus();
        return;
      }

      this.setupInviewCompletion(selector);
    },

    getInviewElementSelector: function() {
      if (this.model.get('body')) return '.embed-media__iframe';

      return null;
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    // onSelect: function() {
    //   console.log("complete embedded media");
    //   this.setCompletionStatus();
    // }


  },
  {
    template: 'embed-media'
  });

  return Adapt.register('embed-media', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: EmbedMediaView
  });
});
