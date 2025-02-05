//javascript.js

canvas               = O('logo');
context              = canvas.getContext('2d');
context.font         = 'bold italic 57px Georgia';
context.textBaseline = 'top';

  gradient = context.createLinearGradient(0, 0, 0, 109);
  gradient.addColorStop(0.30, 'red');
  gradient.addColorStop(1.00, 'black');
  context.fillStyle = gradient;
  context.fillText(  "MTG Training Guild", 0, 20);
  context.strokeText("MTG Training Guild", 0, 20);

function O(i) { return typeof i == 'object' ? i : document.getElementById(i) }
function S(i) { return O(i).style                                            }
function C(i) { return document.getElementsByClassName(i)                    }
