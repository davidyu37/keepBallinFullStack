'use strict';

angular.module('keepballin')
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();

            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.5s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;

                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var button, target, content;
            
            attrs.expanded = false;
            
            element.bind('click', function() {
                if (!button) button = document.querySelector('.slideBtn');
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');
                
                if(!attrs.expanded) {
                    // content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    // content.style.border = 0;
                    target.style.height = y + 'px';
                    button.style.bottom = y + 'px';
                } else {
                    target.style.height = '0px';
                    button.style.bottom = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});