(ns my-symphony.sequencer
  (:require [overtone.live :refer :all]
            [my-symphony.play :refer :all]
            [int-2-freq.core :as me]))


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
      (if (pos? (count  (get-current notations :notes)))
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
