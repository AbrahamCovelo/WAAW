/* 
    WAAW Web Audio API Wrap v0.1 - Library to help you with Web Audio API
    Copyright (C) 2015  Abraham Covelo <abraham.covelo@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


"use strict";

var WAAW = WAAW || {};

WAAW = {
    output: null,
    audioContext: null,
    
    init: function() {
        var contextClass = (window.AudioContext || 
        window.webkitAudioContext || 
        window.mozAudioContext || 
        window.oAudioContext || 
        window.msAudioContext);
        if (contextClass) {
            try
            {
                // Web Audio API is available.
                WAAW.audioContext =  new contextClass();
                WAAW.output = WAAW.audioContext.destination;
            }
            catch(e)
            {
                alert('Audio Web cannot be initialized');
            }
        } else {
            alert('Audio Web not supported in this browser');
        }
        
    },
    
    getAudioContext: function()
    {
        return this.audioContext;
    },
    
    getOutput: function()
    {
        return this.output;
    },
    
    //Graphical anylizer functions
    
    updateGraphs: function(analyser, freqCanvas, waveCanvas)
    {
        analyser.fftSize = 2048;

        if(typeof freqCanvas !== 'undefined' && freqCanvas)
        {
            //var freqDomain = new Uint8Array(analyser.frequencyBinCount);
            var freqDomain = new Float32Array(analyser.frequencyBinCount);
            this.drawFrequency(freqDomain, analyser, freqCanvas);
        }

        if(typeof waveCanvas !== 'undefined' && waveCanvas)
        {
            //var timeDomain = new Uint8Array(analyser.frequencyBinCount);
            var timeDomain = new Float32Array(analyser.frequencyBinCount);
            this.drawWave(timeDomain, analyser, waveCanvas);
        }

    },

    drawWave: function(data, analyser, canvas)
    {
        //analyser.getByteTimeDomainData(data);
        analyser.getFloatTimeDomainData(data);
        var thisFunction = this;
        window.requestAnimationFrame(function() {thisFunction.drawWave(data, analyser, canvas);});
        this.drawGraphic(data, canvas, 'wave');

    },

    drawFrequency: function(data, analyser, canvas)
    {
        analyser.smoothingTimeConstant = 0;
        //analyser.getByteFrequencyData(data);
        analyser.getFloatFrequencyData(data);
        var thisFunction = this;
        window.requestAnimationFrame(function() {thisFunction.drawFrequency(data, analyser, canvas);});
        this.drawGraphic(data, canvas, 'freq'/*, analyser.minDecibels, analyser.maxDecibels */);
    },

    drawGraphic: function(data, canvas, type) //freqDomain, canvas)
    {
        var dataMin = 999999;
        var posMin = 0;
        var dataMax = -999999;
        var posMax = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data[i]>dataMax)
            {
                dataMax = data[i];
                posMax = i;
            }
            if(data[i]<dataMin)
            {
                dataMin = data[i];
                posMin = i;
            }
        }
        var w = canvas.width;
        var h = canvas.height;
        var drawContext = canvas.getContext('2d');
        drawContext.fillStyle = 'rgb(0, 0, 0)'; // draw wave with canvas
        drawContext.fillRect(0, 0, w, h);

        var x,y,width,height;
        for(var i=0;i<data.length;i++)
        {
            x = i * w / data.length;
            y = h;
            width = w / data.length;
            height = (dataMin - data[i]) / Math.abs(dataMax-dataMin) * h;
            //drawContext.fillStyle = 'black';
            drawContext.fillStyle = 'hsl(' + (i/data.length*360) + ', 100%, 50%)';
            drawContext.fillRect(x,y,width,height);
        }

        if(type==='freq')
        {
            drawContext.fillText("Main frequency: " + posMax , 0, 10);
        }
        else
        {
            drawContext.fillText("Wave" , 0, 10);
        }
    },
    pitches: {
        'A0'  : 27.5000,
        'A#0' : 29.1352,
        'Bb0' : 29.1352,
        'B0'  : 30.8677,
        'C1'  : 32.7032,
        'C#1' : 34.6478,
        'Db1' : 34.6478,
        'D1'  : 36.7081,
        'D#1' : 38.8909,
        'Eb1' : 38.8909,
        'E1'  : 41.2034,
        'F1'  : 43.6535,
        'F#1' : 46.2493,
        'Gb1' : 46.2493,
        'G1'  : 48.9994,
        'G#1' : 51.9131,
        'Ab1' : 51.9131,
        'A1'  : 55.0000,
        'A#1' : 58.2705,
        'Bb1' : 58.2705,
        'B1'  : 61.7354,
        'C2'  : 65.4064,
        'C#2' : 69.2957,
        'Db2' : 69.2957,
        'D2'  : 73.4162,
        'D#2' : 77.7817,
        'Eb2' : 77.7817,
        'E2'  : 82.4069,
        'F2'  : 87.3071,
        'F#2' : 92.4986,
        'Gb2' : 92.4986,
        'G2'  : 97.9989,
        'G#2' : 103.826,
        'Ab2' : 103.826,
        'A2'  : 110.000,
        'A#2' : 116.541,
        'Bb2' : 116.541,
        'B2'  : 123.471,
        'C3'  : 130.813,
        'C#3' : 138.591,
        'Db3' : 138.591,
        'D3'  : 146.832,
        'D#3' : 155.563,
        'Eb3' : 155.563,
        'E3'  : 164.814,
        'F3'  : 174.614,
        'F#3' : 184.997,
        'Gb3' : 184.997,
        'G3'  : 195.998,
        'G#3' : 207.652,
        'Ab3' : 207.652,
        'A3'  : 220.000,
        'A#3' : 233.082,
        'Bb3' : 233.082,
        'B3'  : 246.942,
        'C4'  : 261.626,
        'C#4' : 277.183,
        'Db4' : 277.183,
        'D4'  : 293.665,
        'D#4' : 311.127,
        'Eb4' : 311.127,
        'E4'  : 329.628,
        'F4'  : 349.228,
        'F#4' : 369.994,
        'Gb4' : 369.994,
        'G4'  : 391.995,
        'G#4' : 415.305,
        'Ab4' : 415.305,
        'A4'  : 440.000,
        'A#4' : 466.164,
        'Bb4' : 466.164,
        'B4'  : 493.883,
        'C5'  : 523.251,
        'C#5' : 554.365,
        'Db5' : 554.365,
        'D5'  : 587.330,
        'D#5' : 622.254,
        'Eb5' : 622.254,
        'E5'  : 659.255,
        'F5'  : 698.456,
        'F#5' : 739.989,
        'Gb5' : 739.989,
        'G5'  : 783.991,
        'G#5' : 830.609,
        'Ab5' : 830.609,
        'A5'  : 880.000,
        'A#5' : 932.328,
        'Bb5' : 932.328,
        'B5'  : 987.767,
        'C6'  : 1046.50,
        'C#6' : 1108.73,
        'Db6' : 1108.73,
        'D6'  : 1174.66,
        'D#6' : 1244.51,
        'Eb6' : 1244.51,
        'E6'  : 1318.51,
        'F6'  : 1396.91,
        'F#6' : 1479.98,
        'Gb6' : 1479.98,
        'G6'  : 1567.98,
        'G#6' : 1661.22,
        'Ab6' : 1661.22,
        'A6'  : 1760.00,
        'A#6' : 1864.66,
        'Bb6' : 1864.66,
        'B6'  : 1975.53,
        'C7'  : 2093.00,
        'C#7' : 2217.46,
        'Db7' : 2217.46,
        'D7'  : 2349.32,
        'D#7' : 2489.02,
        'Eb7' : 2489.02,
        'E7'  : 2637.02,
        'F7'  : 2793.83,
        'F#7' : 2959.96,
        'Gb7' : 2959.96,
        'G7'  : 3135.96,
        'G#7' : 3322.44,
        'Ab7' : 3322.44,
        'A7'  : 3520.00,
        'A#7' : 3729.31,
        'Bb7' : 3729.31,
        'B7'  : 3951.07,
        'C8'  : 4186.01
    },
    getFrequencyFromNote: function(note)
    {
        if(typeof this.pitches[note] !== 'undefined' || this.pitches[note])
        {
            return this.pitches[note];
        }
        else
        {
            var pitch = parseFloat(note);
            if(isNaaN(pitch))
            {
                return this.pitches.A4;//Default note A4
            }
            return pitch;
        }
    },
    getNoteFromFrequency: function(frequency)
    {
        for (var property in this.pitches)
        {
            if (WAAW.pitches.hasOwnProperty(property))
            {
                if(WAAW.pitches[property]==frequency)
                {
                    return property;
                }
            }
        }
        return null;
    },
    getSemitonesBeetween2Notes: function(note1,note2)
    {
        var note1Found = false;
        var note2Found = false;
        var steps = 0;
        for (var property in this.pitches)
        {
            if (this.pitches.hasOwnProperty(property))
            {
                if(property===note1)
                {
                    note1Found = true;
                    if(property.indexOf('b')>0)
                    {
                        steps++;
                    }
                }
                if(property===note2)
                {
                    note2Found = true;
                    if(property.indexOf('b')>0)
                    {
                        steps--;
                    }
                }
                
                if(note1Found && note2Found)
                {
                    break;
                }
                
                if(property.indexOf('b')>0)
                {
                    continue;//Do not count flat notes only sharps
                }
                
                if(note1Found)
                {
                    steps++;
                }
                
                if(note2Found)
                {
                    steps--;
                }
            }
        }
        if(note1Found && note2Found)
        {
            return steps;
        }
        return null;//If notes weren't found we are unable to find the semitones
    },
    
    createNoiseBuffer: function(seconds)
    {
        if(typeof seconds === 'undefined')
        {
            seconds = 1;
        }
        var noiseBuffer = WAAW.getAudioContext().createBuffer(2, seconds * WAAW.getAudioContext().sampleRate, WAAW.getAudioContext().sampleRate);
        var left = noiseBuffer.getChannelData(0);
        var right = noiseBuffer.getChannelData(1);
        for (var i = 0; i < noiseBuffer.length; i++)
        {
            left[i] = Math.random() * 2 - 1;
            right[i] = Math.random() * 2 - 1;
        }
        return noiseBuffer;
    },



    createInstrument: function()
    {
        return {
            playable: null,/* function that returns the new audio node to be played */
            playing: null,/* Audio node to be played */
            effects: new Array(),/* Set of effects applied to the audio node and connected finally to the WAAW.output for reproduction*/
            source: null,
            frequency: null,

            /*
             * Only to report internally about current sound frequency
             * do not change sound frequency in any way
             */
            setFrequency: function(frequency)
            {
                this.frequency = frequency;
                return this;
            },

            getFrequency: function()
            {
                return this.frequency;
            },

            addEffectGain: function(value)
            {
                if(typeof value === 'undefined' || !value) value = 1;
                var gain = WAAW.audioContext.createGain();
                gain.gain.value = value;
                this.addEffect(gain);
                return gain;
            },

            addEffectDelay: function(value)
            {
                if(typeof value === 'undefined' || !value) value = 1.0;
                var delay = WAAW.audioContext.createDelay();
                delay.delayTime.value = delay;
                this.addEffect(delay);
                return delay;
            },

            addEffectBiquadFilter: function()
            {
                var biquadFilter = WAAW.audioContext.createBiquadFilter();
                this.addEffect(biquadFilter);
                return biquadFilter;
            },

            addEffectWaveShaper: function()
            {
                var waveShaper = WAAW.audioContext.createWaveShaper();
                this.addEffect(waveShaper);
                return waveShaper;
            },

            addEffectPanner: function()
            {
                var panner = WAAW.audioContext.createPanner();
                this.addEffect(panner);
                return panner;
            },

            addEffectStereoPanner: function()
            {
                var stereoPanner = WAAW.audioContext.createStereoPanner();
                this.addEffect(stereoPanner);
                return stereoPanner;
            },

            addEffectConvolver: function(buffer)
            {
                var convolver = WAAW.audioContext.createConvolver();
                convolver.buffer = buffer;
                this.addEffect(convolver);
                return convolver;
            },

            addEffectChannelSplitter: function()
            {
                var channelSplitter = WAAW.audioContext.createChannelSplitter();
                this.addEffect(channelSplitter);
                return channelSplitter;
            },

            addEffectChannelMerger: function()
            {
                var channelMerger = WAAW.audioContext.createChannelMerger();
                this.addEffect(channelMerger);
                return channelMerger;
            },

            addEffectDynamicCompressor: function()
            {
                var compressor = WAAW.audioContext.createDynamicCompressor();
                this.addEffect(compressor);
                return compressor;
            },

            addEffectAnalyser: function()
            {
                var analyser = WAAW.audioContext.createAnalyser();
                this.addEffect(analyser);
                return analyser;
            },

            addEffect: function(effect)
            {
                this.effects.push(effect);
                this.applyEffects();
            },

            clearEffects: function()
            {
                this.effects = array();
                this.applyEffects();
            },

            applyEffects: function()
            {
                if(!this.playing)
                {
                    console.log('[WARNING] Trying to apply effects without audio source created');
                    return;
                }
                
                this.playing.disconnect();

                if(typeof this.effects === 'undefined' || !this.effects)
                {
                    this.playing.connect(WAAW.getOutput());
                }
                else
                {
                    var firstEffect = null;
                    var previousEffect = null;
                    var i;
                    for(i in this.effects)
                    {
                        this.effects[i].disconnect();
                        if(!firstEffect)
                        {
                            firstEffect = this.effects[i];
                            this.playing.connect(firstEffect);
                        }
                        if(previousEffect)
                        {
                            previousEffect.connect(this.effects[i]);
                        }
                        previousEffect = this.effects[i];
                    }
                    if(previousEffect)
                    {
                        previousEffect.connect(WAAW.getOutput());
                    }
                    else
                    {
                        this.playing.connect(WAAW.getOutput());
                    }
                }
            },

            /**
             * 
             * @param enum type OscillatorType {"sine","square","sawtooth","triangle","custom"}
             * @param number frequency
             * @param number detune
             * @param PeriodicWave setPeriodicWave
             * @param EventHandler onended
             * @returns WAW.instrument
             */
            createFromOscillator: function(type, frequency, detune, setPeriodicWave, onended)
            {
                this.playable =  function(type, frequency, detune, setPeriodicWave, onended)
                {
                    var oscillator = WAAW.audioContext.createOscillator();
                    if(typeof type === 'undefined' || !type) type = oscillator.SINE;
                    if(typeof frequency === 'undefined' || !frequency) frequency = WAAW.pitches.A4; //Default frequency 440; //A4
                    if(typeof detune === 'undefined' || !detune) detune = 0;

                    this.setFrequency(frequency);

                    oscillator.type = type;
                    oscillator.frequency.value = frequency;
                    oscillator.detune.value = detune;

                    oscillator.setPeriodicWave = setPeriodicWave;
                    oscillator.onended = onended;
                    this.source = oscillator;
                    this.playing = oscillator;
                    this.applyEffects();//Wrong way to apply affect this.playing not defined here

                    return oscillator;
                };

                return this;

            },

            //Micro as instrument source
            createFromMediaStream: function()
            {
                //window.navigator = window.navigator || {};
                navigator.getUserMedia = navigator.getUserMedia       ||
                                       navigator.webkitGetUserMedia ||
                                       navigator.mozGetUserMedia    ||
                                       null;
                var instrument = this;
                if(navigator.getUserMedia)
                {
                    navigator.getUserMedia (
                        // constraints - only audio needed for this app
                        {
                          audio: true
                        },

                        // Success callback
                        function(stream) {
                            instrument.playable = function()
                            {
                                var source = WAAW.audioContext.createMediaStreamSource(stream);
                                instrument.playing = source;
                                instrument.source = source;
                                instrument.applyEffects();
                                return source;
                            };
                            instrument.setFrequency(WAAW.pitches.C4);//Consider this as base frequency for micro
                            instrument.playable();//Starts inmediatelly??
                        },
                        // Error callback
                        function(err) {
                          console.log('The following gUM error occured: ' + err);
                        }
                    );
                }

                return this;
            },

            /**
             * 
             * @param string url
             * @param float frequeny
             * @param function callback(source) Sound loaded and ready to play
             * @param function errorCallback() Problem loading the sound
             * @returns WAAW.instrument
             */
            createFromURL: function(url, frequency, callback, errorCallback)
            {
                if(typeof frequency === undefined || isNaN(frequency) || !frequency)
                {
                    frequency = WAAW.pitches.A4; //Default frequency
                }
                this.setFrequency(frequency);

                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'arraybuffer';

                var instrument = this; 

                // Load & Decode asynchronously
                request.onload = function() {
                  WAAW.audioContext.decodeAudioData(request.response, function(buffer) {
                      instrument.playable = function()
                        {
                            instrument.source = WAAW.audioContext.createBufferSource(); // creates a sound source
                            instrument.source.buffer = buffer;
                            instrument.playing = instrument.source;
                            instrument.applyEffects();
                            return instrument.source;
                        };
                        instrument.setFrequency(WAAW.pitches.C4);//Consider this as base frequency for this sample
                        callback(instrument);//callback when the source is ready to be played
                  }, function() {errorCallback(instrument);});
                };
                request.send();
            },

            play: function(start, duration, pitch, offset)
            {
                if(typeof start === 'undefined' || !start)
                {
                    start = 0;
                }

                if(typeof duration === 'undefined' || !duration)
                {
                    duration = 0;
                }

                if(typeof pitch === 'string')
                {
                    pitch = WAAW.getFrequencyFromNote(pitch);
                }

                if(typeof pitch === 'undefined' || !pitch)
                {
                    pitch = 0;
                }

                if(typeof offset === 'undefined' || !offset)
                {
                    offset=0;
                }

                if(this.isPlayable())
                {
                    this.playing = this.playable();

                    if(typeof this.playing.frequency !=='undefined')//Some audio nodes does not have detune available, only oscillators
                    {
                        this.playing.frequency.value = pitch;
                        //this.playing.detune.value = pitch - this.getFrequency();//Detune relative to the base fequency of this sound. TODO: Check this
                    }

                    if(duration>0)
                    {
                        this.playing.start(WAAW.audioContext.currentTime + start, offset, duration);
                        this.playing.stop(WAAW.audioContext.currentTime + start + duration);//Seems that duration param in start method is not working in some browsers
                    }
                    else
                    {
                        this.playing.start(WAAW.audioContext.currentTime + start, offset);
                    }
                }

                return this;
            },

            //Only stops current playable
            stop: function(when)
            {
                if(typeof when === 'undefined' || !when)
                {
                    when = 0;
                }
                if(this.isPlaying())
                {
                    this.playing.stop(WAAW.audioContext.currentTime + when);
                    this.playing = null;
                }

                return this;
            },

            isPlayable: function()
            {
                return Boolean(this.playable);
            },

            isPlaying: function()
            {
                return Boolean(this.playing);
            } 
        };
    }
};

WAAW.init();

