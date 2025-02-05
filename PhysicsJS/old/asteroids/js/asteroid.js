define(
[
    'require',
    'physicsjs'
],
function(
    require, Physics
){

    Physics.body('asteroid', 'circle', function( parent ){
        var ast1 = new Image();
        ast1.src = require.toUrl('images/asteroid.png');

        return {
            init: function( options ){
                parent.init.call(this, options);
                this.view = ast1;
            },
            blowUp: function(){
                var self = this;
                var world = self._world;
                if (!world){
                    return self;
                }
                var scratch = Physics.scratchpad();
                var rnd = scratch.vector();
                var pos = this.state.pos;
                var n = 40;
                var r = 2 * this.geometry.radius;
                var size = r / n;
                var mass = 0.001;
                var d;
                var debris = [];

                // create debris
                while ( n-- ){
                    rnd.set( Math.random() - 0.5, Math.random() - 0.5 ).mult( r );
                    d = Physics.body('circle', {
                        x: pos.get(0) + rnd.get(0),
                        y: pos.get(1) + rnd.get(1),
                        vx: this.state.vel.get(0) + (Math.random() - 0.5),
                        vy: this.state.vel.get(1) + (Math.random() - 0.5),
                        angularVelocity: (Math.random()-0.5) * 0.06,
                        mass: mass,
                        radius: size,
                        restitution: 0.8,
                        styles: {
                            fillStyle: '#000',
                            strokeStyle: '#ff0101',
                            lineWidth: 2
                        }
                    });
                    d.gameType = 'debris';

                    debris.push( d );
                }

                setTimeout(function(){
                    for ( var i = 0, l = debris.length; i < l; ++i ){
                        world.removeBody( debris[ i ] );
                    }
                    debris = undefined;
                }, 1000);

                world.add( debris );
                world.removeBody( self );
                scratch.done();
                world.emit('blow-up');
                return self;
            }
        };
    });
});