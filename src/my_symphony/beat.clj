(ns my-symphony.beat
  (:require


            [overtone.inst.piano :refer :all]


            [shadertone.tone :as t]))


; synth1 synth2 kick snare c-hat o-hat
(def last-probs (atom [0 0 0 0 0 ]))
;(t/start-fullscreen "src/my_symphony/disco.glsl" :textures [:overtone-audio :previous-frame] :user-data {"iProbs" last-prob-avg})


;(t/start-fullscreen "src/my_symphony/disco.glsl" :textures [:overtone-audio])
;(swap! last-probs #(the average of this round of probs) )
(player (metro))
(do
  (t/stop)
  (stop))

;; patterns/probabilities
(map #(vector %) (take 16 (cycle [1 2 3 4])))
(vec  (map #(vector %) (take 16 (cycle [1 2 3 4]))))


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
