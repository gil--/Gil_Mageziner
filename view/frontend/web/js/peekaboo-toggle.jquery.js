'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (factory) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory(require('jquery'), window);
  } else {
    factory(jQuery, window);
  }
})(function ($, window) {
  $.fn.peekaboo = function (options) {
    var config = $.extend({
      namespace: 'peekaboo',
      buttonClassname: 'button--transparent',
      callback: function callback() {},
      destruct: false
    }, options);

    function toggleAttr($element, attribute) {
      var currentValue = $element.attr(attribute) === 'true' || $element.attr(attribute) === 'hidden';
      $element.attr(attribute, !currentValue);
    }

    return this.each(function () {
      var $this = $(this);
      var $toggle = $this;
      var $next = void 0;

      // Use the data or aria attribute, if specified
      // Otherwise, toggle the next element
      if ($this.data('toggle-target')) {
        $next = $('#' + $this.data('toggle-target'));
      } else if ($this.attr('aria-controls')) {
        $next = $('#' + $this.attr('aria-controls'));
      } else {
        $next = $this.next();
      }

      // Pass { destruct: true } in order to remove the click event for an element
      if (config.destruct) {
        var shouldUnwrap = false;

        if (this.nodeName.toLowerCase() !== 'button' && this.nodeName.toLowerCase() !== 'a') {
          $toggle = $this.find('button');
          shouldUnwrap = true;
        }

        $toggle.off('click.' + config.namespace).attr('aria-expanded', null);
        $next.attr('hidden', null);

        if (shouldUnwrap) {
          $toggle.children().unwrap();
        }

        return;
      }

      // Use existing aria-expanded value to allow expanded by default
      var isExpanded = $this.attr('aria-expanded') === 'true';
      if (window.location.hash == '#' + $this.attr('id')) {
        isExpanded = true;
      }

      // Generate an ID for the content if there isn't one
      if (!$next.attr('id')) {
        $next.attr('id', config.namespace + '-' + Math.random().toString(36).substr(2, 9));
      }

      // If the toggle isn't a button, wrap it in a <button>
      // Better than adding button role because we don't lose the element's semantics
      // Let's also ensure the toggle doesn't insert a button inside an anchor tag
      if (this.nodeName.toLowerCase() !== 'button' && this.nodeName.toLowerCase() !== 'a') {
        var buttonClassname = config.buttonClassname;


        $this.wrapInner('<button type="button" class="' + buttonClassname + '" aria-expanded="' + isExpanded + '" aria-controls="' + $next.attr('id') + '">');
        $toggle = $this.find('button');
      } else {
        $this.attr('aria-expanded', isExpanded).attr('aria-controls', $next.attr('id'));
      }

      // Hide the content
      $next.attr('hidden', !isExpanded);

      $toggle.on('click.' + config.namespace, function (event) {
        toggleAttr($toggle, 'aria-expanded');
        toggleAttr($next, 'hidden');
        config.callback.call(this, { event: event });
      });
    });
  };
});
