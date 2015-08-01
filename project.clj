0(defproject my-symphony "0.1.0-SNAPSHOT"
  :main ^{:skip-aot true} my-symphony.sequencer
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [overtone "0.9.1"]
                 [shadertone "0.2.5"]
                 [overtone.synths "0.1.0-SNAPSHOT"]
                 [org.clojars.coledubs/int-2-freq "0.1.0"]
                 [leipzig "0.8.1"]])
