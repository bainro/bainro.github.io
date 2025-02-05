/* Roberto's Notes

Hard to find interactjs docs
http://interactjs.io/api/Interaction.html

Ask Ryan to search emails for % of users that are vista
Get google analytics login from Brian
Calculate current ie9 vista usage
IE9 is only supported on vista
There's 3 newer Microsoft OS (7, 8, 10)
Vista can support @ least firefox 52 w/ ~4 times the # of html5 features

If interactjs magically breaks on ie, remember prefix, then es5 array fn shims/polyfill
Back of card holds response text.  
Rectangular prism indented into the page.
Response text can be google web fonts (gotta check ie9 restrictions on this too)
Look into using resizable from interact.js for something (ie user expanding the explanation box)  
js resize event & clientWidth (or equivalent))
Scale to full screen while maintaining aspect ratio (jezzball?)
Give card back 3d inset parallax efx
media queries for text & cat-inner-border px thickness (try converting desired % to px w/ js)
Need to flip over first card, make it only react to hover or click events, and then flip it to oblivion on response finish
Need to make audio play/stop fn (cjs sound.js?)
Event listener and handler for card out that makes it so the transform isn't applied on drop until after your cursor leaves the card

*/

var dragging = false,
origCSS = document.getElementsByClassName('card')[0].style.transform;

var cards = document.getElementsByClassName("card");
for(var i = 0; i < cards.length; i++) {
    cards.item(i).style.top = 3 + 1.5 * i + "%";
    cards.item(i).style.left = 3 + 1.25 * i + "%";
}
cards[cards.length - 1].classList.toggle('enabled');

var zIndexIndex = 10;

interact('.card.enabled').draggable({
    inertia: false,
    restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: move,
    onstart: start,
    onend: end
});

interact('.cat').dropzone({
    accept: '.card',
    overlap: 0.25,
    ondrop: function (event) {
        var card = event.relatedTarget;
        var cat = event.target;

        card.style.left = (parseFloat(cat.style.left.replace('%','')) + parseFloat(cat.style.padding.replace('%',''))) - 0.05 + '%';
        card.style.top = (parseFloat(cat.style.top.replace('%','')) + parseFloat(cat.style.padding.replace('%',''))) + 0.45 + '%';
        card.classList.toggle('is-flipped');
    }
});

function start(event) {
    var target = event.target;
    target.style.transition = "none";
    target.style.zIndex = zIndexIndex++;
    dragging = true;
}

function end(event) {
    var target = event.target;
    target.style.transition = origCSS;
    setTimeout(function(){dragging=false;},50);
    dragging = false;
}

function move(event) {
    var target = event.target,
    // event.dx is divided by the (whole # of pixels)/100 along
    // each axis in order to produce %
    x = (parseFloat(target.style.left) || 0) + event.dx/7.2,
    y = (parseFloat(target.style.top) || 0) + event.dy/5.4;

    target.style.left = x + '%';
    target.style.top = y + '%';

    // update the posiion attributes
    target.setAttribute('left', x);
    target.setAttribute('top', y);
}