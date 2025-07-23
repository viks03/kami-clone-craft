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
  rating: number | null;
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

export interface AnimeData {
  spotlightAnimes: SpotlightAnime[];
  latestEpisodeAnimes: LatestEpisodeAnime[];
  mostPopularAnimes: PopularAnime[];
  latestCompletedAnimes: CompletedAnime[];
}

export const animeData: AnimeData = {
  "spotlightAnimes": [
    {
      "rank": 1,
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
      "rank": 2,
      "id": "the-super-cube-19624",
      "name": "The Super Cube",
      "description": "In an accident, an ordinary boy, Wang Xiaoxiu, obtains a space system called \"Superpower Cube\" from a high-latitude cosmic civilization and gains extraordinary powers. When the school belle, Shen Yao, Wang Xiaoxiu's longtime crush, confesses her love to him, the delinquent Sun Jun, who also has a crush on her, is provoked.  Wang Xiaoxiu resolves the crisis with his wit and extraordinary powers, but it also brings more disasters as a result. Shen Yao is taken to the world of extraordinary beings by a mysterious person, and Wang Xiaoxiu embarks on a journey to rescue her. Fighting in the bizarre universe, he finds the meaning of fairness and justice on the path to becoming a peerless powerhouse.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/71a1f086c03a5f0157834c17860e1235.jpg",
      "jname": "Chao Neng Lifang: Chaofan Pian",
      "episodes": {
        "sub": 7,
        "dub": 7
      },
      "type": "ONA",
      "otherInfo": [
        "ONA",
        "15m",
        "Mar 21, 2025",
        "HD"
      ]
    },
    {
      "rank": 3,
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
      "rank": 4,
      "id": "my-hero-academia-vigilantes-19544",
      "name": "My Hero Academia: Vigilantes",
      "description": "Living in a superhuman society, it is hard to feel special. Even more so when the spotlight only shines on professional heroes, those legally authorized to use their special powers known as Quirks in public for the greater good.  Kouichi Haimawari grew up aspiring to be a hero, but with a mediocre Quirk like \"sliding\" that ties him to the ground, he soon came to the conclusion that he could only ever admire them from below. Despite this, Kouichi finds contentment in using his Quirk to carry out day-to-day good deeds, such as returning lost items and helping the elderly cross the street.  However, Kouichi's tame life takes a swing into the turbulent when he is rescued from a back alley brawl by Vigilante, or illegal hero, Knuckleduster. Seeing hero potential in Kouichi, Knuckleduster enlists his help in tracking down the source of a dangerous drug known as Trigger that boosts the user's Quirk at the expense of their rationality.  Set in a time before the events of the original story, Vigilante: Boku no Hero Academia Illegals follows Kouichi as he chooses to don the reputation of a villain and become a Vigilante, operating in the shadow of the law to prevent crimes from taking to the surface.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/f8a7ec496a49b09a088d4e24f0249f32.jpg",
      "jname": "Vigilante: Boku no Hero Academia Illegals",
      "episodes": {
        "sub": 2,
        "dub": 2
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Apr 7, 2025",
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
        "sub": 1125,
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
    },
    {
      "rank": 7,
      "id": "devil-may-cry-19641",
      "name": "Devil may cry",
      "description": "When a mysterious villain threatens to open the gates of Hell, a devilishly handsome demon hunter could be the world's best hope for salvation.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/25f6e7ccb3cd200ebb8f779f54aca862.jpg",
      "jname": "Devil may cry",
      "episodes": {
        "sub": 8,
        "dub": 8
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "30m",
        "Apr 3, 2025",
        "HD"
      ]
    },
    {
      "rank": 8,
      "id": "bleach-806",
      "name": "Bleach",
      "description": "Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrupt spirit that seeks to devour human souls. It is then that he meets a Soul Reaper named Rukia Kuchiki, who gets injured while protecting Ichigo's family from the assailant. To save his family, Ichigo accepts Rukia's offer of taking her powers and becomes a Soul Reaper as a result.\n\nHowever, as Rukia is unable to regain her powers, Ichigo is given the daunting task of hunting down the Hollows that plague their town. However, he is not alone in his fight, as he is later joined by his friends—classmates Orihime Inoue, Yasutora Sado, and Uryuu Ishida—who each have their own unique abilities. As Ichigo and his comrades get used to their new duties and support each other on and off the battlefield, the young Soul Reaper soon learns that the Hollows are not the only real threat to the human world.",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/58d0b99666b285d2c484fec5dfaa23f0.jpg",
      "jname": "Bleach",
      "episodes": {
        "sub": 366,
        "dub": 366
      },
      "type": "TV",
      "otherInfo": [
        "TV",
        "24m",
        "Oct 5, 2004",
        "HD"
      ]
    }
  ],
  "latestEpisodeAnimes": [
    {
      "id": "wind-breaker-season-2-19542",
      "name": "Wind Breaker Season 2",
      "jname": "Wind Breaker Season 2",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/87e766fbe5e592efbbc84c9302861612.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 2,
        "dub": null
      }
    },
    {
      "id": "rock-is-a-ladys-modesty-19570",
      "name": "Rock Is a Lady's Modesty",
      "jname": "Rock wa Lady no Tashinami deshite",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c34215a7d263221e6c9c34f6be4fe81d.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 2,
        "dub": null
      }
    },
    {
      "id": "the-white-whale-of-mu-6620",
      "name": "The White Whale of Mu",
      "jname": "Muu no Hakugei",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/85d56547adc9d63710a77d1aebd9280d.jpg",
      "duration": "25m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 11,
        "dub": null
      }
    },
    {
      "id": "the-brilliant-healers-new-life-in-the-shadows-19553",
      "name": "The Brilliant Healer's New Life in the Shadows",
      "jname": "Isshun de Chiryou shiteita noni Yakutatazu to Tsuihou sareta Tensai Chiyushi, Yami Healer toshite Tanoshiku Ikiru",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8ac15e4f9ed63fb47773ea650febe7fa.jpg",
      "duration": "24m",
      "type": "TV",
      "rating": null,
      "episodes": {
        "sub": 2,
        "dub": null
      }
    },
    {
      "id": "a-ninja-and-an-assassin-living-together-19594",
      "name": "A Ninja and an Assassin Living Together",
      "jname": "Ninja to Koroshiya no Futarigurashi",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/95677884d452befae13a8de6a05a4e6c.jpg",
      "duration": "Apr 10, 2025",
      "type": "TV (? eps)",
      "rating": null,
      "episodes": {
        "sub": null,
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
      "id": "the-emperor-of-myriad-realms-2nd-season-19538",
      "name": "The Emperor of Myriad Realms 2nd Season",
      "jname": "Wan Jie Zhizun 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/15040640616e08499dce4380e41dbdc6.jpg",
      "duration": "10m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 157,
        "dub": null
      }
    },
    {
      "id": "the-sovereigns-ascension-2nd-season-19534",
      "name": "The Sovereign's Ascension 2nd Season",
      "jname": "Yishi Du Zun 2nd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/193cb452f35e1f25f408d704d055006e.jpg",
      "duration": "10m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 68,
        "dub": null
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
    },
    {
      "id": "lingwu-continent-19295",
      "name": "Lingwu Continent",
      "jname": "Ling Wu Dalu",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d2bcdd3a87a9d9b38cf28f165e4479a7.jpg",
      "duration": "10m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 70,
        "dub": null
      }
    },
    {
      "id": "a-will-eternal-3rd-season-19200",
      "name": "A Will Eternal 3rd Season",
      "jname": "Yi Nian Yong Heng 3rd Season",
      "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c333b120d1ae3b89e4978fbc65044129.jpg",
      "duration": "20m",
      "type": "ONA",
      "rating": null,
      "episodes": {
        "sub": 4,
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
  ]
};