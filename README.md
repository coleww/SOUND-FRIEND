MY-SYMPHONY
----------------------

live coding probabilistic sequences with overtone/shadertone

int-2-freq converts an integer index to a frequency based on a tonic/scale

probs: [array, of, floating, point, probabilities, that, a, sound, will, happen]

notes: [[array, of, arrays, of, positive, or, negative, integers, representing, scale, offsets]]


NOTE: silly-bills will download an enormous amount of vocal formant samplers to yr hard drive BE WARNED





DIVIDE FILES:

sequencer: just the util/control functions, anything that won't be touched live
play-func: just the thing that gets called by the sequencer. uses abstract names for insts/data like bass, lead, snare, etc.

insts: just the inst functions, change song by re-defining them. each "song" defines this set of 8-16 things.
probs: just the datas
fx: ?HOW DO U EVEN?
