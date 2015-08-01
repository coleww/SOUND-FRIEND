(ns my-symphony.sequencer
  (:require [overtone.live :refer :all]
            [int-2-freq.core :as me]))

(player (metro))
;(stop)

(def key (atom {:tonic :F3 :scale :minor :bpm 152}))

;; instruments
(def lead (atom nil))
(def baze (atom nil))
(def ambnt (atom nil))
(def hevvy (atom nil))
(def vox (atom nil))
;; drums
(def kicky (atom nil))
(def snary (atom nil))
(def chatty (atom nil))
(def ohatty (atom nil))
(def crashy (atom nil))
(def tommy (atom nil))

;; probabilities for samples/synths
(def chats (atom {:probs [[]] :index 0 :mod 8}))
(def ohats (atom {:probs [[]] :index 0 :mod 8}))
(def kicks (atom {:probs [[]] :index 0 :mod 8}))
(def snares (atom {:probs [[]] :index 0 :mod 8}))
(def crashes (atom {:probs [[]] :index 0 :mod 8}))
(def toms (atom {:probs [[]] :index 0 :mod 8}))
(def voxes (atom {:probs [[]] :notes [[]] :index 0 :mod 16}))
(def leads (atom {:probs [[]] :notes [[]] :index 0 :mod 16}))
(def bazes (atom {:probs [[]] :notes [[]] :index 0 :mod 16}))
(def ambnts (atom {:probs [[]] :notes [[]] :index 0 :mod 16}))
(def hevvys (atom {:probs [[]] :notes [[]] :index 0 :mod 16}))

(defn play
  "what happens"
  [beat funk-it-up]
  (funk-it-up beat @kicky @kicks)
  (funk-it-up beat @snary @snares)
  (funk-it-up beat @chatty @chats)
  (funk-it-up beat @ohatty @ohats)
  (funk-it-up beat @crashy @crashes)
  (funk-it-up beat @tommy @toms)

  (funk-it-up beat @lead @leads)
  (funk-it-up beat @baze @bazes)
  (funk-it-up beat @ambnt @ambnts)
  (funk-it-up beat @hevvy @hevvys)

  (funk-it-up beat @vox @bazes)
  (funk-it-up beat @vox @leads))

;; utils/sequencer
(defn get-current
  "grab current thing for stuff"
  [notations el]
  (->>
   (get notations :index)
   (get (notations el))))

(defn maybe-play
  "roll the dice! play yr cards!"
  [beat instroo notations]
  (let [prob (get-current notations :probs)
        idx (mod beat (:mod notations))]
    (if (and (pos? (count prob)) (< (rand) (get prob idx)))
      (if (pos? (count  (get-current notations :notes)))
        (->
         (get-current notations :notes)
         (get idx)
         (rand-nth)
         (me/int-2-freq (:tonic @key) (:scale @key))
         (hz->midi)
         (instroo idx))
        (instroo idx)))))

(def metro (metronome (:bpm @key)))

(defn player
  "tick tick tick tock"
  [beat]
  (at (metro beat) (play beat maybe-play))
  (apply-by (metro (inc beat)) #'player (inc beat) []))
