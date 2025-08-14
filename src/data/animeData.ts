export interface AnimeEpisodes {
  sub: number | null;
  dub: number | null;
}

export interface SpotlightAnime {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: AnimeEpisodes;
  type: string;
  otherInfo: string[];
}

export interface LatestEpisodeAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: AnimeEpisodes;
}

export interface PopularAnime {
  rank: number;
  id: string;
  name: string;
  jname: string;
  poster: string;
}

export interface CompletedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: AnimeEpisodes;
  type: string;
}

export interface TopAiringAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: AnimeEpisodes;
  type: string;
}

export interface UpcomingAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: AnimeEpisodes;
}

export interface AnimeData {
  spotlightAnimes: SpotlightAnime[];
  latestEpisodeAnimes: LatestEpisodeAnime[];
  mostPopularAnimes: PopularAnime[];
  latestCompletedAnimes: CompletedAnime[];
  topAiringAnimes: TopAiringAnime[];
  topUpcomingAnimes: UpcomingAnime[];
}

export const animeData: AnimeData = {
  "spotlightAnimes": [
    {
      "rank": 1,
      "id": "sakamoto-days-part-2-19787",
      "name": "Sakamoto Days Part 2",
      "description": "When Sakamoto meets Aoi, the convenience store clerk, it's love at first sight — and just like that, he retires.\n\nSakamoto gets married, has a daughter, opens a mom-and-pop store in a quiet town, and completely transforms … into a plus-size man. To ensure a peaceful life with his beloved family, the legendary ex–hit man bands together with comrades to face off against the looming threat of assassins.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/200f6d513c6a0ea46258ef0b2d3d411a.jpg",
      "jname": "Sakamoto Days Part 2",
      "episodes": {
        "sub": 6,
        "dub": 6
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 15, 2025",
        "HD"
      ]
    },
    {
      "rank": 2,
      "id": "kaiju-no-8-season-2-19792",
      "name": "Kaiju No. 8 Season 2",
      "description": "After the destruction of their hometown, childhood friends Kafka Hibino and Mina Ashiro make a pact to become officers in the Defense Force—a militarized organization tasked with protecting Japan from colossal monsters known as \"kaijuu.\" Decades later, the 32-year-old Kafka has all but given up on his dreams of heroism. Instead, he cleans up the remains of the slaughtered kaijuu after they are defeated by valiant soldiers—including Mina, who has successfully achieved their shared goal.\n\nUpon meeting his new coworker, Reno Ichikawa, Kafka faces a mirror of his past self: an ambitious young man whose one desire is to fight as a member of the Defense Force. Unfortunately, the two are soon involved in a freak encounter with a rogue kaijuu. Though Kafka demonstrates his innate heroic nature and rescues Reno from certain doom, he is left gravely injured.\n\nWhile both men recover in a hospital, Kafka is seemingly attacked by another one of the beasts. As a result, he gains the ability to transform into a humanoid kaijuu with the strength and powers of the massive monsters menacing Japan. Dubbed \"Kaijuu No. 8\" by the military, Kafka resolves to use his newfound gifts for the greater good. Tied together by mutual respect, Kafka and Reno set out to join warriors like Mina at the forefront of the Defense Force.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/6461c9a2f865136afa30424ea61586be.jpg",
      "jname": "Kaijuu 8-gou 2nd Season",
      "episodes": {
        "sub": 4,
        "dub": 4
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 19, 2025",
        "HD"
      ]
    },
    {
      "rank": 3,
      "id": "the-fragrant-flower-blooms-with-dignity-19789",
      "name": "The Fragrant Flower Blooms with Dignity",
      "description": "Despite being adjacent to one another, Chidori Public High School and the all-girls Kikyo Private Academy seem to exist in two different worlds. While the latter boasts an immaculate reputation and favors students from wealthy backgrounds, the former is a nest for dim-witted delinquents. Everyone at Kikyo harbors a deep hatred for their Chidori neighbors.  Sixteen-year-old Rintarou Tsumugi is a student at Chidori whose intimidating face leads people to avoid him. Rintarou pays no mind to this, as he is content with his group of friends. However, there is something he has not told them yet: sometimes, he helps out at his family's cake shop.  One day at work, Rintarou sees a customer at a table, but she runs off before he can talk to her. The next day, he receives an apology from the girl, Kaoruko Waguri, who explains that she did not run away because of his appearance and that she believes Rintarou is a kind-hearted person. Although he is not used to Kaoruko's bright personality, Rintarou looks forward to forming a friendship with her. There is just one obstacle that stands in his way: Kaoruko is a Kikyo student!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/ff668a581562353a8e1e4054264fba79.jpg",
      "jname": "Kaoru Hana wa Rin to Saku",
      "episodes": {
        "sub": 6,
        "dub": null
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 6, 2025",
        "HD"
      ]
    },
    {
      "rank": 4,
      "id": "gachiakuta-19785",
      "name": "Gachiakuta",
      "description": "Living in the slums of a wealthy town, Rudo and his foster father Regto try to coexist with the rest of the town's residents, but Rudo despises the wastefulness of the upper class. Ignoring the warnings from those around him, Rudo regularly rummages through the town's garbage in search of anything useful or valuable to save from the \"Abyss\"—a massive hole where anything considered trash is dumped, including people. Rudo's biological father was one such person, having been thrown into the Abyss after he was accused of murder.  One day, after running into a mysterious figure on the way home, Rudo returns to find Regto's dying body on the floor. He is immediately found at the scene by the authorities and is charged with murder. No one believes his claims of innocence, and he is thrown into the Abyss. Instead of dying, however, he finds himself in a strange, foul-smelling place surrounded by monsters made out of trash.  When Rudo is attacked by said monsters, he is saved by a man named Enjin, who reveals himself to be a \"Cleaner\"—someone who uses special weapons called Vital Instruments to combat these creatures. In order to get his revenge on the one who killed Regto, Rudo reluctantly becomes a Cleaner to fight his way back up and out of the Abyss.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/7090ec9557d74a18d25341a241ece786.jpg",
      "jname": "Gachiakuta",
      "episodes": {
        "sub": 5,
        "dub": 5
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 6, 2025",
        "HD"
      ]
    },
    {
      "rank": 5,
      "id": "one-piece-100",
      "name": "One Piece",
      "description": "Gold Roger was known as the \"Pirate King,\" the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\n\nEnter Monkey Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy's reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg",
      "jname": "One Piece",
      "episodes": {
        "sub": 1139,
        "dub": 1122
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Oct 20, 1999",
        "HD"
      ]
    },
    {
      "rank": 6,
      "id": "dan-da-dan-season-2-19793",
      "name": "Dan Da Dan Season 2",
      "description": "Reeling from her recent breakup, Momo Ayase, a popular high schooler, shows kindness to her socially awkward schoolmate, Ken Takakura, by standing up to his bullies. Ken misunderstands her intentions, believing he has made a new friend who shares his obsession with aliens and UFOs. However, Momo's own eccentric occult beliefs lie in the supernatural realm; she thinks aliens do not exist. A rivalry quickly brews as each becomes determined to prove the other wrong.\n\nDespite their initial clash over their opposing beliefs, Momo and Ken form an unexpected but intimate friendship, a bond forged in a series of supernatural battles and bizarre encounters with urban legends and paranormal entities. As both develop unique superhuman abilities, they learn to supplement each other's weaknesses, leading them to wonder if their newfound partnership may be about more than just survival.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/33043b5bb1314a46d20f814dbe70f123.jpg",
      "jname": "Dandadan 2nd Season",
      "episodes": {
        "sub": 6,
        "dub": 6
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 4, 2025",
        "HD"
      ]
    },
    {
      "rank": 7,
      "id": "the-water-magician-19770",
      "name": "The Water Magician",
      "description": "Ryou is delighted to be reincarnated into the fantastical world of Phi, where he thinks he'll get to live a quiet life learning to use his newfound water magic. Going with the flow here, however, means something very different. Ryou is immediately pitted against the wild lands he winds up in and the slew of deadly monsters that call the remote subcontinent home. You'd think he'd forget about taking it easy when he's stuck fighting for his life, but lucky for Ryou, he's naturally optimistic, clever, and blessed with the hidden \"Eternal Youth\" trait. Twenty years pass in the blink of an eye, and each encounter along the way pushes him one step closer to the pinnacle of human magic. Little does he realize that's only the opening chapter of his tale. A fateful meeting soon thrusts Ryou to the forefront of history, forever changing the course of his life... Thus begins the adventures of the strongest water magician the world has ever seen—who also likes to do things at his own pace!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/780c9331714aa3fee1d55bcc8544b782.jpg",
      "jname": "Mizu Zokusei no Mahoutsukai",
      "episodes": {
        "sub": 5,
        "dub": 4
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 4, 2025",
        "HD"
      ]
    },
    {
      "rank": 8,
      "id": "clevatess-19760",
      "name": "Clevatess",
      "description": "Alicia, who had dreamed of becoming a hero since childhood, is chosen by the king as one of the thirteen heroes. Armed with a legendary sword, the heroes set out to defeat the Demon King Clevatess. However, their recklessness triggers a terrible crisis that could wipe out all of humanity on the continent of Edsea. Now, the world's only hope lies with a baby entrusted to the Demon King.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/428e225f262aba51cf7f364f3ec0893a.jpg",
      "jname": "Clevatess: Majuu no Ou to Akago to Shikabane no Yuusha",
      "episodes": {
        "sub": 6,
        "dub": 6
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jul 2, 2025",
        "HD"
      ]
    },
    {
      "rank": 9,
      "id": "fire-force-season-3-19540",
      "name": "Fire Force Season 3",
      "description": "The third season finds Tokyo alight, as a mysterious affliction of spontaneously combusting rips through the city's population. Enter the Fire Force, with Shinra now part of Company 8 and prepared to save the city from oblivion — if he can keep his own secrets at bay.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/e5dee087051734a86d59c748b6bf201a.jpg",
      "jname": "Enen no Shouboutai: San no Shou",
      "episodes": {
        "sub": 3,
        "dub": 1
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Apr 5, 2025",
        "HD"
      ]
    },
    {
      "rank": 10,
      "id": "wind-breaker-season-2-19542",
      "name": "Wind Breaker Season 2",
      "description": "The second season of WIND BREAKER.\n\nWelcome back to Furin High School, an institution infamous for its population of brawny brutes who solve every conflict with a show of strength. Some of the students even formed a group, Bofurin, which protects the town. Haruka Sakura, a first-year student who moved in from out of town, is only interested in one thing: fighting his way to the top!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/593d93c12628d998366d5cf716e5ad52.jpg",
      "jname": "Wind Breaker Season 2",
      "episodes": {
        "sub": 3,
        "dub": 1
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Apr 4, 2025",
        "HD"
      ]
    },
    {
      "rank": 11,
      "id": "solo-leveling-season-2-arise-from-the-shadow-19413",
      "name": "Solo Leveling Season 2: Arise from the Shadow",
      "description": "Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the supernatural powers he has gained. However, keeping his skills hidden becomes more difficult as dungeon-related incidents pile up around him.\n\nWhen Jin-Woo and a few other low-ranked hunters are the only survivors of a dungeon that turns out to be a bigger challenge than initially expected, he draws attention once again, and hunter guilds take an increased interest in him. Meanwhile, a strange hunter who has been lost for ten years returns with a dire warning about an upcoming catastrophic event. As the calamity looms closer, Jin-Woo must continue leveling up to make sure nothing stops him from reaching his ultimate goal—saving the life of his mother.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/599af186ad72e94caab6223b23fc22c6.jpg",
      "jname": "Ore dake Level Up na Ken Season 2: Arise from the Shadow",
      "episodes": {
        "sub": 13,
        "dub": 13
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Jan 5, 2025",
        "HD"
      ]
    }
  ],
  "latestEpisodeAnimes": [
    {
      "id": "new-saga-19774",
      "name": "New Saga",
      "jname": "Tsuyokute New Saga",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/36cb7408e1016c2a85bd8541851408e6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "onmyo-kaiten-rebirth-verse-19744",
      "name": "Onmyo Kaiten Re:Birth Verse",
      "jname": "Onmyou Kaiten Re:Birth",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/13b4878f4875d721ab896b97ebaf5d48.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "with-vengeance-19740",
      "name": "With Vengeance",
      "jname": "Kizu darake Seijo yori Houfuku wo Komete",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e7abcc65667e4eeaf7fc9f4123c447c9.jpg",
      "duration": "14m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "dealing-with-mikadono-sisters-is-a-breeze-19765",
      "name": "Dealing with Mikadono Sisters Is a Breeze",
      "jname": "Mikadono Sanshimai wa Angai, Choroi.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/388f4b910e67046f642d35228791e015.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 3 }
    },
    {
      "id": "hell-teacher-jigoku-sensei-nube-19758",
      "name": "Hell Teacher: Jigoku Sensei Nube",
      "jname": "Jigoku Sensei Nube (2025)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b820eb87b6c05c6f9d98007e7eee2b24.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": null }
    },
    {
      "id": "uchuujin-muumuu-19598",
      "name": "Uchuujin MuuMuu",
      "jname": "Uchuujin MuuMuu",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5558fe41e94b3ee11a89842f1eef075c.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 19, "dub": null }
    },
    {
      "id": "panty-stocking-with-garterbelt-2nd-season-19780",
      "name": "Panty & Stocking with Garterbelt 2nd Season",
      "jname": "New Panty & Stocking with Garterbelt",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a71d234899029be1b8bc25552cca8408.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "i-was-reincarnated-as-the-7th-prince-so-i-can-take-my-time-perfecting-my-magical-ability-season-2-19781",
      "name": "I Was Reincarnated as the 7th Prince so I Can Take My Time Perfecting My Magical Ability Season 2",
      "jname": "Tensei shitara Dainana Ouji Datta node, Kimama ni Majutsu wo Kiwamemasu 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cc90c348158e7ee0df92885576ad7603.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 3 }
    },
    {
      "id": "reborn-as-a-vending-machine-i-now-wander-the-dungeon-season-2-19776",
      "name": "Reborn as a Vending Machine, I Now Wander the Dungeon Season 2",
      "jname": "Jidou Hanbaiki ni Umarekawatta Ore wa Meikyuu wo Samayou 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/86ab58b1b09723017a3883d9ba2cfa22.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "clevatess-19760",
      "name": "Clevatess",
      "jname": "Clevatess: Majuu no Ou to Akago to Shikabane no Yuusha",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d53c0d4ebad9dd8f22ccb1ba37568213.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 7, "dub": 6 }
    },
    {
      "id": "the-rising-of-the-shield-hero-season-4-19790",
      "name": "The Rising of the Shield Hero Season 4",
      "jname": "Tate no Yuusha no Nariagari Season 4",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f388247d0d1c9dfd45c9e704ebe031aa.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "bulletbullet-19726",
      "name": "Bullet/Bullet",
      "jname": "Bullet/Bullet",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3d632a9faba80a43fa1c4bf5d98ec97a.jpg",
      "duration": "24m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 12, "dub": 12 }
    },
    {
      "id": "turkey-19749",
      "name": "Turkey!",
      "jname": "Turkey!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0b84bc6fe72602837cfbaa26ff8ba7f6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "romance-in-the-beast-world-season-2-19744",
      "name": "Romance in the Beast World Season 2",
      "jname": "Shou Ren Shi Jie de Lian'ai Fa Ze 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5a4b6febd01ed0a1de13c24de45cbe99.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    },
    {
      "id": "jiang-ye-3-19745",
      "name": "Jiang Ye 3",
      "jname": "Jiang Ye 3",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f55d5e59e89b8e8d25bbda7b90fe8f3f.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    },
{
      "id": "new-saga-19774",
      "name": "New Saga",
      "jname": "Tsuyokute New Saga",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/36cb7408e1016c2a85bd8541851408e6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "onmyo-kaiten-rebirth-verse-19744",
      "name": "Onmyo Kaiten Re:Birth Verse",
      "jname": "Onmyou Kaiten Re:Birth",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/13b4878f4875d721ab896b97ebaf5d48.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "with-vengeance-19740",
      "name": "With Vengeance",
      "jname": "Kizu darake Seijo yori Houfuku wo Komete",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e7abcc65667e4eeaf7fc9f4123c447c9.jpg",
      "duration": "14m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "dealing-with-mikadono-sisters-is-a-breeze-19765",
      "name": "Dealing with Mikadono Sisters Is a Breeze",
      "jname": "Mikadono Sanshimai wa Angai, Choroi.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/388f4b910e67046f642d35228791e015.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 3 }
    },
    {
      "id": "hell-teacher-jigoku-sensei-nube-19758",
      "name": "Hell Teacher: Jigoku Sensei Nube",
      "jname": "Jigoku Sensei Nube (2025)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b820eb87b6c05c6f9d98007e7eee2b24.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": null }
    },
    {
      "id": "uchuujin-muumuu-19598",
      "name": "Uchuujin MuuMuu",
      "jname": "Uchuujin MuuMuu",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5558fe41e94b3ee11a89842f1eef075c.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 19, "dub": null }
    },
    {
      "id": "panty-stocking-with-garterbelt-2nd-season-19780",
      "name": "Panty & Stocking with Garterbelt 2nd Season",
      "jname": "New Panty & Stocking with Garterbelt",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a71d234899029be1b8bc25552cca8408.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "i-was-reincarnated-as-the-7th-prince-so-i-can-take-my-time-perfecting-my-magical-ability-season-2-19781",
      "name": "I Was Reincarnated as the 7th Prince so I Can Take My Time Perfecting My Magical Ability Season 2",
      "jname": "Tensei shitara Dainana Ouji Datta node, Kimama ni Majutsu wo Kiwamemasu 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cc90c348158e7ee0df92885576ad7603.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 3 }
    },
    {
      "id": "reborn-as-a-vending-machine-i-now-wander-the-dungeon-season-2-19776",
      "name": "Reborn as a Vending Machine, I Now Wander the Dungeon Season 2",
      "jname": "Jidou Hanbaiki ni Umarekawatta Ore wa Meikyuu wo Samayou 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/86ab58b1b09723017a3883d9ba2cfa22.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "clevatess-19760",
      "name": "Clevatess",
      "jname": "Clevatess: Majuu no Ou to Akago to Shikabane no Yuusha",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d53c0d4ebad9dd8f22ccb1ba37568213.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 7, "dub": 6 }
    },
    {
      "id": "the-rising-of-the-shield-hero-season-4-19790",
      "name": "The Rising of the Shield Hero Season 4",
      "jname": "Tate no Yuusha no Nariagari Season 4",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f388247d0d1c9dfd45c9e704ebe031aa.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "bulletbullet-19726",
      "name": "Bullet/Bullet",
      "jname": "Bullet/Bullet",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3d632a9faba80a43fa1c4bf5d98ec97a.jpg",
      "duration": "24m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 12, "dub": 12 }
    },
    {
      "id": "turkey-19749",
      "name": "Turkey!",
      "jname": "Turkey!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0b84bc6fe72602837cfbaa26ff8ba7f6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "romance-in-the-beast-world-season-2-19744",
      "name": "Romance in the Beast World Season 2",
      "jname": "Shou Ren Shi Jie de Lian'ai Fa Ze 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5a4b6febd01ed0a1de13c24de45cbe99.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    },
    {
      "id": "jiang-ye-3-19745",
      "name": "Jiang Ye 3",
      "jname": "Jiang Ye 3",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f55d5e59e89b8e8d25bbda7b90fe8f3f.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    },
{
      "id": "new-saga-19774",
      "name": "New Saga",
      "jname": "Tsuyokute New Saga",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/36cb7408e1016c2a85bd8541851408e6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "onmyo-kaiten-rebirth-verse-19744",
      "name": "Onmyo Kaiten Re:Birth Verse",
      "jname": "Onmyou Kaiten Re:Birth",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/13b4878f4875d721ab896b97ebaf5d48.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "with-vengeance-19740",
      "name": "With Vengeance",
      "jname": "Kizu darake Seijo yori Houfuku wo Komete",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e7abcc65667e4eeaf7fc9f4123c447c9.jpg",
      "duration": "14m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "dealing-with-mikadono-sisters-is-a-breeze-19765",
      "name": "Dealing with Mikadono Sisters Is a Breeze",
      "jname": "Mikadono Sanshimai wa Angai, Choroi.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/388f4b910e67046f642d35228791e015.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 3 }
    },
    {
      "id": "hell-teacher-jigoku-sensei-nube-19758",
      "name": "Hell Teacher: Jigoku Sensei Nube",
      "jname": "Jigoku Sensei Nube (2025)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b820eb87b6c05c6f9d98007e7eee2b24.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": null }
    },
    {
      "id": "uchuujin-muumuu-19598",
      "name": "Uchuujin MuuMuu",
      "jname": "Uchuujin MuuMuu",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5558fe41e94b3ee11a89842f1eef075c.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 19, "dub": null }
    },
    {
      "id": "panty-stocking-with-garterbelt-2nd-season-19780",
      "name": "Panty & Stocking with Garterbelt 2nd Season",
      "jname": "New Panty & Stocking with Garterbelt",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a71d234899029be1b8bc25552cca8408.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "i-was-reincarnated-as-the-7th-prince-so-i-can-take-my-time-perfecting-my-magical-ability-season-2-19781",
      "name": "I Was Reincarnated as the 7th Prince so I Can Take My Time Perfecting My Magical Ability Season 2",
      "jname": "Tensei shitara Dainana Ouji Datta node, Kimama ni Majutsu wo Kiwamemasu 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cc90c348158e7ee0df92885576ad7603.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 3 }
    },
    {
      "id": "reborn-as-a-vending-machine-i-now-wander-the-dungeon-season-2-19776",
      "name": "Reborn as a Vending Machine, I Now Wander the Dungeon Season 2",
      "jname": "Jidou Hanbaiki ni Umarekawatta Ore wa Meikyuu wo Samayou 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/86ab58b1b09723017a3883d9ba2cfa22.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 7, "dub": 4 }
    },
    {
      "id": "clevatess-19760",
      "name": "Clevatess",
      "jname": "Clevatess: Majuu no Ou to Akago to Shikabane no Yuusha",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d53c0d4ebad9dd8f22ccb1ba37568213.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": { "sub": 7, "dub": 6 }
    },
    {
      "id": "the-rising-of-the-shield-hero-season-4-19790",
      "name": "The Rising of the Shield Hero Season 4",
      "jname": "Tate no Yuusha no Nariagari Season 4",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f388247d0d1c9dfd45c9e704ebe031aa.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": 5 }
    },
    {
      "id": "bulletbullet-19726",
      "name": "Bullet/Bullet",
      "jname": "Bullet/Bullet",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3d632a9faba80a43fa1c4bf5d98ec97a.jpg",
      "duration": "24m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 12, "dub": 12 }
    },
    {
      "id": "turkey-19749",
      "name": "Turkey!",
      "jname": "Turkey!",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0b84bc6fe72602837cfbaa26ff8ba7f6.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 6, "dub": null }
    },
    {
      "id": "romance-in-the-beast-world-season-2-19744",
      "name": "Romance in the Beast World Season 2",
      "jname": "Shou Ren Shi Jie de Lian'ai Fa Ze 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5a4b6febd01ed0a1de13c24de45cbe99.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    },
    {
      "id": "jiang-ye-3-19745",
      "name": "Jiang Ye 3",
      "jname": "Jiang Ye 3",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f55d5e59e89b8e8d25bbda7b90fe8f3f.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": { "sub": 52, "dub": null }
    }
  ],
  "mostPopularAnimes": [
    {
      "rank": 1,
      "id": "one-piece-100",
      "name": "One Piece",
      "jname": "One Piece",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg"
    },
    {
      "rank": 2,
      "id": "solo-leveling-season-2-arise-from-the-shadow-19413",
      "name": "Solo Leveling Season 2: Arise from the Shadow",
      "jname": "Ore dake Level Up na Ken Season 2: Arise from the Shadow",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/02b9e0ea11a5c0e35fe3c8b3b59b3f39.jpg"
    },
    {
      "rank": 3,
      "id": "dragon-ball-daima-19408",
      "name": "Dragon Ball DAIMA",
      "jname": "Dragon Ball DAIMA",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b14ed3a37d6c4b28ea1b6b8c42134e61.jpg"
    },
    {
      "rank": 4,
      "id": "sakamoto-days-part-2-19787",
      "name": "Sakamoto Days Part 2",
      "jname": "Sakamoto Days Part 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2e36b3e7e0b1c70acfc0e0092fc2c037.jpg"
    },
    {
      "rank": 5,
      "id": "gachiakuta-19785",
      "name": "Gachiakuta",
      "jname": "Gachiakuta",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c83b8b8d70c76a6c82c5124c5ffca7e7.jpg"
    },
    {
      "rank": 6,
      "id": "dan-da-dan-season-2-19793",
      "name": "Dan Da Dan Season 2",
      "jname": "Dandadan 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8ad41be37027a43ff6b8b4c3c6b7e71c.jpg"
    },
    {
      "rank": 7,
      "id": "the-water-magician-19770",
      "name": "The Water Magician",
      "jname": "Mizu Zokusei no Mahoutsukai",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/48e93efd21f7d4226da1a03c6b81be09.jpg"
    },
    {
      "rank": 8,
      "id": "wind-breaker-season-2-19542",
      "name": "Wind Breaker Season 2",
      "jname": "Wind Breaker Season 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/39aaf5cb8c0b27b635dc0c7ab00e24c1.jpg"
    }
  ],
  "latestCompletedAnimes": [
    {
      "id": "the-white-whale-of-mu-6620",
      "name": "The White Whale of Mu",
      "jname": "Muu no Hakugei",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/85d56547adc9d63710a77d1aebd9280d.jpg",
      "episodes": {
        "sub": 11,
        "dub": null
      },
      "type": "OVA"
    },
    {
      "id": "ranma-1-2-19347",
      "name": "Ranma 1/2",
      "jname": "Ranma 1/2 (2024)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/25e1e8fe6a7b11b60d64b07ad7e57e8f.jpg",
      "episodes": {
        "sub": 12,
        "dub": 12
      },
      "type": "TV"
    },
    {
      "id": "demon-slayer-hashira-training-arc-19137",
      "name": "Demon Slayer: Hashira Training Arc",
      "jname": "Kimetsu no Yaiba: Hashira Geiko-hen",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f3b7f69d8eff12e6af72dbb0bb3bfd42.jpg",
      "episodes": {
        "sub": 8,
        "dub": 8
      },
      "type": "TV"
    },
    {
      "id": "dandadan-19327",
      "name": "Dandadan",
      "jname": "Dandadan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b84e43633f0b8ace8a7b2a3ceab86df6.jpg",
      "episodes": {
        "sub": 12,
        "dub": 12
      },
      "type": "TV"
    },
    {
      "id": "wind-breaker-19267",
      "name": "Wind Breaker",
      "jname": "Wind Breaker",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/09d7c10e0fa7fc6dcb33b90b91d53f8c.jpg",
      "episodes": {
        "sub": 13,
        "dub": 13
      },
      "type": "TV"
    },
    {
      "id": "frieren-beyond-journeys-end-18980",
      "name": "Frieren: Beyond Journey's End",
      "jname": "Sousou no Frieren",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/09d7c10e0fa7fc6dcb33b90b91d53f8c.jpg",
      "episodes": {
        "sub": 28,
        "dub": 28
      },
      "type": "TV"
    },
    {
      "id": "uzumaki-19268",
      "name": "Uzumaki",
      "jname": "Uzumaki: Spiral into Horror",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5bb2f0fcff59966c8f81dac4a5a1b1ea.jpg",
      "episodes": {
        "sub": 4,
        "dub": 4
      },
      "type": "OVA"
    }
  ],
  "topAiringAnimes": [
    {
      "id": "one-piece-100",
      "name": "One Piece",
      "jname": "One Piece",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg",
      "episodes": {
        "sub": 1139,
        "dub": 1122
      },
      "type": "TV"
    },
    {
      "id": "boruto-naruto-next-generations-2983",
      "name": "Boruto: Naruto Next Generations",
      "jname": "Boruto: Naruto Next Generations",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c71bad3f5cc5b1dd71f0aec2b7a85bc0.jpg",
      "episodes": {
        "sub": 293,
        "dub": 155
      },
      "type": "TV"
    },
    {
      "id": "bleach-thousand-year-blood-war-the-conflict-19069",
      "name": "Bleach: Thousand-Year Blood War - The Conflict",
      "jname": "Bleach: Sennen Kessen-hen - Soukoku-tan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d7ee11a4b57a37c7eb3efc325344d99f.jpg",
      "episodes": {
        "sub": 14,
        "dub": 12
      },
      "type": "TV"
    }
  ],
  "topUpcomingAnimes": [
    {
      "id": "chainsaw-man-the-movie-reze-arc-19721",
      "name": "Chainsaw Man the Movie: Reze Arc",
      "jname": "Chainsaw Man Movie: Reze-hen",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/17ac41352fd931f77238f6f596b6bcea.jpg",
      "duration": "Sep 19, 2025",
      "type": "Movie",
      "rating": "18+",
      "episodes": {
        "sub": null,
        "dub": null
      }
    },
    {
      "id": "my-hero-academia-season-8-19794",
      "name": "My Hero Academia Season 8",
      "jname": "Boku no Hero Academia Season 8",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/ee77b08f64fe7a7b45ebe9d3a61ec772.jpg",
      "duration": "2025",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": null, "dub": null }
    },
    {
      "id": "detective-conan-19598",
      "name": "Detective Conan",
      "jname": "Meitantei Conan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/88c8a82e7ae9b1c7b1ae6b0b9f9e2b4c.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": { "sub": 567, "dub": null }
    }
  ]
};