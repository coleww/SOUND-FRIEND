(ns my-symphony.beat
  (:require [overtone.live :refer :all]
            [overtone.inst.synth :refer :all]
            [overtone.inst.drum :refer :all]
            [int-2-freq.core :as me]
            [shadertone.tone :as t]))

;(t/start-fullscreen "src/my_symphony/disco.glsl")

(def pieces {:probs [
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     [1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1]
                     ]

             :notes [
                     [[2 0] [7] [2 0] [7] [3 2] [5] [3 2] [5]
                      [5 6] [4 5] [5 6] [2 9] [4 12] [7 9 6] [4 6 12] [7 9 10]]
                      [[12 10] [14] [12 10] [14] [3 12] [5] [3 12] [5]
                      [5 6] [4 5] [5 6] [12 9] [4 12] [14 9 6] [4 6 12] [14 9 10]]
                     ]})

(def beeps {:probs [
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                    [0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5]
                    ]
            :notes [
                    [[10 10 12] [12 10] [10 12 10] [12 10] [12 4 5] [4 5] [4 12 5] [4 5]
                     [4 6 0] [0 5 6] [6 4 0] [5 3 0] [12 4 6 5 5 5] [12 6 4 5 5 5] [4 12 6 0 0] [12 4 6 0]]
                     [[10 10 2] [2 10] [10 2 10] [2 10] [2 9 15] [9 15] [9 2 15] [9 15]
                     [9 6 0] [0 15 6] [6 9 0] [15 3 0] [2 9 6 15 15 15] [2 6 9 15 15 15] [9 2 6 0 0] [2 9 6 0]]
                    ]})

(def metro (metronome 178))
(def current-idx (atom 0) )
(reset! current-idx 0)

(defn player
  "tick tick tick tock"
  [beat]
  (at (metro beat) (play beat))
  (apply-by (metro (inc beat)) #'player (inc beat) []))

(defn get-current
  "grab current thing"
  [notations el]
  (get (notations el) @current-idx))

(defn maybe-play
  "roll the dice!"
  [idx instroo notations]
  (let [prob (get-current notations :probs)]
    (println "MAYBE" idx prob)
    (if (< (rand) (get prob idx))
      (if (get-current notations :notes)
        (->
         (get-current notations :notes)
         (get idx)
         (rand-nth)
         (me/int-2-freq :F2 :pent-maj)
         (hz->midi)
         (instroo))))))

(defn instro1
  [note]
  (tb303 (- note 24) 1 0.2 0.31915 0.215 0.5 0.21 950 0.75 0.15))
(defn instro2
  [note]
  (tb303 (+ note 24) 0 0.92 0.371915 0.1715 0.25 0.31 1250 0.5 0.15))



(defn play
  "what happens now"
  [beat]
  (maybe-play (mod beat 16) instro1 pieces)
  (maybe-play (mod beat 8) instro2 beeps)
  (if  (= (mod beat 4) 0) (kick2 80 0.5 0.2 5))
  (if  (= (mod (+ 2  beat) 4) 0) (snare 0.7 1 1 ))
  (if (= (mod beat 3) 0) (open-hat))
  (if (= (mod beat 5) 0) (closed-hat))
  (if (= (mod beat 7) 0) (snare2 100 0.3 5 ))
  (closed-hat)
 )



(player (metro))

(do
  (t/stop)
  (stop))
