(ns my-symphony.midi)


;(def mpk  (midi-find-connected-device "MPK"))
(comment
  (on-event (conj (midi-mk-full-device-key mpk) :control-change)
            (fn [e]
              (let [note (:note e)
                    vel  (:velocity e)]
                ;; the pads! bank/#.

                (cond
                  (= note 48) (println note vel) ;1/5
                  (= note 49) (println note vel) ;1/6
                  (= note 50) (println note vel) ;1/7
                  (= note 51) (println note vel) ;1/8
                  (= note 44) (println note vel) ;1/1
                  (= note 45) (println note vel) ;1/2
                  (= note 46) (println note vel) ;1/3
                  (= note 47) (println note vel) ;1/4

                  (= note 36) (println note vel) ;2/5
                  (= note 37) (println note vel) ;2/6
                  (= note 38) (println note vel) ;2/7
                  (= note 39) (println note vel) ;2/8
                  (= note 32) (println note vel) ;2/1
                  (= note 33) (println note vel) ;2/2
                  (= note 34) (println note vel) ;2/3
                  (= note 35) (println note vel) ;2/4
                  :else (do                      ; it's a piano key!
                          (piano note)))))
            ::keyboard-handler)


  (on-event (conj (midi-mk-full-device-key mpk) :control-change)
            (fn [e]
              (let [note (:note e)
                    vel  (:velocity e)]

                ;; control knobs
                (cond
                  (= note 1) (println note vel)
                  (= note 2) (println note vel)
                  (= note 3) (println note vel)
                  (= note 4) (println note vel)
                  (= note 5) (println note vel)
                  (= note 6) (println note vel)
                  (= note 7) (println note vel)
                  (= note 8) (println note vel)
                  :else (println "what " e))

                ))
            ::knob-handler)

  (remove-event-handler ::keyboard-handler)
  (remove-event-handler ::knob-handler))
