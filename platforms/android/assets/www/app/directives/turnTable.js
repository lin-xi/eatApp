app.directive('turnTable', function($document, $window, $route) {

    function link(scope, element, attr){
        var jQuery = $window.jQuery;

        var cenX = 200, cenY = 250;
        var touchTime = 0, posX=0, posY=0;
        var degree = 0, time = 0;
        var finish = false, running = false, move = false;

        jQuery('.spoon').css({ '-webkit-transform-origin': '20px 27px', '-webkit-transform': 'rotate(0deg)'});
        var agent;
        if( /iPhone|iPad|iPod/i.test(navigator.userAgent.toLowerCase())) {
            agent = 'ios';
        }else if( /android/i.test(navigator.userAgent.toLowerCase())) {
            agent = 'android';
        }else{
            agent = 'webkit';
        }

        element.find('.spoon').on('touchstart', function(e){
            if(!running){
                touchTime = new Date()-0;
                element.append('<div class="wrapper"><div class="pie spinner"></div><div class="pie filler"></div><div class="mask"></div></div>');

                element.find('.spinner').on('webkitAnimationEnd', function(e){
                    scope.$apply(function(){
                        scope.forceHtml = '<div class="round1"></div>';
                    });
                });
            }
        });
        
        if(agent == 'android'){

            element.find('.spoon').on('touchmove', function(e){
                if(!running){
                    running = true;
                    touchTime = new Date() - touchTime;
                    jQuery('.wrapper').remove();
                    turn(1);
                }
            }).on('touchend', function(e){
                jQuery('.wrapper').remove();
            });

        }else{

            element.on('touchmove', function(e){
                move = true;
            });
            element.on('touchend', function(e){
                if(running && move){
                    move = false;

                    touchTime = new Date() - touchTime;
                    jQuery('.wrapper').remove();
                    turn(1);
                }
            });
        }

        jQuery('.dialog-mask').on('click', function(){
            finish = false;
            jQuery('.spoon').attr('style', '');
            jQuery('.cog1').attr('style', '');
            jQuery('.cog2').attr('style', '');
            jQuery('.cog-mask').attr('style', '');
            jQuery('.spin').attr('style', '');
            degree=0;
            touchTime=0;

            scope.$apply(function(){
                scope.showAlert = false;
            });
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

        function turn(modulus){
            var restaurant = scope.restaurant;

            var de = Math.ceil(touchTime/1000)*720+ Math.round(touchTime%1000/3);
            degree += modulus*de;
            var deg = modulus*degree;
            var time = Math.ceil(de/360)*2000;

            jQuery('.spoon').css({'-webkit-transition': 'all '+time+'ms cubic-bezier(0,0.3,0.3,1)', '-webkit-transform-origin': '20px 27px', '-webkit-transform': 'rotate('+deg+'deg)'});
            jQuery('.cog1').css({'-webkit-transition': 'all '+time+'ms cubic-bezier(0,0.3,0.3,1)', '-webkit-transform-origin': '50% 50%', '-webkit-transform': 'rotate(-'+deg+'deg)'});
            jQuery('.cog2').css({'-webkit-transition': 'all '+time+'ms cubic-bezier(0,0.3,0.3,1)', '-webkit-transform-origin': '50% 50%', '-webkit-transform': 'rotate('+deg+'deg)'});
            jQuery('.cog-mask').css({'-webkit-transition': 'all '+time/2+'ms cubic-bezier(0,0.3,0.3,1)', opacity: 0});
            jQuery('.spin').css({'-webkit-transition': 'all '+time+'ms cubic-bezier(0,0.3,0.3,1)', '-webkit-transform': 'rotateX('+deg+'deg)'});

            setTimeout(function(){
                jQuery('.cog-mask').css({'-webkit-transition': 'all '+time/2+'ms cubic-bezier(0,0.3,0.3,1)', opacity: 1});
            }, time/2);
            
            jQuery('.spoon').on('webkitTransitionEnd', function(){
                scope.$apply(function(){
                    scope.showAlert = true;
                });
                finish = true;
                running = false;
            });

        }

    }

    return {
        restrict: 'AE',
        link: link
    };

});
