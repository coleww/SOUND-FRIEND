midi-band
----------------

controlling a meeblip anode and boss sp-303 with a probabilistic javascript sequencer

// bind a sequence that: 
changes key, 
stops the sequencer, changes bpm, and restarts it
binds a new structure (would make it easier to build/drop?)




SO LIKE, a structure of [0, 1, 0], [1, 1, 0, 0, 2], [2, 2, 3, 2, 4, 5], [etc...]...
PERHAPS: a pattern that gets called every 1 beat, incremementing a counter (or just using internal tick?)
IF: stuff has played N times without reaching the 2+ section
THEN: make that be the next section
OH SO: this could probably benefit from the start-of-sequence callback
