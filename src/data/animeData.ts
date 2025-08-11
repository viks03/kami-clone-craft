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
      "description": "Third season of .",
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
      "id": "theres-no-freaking-way-ill-be-your-lover-unless-19773",
      "name": "There's No Freaking Way I'll be Your Lover! Unless...",
      "jname": "Watashi ga Koibito ni Nareru Wake Nai jan, Muri Muri! (※Muri ja Nakatta!?)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8d340e5542d2e90dbd45940f897e1fe0.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 6,
        "dub": null
      }
    },
    {
      "id": "grand-blue-dreaming-season-2-19786",
      "name": "Grand Blue Dreaming Season 2",
      "jname": "Grand Blue Season 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d2269ac1520195c3bd6bcca1246bc0b2.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 6,
        "dub": null
      }
    },
    {
      "id": "sakamoto-days-part-2-19787",
      "name": "Sakamoto Days Part 2",
      "jname": "Sakamoto Days Part 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/16938f0dfd1d36cab6a0c604ab4669d5.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": "18+",
      "episodes": {
        "sub": 6,
        "dub": 6
      }
    },
    {
      "id": "sumpock-19559",
      "name": "SumPock",
      "jname": "Summer Pockets",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/7010bbe5fb9c9cba54c19a9d660b98fc.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 19,
        "dub": null
      }
    },
    {
      "id": "sword-of-the-demon-hunter-kijin-gentosho-19554",
      "name": "Sword of the Demon Hunter: Kijin Gentosho",
      "jname": "Kijin Gentoushou",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1363cdc748d342ce2ab2e0ec7c21bc78.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 18,
        "dub": 10
      }
    },
    {
      "id": "see-you-tomorrow-at-the-food-court-19748",
      "name": "See You Tomorrow at the Food Court",
      "jname": "Food Court de, Mata Ashita.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/4c6ff7d9c8ee5ea036904162f04d9511.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 6,
        "dub": null
      }
    },
    {
      "id": "supreme-god-emperor-season-2-18402",
      "name": "Supreme God Emperor Season 2",
      "jname": "Wu Shang Shen Di 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a1abaa7f5d440c98591010827e2fe60b.jpg",
      "duration": "7m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 511,
        "dub": null
      }
    },
    {
      "id": "lord-of-mysteries-old-neils-mysticism-class-19839",
      "name": "Lord of Mysteries - Old Neil's Mysticism Class",
      "jname": "Lord of Mysteries - Chibi Theatre",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e6f282dc48539d8dc89d6de820791bcb.jpg",
      "duration": "5m",
      "type": "Special",
      "rating": "18+",
      "episodes": {
        "sub": 5,
        "dub": null
      }
    },
    {
      "id": "koupen-chan-19647",
      "name": "Koupen-chan",
      "jname": "Koupen-chan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6f5822a9ded6c32d3418003e301d98d7.jpg",
      "duration": "1m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 19,
        "dub": null
      }
    },
    {
      "id": "theatre-of-darkness-yamishibai-15-19731",
      "name": "Theatre of Darkness: Yamishibai 15",
      "jname": "Yami Shibai 15",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6af050edb9ef74297aa0e3adc546e0a2.jpg",
      "duration": "4m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 5,
        "dub": null
      }
    },
    {
      "id": "battle-through-the-heavens-5th-season-18119",
      "name": "Battle Through The Heavens 5th Season",
      "jname": "Doupo Cangqiong: Nian Fan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/069e39f99972004849bab4a2946d968c.jpg",
      "duration": "24m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 159,
        "dub": 52
      }
    },
    {
      "id": "tales-of-herding-gods-19409",
      "name": "Tales of Herding Gods",
      "jname": "Mushen Ji",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a35a56dca52d7280df274193ba6b5a35.jpg",
      "duration": "15m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 43,
        "dub": null
      }
    },
    {
      "id": "moonrise-15817",
      "name": "Moonrise",
      "jname": "Moonrise",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/773fd8d751aabd509240fa36ac7b3a85.jpg",
      "duration": "28m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 18,
        "dub": 18
      }
    },
    {
      "id": "my-happy-marriage-season-2-19432",
      "name": "My Happy Marriage Season 2",
      "jname": "Watashi no Shiawase na Kekkon 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c2a246a281ee33d66635458797ce76cf.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 13,
        "dub": 11
      }
    },
    {
      "id": "keyboard-immortal-19526",
      "name": "Keyboard Immortal",
      "jname": "Ludi Jian Xian",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/61ad8df68ec8f92be9c6610225168745.jpg",
      "duration": "8m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 107,
        "dub": null
      }
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
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/65f92e6e315a931ef872da4b312442b8.jpg"
    },
    {
      "rank": 3,
      "id": "devil-may-cry-19641",
      "name": "Devil may cry",
      "jname": "Devil may cry",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/dc44725007dca68fb39b73b5e7c9b620.jpg"
    },
    {
      "rank": 4,
      "id": "sword-of-the-demon-hunter-kijin-gentosho-19554",
      "name": "Sword of the Demon Hunter: Kijin Gentosho",
      "jname": "Kijin Gentoushou",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/95f215e80c807d44e2d494551ea4d820.jpg"
    },
    {
      "rank": 5,
      "id": "my-hero-academia-vigilantes-19544",
      "name": "My Hero Academia: Vigilantes",
      "jname": "Vigilante: Boku no Hero Academia Illegals",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1b06ba20c769cf017ebf654ca8e9fbda.jpg"
    },
    {
      "rank": 6,
      "id": "the-apothecary-diaries-season-2-19429",
      "name": "The Apothecary Diaries Season 2",
      "jname": "Kusuriya no Hitorigoto 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c7346b9cd930d501d2b6b40770b2b1d0.jpg"
    },
    {
      "rank": 7,
      "id": "wind-breaker-season-2-19542",
      "name": "Wind Breaker Season 2",
      "jname": "Wind Breaker Season 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/87e766fbe5e592efbbc84c9302861612.jpg"
    },
    {
      "rank": 8,
      "id": "witch-watch-19552",
      "name": "Witch Watch",
      "jname": "Witch Watch",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/80082b698ed84bf8d784d299faf50124.jpg"
    },
    {
      "rank": 9,
      "id": "ive-been-killing-slimes-for-300-years-and-maxed-out-my-level-season-2-19541",
      "name": "I've Been Killing Slimes for 300 Years and Maxed Out My Level Season 2",
      "jname": "Slime Taoshite 300-nen, Shiranai Uchi ni Level Max ni Nattemashita: Sono Ni",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/19b68d11d697082fbd291f0184f09f6d.jpg"
    },
    {
      "rank": 10,
      "id": "dandadan-19319",
      "name": "Dandadan",
      "jname": "Dandadan",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a8b56a7589ff9edb6c86977c31e27a06.jpg"
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
      "type": "TV"
    },
    {
      "id": "moonrise-15817",
      "name": "Moonrise",
      "jname": "Moonrise",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/773fd8d751aabd509240fa36ac7b3a85.jpg",
      "episodes": {
        "sub": 18,
        "dub": 18
      },
      "type": "ONA"
    },
    {
      "id": "giant-robo-the-animation-the-day-the-earth-stood-still-723",
      "name": "Giant Robo the Animation: The Day the Earth Stood Still",
      "jname": "Giant Robo the Animation: Chikyuu ga Seishi Suru Hi",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6789b014264c8f3db056646bf3b45c52.jpg",
      "episodes": {
        "sub": 7,
        "dub": 7
      },
      "type": "OVA"
    },
    {
      "id": "genesis-survivor-gaiarth-7046",
      "name": "Genesis Survivor Gaiarth",
      "jname": "Sousei Kishi Gaiarth",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9d4a6718eb70ec23e88f4ee36d974b8d.jpg",
      "episodes": {
        "sub": 3,
        "dub": 3
      },
      "type": "OVA"
    },
    {
      "id": "gestalt-7691",
      "name": "Gestalt",
      "jname": "Choujuu Densetsu Gestalt",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d8d5dd85b3c77f8c6ff6ec346fe2f23d.jpg",
      "episodes": {
        "sub": 2,
        "dub": 2
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
      "id": "sakamoto-days-19431",
      "name": "Sakamoto Days",
      "jname": "Sakamoto Days",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2bbe7ece956bbefc6f385a7a447c182c.jpg",
      "episodes": {
        "sub": 11,
        "dub": 11
      },
      "type": "TV"
    },
    {
      "id": "solo-leveling-season-2-arise-from-the-shadow-19413",
      "name": "Solo Leveling Season 2: Arise from the Shadow",
      "jname": "Ore dake Level Up na Ken Season 2: Arise from the Shadow",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/65f92e6e315a931ef872da4b312442b8.jpg",
      "episodes": {
        "sub": 13,
        "dub": 13
      },
      "type": "TV"
    },
    {
      "id": "jujutsu-kaisen-tv-534",
      "name": "Jujutsu Kaisen (TV)",
      "jname": "Jujutsu Kaisen (TV)",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/82402f796b7d84d7071ab1e03ff7747a.jpg",
      "episodes": {
        "sub": 24,
        "dub": 24
      },
      "type": "TV"
    },
    {
      "id": "chainsaw-man-17406",
      "name": "Chainsaw Man",
      "jname": "Chainsaw Man",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3da1326e07269ddd8d73475c5dabf2c.jpg",
      "episodes": {
        "sub": 12,
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
      "type": "Movie (1 eps)",
      "rating": "18+",
      "episodes": {
        "sub": null,
        "dub": null
      }
    },
    {
      "id": "captivated-by-you-19738",
      "name": "Captivated, by You",
      "jname": "Muchuu sa, Kimi ni.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/58cf898b1e58faf8e9eac4fffb9d0962.jpg",
      "duration": "Aug 21, 2025",
      "type": "TV (? eps)",
      "rating": null,
      "episodes": {
        "sub": null,
        "dub": null
      }
    },
    {
      "id": "the-knight-19822",
      "name": "The Knight",
      "jname": "Ye de Mingming Shu",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3cd5d8065bd2513b5fd48e24a8a37c22.jpg",
      "duration": "Aug 14, 2025",
      "type": "ONA (12 eps)",
      "rating": null,
      "episodes": {
        "sub": null,
        "dub": null
      }
    },
    {
      "id": "twin-martial-spirits-19830",
      "name": "Twin Martial Spirits",
      "jname": "Shuangsheng Wu Hun",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c74d427ff0df122ded2ca9924e8305dc.jpg",
      "duration": "Jul 23, 2025",
      "type": "ONA (60 eps)",
      "rating": null,
      "episodes": {
        "sub": null,
        "dub": null
      }
    },
    {
      "id": "tales-of-demons-and-gods-season-9-19824",
      "name": "Tales of Demons and Gods Season 9",
      "jname": "Yao Shen Ji 9th Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/270e92fd2fc7ca05669dc433a3f641b8.jpg",
      "duration": "Jul 17, 2025",
      "type": "ONA (52 eps)",
      "rating": null,
      "episodes": {
        "sub": null,
        "dub": null
      }
    }
  ]
};