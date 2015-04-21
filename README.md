WAAW Web Audio API Wrap v0.1 - Library to help you with Web Audio API
=====================================================================

This javascript library will help you to produce any kind of sound using the
Web Audio API implemented in all modern browser. The library will abstract all
the complexities of this API and enable you to create great online audio
applications or simply add sound to your website.

Install
-------
Place the file js/waaw.js on your webserver and include a script tag in
your html pointing to it. That's all.


Examples
--------
You can see several examples located in the folder examples/ or loading the
/index.html in a browser.

How to use it
-------------
Probably the most simple example that produce a sound is this:

var instrument = WAAW.createInstrument();
instrument.createFromOscillator();
instrument.play(0,1,"C4");


Check the examples folder to learn how to use microphones, load and play audio
files, add effects to your sound sources or include graphical analyzers.


Enjoy it!


