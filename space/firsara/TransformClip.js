setPackage('firsara');

firsara.TransformClip = (function(){
  var Parent = firsara.Transformable;

  var TransformClip = function(){
    // instance
    var self = this;
    // constructor
    var Init = function(){
      // call super constructor
      if (Parent) Parent.call(self);
      if (firsara.MoveClip) firsara.MoveClip.call(self);
      if (firsara.RotateClip) firsara.RotateClip.call(self);
      if (firsara.ScaleClip) firsara.ScaleClip.call(self);
    };

    // initialize instance
    Init();
  };

  // export public TransformClip definition
  TransformClip.prototype = {};

  // extend TransformClip with defined parent
  if (Parent) sys.inherits(TransformClip, Parent);

  // return TransformClip definition to public scope
  return TransformClip;
})();