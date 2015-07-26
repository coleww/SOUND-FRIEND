(ns my-symphony.beat
  (:require [overtone.live :refer :all]
            [overtone.inst.synth :refer :all]
            [overtone.inst.drum :refer :all]
            [overtone.inst.piano :refer :all]
            [int-2-freq.core :as me]
            [my-symphony.silly-bills :as sill]
            [shadertone.tone :as t]))

                                        ;(t/start-fullscreen "src/my_symphony/disco.glsl")



(def pieces {:probs [
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     [1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1 1 0.1]
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                     ]

             :notes [
                     [[7] [7] [7] [7] [3] [5] [3] [5]
                      [5] [5] [5] [5] [4] [4] [9] [9]]

                     [[12 17] [14] [12 17] [14] [3 12] [5] [3 12] [5]
                      [5 6] [4 5] [5 6] [12 9] [4 12] [14 9 6] [4 6 12] [14 9 17]]

                     [[] [] [] [] [] [] [] []
                      [] [] [] [] [] [] [] []]

                     [[] [] [] [] [] [] [] []
                      [] [] [] [] [] [] [] []]
                     ]
             :index 0})

(def beeps {:probs [
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                    [0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5 0.75 0.5]
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                    [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]
                    ]
            :notes [
                    [[10 10 19] [19 10] [10 19 10] [19 10] [19 4 5] [4 5] [4 19 5] [4 5]
                     [4 6 0] [0 5 6] [6 4 0] [5 3 0] [19 4 6 5 5 5] [19 6 4 5 5 5] [4 19 6 0 0] [19 4 6 0]]

                    [[10 10 9] [9 10] [10 9 10] [9 10] [9 9 15] [9 15] [9 9 15] [9 15]
                     [9 6 0] [0 15 6] [6 9 0] [15 3 0] [9 9 6 15 15 15] [9 6 9 15 15 15] [9 9 6 0 0] [9 9 6 0]]

                    [[] [] [] [] [] [] [] []
                     [] [] [] [] [] [] [] []]

                    [[] [] [] [] [] [] [] []
                     [] [] [] [] [] [] [] []]
                    ]
            :index 1})

(def metro (metronome 178))

(defn player
  "tick tick tick tock"
  [beat]
  (at (metro beat) (play beat))
  (apply-by (metro (inc beat)) #'player (inc beat) []))

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
    (println "MAYBE" idx prob)
    ;; if random number is less than probability
    (if (< (rand) (get prob idx))
      ;; if note notations exist
      (if (get-current notations :notes)
        ;; get a random note for this beat and pass it to the instrument
        (->
         (get-current notations :notes)
         (get idx)
         (rand-nth)
         (me/int-2-freq :F2 :pent-maj)
         (hz->midi)
         (instroo))
        ;; else: play the instrument (sampler?)
        (instroo)
        ))))

(defn avoice
  [note]
  (sill note :aaaa))


(defn instro1
  [note]
  (tb303 (- note 24) 1 0.2 0.71915 0.215 0.5 0.21 650 0.75 0.15))

(defn instro2
  [note]
  (tb303 (+ note 24) 0 0.92 0.75371915 0.81715 0.25 0.31 850 0.5 0.15))



(defn play
  "what happens now"
  [beat]
  (maybe-play (mod beat 16) instro1 pieces)
  (maybe-play (mod beat 8) instro2 beeps)

  (if  (= (mod beat 4) 0) (kick2 80 0.5 0.2 5))
  (if  (= (mod (+ 2  beat) 4) 0) (snare 0.7 1 1 ))
                                        ;(if (= (mod beat 2) 0) (open-hat))
                                        ;(if (= (mod beat 4) 0) (closed-hat))
                                        ;(if (= (mod beat 8) 0) (snare2 100 0.3 5 ))

  )



(player (metro))

(do
  (t/stxop)
  (stop))
