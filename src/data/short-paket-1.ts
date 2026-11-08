import type { ShortPackage } from "@/lib/types";

/* Paket 1 tes singkat punya soal sendiri; paket 2-10 diambil dari bank tes lengkap. */
export const shortPaket1: ShortPackage = {
  L: [
    {
      script: [
        ["W", "Have you seen my umbrella? I thought I left it by the door."],
        ["M", "Isn't that it on the chair?"],
        ["N", "What does the man imply?"],
      ],
      q: "What does the man imply?",
      opts: [
        "The umbrella is by the door.",
        "The umbrella may be on the chair.",
        "He took the umbrella.",
        "It isn't going to rain.",
      ],
      a: 1,
      topic: "L.imp",
      ex: 'Pertanyaan "Isn\'t that it on the chair?" sebenarnya menunjukkan: payungnya ada di kursi.',
    },
    {
      script: [
        ["M", "The new cafeteria food is much better than last semester's."],
        ["W", "You can say that again!"],
        ["N", "What does the woman mean?"],
      ],
      q: "What does the woman mean?",
      opts: [
        "She didn't hear what the man said.",
        "She strongly agrees with the man.",
        "She prefers last semester's food.",
        "She has never eaten in the cafeteria.",
      ],
      a: 1,
      topic: "L.agr",
      ex: '"You can say that again" = sangat setuju, bukan minta diulang.',
    },
    {
      script: [
        ["W", "Professor Lee's lecture was really hard to follow."],
        ["M", "If only I had read the chapter beforehand."],
        ["N", "What does the man mean?"],
      ],
      q: "What does the man mean?",
      opts: [
        "He read the chapter twice.",
        "He didn't read the chapter before the lecture.",
        "The lecture was easy for him.",
        "He will meet Professor Lee later.",
      ],
      a: 1,
      topic: "L.reg",
      ex: '"If only I had read…" = penyesalan. Artinya dia <b>tidak</b> membaca bab itu.',
    },
    {
      script: [
        ["M", "Do you want to go to the concert on Saturday?"],
        ["W", "I'd love to, but I have to work the night shift."],
        ["N", "What does the woman mean?"],
      ],
      q: "What does the woman mean?",
      opts: [
        "She can't go to the concert.",
        "She works at the concert hall.",
        "She will go after work.",
        "She doesn't like concerts.",
      ],
      a: 0,
      topic: "L.neg",
      ex: '"I\'d love to, but…" = menolak dengan sopan. Dia harus kerja shift malam, jadi tidak bisa datang.',
    },
    {
      script: [
        ["W", "The apartment is nice, but the rent is too high for me."],
        ["M", "Have you thought about sharing it with a roommate?"],
        ["N", "What does the man suggest?"],
      ],
      q: "What does the man suggest?",
      opts: [
        "Looking for a cheaper apartment",
        "Finding someone to split the rent with",
        "Asking the owner to lower the rent",
        "Moving back home",
      ],
      a: 1,
      topic: "L.sug",
      ex: '"Have you thought about…" = saran. Sharing with a roommate = berbagi biaya sewa.',
    },
    {
      script: [
        [
          "N",
          "Good morning, everyone. Before we start today's tour of the museum, please note that photography is not permitted in the ancient art gallery. However, you may take pictures in the modern art wing on the second floor. The tour will last about ninety minutes.",
        ],
        ["N", "Where are visitors allowed to take photographs?"],
      ],
      q: "Where are visitors allowed to take photographs?",
      opts: [
        "In the ancient art gallery",
        "Anywhere in the museum",
        "In the modern art wing",
        "Only outside the museum",
      ],
      a: 2,
      topic: "L.imp",
      ex: 'Pemandu bilang foto dilarang di galeri seni kuno, tapi <b>boleh</b> di sayap seni modern lantai dua. Kata "However" menandai informasi penting.',
    },
  ],
  S: [
    {
      type: "mc",
      q: "Borobudur, _____ in the ninth century, is the world's largest Buddhist temple.",
      opts: ["built", "was built", "it was built", "building"],
      a: 0,
      topic: "S.red",
      ex: '<b>Pola 2.</b> Kata kerja utama sudah ada (is). Bagian di antara koma adalah reduced clause pasif → "built" (dari "which was built").',
    },
    {
      type: "mc",
      q: "_____ water boils at 100 degrees Celsius at sea level is a well-known fact.",
      opts: ["That", "Because", "It", "Which"],
      a: 0,
      topic: "S.ncl",
      ex: 'Ada dua kata kerja (boils, is). "That water boils…" menjadi subjek dari "is". "That" membuat seluruh klausa jadi kata benda (noun clause).',
    },
    {
      type: "mc",
      q: "Rarely _____ in Jakarta.",
      opts: ["it snows", "does it snow", "it does snow", "snowing it"],
      a: 1,
      topic: "S.inv",
      ex: '<b>Pola 6.</b> "Rarely" di awal kalimat → inversi: does + it + snow.',
    },
    {
      type: "mc",
      q: "If the government had invested earlier, the problem _____ solved.",
      opts: ["would be", "will be", "would have been", "had been"],
      a: 2,
      topic: "S.cond",
      ex: "<b>Pola 10.</b> If + had V3 (conditional tipe 3) → would have + V3.",
    },
    {
      type: "mc",
      q: "Komodo dragons are _____ lizards in the world.",
      opts: ["largest", "the largest", "larger", "the larger"],
      a: 1,
      topic: "S.cmp",
      ex: '<b>Pola 7.</b> "in the world" menunjukkan superlatif dan butuh "the": the largest.',
    },
    {
      type: "mc",
      q: "The committee decided _____ the meeting until next week.",
      opts: ["postponing", "to postpone", "postpone", "postponed"],
      a: 1,
      topic: "S.ger",
      ex: '<b>Pola 9.</b> "decide" diikuti to-infinitive: decided to postpone.',
    },
  ],
  W: [
    {
      type: "we",
      parts: [
        "Each of the ",
        {
          u: "participants",
        },
        " ",
        {
          u: "have to",
        },
        " ",
        {
          u: "submit",
        },
        " ",
        {
          u: "a report",
        },
        ".",
      ],
      a: 1,
      topic: "S.agr",
      ex: '<b>Pola 3.</b> Subjeknya "Each" (tunggal) → <b>has to</b>.',
    },
    {
      type: "we",
      parts: [
        "Rice is ",
        {
          u: "the main",
        },
        " ",
        {
          u: "food",
        },
        " ",
        {
          u: "for",
        },
        " most people ",
        {
          u: "live",
        },
        " in Asia.",
      ],
      a: 3,
      topic: "S.red",
      ex: '<b>Pola 2.</b> Kalimat sudah punya kata kerja (is). "live" harus jadi reduced clause: people <b>living</b> in Asia (= who live).',
    },
    {
      type: "we",
      parts: [
        "The children ",
        {
          u: "were",
        },
        " ",
        {
          u: "exciting",
        },
        " ",
        {
          u: "about",
        },
        " the trip ",
        {
          u: "to",
        },
        " the zoo.",
      ],
      a: 1,
      topic: "S.wf",
      ex: "<b>Pola 8.</b> Perasaan orang memakai -ed: the children were <b>excited</b>.",
    },
    {
      type: "we",
      parts: [
        "The teacher asked the students ",
        {
          u: "to read",
        },
        " the text, ",
        {
          u: "answering",
        },
        " the questions, and ",
        {
          u: "to write",
        },
        " ",
        {
          u: "a summary",
        },
        ".",
      ],
      a: 1,
      topic: "S.par",
      ex: "<b>Pola 4.</b> Harus paralel dengan to read dan to write → <b>to answer</b>.",
    },
    {
      type: "we",
      parts: [
        {
          u: "Despite",
        },
        " the rain was heavy, ",
        {
          u: "the match",
        },
        " ",
        {
          u: "continued",
        },
        " ",
        {
          u: "as planned",
        },
        ".",
      ],
      a: 0,
      topic: "S.con",
      ex: '<b>Pola 10.</b> Setelah "despite" harus kata benda. "the rain was heavy" adalah kalimat lengkap, jadi seharusnya <b>Although</b>.',
    },
    {
      type: "we",
      parts: [
        "Sumatra is ",
        {
          u: "more larger",
        },
        " than Java, ",
        {
          u: "but",
        },
        " Java has ",
        {
          u: "a bigger",
        },
        " ",
        {
          u: "population",
        },
        ".",
      ],
      a: 0,
      topic: "S.cmp",
      ex: "<b>Pola 7.</b> Jangan dobel perbandingan. Seharusnya <b>larger</b> saja.",
    },
  ],
  passage: {
    title: "Sleep and memory",
    paras: [
      "For many years, scientists believed that the brain was largely inactive during sleep. Today, researchers know that sleep plays an active role in learning and memory. During the day, the brain takes in a large amount of new information. While we sleep, it sorts this information, strengthening some memories and discarding others.",
      "One stage of sleep, known as slow-wave sleep, appears to be particularly important for remembering facts, such as vocabulary or historical dates. Another stage, rapid eye movement (REM) sleep, is associated with dreaming and may help the brain connect new information with what it already knows.",
      "Studies have shown that students who sleep after studying often perform better on tests than those who stay awake for the same period. In contrast, staying up all night before an exam can noticeably reduce the ability to recall information. For this reason, many experts advise learners to spread their study sessions over several days and to get enough rest, rather than trying to learn everything at once.",
    ],
  },
  R: [
    {
      q: "What is the main topic of the passage?",
      opts: [
        "The history of sleep research",
        "How sleep supports learning and memory",
        "Why people dream during REM sleep",
        "How to study vocabulary",
      ],
      a: 1,
      tag: "Main idea",
      topic: "R.main",
      ex: "Seluruh teks membahas peran tidur dalam belajar dan mengingat. A hanya kalimat pertama, C dan D hanya detail.",
    },
    {
      q: 'The word "discarding" in paragraph 1 is closest in meaning to',
      opts: ["keeping", "throwing away", "repeating", "creating"],
      a: 1,
      tag: "Vocabulary",
      topic: "R.voc",
      ex: 'Kontras dengan "strengthening": sebagian ingatan diperkuat, sebagian dibuang (thrown away).',
    },
    {
      q: 'The word "it" in paragraph 2 ("what it already knows") refers to',
      opts: ["the brain", "REM sleep", "new information", "dreaming"],
      a: 0,
      tag: "Reference",
      topic: "R.ref",
      ex: 'Yang "sudah tahu" sesuatu adalah otak (the brain). Informasi atau mimpi tidak bisa "know".',
    },
    {
      q: "According to the passage, slow-wave sleep is especially important for",
      opts: [
        "dreaming",
        "remembering facts",
        "staying awake",
        "connecting ideas creatively",
      ],
      a: 1,
      tag: "Detail",
      topic: "R.det",
      ex: "Paragraf 2: slow-wave sleep penting untuk mengingat fakta seperti kosakata atau tanggal.",
    },
    {
      q: "In the past, scientists believed that during sleep the brain",
      opts: [
        "did very little",
        "sorted new information",
        "created new memories",
        "was more active than during the day",
      ],
      a: 0,
      tag: "Detail",
      topic: "R.det",
      ex: '"largely inactive" = hampir tidak aktif, artinya "did very little".',
    },
    {
      q: "The author would most likely agree with which of the following?",
      opts: [
        "Staying up all night is the best way to prepare for a test.",
        "Studying a little each day and sleeping well works better than cramming.",
        "Sleep has no effect on test results.",
        "Only REM sleep matters for learning.",
      ],
      a: 1,
      tag: "Inference",
      topic: "R.inf",
      ex: "Paragraf terakhir menyarankan belajar dibagi beberapa hari dan cukup istirahat. B paling sesuai; A dan C berlawanan, D terlalu sempit.",
    },
  ],
};
