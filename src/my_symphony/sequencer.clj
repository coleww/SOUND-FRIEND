(ns my-symphony.sequencer
  (:require [overtone.live :refer :all]
            [my-symphony.careening-inst.clj :refer :all]
            [my-symphony.careening-prob.clj :refer :all]
            [int-2-freq.core :as me]))

;(player (metro))
;(stop)

;; instruments, these will get reset!
(def lead (atom nil))
(def base (atom nil))
(def ambnt (atom nil))
(def hevvy (atom nil))
(def vox (atom nil))
(def kicky (atom nil))
(def snary (atom nil))
(def chatty (atom nil))
(def ohatty (atom nil))
(def crashy (atom nil))
(def tommy (atom nil))

;; probabilities for samples/synths
(def chats (atom {:probs [[]] :index 0}))
(def ohats (atom {:probs [[]] :index 0}))
(def kicks (atom {:probs [[]] :index 0}))
(def snares (atom {:probs [[]] :index 0}))
(def crashes (atom {:probs [[]] :index 0}))
(def toms (atom {:probs [[]] :index 0}))
(def voxes (atom {:probs [[]] :notes [[]] :index 0}))
(def leads (atom {:probs [[]] :notes [[]] :index 0}))
(def bases (atom {:probs [[]] :notes [[]] :index 0}))
(def ambnts (atom {:probs [[]] :notes [[]] :index 0}))
(def hevvys (atom {:probs [[]] :notes [[]] :index 0}))

(defn play
  "what happens now PERHAPS this could utilize an atom that gets redefined elsewhere for the moduluses?"
  [beat funk-it-up]
  (funk-it-up (mod beat 8) kicky kicks)
  (funk-it-up (mod beat 8) snary snares)
  (funk-it-up (mod beat 8) chatty chats)
  (funk-it-up (mod beat 8) ohatty ohats)
  (funk-it-up (mod beat 8) crashy crashes)
  (funk-it-up (mod beat 8) tommy toms)

  (funk-it-up (mod beat 16) lead leads)
  (funk-it-up (mod beat 16) base bases)
  (funk-it-up (mod beat 16) ambnt ambnts)
  (funk-it-up (mod beat 16) hevvy hevvys)

  (if (= (mod beat 2) 0)
    (do ;; evens
      (funk-it-up (mod beat 8) vox bases))
    (do ;; odds
      (funk-it-up (mod beat 8) vox leads))))

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
