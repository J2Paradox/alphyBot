var canvas = document.querySelector('#x');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};

// fade out
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = 'none';
      el.classList.add('is-hidden');
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in
function fadeIn(el, display){
  if (el.classList.contains('is-hidden')){
    el.classList.remove('is-hidden');
  }
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function showEmote(eID) {
    var max_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var max_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var posx = Math.floor( Math.random() * max_width );
    var posy = Math.floor( Math.random() * max_height );
    var oImg = document.createElement("img");
    oImg.setAttribute('src', "https://static-cdn.jtvnw.net/emoticons/v1/" + eID + "/2.0");
    oImg.setAttribute('alt', "na");
    oImg.setAttribute('style', "left:" + posx + "px;top:" + posy + "px");
    oImg.setAttribute('id', "img");
    oImg.setAttribute('class', "js-fade is-hidden");
    oImg.setAttribute('name', "img");
    document.body.appendChild(oImg);
    var el = document.getElementById('img');
    console.log("DEBUG: SHOWING EMOTE WITH ID: " + eID)
    fadeIn(el, 1);

    sleep(2000).then(() => {
        console.log("DEBUG: HIDING EMOTE")
        fadeOut(el);
        var remImg = document.getElementById('img');
        document.body.removeChild(remImg)
    })
};
