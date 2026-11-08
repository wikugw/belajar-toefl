import type { Passage, Question } from "@/lib/types";

export const listeningPractice: Question[] = [
  {
    script: [
      ["W", "I can't believe how crowded the library is today."],
      ["M", "It's always like this the week before final exams."],
      ["N", "What does the man mean?"],
    ],
    q: "What does the man mean?",
    opts: [
      "The library is usually empty.",
      "Many students study there before exams.",
      "The final exams have been canceled.",
      "He doesn't like studying in the library.",
    ],
    a: 1,
    topic: "L.imp",
    ex: '"It\'s always like this the week before final exams" = setiap menjelang ujian memang ramai, karena banyak mahasiswa belajar. Pilihan A berlawanan, C dan D tidak disebut.',
  },
  {
    script: [
      ["M", "I've had a terrible headache since this morning."],
      ["W", "Why don't you lie down for a while?"],
      ["N", "What does the woman suggest?"],
    ],
    q: "What does the woman suggest?",
    opts: [
      "Seeing a doctor immediately",
      "Taking some rest",
      "Going out for some fresh air",
      "Taking a different medicine",
    ],
    a: 1,
    topic: "L.sug",
    ex: '"Why don\'t you…" adalah pola <b>saran</b>. "Lie down for a while" = berbaring sebentar, artinya istirahat. Perhatikan jawaban benar memakai sinonim (taking some rest), bukan kata yang sama.',
  },
  {
    script: [
      ["W", "I don't think the bus will come on time."],
      ["M", "Neither do I."],
      ["N", "What does the man mean?"],
    ],
    q: "What does the man mean?",
    opts: [
      "He thinks the bus will be on time.",
      "He also doubts the bus will be on time.",
      "He is going to take a taxi.",
      "He has no idea about the bus schedule.",
    ],
    a: 1,
    topic: "L.agr",
    ex: '"Neither do I" = setuju dengan kalimat negatif. Wanita tidak yakin busnya tepat waktu, pria juga tidak yakin.',
  },
  {
    script: [
      ["M", "Did you finish the report for Mr. Hadi?"],
      ["W", "Not yet. I'm swamped with work this week."],
      ["N", "What does the woman mean?"],
    ],
    q: "What does the woman mean?",
    opts: [
      "She has too much work to do.",
      "She finished the report early.",
      "Mr. Hadi has already read the report.",
      "She went swimming this week.",
    ],
    a: 0,
    topic: "L.idi",
    ex: 'Idiom "swamped" = kebanjiran pekerjaan, sangat sibuk. Pilihan D adalah jebakan bunyi (swamped ↔ swimming).',
  },
  {
    script: [
      ["W", "Could you help me carry these boxes to the car?"],
      ["M", "Sorry, my back is still sore from the game."],
      ["N", "What does the man mean?"],
    ],
    q: "What does the man mean?",
    opts: [
      "He can't help because his back hurts.",
      "He is going back to the store.",
      "He is sorry that he lost the game.",
      "The boxes are already in the car.",
    ],
    a: 0,
    topic: "L.neg",
    ex: '"My back is still sore" = punggungnya masih sakit, jadi dia tidak bisa membantu. Pilihan B memakai jebakan bunyi: back dan sore ↔ store.',
  },
];

export const structurePractice: Question[] = [
  {
    type: "mc",
    q: "_____ the largest planet in the solar system.",
    opts: ["Jupiter", "Jupiter is", "That Jupiter", "Jupiter, which is"],
    a: 1,
    topic: "S.sv",
    ex: '<b>Pola 1.</b> Kalimat belum punya subjek dan kata kerja. Hanya "Jupiter is" yang memberi keduanya. D membuat anak kalimat sehingga kalimat utama tetap tanpa kata kerja.',
  },
  {
    type: "mc",
    q: "The Amazon rainforest, _____ millions of species, is often called the lungs of the Earth.",
    opts: ["home to", "is home to", "it is home to", "which home to"],
    a: 0,
    topic: "S.red",
    ex: '<b>Pola 2.</b> Kata kerja utama sudah ada (is often called). Bagian di antara koma hanya keterangan (appositive), jadi tidak boleh ada kata kerja baru. D salah karena "which" butuh kata kerja (which is home to).',
  },
  {
    type: "mc",
    q: "Not until the 19th century _____ widely used in factories.",
    opts: [
      "machines were",
      "were machines",
      "machines had",
      "that machines were",
    ],
    a: 1,
    topic: "S.inv",
    ex: '<b>Pola 6.</b> "Not until" di awal kalimat memicu inversi: kata bantu (were) sebelum subjek (machines).',
  },
  {
    type: "mc",
    q: "The more you practice, _____ you will become.",
    opts: [
      "the more confident",
      "more confident",
      "the most confident",
      "confident more",
    ],
    a: 0,
    topic: "S.cmp",
    ex: '<b>Pola 7.</b> Pola tetap: <i>the + comparative…, the + comparative…</i>. Bagian kedua juga harus pakai "the more".',
  },
  {
    type: "mc",
    q: "Coffee, which is grown in many tropical countries, _____ one of the most traded commodities.",
    opts: ["are", "being", "is", "to be"],
    a: 2,
    topic: "S.agr",
    ex: '<b>Pola 3.</b> Abaikan bagian di antara koma. Subjeknya "Coffee" (tunggal) dan kalimat butuh kata kerja utama → "is".',
  },
  {
    type: "we",
    parts: [
      "The ",
      {
        u: "number",
      },
      " of students who ",
      {
        u: "takes",
      },
      " the test ",
      {
        u: "has increased",
      },
      " ",
      {
        u: "every year",
      },
      ".",
    ],
    a: 1,
    topic: "S.agr",
    ex: '<b>Pola 3.</b> "who" merujuk ke "students" (jamak), jadi seharusnya <b>take</b>. "The number of… has" sudah benar karena "the number" tunggal.',
  },
  {
    type: "we",
    parts: [
      "She enjoys ",
      {
        u: "reading",
      },
      ", ",
      {
        u: "to swim",
      },
      ", and ",
      {
        u: "playing",
      },
      " ",
      {
        u: "the piano",
      },
      ".",
    ],
    a: 1,
    topic: "S.par",
    ex: '<b>Pola 4 & 9.</b> Harus paralel dengan reading dan playing → <b>swimming</b>. Selain itu, "enjoy" selalu diikuti -ing.',
  },
  {
    type: "we",
    parts: [
      "The ",
      {
        u: "museum",
      },
      " was ",
      {
        u: "build",
      },
      " in 1920 ",
      {
        u: "by",
      },
      " a famous ",
      {
        u: "architect",
      },
      ".",
    ],
    a: 1,
    topic: "S.pas",
    ex: "<b>Pola 5.</b> Passive = be + V3. Seharusnya <b>was built</b>.",
  },
  {
    type: "we",
    parts: [
      "Bali is one of the ",
      {
        u: "most",
      },
      " ",
      {
        u: "beautiful",
      },
      " ",
      {
        u: "island",
      },
      " ",
      {
        u: "in",
      },
      " Indonesia.",
    ],
    a: 2,
    topic: "S.noun",
    ex: '"One of the…" selalu diikuti kata benda <b>jamak</b>: one of the most beautiful <b>islands</b>.',
  },
  {
    type: "we",
    parts: [
      "He answered the questions ",
      {
        u: "very",
      },
      " ",
      {
        u: "careful",
      },
      " and ",
      {
        u: "finished",
      },
      " ",
      {
        u: "before",
      },
      " the others.",
    ],
    a: 1,
    topic: "S.wf",
    ex: '<b>Pola 8.</b> "careful" menerangkan kata kerja "answered", jadi harus adverb: <b>carefully</b>.',
  },
];

export const readingPassage: Passage = {
  title: "Mangrove forests",
  paras: [
    "Mangrove forests grow along tropical coastlines where land meets the sea. Unlike most trees, mangroves can survive in salty water and in soil that is low in oxygen. Some species filter salt through their roots, while others remove it through their leaves. Their tangled roots, which rise above the water like stilts, help them stay upright during changing tides.",
    "These forests provide important benefits to coastal communities. The dense roots slow down waves and reduce erosion, which helps protect villages from storms. Some studies after the 2004 Indian Ocean tsunami suggested that coastal areas with healthy mangroves suffered less damage than areas where the forests had been cleared. Mangroves also serve as nurseries for young fish, crabs, and shrimp, many of which are later caught by local fishermen.",
    "Despite these advantages, mangroves are disappearing. Over the past several decades, large areas have been cut down to make room for shrimp farms and coastal development. Indonesia, which has the largest area of mangroves in the world, has started replanting programs. However, scientists warn that replanting alone is not enough; the conditions that allow young trees to survive must also be restored.",
  ],
};

export const readingPractice: Question[] = [
  {
    q: "What is the passage mainly about?",
    opts: [
      "How shrimp farms are built in Indonesia",
      "The features, benefits, and decline of mangrove forests",
      "The damage caused by the 2004 tsunami",
      "Different ways trees remove salt",
    ],
    a: 1,
    tag: "Main idea",
    topic: "R.main",
    ex: "Paragraf 1 membahas ciri mangrove, paragraf 2 manfaatnya, paragraf 3 ancamannya. Hanya B yang mencakup ketiganya. A, C, D hanya detail.",
  },
  {
    q: 'The word "tangled" in paragraph 1 is closest in meaning to',
    opts: ["thin", "twisted together", "broken", "straight"],
    a: 1,
    tag: "Vocabulary",
    topic: "R.voc",
    ex: 'Akar yang "tangled" = kusut, saling melilit. Coba masukkan ke kalimat: "Their twisted-together roots" tetap masuk akal.',
  },
  {
    q: 'The word "it" in paragraph 1 refers to',
    opts: ["salt", "water", "soil", "oxygen"],
    a: 0,
    tag: "Reference",
    topic: "R.ref",
    ex: '"Some species filter salt through their roots, while others remove <b>it</b> through their leaves." Yang dibuang lewat daun adalah garam (salt).',
  },
  {
    q: "According to the passage, why have large areas of mangroves been cut down?",
    opts: [
      "To make room for shrimp farms and development",
      "To protect villages from storms",
      "To build replanting programs",
      "To catch more fish",
    ],
    a: 0,
    tag: "Detail",
    topic: "R.det",
    ex: 'Paragraf 3: "cut down to make room for shrimp farms and coastal development".',
  },
  {
    q: "It can be inferred from paragraph 3 that replanting programs",
    opts: [
      "have already restored all of Indonesia's mangroves",
      "may fail if the environment is not improved",
      "are not supported by scientists at all",
      "are only done outside Indonesia",
    ],
    a: 1,
    tag: "Inference",
    topic: "R.inf",
    ex: "Ilmuwan bilang menanam ulang saja tidak cukup; kondisi lingkungannya juga harus dipulihkan. Artinya tanpa perbaikan lingkungan, penanaman bisa gagal. A dan C terlalu ekstrem.",
  },
  {
    q: "All of the following are mentioned as benefits of mangroves EXCEPT",
    opts: [
      "reducing erosion",
      "slowing down waves",
      "providing wood for construction",
      "serving as nurseries for sea animals",
    ],
    a: 2,
    tag: "NOT / EXCEPT",
    topic: "R.exc",
    ex: "A, B, dan D ada di paragraf 2. Kayu untuk bangunan tidak disebut sama sekali.",
  },
];
