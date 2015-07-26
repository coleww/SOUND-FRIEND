(ns my-symphony.silly-bills
  (:require [overtone.live :refer :all]))

(def voices {:yyyy {
                    :70 (freesound 70599) :67 (freesound 70598) :64 (freesound 70597) :61 (freesound 70596) :58 (freesound 70595) :55 (freesound 70594) :52 (freesound 70593) :49 (freesound 70592) :46 (freesound 70591) :40 (freesound 70589) :43 (freesound 70590) :37 (freesound 70588) :34 (freesound 70587) :31 (freesound 70586)}
             :uuuu {
                    :70 (freesound 70585) :67 (freesound 70584) :64 (freesound 70583) :61 (freesound 70582) :58 (freesound 70581) :55 (freesound 70580) :52 (freesound 70579) :49 (freesound 70578) :46 (freesound 70577) :43 (freesound 70576) :40 (freesound 70575) :37 (freesound 70574) :34 (freesound 70573) :31 (freesound 70572)}
             :uiui {
                    :70 (freesound 70571) :67 (freesound 70570) :64 (freesound 70569) :61 (freesound 70568) :58 (freesound 70567) :55 (freesound 70566) :52 (freesound 70565) :49 (freesound 70564) :46 (freesound 70563) :43 (freesound 70562) :40 (freesound 70561) :37 (freesound 70560) :34 (freesound 70559) :31 (freesound 70558)}
             :uioi {
                    :70 (freesound 70557) :67 (freesound 70556) :64 (freesound 70555) :61 (freesound 70554) :58 (freesound 70553) :55 (freesound 70552) :52 (freesound 70551) :49 (freesound 70550) :46 (freesound 70549) :43 (freesound 70548) :40 (freesound 70547) :37 (freesound 70546) :34 (freesound 70545) :31 (freesound 70544)}
             :uiay {
                    :70 (freesound 70543) :67 (freesound 70542) :64 (freesound 70541) :61 (freesound 70540) :58 (freesound 70539) :55 (freesound 70538) :52 (freesound 70537) :49 (freesound 70536) :46 (freesound 70535) :43 (freesound 70534) :40 (freesound 70533) :37 (freesound 70532) :34 (freesound 70531) :31 (freesound 70530)}
             :oooo {
                    :70 (freesound 70529) :67 (freesound 70528) :64 (freesound 70527) :61 (freesound 70526) :58 (freesound 70525) :55 (freesound 70524) :52 (freesound 70523) :49 (freesound 70522) :46 (freesound 70521) :43 (freesound 70520) :40 (freesound 70519) :37 (freesound 70518) :34 (freesound 70517) :31 (freesound 70516)}
             :oiai {
                    :70 (freesound 70515) :67 (freesound 70514) :64 (freesound 70513) :61 (freesound 70512) :58 (freesound 70511) :55 (freesound 70510) :52 (freesound 70509) :49 (freesound 70508) :46 (freesound 70507) :43 (freesound 70506) :40 (freesound 70505) :37 (freesound 70504) :34 (freesound 70503) :31 (freesound 70502)}
             :ioea {
                    :70 (freesound 70501) :67 (freesound 70500) :64 (freesound 70499) :61 (freesound 70498) :58 (freesound 70497) :55 (freesound 70496) :52 (freesound 70495) :49 (freesound 70494) :46 (freesound 70493) :43 (freesound 70492) :40 (freesound 70491) :37 (freesound 70490) :34 (freesound 70489) :31 (freesound 70488)}
             :iiii {
                    :70 (freesound 70487) :67 (freesound 70486) :64 (freesound 70485) :61 (freesound 70484) :58 (freesound 70483) :55 (freesound 70482) :52 (freesound 70481) :49 (freesound 70480) :46 (freesound 70479) :43 (freesound 70478) :40 (freesound 70477) :37 (freesound 70476) :34 (freesound 70475) :31 (freesound 70474)}
             :eiei {
                    :70 (freesound 70473) :67 (freesound 70472) :64 (freesound 70471) :61 (freesound 70470) :58 (freesound 70469) :55 (freesound 70468) :52 (freesound 70467) :49 (freesound 70466) :46 (freesound 70465) :43 (freesound 70464) :40 (freesound 70463) :37 (freesound 70462) :34 (freesound 70461) :31 (freesound 70460)}
             :eeee {
                    :70 (freesound 70459) :67 (freesound 70458) :64 (freesound 70457) :61 (freesound 70456) :58 (freesound 70455) :55 (freesound 70454) :52 (freesound 70453) :49 (freesound 70452) :46 (freesound 70451) :43 (freesound 70450) :40 (freesound 70449) :37 (freesound 70448) :34 (freesound 70447) :31 (freesound 70446)}
             :aoao {
                    :70 (freesound 70445) :67 (freesound 70444) :64 (freesound 70443) :61 (freesound 70442) :58 (freesound 70441) :55 (freesound 70440) :52 (freesound 70439) :49 (freesound 70438) :46 (freesound 70437) :43 (freesound 70436) :40 (freesound 70435) :37 (freesound 70434) :34 (freesound 70433) :31 (freesound 70432)}
             :aiai {
                    :70 (freesound 70431) :67 (freesound 70430) :64 (freesound 70429) :61 (freesound 70428) :58 (freesound 70427) :55 (freesound 70426) :52 (freesound 70425) :49 (freesound 70424) :46 (freesound 70423) :43 (freesound 70422) :40 (freesound 70421) :37 (freesound 70420) :34 (freesound 70419) :31 (freesound 70418)}
             :aeio {
                    :70 (freesound 70417) :67 (freesound 70416) :64 (freesound 70415) :61 (freesound 70414) :58 (freesound 70413) :55 (freesound 70412) :52 (freesound 70411) :49 (freesound 70410) :46 (freesound 70409) :43 (freesound 70408) :40 (freesound 70407) :37 (freesound 70406) :34 (freesound 70405) :31 (freesound 70404)}
             :aaaa {
                    :70 (freesound 70403) :67 (freesound 70402) :64 (freesound 70401) :61 (freesound 70400) :58 (freesound 70399) :55 (freesound 70398) :52 (freesound 70397) :49 (freesound 70396) :46 (freesound 70395) :43 (freesound 70394) :40 (freesound 70393) :37 (freesound 70392) :34 (freesound 70391) :31 (freesound 70390)}})

(def sylls (keys voices))

(defn play
  "accepts midi note and syllable to play, uses random if none passed"
  [note syllable]
  (let [base-note (last (sort (filter #(<= (read-string (name %)) note) (keys (syllable voices)))))]
    ((base-note (syllable voices)) :rate (/ (midi->hz note) (midi->hz (read-string (name base-note)))))))
