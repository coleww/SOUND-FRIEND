(ns my-symphony.play
  (:require [my-symphony.careening-inst.clj :refer :all]
            [my-symphony.careening-prob.clj :refer :all])
  )



(defn play
  "what happens now"
  [beat funk-it-up]
  (funk-it-up (mod beat 8) kicky kicks)
  (funk-it-up (mod beat 8) snary snares)
  (funk-it-up (mod beat 8) chatty chats)
  (funk-it-up (mod beat 8) ohatty ohats)

  (funk-it-up (mod beat 16) cees pieces)
  (funk-it-up (mod beat 16) teebs beeps)
                                        ;(calculate-probs (mod beat 16))
  ;; wait this is not correct
  (if (=  (mod beat 2) 0)
    (do ;; evens
                                        ;
      (funk-it-up (mod beat 8) avoice beeps)
      )
    (do ;; odds

      (funk-it-up (mod beat 8) avoice pieces)
      )

    ))
