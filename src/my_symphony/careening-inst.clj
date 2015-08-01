(ns my-symphony.careening-inst
  (:require [overtone.live :refer :all]
            [overtone.inst.drum :refer :all]
            [overtone.inst.synth :refer :all]
            [my-symphony.sequencer :refer :all]
            [my-symphony.silly-bills :as sill]))


;; instruments
(reset! vox  (fn[note idx]

                                        ;(if (= (mod idx 5) 0) (sill/play (+ note 4)))
                                        ;(if (= (mod idx 7) 0) (sill/play (+ note 2)))
                                        ;(if (= (mod idx 5) 0) (sill/play (+ note 0)))
                                        ;(if (= (mod idx 9) 0) (sill/play (+  note 6)))
                                        ;(if (= (mod idx 11) 0) (sill/play (+  note 8)))
                                        ;(if (not= (mod idx 2) 0) (sill/play (-  note 12)  ))
                                        ;(if (= (mod idx 2) 0) (sill/play (+ note 4) ))
               ))

(cs80lead)

(ctl cs80lead :amp 0.05 :att 1.5 :cutoff 500)

(reset! lead  (fn [note idx]
                (ctl cs80lead :freq (midi->hz (+ note 12)))))

(reset! baze
        (fn  [note idx]
          (tb303 :note (-  note 12)  :amp 0.15 :cutoff (get [2000 1000 8000 5000] (mod idx 4)) :attack 0.135 :release 0.15)
          (tb303 :note (-  note 24) :amp 0.15 :cutoff (get [1700 2000 9000 9000] (mod idx 4)) :attack 0.125 :release 0.15)))

(reset! hevvy
        (fn  [note idx]
          )
  )

(reset! ambnt
        (fn  [note idx])
  )



(reset! kicky
        (fn  [idx]
          (dance-kick :amp 0.75 :freq (rand-nth [50 70 80 110]) :attack (rand-nth [0.025 0.025 0.075 0.35]))))

(reset! snary
        (fn  [idx]
          (noise-snare :amp 0.75 :decay 1.75 :freq (rand-nth [1000 3000 5000 500])  )) )

(reset! chatty
        (fn  [idx]
          (closed-hat :t 0.5 :low (rand-nth [100 200 500 750 300]) :hi (rand-nth [1000 2000 3000]))))

(reset! ohatty
        (fn  [idx]
          (open-hat :t 0.25 :low (rand-nth [250 1000 350 400]) :hi (rand-nth [1500 2500 3500]))))

(reset! crashy
        (fn  [idx])
  )

(reset! tommy
        (fn  [idx])
  )
