# 2D Asteroids in PhysicsJS 0.7.0
The creator of PhysicsJS made a tutorial on how to create this game, but using the 0.5 version. I saw making it work using 0.7 as an opportunity to better learn the engine. The main changes were:

* world.publish() became world.emit()
* world.emit() has a different syntax now. See API documentation.
* world.subscribe() became world.on()
* The images are no longer available to download, so create your own.
* Earth made static so it would not move when crashed into.
* Layers have been added to the canvas renderer so offset is accessed differently. The automatically generated layer's id is 'main.'
* Old code created vectorish class object and called vector functions on it. Used scratchpad service instead. 
