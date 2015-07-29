(ns my-symphony.beat
  (:require [overtone.live :refer :all]
            [overtone.inst.synth :refer :all]
            [overtone.inst.drum :refer :all]
            [overtone.inst.piano :refer :all]
            [int-2-freq.core :as me]
            [my-symphony.silly-bills :as sill]
            [shadertone.tone :as t]))


; synth1 synth2 kick snare c-hat o-hat
(def last-probs (atom [0 0 0 0 0 ]))
;(t/start-fullscreen "src/my_symphony/disco.glsl" :textures [:overtone-audio :previous-frame] :user-data {"iProbs" last-probs})


(t/start-fullscreen "src/my_symphony/disco.glsl" :textures [:overtone-audio])
;(swap! last-probs #(the average of this round of probs) )

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
             :index 2})

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
            :index 2})

(def kicks {:probs [[1 0.5 0 0 1 0 1 0]
                    [1 1 0 1 1 1 0 1]
                    [0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5]]
            :index 0})

(def snares {:probs [[0 0 1 0 1 0.6 1 0.6 ]
                     [0 0 0 0 0 0 0 0]
                     [0.25 0.25 1 0.25 0.5 0.5 1 0.5]]
             :index 0})

(def chats {:probs [[0.7 0.7 1 0.27 0.27 0.27 0.21 0.27]
                    [1 0 1 0 1 0 1 0]
                    [0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5]]
            :index 1})

(def ohats {:probs [[1 0.5 1 0.5 1 0.5 1 0.5]
                    [0.25 0.5 0.25 0.5 0.5 0.5 0.5 0.5]
                    [0 1 0 1 0 1 0 1]]
            :index 0})

;; instruments
(defn avoice
  [note idx]
  ;(if (= (mod idx 2) 0) (sill/play (+  note 5)))
  ;(if (= (mod idx 4) 0) (sill/play (+  note 3)))
  ;(if (= (mod idx 6) 0) (sill/play (+  note 12) ))
  ;(if (= (mod idx 3) 0) (sill/play (+ note 12) ))
  )

(cs80lead  )

(ctl cs80lead :amp 0.015 :att 0.25 :cutoff 1500)

(defn teebs
  [note idx]
  (ctl cs80lead :freq (midi->hz (- note 12)))



  (tb303 :note note  :amp 0.5 :cutoff (get [2000 100 18000 1000] (mod idx 4)) :attack 0.135 :release 0.25)
  ;(tb303 :note (-  note 7) :amp 0.5 :cutoff (get [1700 200 19000 900] (mod idx 4)) :attack 0.125 :release 0.35)
  )


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
;(funk-it-up (mod beat 8) kicky kicks)
;(funk-it-up (mod beat 8) snary snares)
(funk-it-up (mod beat 8) chatty chats)
(funk-it-up (mod beat 8) ohatty ohats)

(funk-it-up (mod beat 16) teebs pieces)
                                        ;(calculate-probs (mod beat 16))
;; wait this is not correct
  (if (=  (mod beat 3) 0)
    (do ;; evens
     ;
      (funk-it-up (mod beat 8) avoice beeps)
      )
    (do ;; odds

(funk-it-up (mod beat 16) avoice pieces)
      )

    ))


(stop)





(defn calculate-probs
  "there is a better way of doing this, i am certain"
  [idx]
  (reset! last-probs  [(get  (get (:probs pieces) (:index pieces)) idx)
                       (get  (get (:probs beeps) (:index beeps)) idx)
                       (get  (get (take 16 (cycle (:probs kicks))) (:index kicks)) idx)
                       (get  (get  (take 16 (cycle (:probs snares))) (:index snares)) idx)
                       (get  (get  (take 16 (cycle (:probs chats))) (:index chats)) idx)
                       (get  (get  (take 16 (cycle (:probs ohats))) (:index ohats)) idx)]))


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
         (me/int-2-freq :F2 :pent-min)
         (hz->midi)
         (instroo idx))
        (instroo idx)))))

(def metro (metronome 178))

(defn player
  "tick tick tick tock"
  [beat]
  (at (metro beat) (play beat maybe-play))
  (apply-by (metro (inc beat)) #'player (inc beat) []))


(player (metro))
(stop)
