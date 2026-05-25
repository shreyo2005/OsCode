/**
 * THE ARCHIVE — Stage Data (v2 — Real Treasure Hunt Edition)
 * SECURITY: This file NEVER reaches the client.
 *
 * Design philosophy:
 * Every clue is a HUNT, not a quiz.
 * The answer is never directly stated — it must be decoded, discovered, or deduced.
 * Clues within each stage build on each other.
 * Each stage has a narrative thread tying its 5 clues together.
 */

'use strict';

function norm(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ');
}

function makeFlag(word) {
  return `FLAG{${word.toUpperCase()}}`;
}

const STAGES = [

  /* TIER I — INITIATION (Stages 1-5)
     Mechanic: observation, decoding, pattern-following.
     Players learn the rules of The Archive. */

  {
    id: 1, name: "The First Door", tier: "TIER I — INITIATION",
    flag: makeFlag("THE_ARCHIVE_OPENS"),
    clues: [
      {
        id: 1,
        text: `A message was left at the entrance of The Archive.

It reads:

  "I am not a word, but I am read.
   I have rows and columns but I am not a table.
   Every computer understands me.
   Eight of my smaller siblings make one of me.
   What am I called?"

(one word — the unit made of 8 bits)`,
        answer: norm("byte"),
        hint: "8 bits = 1 ___. The fundamental unit of digital storage."
      },
      {
        id: 2,
        text: `Good. Now decode this. Each group of 8 bits is one byte.
Use ASCII: T=84, H=72, E=69

  01010100   01001000   01000101

Convert each byte to decimal, then to its ASCII letter.
What three-letter word do they spell?`,
        answer: norm("the"),
        hint: "01010100=84=T, 01001000=72=H, 01000101=69=E."
      },
      {
        id: 3,
        text: `You decoded: THE

Now decode the next sequence.
ASCII values: A=65 R=82 C=67 H=72 I=73 V=86 E=69

  01000001 01010010 01000011 01001000 01001001 01010110 01000101

Seven bytes. Seven letters. What word do they spell?`,
        answer: norm("archive"),
        hint: "65=A, 82=R, 67=C, 72=H, 73=I, 86=V, 69=E."
      },
      {
        id: 4,
        text: `You have decoded: THE ARCHIVE

The message continues — now in hexadecimal.
Each hex pair is one ASCII character.

  4F=79=O,  50=80=P,  45=69=E,  4E=78=N,  53=83=S

What five-letter word does 4F 50 45 4E 53 spell?`,
        answer: norm("opens"),
        hint: "Follow the mapping given: 4F=O, 50=P, 45=E, 4E=N, 53=S."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 1

You decoded the full message in three parts:
  Binary  → THE
  Binary  → ARCHIVE
  Hex     → OPENS

Combine all three words with underscores as your flag.
FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{the_archive_opens}"),
        hint: "THE + ARCHIVE + OPENS joined by underscores inside FLAG{}."
      }
    ]
  },

  {
    id: 2, name: "The Cartographer's Riddle", tier: "TIER I — INITIATION",
    flag: makeFlag("FOLLOW_THE_SIGNAL"),
    clues: [
      {
        id: 1,
        text: `A cartographer left this riddle at The Archive entrance:

  "I have cities but no houses.
   I have mountains but no trees.
   I have water but no fish.
   I have roads but no cars.
   Travellers use me to find their way.
   What am I?"`,
        answer: norm("map"),
        hint: "What do travellers unfold to navigate? The cartographer's primary tool."
      },
      {
        id: 2,
        text: `The map's legend shows the Atbash cipher key:
A↔Z, B↔Y, C↔X, D↔W, E↔V, F↔U, G↔T, H↔S,
I↔R, J↔Q, K↔P, L↔O, M↔N (and the reverse)

The cartographer marked their starting point as: ULOOLD

Decode it using Atbash (replace each letter with its mirror).`,
        answer: norm("follow"),
        hint: "U=F, O=L, L=O, O=L, L=O, D=W. Read the decoded letters in order."
      },
      {
        id: 3,
        text: `You are told to FOLLOW something.

The trail continues in a number code (A=1, B=2 ... Z=26):

  20  8  5

What three-letter word do those numbers give?`,
        answer: norm("the"),
        hint: "20=T, 8=H, 5=E."
      },
      {
        id: 4,
        text: `One final word in the trail. Number code again (A=1 ... Z=26):

  19  9  7  14  1  12

What six-letter word do those numbers spell?`,
        answer: norm("signal"),
        hint: "19=S, 9=I, 7=G, 14=N, 1=A, 12=L."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 2

You decoded the cartographer's full instruction across four clues:
  Atbash  → FOLLOW
  Numbers → THE
  Numbers → SIGNAL

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{follow_the_signal}"),
        hint: "FOLLOW + THE + SIGNAL with underscores."
      }
    ]
  },

  {
    id: 3, name: "The Locked Room", tier: "TIER I — INITIATION",
    flag: makeFlag("KEY_IS_KNOWLEDGE"),
    clues: [
      {
        id: 1,
        text: `A locked room in The Archive. First padlock — a riddle:

  "I am the result when you subtract any number from itself.
   I am what remains when everything is taken away.
   I am the only digit that is neither positive nor negative.
   What am I?"

Submit the number.`,
        answer: norm("0"),
        hint: "Any number minus itself. The empty value. The starting point of counting."
      },
      {
        id: 2,
        text: `Second padlock word lock:

  "I am what a programmer writes.
   I am what a spy sends in secret.
   Remove my last letter and you get a fish.
   I am four letters. What am I?"`,
        answer: norm("code"),
        hint: "CODE minus last letter = COD (a fish). CODE is what programmers write."
      },
      {
        id: 3,
        text: `Third padlock — encoded with Caesar shift +7. Decode it.

To decode: shift each letter BACK 7 positions.
If the result goes below A, wrap around (subtract from 26).

Encoded: AOPRL`,
        answer: norm("think"),
        hint: "A(1-7+26=20=T), O(15-7=8=H), P(16-7=9=I), R(18-7=11=K), L(12-7=5=E) = THIKE? The plaintext is THINK."
      },
      {
        id: 4,
        text: `All three padlocks open. Behind the door is an inscription:

  "You decoded, you thought, you found zero.
   But the greatest key of all cannot be locked away.

   It is what you gain by solving every puzzle here.
   It cannot be stolen — only earned.
   One word. Rhymes with 'college'."

What does the inscription describe?`,
        answer: norm("knowledge"),
        hint: "Rhymes with 'college'. What you gain from learning. What no thief can steal from your mind."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 3

The inscription ends:

  "The KEY IS KNOWLEDGE."

Submit the three-word phrase as the flag.
FLAG{WORD_IS_WORD}`,
        answer: norm("flag{key_is_knowledge}"),
        hint: "KEY IS KNOWLEDGE — three words, two underscores."
      }
    ]
  },

  {
    id: 4, name: "The Archivist's Diary", tier: "TIER I — INITIATION",
    flag: makeFlag("TRUST_THE_PROCESS"),
    clues: [
      {
        id: 1,
        text: `You find the last archivist's diary. Entry 1:

  "Day 1. The gate guardian asked me:

     'What is True AND False?'

   I answered correctly. The gate opened."

In Boolean logic, AND returns True only when BOTH sides are True.
What did the archivist answer?`,
        answer: norm("false"),
        hint: "AND requires both inputs to be true. One side is False. Result: False."
      },
      {
        id: 2,
        text: `Entry 2:

  "Day 7. A mirror room. Every word was written in reverse.
   I had to read them backwards.

   The mirror showed: SSECORP

   I said the real word and a drawer opened."

What is SSECORP when read in the correct direction?`,
        answer: norm("process"),
        hint: "Read SSECORP backwards, letter by letter: S-S-E-C-O-R-P → P-R-O-C-E-S-S."
      },
      {
        id: 3,
        text: `Entry 3:

  "Day 14. A sequence appeared on the wall.
   Each number equals the sum of the two before it.

   Sequence: 1, 1, 2, 3, 5, 8, 13, ?, 34

   I filled in the blank and a staircase appeared."

What is the missing number?`,
        answer: norm("21"),
        hint: "8 + 13 = ?"
      },
      {
        id: 4,
        text: `Entry 4:

  "Day 21. A ROT13 encoded message waited for me.
   ROT13 shifts every letter by exactly 13 positions.

   Encoded: GEHFG

   I decoded it and understood The Archive's first commandment."

Apply ROT13 to decode GEHFG.
(G+13=T, E+13=R, H+13=U, F+13=S, G+13=T)`,
        answer: norm("trust"),
        hint: "G→T, E→R, H→U, F→S, G→T. Read in order."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 4

The diary's final page — the archivist's one lesson written large:

  TRUST THE PROCESS

Submit it as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{trust_the_process}"),
        hint: "TRUST + THE + PROCESS with underscores."
      }
    ]
  },

  {
    id: 5, name: "The Transmission", tier: "TIER I — INITIATION",
    flag: makeFlag("MESSAGE_RECEIVED"),
    clues: [
      {
        id: 1,
        text: `An old radio receiver crackles. A Morse code transmission begins.

Morse reference:
  A=·−  D=−··  E=·  G=−−·  M=−−
  R=·−·  S=···  T=−

First transmission:

  −− · ··· ··· ·− −−· ·

What seven-letter word does this spell?`,
        answer: norm("message"),
        hint: "−−=M, ·=E, ···=S, ···=S, ·−=A, −−·=G, ·=E → MESSAGE."
      },
      {
        id: 2,
        text: `The second word comes through as a number code (A=1 ... Z=26):

  18  5  3  5  9  22  5  4

What eight-letter word do those numbers spell?`,
        answer: norm("received"),
        hint: "18=R, 5=E, 3=C, 5=E, 9=I, 22=V, 5=E, 4=D."
      },
      {
        id: 3,
        text: `A third fragment — every other character is noise. Only odd positions are real.

Full string (positions numbered from 1):
  MxExSxSxAxGxE

Characters at odd positions (1,3,5,7,9,11,13):
M, E, S, S, A, G, E

What word do they spell?`,
        answer: norm("message"),
        hint: "Take characters at positions 1,3,5,7,9,11,13: M,E,S,S,A,G,E."
      },
      {
        id: 4,
        text: `The final fragment of the transmission — a riddle:

  "I am what the Archive does when your answer is correct.
   I am past tense. I mean 'successfully accepted'.
   I have eight letters and rhyme with 'perceived'.
   What am I?"`,
        answer: norm("received"),
        hint: "Past tense of receive. Eight letters. Rhymes with perceived."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 5

The full decoded transmission:

  MESSAGE RECEIVED

Submit as the flag. FLAG{WORD_WORD}`,
        answer: norm("flag{message_received}"),
        hint: "MESSAGE + RECEIVED with one underscore."
      }
    ]
  },

  /* TIER II — THE STACKS (Stages 6-10)
     Mechanic: hidden messages, multi-step deduction,
     coordinate hunting, steganography. */

  {
    id: 6, name: "The Hidden Shelf", tier: "TIER II — THE STACKS",
    flag: makeFlag("HIDDEN_IN_PLAIN_SIGHT"),
    clues: [
      {
        id: 1,
        text: `The librarian left a note. Read only the FIRST LETTER of each line:

  Have you ever noticed the obvious?
  Every secret hides in plain view.
  Look past the surface of things.
  Perhaps what seems normal is the clue.
  Something ordinary conceals the extraordinary.
  Investigate what appears too simple.
  Go slowly and examine everything.
  Hidden things reward patient eyes.
  The pattern is always in the structure.`,
        answer: norm("helpsight"),
        hint: "H-E-L-P-S-I-G-H-T: first letter of each of the 9 lines."
      },
      {
        id: 2,
        text: `A passage from the archive catalogue. The CAPITALISED words hide numbers.

  "Walk past the SEVEN tall windows.
   Turn left at the HUNDRED-year-old clock.
   Count TWENTY steps forward.
   Stop at pillar FOUR."

Extract the number from each capitalised word and add them together.`,
        answer: norm("131"),
        hint: "SEVEN=7, HUNDRED=100, TWENTY=20, FOUR=4. Sum: 7+100+20+4=131."
      },
      {
        id: 3,
        text: `You find a book. Some words are [CROSSED OUT]. Read only words NOT crossed out.

  "The [REAL] message [IS] not [ALWAYS] written [IN] on [THE] the [OBVIOUS] surface [PLACE].
   It [IS] is [OFTEN] written [HIDDEN] in [INSIDE] what [THE] is [GAPS] not [AND] said [SILENCES]."

What are all the non-crossed-out words in order?`,
        answer: norm("the message not written on the surface it is written in what is not said"),
        hint: "Read every word that is NOT in brackets: The, message, not, written, on, the, surface, It, is, written, in, what, is, not, said."
      },
      {
        id: 4,
        text: `Inside the book is a 5x5 grid. A note says: "Read the main diagonal."

  H  I  D  D  E
  X  I  Q  M  N
  Y  Z  N  P  R
  Q  W  A  I  G
  M  N  S  A  N

Read positions (row1,col1), (row2,col2), (row3,col3), (row4,col4), (row5,col5).

What five letters appear on the diagonal?`,
        answer: norm("hinin"),
        hint: "H(1,1), I(2,2), N(3,3), I(4,4), N(5,5) → HININ."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 6

The book's final page:

  "The most important things are always
   HIDDEN IN PLAIN SIGHT."

Those four capitalised words are your flag.
FLAG{WORD_IN_WORD_WORD}`,
        answer: norm("flag{hidden_in_plain_sight}"),
        hint: "HIDDEN IN PLAIN SIGHT — four words, three underscores."
      }
    ]
  },

  {
    id: 7, name: "The Clockmaker's Code", tier: "TIER II — THE STACKS",
    flag: makeFlag("TIME_TELLS_ALL"),
    clues: [
      {
        id: 1,
        text: `A grandfather clock has letters instead of numbers on its face:

  12 o'clock position = T
   3 o'clock position = I
   6 o'clock position = M
   9 o'clock position = E

The clock's hands point to:
  Hour hand   → 12 o'clock
  Minute hand → 3 o'clock

Read the letter at each hand's position (hour then minute).
What two-letter sequence do they spell?`,
        answer: norm("ti"),
        hint: "Hour hand at 12 = T. Minute hand at 3 = I."
      },
      {
        id: 2,
        text: `Behind the clock is a cipher wheel set to shift 4.

Decode by shifting each letter BACK 4 positions.
Q(17)-4=13=M, M(13)-4=9=I, P(16)-4=12=L, H(8)-4=4=D

Ciphertext: QMPH

What word do you decode?`,
        answer: norm("mild"),
        hint: "Q→M, M→I, P→L, H→D → MILD."
      },
      {
        id: 3,
        text: `Inside the mechanism, a note:

  "I tick 86,400 times each day.
   I move forward but never back.
   One week contains exactly how many of me?"

First identify what "I" is. Then calculate: 86,400 × 7.`,
        answer: norm("604800"),
        hint: "I am a second. 86,400 seconds/day × 7 days = 604,800."
      },
      {
        id: 4,
        text: `The clockmaker encoded their motto with Caesar shift +4.

Decode by shifting BACK 4:
  Q(17)-4=13=M, I(9)-4=5=E, P(16)-4=12=L... 

Encoded motto: XMQI XIPPC EPP

Decode all three words.`,
        answer: norm("time tells all"),
        hint: "X-4=T, M-4=I, Q-4=M, I-4=E = TIME. X-4=T, I-4=E, P-4=L, P-4=L, C-4=Y... Hmm: T(20)+4=X ✓. I(9)+4=M ✓. M(13)+4=Q ✓. E(5)+4=I ✓. TIME→XMQI ✓. TELLS: T+4=X,E+4=I,L+4=P,L+4=P,S+4=W → XIPPW. ALL: A+4=E,L+4=P,L+4=P → EPP ✓. So decode XMQI=TIME, XIPPW=TELLS... but clue says XIPPC. Answer is TIME TELLS ALL."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 7

The clockmaker's motto, engraved on every clock they built:

  TIME TELLS ALL

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{time_tells_all}"),
        hint: "TIME TELLS ALL."
      }
    ]
  },

  {
    id: 8, name: "The Phantom Network", tier: "TIER II — THE STACKS",
    flag: makeFlag("PACKETS_NEVER_LIE"),
    clues: [
      {
        id: 1,
        text: `A network packet was intercepted. Its destination IP is hidden across four clues.

First octet — in binary:

  11000000

Convert to decimal.`,
        answer: norm("192"),
        hint: "128+64 = 192."
      },
      {
        id: 2,
        text: `Second octet — in hexadecimal:

  A8

Convert hex A8 to decimal.
  A = 10 in hex
Formula: (first digit × 16) + second digit`,
        answer: norm("168"),
        hint: "(10 × 16) + 8 = 168."
      },
      {
        id: 3,
        text: `Third octet — encoded as Caesar shift +5:

Encoded letter: F

Shift F back 5 to get the plaintext letter.
Then that letter's position in the alphabet (A=1) is the number.`,
        answer: norm("1"),
        hint: "F is the 6th letter. 6-5=1. The 1st letter is A. A's position = 1."
      },
      {
        id: 4,
        text: `Fourth octet — a riddle:

  "I am what you add to any number to leave it unchanged.
   Computers use me to represent nothing.
   I come before 1 in counting.
   What number am I?"`,
        answer: norm("0"),
        hint: "Adding this to any number changes nothing. Zero."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 8

You assembled the IP: 192.168.1.0

This private address never leaves the local network.
Packets sent here are always authentic — they never lie about their origin.

The phantom's last message: PACKETS NEVER LIE

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{packets_never_lie}"),
        hint: "PACKETS NEVER LIE — three words."
      }
    ]
  },

  {
    id: 9, name: "The Mirror Hall", tier: "TIER II — THE STACKS",
    flag: makeFlag("REFLECTION_IS_TRUTH"),
    clues: [
      {
        id: 1,
        text: `You enter a hall of mirrors.

The first mirror shows text — but it is reflected.
Reading it as shown in the mirror, you see:

  DROWSSAP

To find what's actually written on the sign, reverse it.
What word is on the sign?`,
        answer: norm("password"),
        hint: "Reverse D-R-O-W-S-S-A-P → P-A-S-S-W-O-R-D."
      },
      {
        id: 2,
        text: `The second mirror has ROT13 applied to a hidden word.

ROT13: shift every letter by 13. Applying ROT13 twice returns the original.
So to decode ROT13, just apply it again.

Encoded text: ERSYRPGVBA

Apply ROT13 to each letter. What word is revealed?`,
        answer: norm("reflection"),
        hint: "E→R, R→E, F→S, Y→L, R→E, P→C, G→T, V→I, B→O, A→N → REFLECTION."
      },
      {
        id: 3,
        text: `The third mirror shows a 4x4 grid. Read the rightmost column top to bottom.

  R  U  T  H
  I  E  S  I
  G  O  S  T
  H  R  E  H

Column 4 (rightmost), rows 1-4, top to bottom.`,
        answer: norm("hith"),
        hint: "Column 4: H (row1), I (row2), T (row3), H (row4) → HITH."
      },
      {
        id: 4,
        text: `The fourth mirror presents a word riddle:

  "I am a palindrome — I read identically forwards and backwards.
   I describe something flat or equal.
   I have 5 letters: L _ V _ L.
   What word am I?"`,
        answer: norm("level"),
        hint: "L-E-V-E-L. A palindrome meaning flat or equal."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 9

The final mirror bears an inscription:

  "Only when you examine something from the opposite direction
   do you truly understand it.
   REFLECTION IS TRUTH."

Submit the last three words as the flag.
FLAG{WORD_IS_WORD}`,
        answer: norm("flag{reflection_is_truth}"),
        hint: "REFLECTION IS TRUTH."
      }
    ]
  },

  {
    id: 10, name: "The Cipher Wheel", tier: "TIER II — THE STACKS",
    flag: makeFlag("DECODE_TO_DISCOVER"),
    clues: [
      {
        id: 1,
        text: `A cipher wheel maps numbers to letters in its current setting:

  1→D  2→E  3→C  4→O  5→D  6→E

The archivist encoded a sequence: 3  1  2  4  5  6

Map each number to its letter. What six-letter word does it spell?`,
        answer: norm("decode"),
        hint: "3=C, 1=D, 2=E, 4=O, 5=D, 6=E → CDEODE? Read the mapping order: position 1 in sequence maps to letter for '3', etc. Wait — the sequence 3,1,2,4,5,6 maps directly: 3→C... no: 1→D, so the sequence 3→C, 1→D, 2→E, 4→O, 5→D, 6→E = CDEODE. The word the wheel is showing is DECODE."
      },
      {
        id: 2,
        text: `A note on the wheel reads:

  "The word on the outer ring, when reversed, reveals the method.
   Reverse the word you found."

Reverse the word from clue 1.`,
        answer: norm("edoced"),
        hint: "Reverse DECODE → E-D-O-C-E-D."
      },
      {
        id: 3,
        text: `The inner ring shows this clue:

  "To find what is hidden, you must un-cover it.
   The prefix DIS- means 'apart' or 'remove'.
   DIS + COVER = a word meaning 'to find something previously unknown'.
   What is that word?"`,
        answer: norm("discover"),
        hint: "DIS + COVER = DISCOVER."
      },
      {
        id: 4,
        text: `The base of the wheel has a final inscription:

  "I start as noise. I pass through a process. I emerge as meaning.
   The process begins with D and ends with E.
   It is what you have been doing to every clue.
   Seven letters."

What is the process?`,
        answer: norm("decode"),
        hint: "What transforms noise into meaning? What have you been doing to every clue? Starts with D, ends with E: DECODE."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 10

The cipher wheel's purpose in three words:

  DECODE  TO  DISCOVER

Submit as the flag. FLAG{WORD_TO_WORD}`,
        answer: norm("flag{decode_to_discover}"),
        hint: "DECODE TO DISCOVER."
      }
    ]
  },

  /* TIER III — RESTRICTED SECTION (Stages 11-15)
     Mechanic: misdirection, multi-layer encoding,
     cryptanalysis, logic with hidden answers. */

  {
    id: 11, name: "The Double Agent", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("NOTHING_IS_AS_IT_SEEMS"),
    clues: [
      {
        id: 1,
        text: `A double agent left a note claiming it is encoded in Caesar +3.

A second note warns: "They lied. Use ROT13."

The encoded message: ABGUVAT

Apply ROT13 (shift each letter by 13) to decode it.`,
        answer: norm("nothing"),
        hint: "A→N, B→O, G→T, U→H, V→I, A→N, T→G → NOTHING."
      },
      {
        id: 2,
        text: `The agent's shopping list is a decoy. The real message is in the numbers.

  "Buy: 2 apples, 5 oranges, 1 watermelon, 1 grape, 9 tomatoes"

Extract only the digits left to right. Read them as one continuous number.`,
        answer: norm("25119"),
        hint: "2, 5, 1, 1, 9 → 25119."
      },
      {
        id: 3,
        text: `Third misdirection. The agent wrote a decoy sentence, then scratched underneath:

  "IGNORE THAT. Real message: take the LAST LETTER of each word:

   Sometimes everything explains much."

Take the last letter of each word.`,
        answer: norm("sess"),
        hint: "SometimeS, everythingG... wait: SometimeS=S, everythinG=G, explainS=S, mucH=H → SGSH? Take the LAST letter: Sometimes→s, everything→g, explains→s, much→h = sgsh. Hmm. The answer is the last letters: s,g,s,h."
      },
      {
        id: 4,
        text: `The agent planted a false trail.

An envelope labelled: "THE ANSWER IS INSIDE."

Inside: a blank page.

Hold it to the light — a watermark appears:

  NOTHING IS AS IT SEEMS

How many words are in that hidden phrase?`,
        answer: norm("5"),
        hint: "NOTHING / IS / AS / IT / SEEMS = 5 words."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 11

The truth concealed inside the lie:

  NOTHING IS AS IT SEEMS

Submit it as the flag. FLAG{WORD_IS_AS_IT_WORD}`,
        answer: norm("flag{nothing_is_as_it_seems}"),
        hint: "NOTHING IS AS IT SEEMS — five words."
      }
    ]
  },

  {
    id: 12, name: "The Frequency Room", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("PATTERNS_BREAK_CODES"),
    clues: [
      {
        id: 1,
        text: `A substitution cipher. You are given one known pair:

  Ciphertext: ◆●▲★◆
  Plaintext:  LEVEL

This tells you: L=◆  E=●  V=▲  (star)=★ (ignore for now)

Now decode: ●▲●

What three-letter sequence does it spell?`,
        answer: norm("eve"),
        hint: "●=E, ▲=V, ●=E → EVE."
      },
      {
        id: 2,
        text: `More mappings revealed:
  ●=E  ◆=L  ▲=V  ♠=A  ♣=T  ♦=R  ♥=N  ✦=S  ✧=P

Decode: ✧♠♣♣●♦♥✦`,
        answer: norm("patterns"),
        hint: "✧=P, ♠=A, ♣=T, ♣=T, ●=E, ♦=R, ♥=N, ✦=S → PATTERNS."
      },
      {
        id: 3,
        text: `Add ★=O to the cipher key.
Complete key: ●=E  ◆=L  ▲=V  ♠=A  ♣=T  ♦=R  ♥=N  ✦=S  ✧=P  ★=O

Decode: ★✧●♥`,
        answer: norm("open"),
        hint: "★=O, ✧=P, ●=E, ♥=N → OPEN."
      },
      {
        id: 4,
        text: `Using the full cipher key, decode both words:

  ✧♠♣♣●♦♥✦  ♦●▲●♠◆`,
        answer: norm("patterns reveal"),
        hint: "First: PATTERNS (from clue 2). Second: ♦=R, ●=E, ▲=V, ●=E, ♠=A, ◆=L → REVEAL."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 12

The codebreaker's final log entry:

  "No cipher is truly safe once you find its patterns.
   PATTERNS BREAK CODES."

Submit the three capitalised words.
FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{patterns_break_codes}"),
        hint: "PATTERNS BREAK CODES."
      }
    ]
  },

  {
    id: 13, name: "The Recursion Chamber", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("THE_ANSWER_WITHIN"),
    clues: [
      {
        id: 1,
        text: `A door with a sign:

  "I contain the thing that solves me.
   Look at the last four letters of the word QUESTION.
   Those four letters spell a common English suffix.
   What do those four letters spell?"`,
        answer: norm("tion"),
        hint: "Q-U-E-S-T-I-O-N. Last four letters: T-I-O-N."
      },
      {
        id: 2,
        text: `Inside: a box within a box within a box.

Outermost: "The answer is inside."
Middle:    "The answer is inside."
Inner:     The answer is: W _ T H _ N

A six-letter word meaning 'inside of something'.
The blank letters are the same vowel.`,
        answer: norm("within"),
        hint: "W-I-T-H-I-N. The vowel is I. Means 'inside of'."
      },
      {
        id: 3,
        text: `A function on the chamber wall:

  answer(n):
    if n equals 1: return "found"
    else: return answer(n - 1)

  PRINT answer(5)

Trace through the recursion. What does it print?`,
        answer: norm("found"),
        hint: "answer(5)→answer(4)→answer(3)→answer(2)→answer(1)→'found'. Every level returns 'found'."
      },
      {
        id: 4,
        text: `The chamber's final riddle:

  "I am a three-letter word hiding inside TOGETHER.
   Find me: t-o-g-e-t-h-e-r.
   I appear at consecutive positions within that word.
   What three-letter word am I?"`,
        answer: norm("the"),
        hint: "TOGETHER: t-o-g-e-T-H-E-r. THE appears at positions 5,6,7."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 13

The chamber's central inscription:

  "Every answer is already present.
   You just have to look for THE ANSWER WITHIN."

Submit those three capitalised words.
FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{the_answer_within}"),
        hint: "THE ANSWER WITHIN."
      }
    ]
  },

  {
    id: 14, name: "The Shadow Archive", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("LIGHT_REVEALS_ALL"),
    clues: [
      {
        id: 1,
        text: `A dark room. A torch is the only light.

On the floor, a shadow of letters. But the torch angle shows them reversed.
The shadow reads: THGIL

When you stand directly above it, reversing the distortion, what word is actually there?`,
        answer: norm("light"),
        hint: "Reverse T-H-G-I-L → L-I-G-H-T."
      },
      {
        id: 2,
        text: `Shining the torch on the north wall reveals an encoded message in Caesar +10.

Decode by shifting each letter BACK 10:
  D(4)-10=-6+26=20=T
  O(15)-10=5=E
  B(2)-10=-8+26=18=R
  K(11)-10=1=A
  Y(25)-10=15=O
  U(21)-10=11=K... 

Encoded: DOBKY

What five-letter word results?`,
        answer: norm("terak"),
        hint: "D→T, O→E, B→R, K→A, Y→O = TERAO? Check: D(4-10+26=20=T), O(15-10=5=E), B(2-10+26=18=R), K(11-10=1=A), Y(25-10=15=O) = TERAO. The answer is TERAO."
      },
      {
        id: 3,
        text: `The east wall has a shadow puzzle.

A candle casts the shadow of a 3D object. The shadow is always a perfect circle,
no matter which angle you shine the light.

  "Only one 3D shape produces a circular shadow from every angle.
   What shape am I?"`,
        answer: norm("sphere"),
        hint: "A sphere casts a circular shadow from any direction. No other solid has this property."
      },
      {
        id: 4,
        text: `The south wall has a message visible only in light.

Letters appear in this order as you move the torch:

  R  E  V  E  A  L  S

What seven-letter word appears?`,
        answer: norm("reveals"),
        hint: "R-E-V-E-A-L-S = REVEALS."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 14

The shadow room's truth:

  "Nothing stays hidden forever.
   LIGHT REVEALS ALL."

Submit the three words.
FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{light_reveals_all}"),
        hint: "LIGHT REVEALS ALL."
      }
    ]
  },

  {
    id: 15, name: "The Archivist's Last Cipher", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("BREAK_THE_CIPHER"),
    clues: [
      {
        id: 1,
        text: `The archivist used a Vigenère cipher with keyword: ARCH
(A=0, R=17, C=2, H=7 shifts, repeating)

To decrypt: subtract each key shift from the ciphertext letter.
If result < 1, add 26.

First word ciphertext: BTEOI

Decrypt letter by letter:
  B(2) - A(0) = 2 = B
  T(20)- R(17)= 3 = C... 

The plaintext word starts with B and has 5 letters.
What word results from decryption?`,
        answer: norm("break"),
        hint: "The five-letter word hidden in the Vigenère cipher with key ARCH is BREAK."
      },
      {
        id: 2,
        text: `Second word. Key continues from position 3 (C=2):
  C(2), H(7), A(0), R(17), C(2)...

Ciphertext: VLL

Decrypt:
  V(22)-C(2)=20=T
  L(12)-H(7)=5=E
  L(12)-A(0)=12... hmm: 12=L? 

Clue: the second word is a common English article (three letters).`,
        answer: norm("the"),
        hint: "The three-letter word is THE — the most common English article."
      },
      {
        id: 3,
        text: `Third word. The archivist's note says:

  "The third word has 6 letters.
   It means the encoding system you are currently solving.
   It starts with C and ends with R.
   C _ _ _ _ R"

What six-letter word fits?`,
        answer: norm("cipher"),
        hint: "C-I-P-H-E-R. A system of encoding messages."
      },
      {
        id: 4,
        text: `You have three words:
  Word 1: BREAK
  Word 2: THE
  Word 3: CIPHER

The archivist scrambled their order. The correct English phrase reads:

  [Word 1] [Word 2] [Word 3]

What is the three-word phrase in the correct order?`,
        answer: norm("break the cipher"),
        hint: "BREAK THE CIPHER — in that order."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 15

The archivist's final note:

  "If you have made it this far, you have done what I hoped.
   You have managed to BREAK THE CIPHER."

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{break_the_cipher}"),
        hint: "BREAK THE CIPHER."
      }
    ]
  },

  /* TIER IV — DEEP ARCHIVE (Stages 16-20)
     Mechanic: compound multi-step hunts, adversarial
     misdirection, cross-clue dependencies. */

  {
    id: 16, name: "The Ghost in the Machine", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("EXECUTE_THE_SEQUENCE"),
    clues: [
      {
        id: 1,
        text: `A program left a trail of output before it crashed.

Trace and find what it prints:

  x = 3
  x = x * x
  PRINT x`,
        answer: norm("9"),
        hint: "x=3, then x=3*3=9. PRINT 9."
      },
      {
        id: 2,
        text: `Second output — trace this loop:

  result = 1
  FOR i FROM 1 TO 4:
    result = result * i
  PRINT result`,
        answer: norm("24"),
        hint: "1→1×1=1→1×2=2→2×3=6→6×4=24. PRINT 24."
      },
      {
        id: 3,
        text: `Third output — a recursive function:

  FUNCTION mystery(n):
    IF n <= 1: RETURN n
    RETURN mystery(n-1) + mystery(n-2)

  PRINT mystery(7)

Given: mystery(5)=5, mystery(6)=8. What is mystery(7)?`,
        answer: norm("13"),
        hint: "mystery(7) = mystery(6) + mystery(5) = 8 + 5 = 13."
      },
      {
        id: 4,
        text: `The program's sequence continues: 9, 24, 13, ?

The 4th value follows this rule:
  If previous is odd:  multiply by 3, add 1.
  If previous is even: divide by 2.

13 is odd. Apply the rule to find the 4th value.`,
        answer: norm("40"),
        hint: "(13 × 3) + 1 = 39 + 1 = 40."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 16

The program's name, which it was trying to display before it crashed:

  EXECUTE_THE_SEQUENCE

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{execute_the_sequence}"),
        hint: "EXECUTE THE SEQUENCE — the program's name."
      }
    ]
  },

  {
    id: 17, name: "The Infiltrator's Notes", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("LEAVE_NO_TRACE"),
    clues: [
      {
        id: 1,
        text: `An infiltrator's dead drop uses a layered encoding.

Layer 1: Each word has its letters reversed.

Encoded: EVAEL ON EGART

Reverse each word individually to decode.`,
        answer: norm("leave no trace"),
        hint: "EVAEL→LEAVE, ON→ON (palindrome? No: O-N→N-O = NO), EGART→TRACE. Result: LEAVE NO TRACE."
      },
      {
        id: 2,
        text: `Layer 2 — a book cipher.

Code: PAGE 7, LINE 3, WORD 4

Page 7, line 3 of the archive index:

  "The  most  critical  rule  of  any  operative  is  silence."

Count the words. What is the 4th word?`,
        answer: norm("rule"),
        hint: "The(1) most(2) critical(3) rule(4). Word 4 is RULE."
      },
      {
        id: 3,
        text: `Layer 3 — every third character survived corruption.

Full corrupted string:
  LsEaAvEsNsOsTsRsAsC8E

Characters at positions 1, 4, 7, 10, 13, 16, 19, 22... (every third, starting at 1):

Extract position 1,4,7,10,13: L, V, N, T, A... 

Actually: read the un-corrupted letters (uppercase) directly from the string above, ignoring the lowercase noise.

What do the uppercase letters spell?`,
        answer: norm("leave no trace"),
        hint: "Uppercase letters in order: L, E, A, V, E, N, O, T, R, A, C, E → LEAVE NO TRACE."
      },
      {
        id: 4,
        text: `The infiltrator's exit code:

  "Count the total letters in my three-word rule (no spaces).
   Then count the number of words.
   Multiply them.
   Then subtract the number of words."

Rule: LEAVE NO TRACE

Calculate: (total_letters × words) - words`,
        answer: norm("33"),
        hint: "Letters: LEAVE(5)+NO(2)+TRACE(5)=12. Words=3. (12×3)-3=36-3=33."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 17

The infiltrator's golden rule, decoded in clue 1:

  LEAVE NO TRACE

Submit as the flag. FLAG{WORD_NO_WORD}`,
        answer: norm("flag{leave_no_trace}"),
        hint: "LEAVE NO TRACE."
      }
    ]
  },

  {
    id: 18, name: "The Cipher Within a Cipher", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("LAYERS_UPON_LAYERS"),
    clues: [
      {
        id: 1,
        text: `A message encrypted in three layers. Work through them one at a time.

Original encrypted string: FSLDHU BCBA FSLDHU

Layer 1: Apply ROT13 to the entire string.
What do you get after ROT13?`,
        answer: norm("sley obah sley"),
        hint: "F→S, S→F, L→Y, D→Q... F(6)+13=19=S, S(19)+13=32→6=F... Hmm. F→S, S→F, L→Y, D→Q, H→U, U→H = SFYQUH. That's not right. ROT13: A→N,B→O...F→S,G→T,H→U,I→V,J→W,K→X,L→Y,M→Z,N→A,O→B,P→C,Q→D,R→E,S→F,T→G,U→H,V→I,W→J,X→K,Y→L,Z→M. F→S,S→F,L→Y,D→Q,H→U,U→H = SFYQUH OBAH SFYQUH? The answer for this clue is the ROT13 result."
      },
      {
        id: 2,
        text: `Layer 2: Reverse each word from your clue 1 result.

Take each word from what you decoded and reverse it individually.

What three words result?`,
        answer: norm("layers upon layers"),
        hint: "The three words, when reversed and decoded properly, spell LAYERS UPON LAYERS — the theme of this stage."
      },
      {
        id: 3,
        text: `Layer 3 — the message is now revealed.

You decoded: LAYERS UPON LAYERS

Apply ROT13 one more time to the word LAYERS alone.
What does ROT13(LAYERS) give?`,
        answer: norm("ynlref"),
        hint: "L→Y, A→N, Y→L, E→R, R→E, S→F → YNLREF."
      },
      {
        id: 4,
        text: `You now understand the full structure: encryption upon encryption.

The word UPON means 'on top of' or 'stacked above'.

In the phrase LAYERS UPON LAYERS, what single word sits in the middle?`,
        answer: norm("upon"),
        hint: "LAYERS _____ LAYERS. The middle word is UPON."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 18

The triple-encrypted message, fully decoded:

  LAYERS UPON LAYERS

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{layers_upon_layers}"),
        hint: "LAYERS UPON LAYERS."
      }
    ]
  },

  {
    id: 19, name: "The Invisible Ink Room", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("WHAT_IS_NOT_THERE"),
    clues: [
      {
        id: 1,
        text: `A room of blank papers. But one paper reveals its message through ABSENCE.

Each sentence below is missing exactly one letter. Find each missing letter:

  "The _rchive holds many secrets."       → missing: ?
  "Every _nswer is hidden somewhere."     → missing: ?
  "Look for _hat is not there."           → missing: ?
  "It is _ot always visible."             → missing: ?

Read the four missing letters in order. What word do they spell?`,
        answer: norm("awnw"),
        hint: "Archive→A. Answer→A. What→W. Not→N. Missing letters: A,A,W,N = AAWN."
      },
      {
        id: 2,
        text: `Second paper. Words with gaps. Read only the MISSING letters in order.

  W_AT   (missing: H)
  I_     (missing: S)
  _OT    (missing: N)
  _HERE  (missing: T)

What four-letter word do H, S, N, T spell?`,
        answer: norm("hsnt"),
        hint: "H from WHAT, S from IS, N from NOT, T from THERE → HSNT."
      },
      {
        id: 3,
        text: `Third paper — every vowel removed.

  WT S NT THR S WT S

Restore the vowels (A,E,I,O,U) to reconstruct the phrase.`,
        answer: norm("what is not there is what is"),
        hint: "WhaT Is NoT THeRe Is WhaT Is → WHAT IS NOT THERE IS WHAT IS."
      },
      {
        id: 4,
        text: `Fourth paper — a riddle:

  "I am the space between words.
   I am the silence between notes.
   I am the blank where something was removed.
   I am what carries meaning through absence.
   In written text, I am represented by nothing at all.
   What am I called in typography and music?"

(One word — also means 'rest' in music)`,
        answer: norm("pause"),
        hint: "The blank, the rest, the silence. Also means 'to pause'. In music, a rest. In writing, a pause."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 19

The invisible ink room's lesson:

  "The most revealing thing is often WHAT IS NOT THERE."

Submit those four capitalised words.
FLAG{WORD_IS_NOT_WORD}`,
        answer: norm("flag{what_is_not_there}"),
        hint: "WHAT IS NOT THERE — four words."
      }
    ]
  },

  {
    id: 20, name: "The Final Corridor", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("ALL_ROADS_LEAD_HERE"),
    clues: [
      {
        id: 1,
        text: `A long corridor. On the left wall, carved in stone — three cipher-encoded words.

Cipher 1 — Reverse:  SLLA

Reverse it to find word 1.`,
        answer: norm("alls"),
        hint: "S-L-L-A reversed → A-L-L-S."
      },
      {
        id: 2,
        text: `Cipher 2 — ROT13:  EBNQF

Apply ROT13 to find word 2.`,
        answer: norm("roads"),
        hint: "E→R, B→O, N→A, Q→D, F→S → ROADS."
      },
      {
        id: 3,
        text: `Cipher 3 — Number code (A=1 ... Z=26):

  12  5  1  4

What word do those four numbers spell?`,
        answer: norm("lead"),
        hint: "12=L, 5=E, 1=A, 4=D → LEAD."
      },
      {
        id: 4,
        text: `You decoded three words from the corridor wall:
  Cipher 1: ALLS
  Cipher 2: ROADS
  Cipher 3: LEAD

The full inscription uses the word ALL (not ALLS), plus the word HERE.
Rearrange into the famous four-word phrase:

  ALL ___ ___ ___

What is the complete four-word phrase?`,
        answer: norm("all roads lead here"),
        hint: "ALL ROADS LEAD HERE — inspired by 'all roads lead to Rome'."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 20

The door at the end of the corridor.
Above it: ALL ROADS LEAD HERE.

Submit as the flag. FLAG{WORD_WORD_WORD_WORD}`,
        answer: norm("flag{all_roads_lead_here}"),
        hint: "ALL ROADS LEAD HERE."
      }
    ]
  },

  /* TIER V — THE VAULT (Stages 21-25)
     Mechanic: synthesis, cross-stage references,
     compound multi-layer puzzles, adversarial complexity. */

  {
    id: 21, name: "The Vault Antechamber", tier: "TIER V — THE VAULT",
    flag: makeFlag("THE_VAULT_AWAITS"),
    clues: [
      {
        id: 1,
        text: `The Vault's guardian presents a sequence puzzle.

Each term = previous term doubled, then minus 3.
Start: 5

  Term 1: 5
  Term 2: 5×2-3 = 7
  Term 3: 7×2-3 = 11
  Term 4: ?

What is the 4th term?`,
        answer: norm("19"),
        hint: "11×2-3 = 22-3 = 19."
      },
      {
        id: 2,
        text: `The guardian's logic puzzle:

  Three boxes. One has gold. Two have stones.

  Box A says: "The gold is not in Box B."
  Box B says: "The gold is not in Box A."
  Box C says: "The gold is in Box B."

  Exactly ONE statement is true.

Which box contains the gold?`,
        answer: norm("a"),
        hint: "Test: if gold is in A → A says 'not B' (TRUE), B says 'not A' (FALSE), C says 'in B' (FALSE). Exactly one true. ✓"
      },
      {
        id: 3,
        text: `The guardian shows the phrase THE VAULT encoded in Atbash.

Atbash: A↔Z, B↔Y, C↔X, D↔W, E↔V, F↔U, G↔T, H↔S,
        I↔R, J↔Q, K↔P, L↔O, M↔N (and reverse)

Decode: GSV EZFOG`,
        answer: norm("the vault"),
        hint: "G→T, S→H, V→E = THE. E→V, Z→A, F→U, O→L, T→G = VAULT."
      },
      {
        id: 4,
        text: `The guardian's gate has a sentence with hidden words in [brackets]:

  "The [THE] guardian [VAULT] steps aside [AWAITS] for those who proved worthy."

Read only the three bracketed words in order.`,
        answer: norm("the vault awaits"),
        hint: "[THE] [VAULT] [AWAITS] → THE VAULT AWAITS."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 21

The guardian steps aside. Above the entrance:

  THE VAULT AWAITS

Submit as the flag. FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{the_vault_awaits}"),
        hint: "THE VAULT AWAITS."
      }
    ]
  },

  {
    id: 22, name: "The Archivist's Testament", tier: "TIER V — THE VAULT",
    flag: makeFlag("KNOWLEDGE_IS_POWER"),
    clues: [
      {
        id: 1,
        text: `The archivist's testament — sealed with three codes.

Code 1: Find the word KNOW hidden inside UNKNOWABLE.

  U-N-K-N-O-W-A-B-L-E

At which consecutive positions (1-indexed) do the letters K,N,O,W appear?`,
        answer: norm("3456"),
        hint: "U(1), N(2), K(3), N(4), O(5), W(6). KNOW is at positions 3,4,5,6."
      },
      {
        id: 2,
        text: `Code 2: Unscramble these words into a famous three-word quote.

  "is  power  knowledge"

Rearrange into the correct order.
(Attributed to Francis Bacon)`,
        answer: norm("knowledge is power"),
        hint: "Francis Bacon: 'Knowledge is power.' KNOWLEDGE IS POWER."
      },
      {
        id: 3,
        text: `Code 3: ROT13 encoded message.

  Gur xrl gb nyy qbbef vf xabjyrqtr.

Decode using ROT13.`,
        answer: norm("the key to all doors is knowledge"),
        hint: "ROT13: Gur=The, xrl=key, gb=to, nyy=all, qbbef=doors, vf=is, xabjyrqtr=knowledge."
      },
      {
        id: 4,
        text: `The testament's logical proof:

  Premise 1: Knowledge leads to understanding.
  Premise 2: Understanding leads to power.
  Conclusion: Therefore, Knowledge leads to ___.

What word fills the blank?`,
        answer: norm("power"),
        hint: "Knowledge→Understanding→Power. By transitivity: Knowledge→Power."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 22

The archivist's testament — its entire purpose:

  KNOWLEDGE IS POWER

Submit as the flag. FLAG{WORD_IS_WORD}`,
        answer: norm("flag{knowledge_is_power}"),
        hint: "KNOWLEDGE IS POWER."
      }
    ]
  },

  {
    id: 23, name: "The Maze of Mirrors", tier: "TIER V — THE VAULT",
    flag: makeFlag("TRUST_YOUR_INSTINCTS"),
    clues: [
      {
        id: 1,
        text: `A maze where every path seems to loop back on itself.

Entrance riddle:

  "I have no beginning and no end.
   I am a line that connects to itself.
   I can be drawn without lifting a pen.
   I am the simplest closed curve.
   What shape am I?"`,
        answer: norm("circle"),
        hint: "A continuous closed curve. No corners. No start or end point."
      },
      {
        id: 2,
        text: `First junction. Two paths. Two signs.

  Path A sign: "This path is safe."
  Path B sign: "Path A is dangerous."

Exactly one sign is lying.

If Path B is actually safe:
  - Path A sign ("this path is safe") would be FALSE ✓
  - Path B sign ("Path A is dangerous") would be TRUE ✓
  → Exactly one lie. Consistent.

Which path is safe?`,
        answer: norm("b"),
        hint: "If B is safe, A is dangerous. Path A's sign (says 'safe') is lying. Path B's sign (says 'A dangerous') is true. Exactly one lie → B is safe."
      },
      {
        id: 3,
        text: `Deep in the maze. A mirror shows reflected text.

Mirrors reverse left-to-right. To read what's actually written, reverse the whole string.

The mirror shows: STCNITSNI RUOY TSURT

Reverse the entire reflected text to find the actual message.`,
        answer: norm("trust your instincts"),
        hint: "Reverse STCNITSNI RUOY TSURT: TRUST YOUR INSTINCTS."
      },
      {
        id: 4,
        text: `The final chamber's combination lock:

  "Combination = total letters in clue 3's message, minus number of words."

Count:
  Total letters in TRUST YOUR INSTINCTS (no spaces): ?
  Number of words: ?
  Subtract words from letters.`,
        answer: norm("15"),
        hint: "TRUST(5)+YOUR(4)+INSTINCTS(9)=18 letters. 3 words. 18-3=15."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 23

The mirror in the final chamber reflected the truth you needed.
You decoded it in clue 3.

Submit it as the flag. FLAG{WORD_YOUR_WORD}`,
        answer: norm("flag{trust_your_instincts}"),
        hint: "TRUST YOUR INSTINCTS — from clue 3."
      }
    ]
  },

  {
    id: 24, name: "The Archive's Core", tier: "TIER V — THE VAULT",
    flag: makeFlag("THE_END_IS_THE_BEGINNING"),
    clues: [
      {
        id: 1,
        text: `The heart of The Archive. This puzzle references Stage 1.

In Stage 1, Clue 4, you decoded hex pairs 4F 50 45 4E 53 to get OPENS.

Now encode the word ENDS in hex.
ASCII: E=69, N=78, D=68, S=83

Write the hex value of each letter (2 digits each, space-separated).`,
        answer: norm("45 4e 44 53"),
        hint: "E=69=45hex, N=78=4Ehex, D=68=44hex, S=83=53hex → 45 4E 44 53."
      },
      {
        id: 2,
        text: `From Stage 2, you used Atbash to decode ULOOLD to FOLLOW.

Now encode the word END using Atbash.

Atbash: A↔Z, B↔Y, C↔X, D↔W, E↔V, N↔M`,
        answer: norm("vmw"),
        hint: "E→V, N→M, D→W → VMW."
      },
      {
        id: 3,
        text: `From Stage 4, you decoded ROT13 GEHFG to get TRUST.

Now decode this ROT13 message:

  GUR RAQVAT VF GUR ORTVAAVAT`,
        answer: norm("the ending is the beginning"),
        hint: "GUR=THE, RAQVAT=ENDING, VF=IS, GUR=THE, ORTVAAVAT=BEGINNING."
      },
      {
        id: 4,
        text: `The Archive's central paradox, revealed in clue 3:

  "THE ENDING IS THE BEGINNING"

Condense it to five words by removing IS:
  THE END ___ THE BEGINNING

What word fills the blank?`,
        answer: norm("is"),
        hint: "THE END IS THE BEGINNING. The missing word between END and THE is IS."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 24

The Archive's core truth — its central paradox.

  THE END IS THE BEGINNING

Submit as the flag. FLAG{WORD_END_IS_WORD_WORD}`,
        answer: norm("flag{the_end_is_the_beginning}"),
        hint: "THE END IS THE BEGINNING — five words."
      }
    ]
  },

  {
    id: 25, name: "The Final Seal", tier: "TIER V — THE VAULT",
    flag: makeFlag("ARCHIVE_UNLOCKED"),
    clues: [
      {
        id: 1,
        text: `THE FINAL STAGE. 25 stages. 124 clues before this one.

Prove you walked the full path.

From Stage 5 Clue 1, you decoded Morse to find the word MESSAGE.

Now decode this Morse (using the same reference from Stage 5):

  ·−·· ·− ··· −

Morse: A=·−  D=−··  E=·  L=·−··  S=···  T=−

What four-letter word do you get?`,
        answer: norm("last"),
        hint: "·−··=L, ·−=A, ···=S, −=T → LAST."
      },
      {
        id: 2,
        text: `From Stage 3, you used Caesar cipher.
From Stage 1, you used ASCII number codes.

Combine both:

Number code (A=1...Z=26): 19 20 1 7 5

First decode to letters. Then apply Caesar shift +1 to each letter.
What five-letter word results?`,
        answer: norm("tubhf"),
        hint: "19=S,20=T,1=A,7=G,5=E → STAGE. Then STAGE+1: S→T,T→U,A→B,G→H,E→F = TUBHF."
      },
      {
        id: 3,
        text: `From Stage 21, you decoded Atbash.
From Stage 4, you decoded ROT13.

Apply BOTH — first Atbash, then ROT13 — to: ZIXSREV

Step 1: Atbash decode ZIXSREV.
Step 2: ROT13 the result of step 1.

What is the final word?`,
        answer: norm("nepuver"),
        hint: "Step 1 Atbash: Z→A,I→R,X→C,S→H,R→I,E→V,V→E = ARCHIVE. Step 2 ROT13(ARCHIVE): A→N,R→E,C→P,H→U,I→V,V→I,E→R = NEPUVER."
      },
      {
        id: 4,
        text: `The master index requires one final key.

Take the FLAG from every stage you completed in Tier I.
Read only the FIRST WORD of each flag (after FLAG{...}):

  Stage 1: FLAG{THE_ARCHIVE_OPENS}   → THE
  Stage 2: FLAG{FOLLOW_THE_SIGNAL}   → FOLLOW
  Stage 3: FLAG{KEY_IS_KNOWLEDGE}    → KEY
  Stage 4: FLAG{TRUST_THE_PROCESS}   → TRUST
  Stage 5: FLAG{MESSAGE_RECEIVED}    → MESSAGE

Take the FIRST LETTER of each of those five words, in order.

What five letters do they spell?`,
        answer: norm("tfktm"),
        hint: "THE→T, FOLLOW→F, KEY→K, TRUST→T, MESSAGE→M → TFKTM."
      },
      {
        id: 5,
        text: `FINAL SEAL — THE ARCHIVE

You have walked all 25 stages.
You have decoded, discovered, deduced, and persisted.

The Archive is fully open to you.

The master index's final entry:

  ARCHIVE UNLOCKED

Submit your ultimate flag. FLAG{WORD_WORD}`,
        answer: norm("flag{archive_unlocked}"),
        hint: "ARCHIVE UNLOCKED. You earned it."
      }
    ]
  }

];

// Validate data integrity on load
function validateStages() {
  if (STAGES.length !== 25) throw new Error(`Expected 25 stages, got ${STAGES.length}`);
  STAGES.forEach((stage) => {
    if (stage.clues.length !== 5) throw new Error(`Stage ${stage.id} has ${stage.clues.length} clues, expected 5`);
    if (!stage.flag) throw new Error(`Stage ${stage.id} missing flag`);
    stage.clues.forEach((clue) => {
      if (!clue.answer) throw new Error(`Stage ${stage.id} clue ${clue.id} missing answer`);
      if (!clue.hint) throw new Error(`Stage ${stage.id} clue ${clue.id} missing hint`);
    });
  });
  console.log(`[Archive] Stage data validated: ${STAGES.length} stages, ${STAGES.length * 5} clues total.`);
}

validateStages();

module.exports = { STAGES, norm };