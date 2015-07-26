(ns my-symphony.beat
  (:require [overtone.live :refer :all]
            [overtone.inst.synth :refer :all]
            [overtone.inst.drum :refer :all]
            [int-2-freq.core :as me]
            [my-symphony.silly-bills :as sill]
            [shadertone.tone :as t]))

(t/start-fullscreen "src/my_symphony/disco.glsl" :textures [:previous-frame])

(do
  (t/stop)
  (stop))

;; patterns/probabilities

(def pieces {:probs [
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     [1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1]
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]]
             :notes [
                     [[7] [7] [7] [7] [3] [5] [3] [5]
                      [5] [5] [5] [5] [4] [4] [9] [9]]
                     [[-7 7 9] [0 -7] [7 9] [0 -7] [5] [3 -1] [5] [3 -1]
                      [5 -2] [4 -3] [5 -2] [4 -3] [7 -7] [9 -7] [9 -7] [7 -7]]
                     [[1] [1] [1] [1] [3] [3] [3] [3]
                      [5] [5] [5] [5] [7] [7] [7] [7]]
                     [[1] [8] [1] [8] [3] [11] [3] [11]
                      [5] [12] [5] [12] [7] [14] [7] [14]]]
             :index 0})

(def beeps {:probs [
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                    [0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5]
                    [1 0.75 1 0.75 1 0.75 1 0.75 1 0.75 1 0.75 1 0.75 1 0.75]
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]]
            :notes [
                    [[5 5 12] [12 5] [5 12 5] [12 5] [12 4 5] [4 5] [4 12 5] [4 5]
                     [4 6 0] [0 5 6] [6 4 0] [5 3 0] [12 4 6 5 5 5] [12 6 4 5 5 5] [4 12 6 0 0] [12 4 6 0]]
                    [[5 5 9] [9 5] [5 9 5] [9 5] [9 9 15] [9 15] [9 9 15] [9 15]
                     [9 6 0] [0 15 6] [6 9 0] [15 3 0] [9 9 6 15 15 15] [9 6 9 15 15 15] [9 9 6 0 0] [9 9 6 0]]
                    [[5] [5] [5] [1 8] [7] [7] [7] [3 8]
                     [9] [9] [9] [5 12] [12] [12] [12] [7 14]]
                    [[1 5 8] [1 5 8] [5] [5] [3 7 11] [3 7 11] [3] [3]
                     [5 8 12] [5 8 12] [5] [5] [7 8 0] [7 8 0] [0] [0]]]
            :index 0})

(def kicks {:probs [[1 0 0 0 ]
                    [1 1 0 1]]
            :index 1})

(def snares {:probs [[0 0 1 0 ]
                     [0.25 0.25 1 0.25]]
             :index 0})

(def chats {:probs [[0 1 0 1]
                    [0.5 0.5 0.5 0.5]]
            :index 1})

(def ohats {:probs [[1 0 1 0]
                    [1 0.5 1 0.5]]
            :index 1})

;; instruments
(defn avoice
  [note idx]
  (if (= (mod idx 4) 0) (sill/play note)))

(defn teebs
  [note idx]
  (tb303 :note note :amp 0.75 :cutoff (get [2000 100 25000 1200] (mod idx 4)) :attack 0.25 )
  (tb303 :note (+ 7  note) :amp 0.75 :cutoff (get [2000 100 25000 1200] (mod idx 4)) :attack 0.25 ))

(defn kicky
  [idx]
  (dance-kick :amp 0.75))

(defn snary
  [idx]
  (noise-snare :amp 0.75 :decay 0.5 :freq 1200))

(defn chatty
  [idx]
  (closed-hat))

(defn ohatty
  [idx]
  (open-hat))

(defn play
  "what happens now"
  [beat funk-it-up]
  (funk-it-up (mod beat 16) teebs pieces)
  (funk-it-up (mod beat 16) avoice beeps)
  (funk-it-up (mod beat 16) avoice pieces)
  (funk-it-up (mod beat 4) kicky kicks)
  (funk-it-up (mod beat 4) snary snares)
  (funk-it-up (mod beat 4) chatty chats)
  (funk-it-up (mod beat 4) ohatty ohats)
  )

;; utils/sequencer
(defn get-current
  "grab current thing for stuff"
  [notations el]
  (->>
   (get notations :index)
   (get (notations el))))

(defn maybe-play
  "roll the dice! play yr cards!"
  [idx instroo notations]
  (let [prob (get-current notations :probs)]
    (if (< (rand) (get prob idx))
      (if (get-current notations :notes)
        (->
         (get-current notations :notes)
         (get idx)
         (rand-nth)
         (me/int-2-freq :F2 :pent-maj)
         (hz->midi)
         (instroo idx))
        (instroo idx)))))

(defn player
  "tick tick tick tock"
  [beat]
  (at (metro beat) (play beat maybe-play))
  (apply-by (metro (inc beat)) #'player (inc beat) []))

(def metro (metronome 178))

(player (metro))
