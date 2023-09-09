$(document).ready(function(){
    $("#slideContainer").on("mousewheel DOMMouseScroll", function (e) {
    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    var zoomOut;
    if (delta === undefined) {
      //we are on firefox
      delta = e.originalEvent.detail;
      zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      zoomOut = !zoomOut;
    } else {
      zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    }
    var touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
    var touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    var scale = 1, translateX, translateY;
    if(zoomOut){
        //we are zooming out
      //not interested in this yet
    }else{
        //we are zooming in
      scale = scale + 0.5;
      var dimensionMultiplier = scale - 0.5;//when image is scaled up offsetWidth/offsetHeight doesn't take this into account so we must multiply by scale to get the correct width/height
      var slideWidth = $("#slide")[0].offsetWidth * dimensionMultiplier;
      var slideHeight = $("#slide")[0].offsetHeight * dimensionMultiplier;

      var offsetX = $("#slide").offset().left;//distance from the left of the viewport to the slide
      var offsetY = $("#slide").offset().top;//distance from the top of the viewport to the slide
      var diffX = offsetX + slideWidth / 2 - touchX;//this is distance from the mouse to the center of the image
      var diffY = offsetY + slideHeight / 2 - touchY;//this is distance from the mouse to the center of the image

      //how much to translate by x and y so that poin on image is alway under the mouse
      //we must multiply by 0.5 because the difference between previous and current scale is always 0.5
      translateX = ((diffX) * (0.5));
      translateY = ((diffY) * (0.5));    
    }
    $("#slide").css("transform", 'translate3d(' + translateX + 'px, ' + translateY + 'px,0) scale(' + scale + ')').css('transition-duration', '300ms');
  });

});