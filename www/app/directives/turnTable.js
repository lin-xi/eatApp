app.directive('turnTable', function($document, $window, $route) {

    function link(scope, element, attr){
        var jQuery = $window.jQuery;

        var cenX = 200, cenY = 250;
        var touchTime = 0, posX=0, posY=0;
        var degree = 0;
        var finish = false;

        jQuery('.spoon').off();
        jQuery('.spoon').enableTouch({
            useMouse:           true,   // If true, mouse clicks and movements will also trigger
            dragThreshold:      10,     // touch events, Distance from tap to register a drag (lower = more
            dragDelay:          200,    // sensitive, higher = less sensitive) Time to wait before registering a drag (needs to be high 
            swipeThreshold:     30,     // enough to not interfere with scrolling)Distance from tap to register a swipe (lower = more 
            tapDelay:           250,    // sensitive, higher = less sensitive) Delay between taps
            tapAndHoldDelay:    750     // Time to wait before triggering "tapAndHold"
        }).on('swipeUp', function(){
            touchTime = new Date() - touchTime;
            jQuery('.wrapper').remove();
            posX>cenX ? turn(1):turn(-1);

        }).on('swipeDown', function(){
            touchTime = new Date() - touchTime;
            jQuery('.wrapper').remove();
            posX>cenX ? turn(-1):turn(1);

        }).on('swipeLeft', function(){
            touchTime = new Date() - touchTime;
            jQuery('.wrapper').remove();
            posY>cenY ? turn(-1):turn(1);

        }).on('swipeRight', function(){
            touchTime = new Date() - touchTime;
            jQuery('.wrapper').remove();
            posY>cenY ? turn(1):turn(-1);

        }).on('touchstart', function(e){
            touchTime = new Date()-0;
            element.append('<div class="wrapper"><div class="pie spinner"></div><div class="pie filler"></div><div class="mask"></div></div>');

            element.find('.spinner').on('webkitAnimationEnd', function(e){
                scope.$apply(function(){
                    scope.forceHtml = '<div class="round1"></div>';
                });
            });

            posX = e.x;
            posY = e.y;
        }).on('touchend', function(){
            touchTime = new Date() - touchTime;
            jQuery('.wrapper').remove();
        });

        function waitfor(condition, fn){
            var requestAnimationFrame = window.requestAnimationFrame || function(func){setTimeout(func, 10);};
            function step(){
                if(condition()){
                    fn();
                }else{
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
        }

        function drawCircle(){
            var restaurant = scope.restaurant;
            var arshHeight = 80;
            var angel = 2*Math.PI/restaurant.length;
            var radius = (arshHeight/2)/Math.sin(angel/2);

            var container = jQuery('.spin');
            for(var i=0, ii=restaurant.length; i<ii; i++){
                var style='-webkit-transform: rotateX('+angel*i+'rad) translateZ('+radius+'px)';
                var div = jQuery('<div class="face" style="'+style+'">'+ restaurant[i].name +'</div>');
                container.append(div);
            }
        }

        waitfor(function(){
            return scope.restaurant != null;
        }, drawCircle);

        jQuery('body').off();
        jQuery('body').on('click', function(){
            if(finish){
                finish = false;
                jQuery('.spoon').removeAttr('style');
                jQuery('.cog1').removeAttr('style');
                jQuery('.cog2').removeAttr('style');
                jQuery('.cog-mask').removeAttr('style');
                jQuery('.spin').removeAttr('style');
                degree=0;
                touchTime=0;
                scope.$apply(function(){
                    scope.showAlert = false;
                });
            }
        });

        function turn(modulus){
            var restaurant = scope.restaurant;

            var de = Math.ceil(touchTime/1000)*720+ Math.round(touchTime%1000/3);
            degree += modulus*de;
            var deg = modulus*degree;
            var time = Math.ceil(de/360)*2000;

            jQuery('.spoon').css({ transformOrigin: '20px 50%'})
            .transition({rotate: deg+'deg'}, time, 'cubic-bezier(0,0.3,0.3,1)', function(){
                //jQuery(this).removeAttr('style');
            }, function(host){
            });
                
            jQuery('.cog1').css({ transformOrigin: '50% 50%'})
            .transition({rotate: -deg+'deg'}, time, 'cubic-bezier(0,0.3,0.3,1)', function(){
                //jQuery(this).removeAttr('style');
            });
                
            jQuery('.cog-mask')
            .transition({opacity: 0}, time/2)
            .transition({opacity: 1}, time/2);
            
            jQuery('.cog2').css({ transformOrigin: '50% 50%'})
            .transition({rotate: deg+'deg'}, time, 'cubic-bezier(0,0.3,0.3,1)', function(){
                //jQuery(this).removeAttr('style');
            });
            jQuery('.spin').transition({rotateX : deg+'deg'}, time, 'cubic-bezier(0,0.3,0.3,1)', function(){
                scope.$apply(function(){
                    finish = true;
                    scope.showAlert = true;
                });
            });
        }

    }

    return {
        restrict: 'AE',
        link: link
    };

});
