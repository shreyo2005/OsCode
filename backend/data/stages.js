/**
 * THE ARCHIVE — Stage Data
 * SECURITY: This file NEVER reaches the client. Answers, flags, and hints are server-only.
 * Frontend only receives: clue text (no answer), stage name, stage number, clue number.
 */

'use strict';

const crypto = require('crypto');

// Utility: normalize answers for comparison
function norm(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ');
}

// Utility: hash a flag for display (full flag shown only after correct answer)
function makeFlag(word) {
  return `FLAG{${word.toUpperCase()}}`;
}

const STAGES = [

  /* ═══════════════════════════════════════════
     TIER I — INITIATION  (Stages 1–5)
     Beginner-friendly. Logic, patterns, basic encoding.
     ═══════════════════════════════════════════ */
  {
    id: 1,
    name: "First Entry",
    tier: "TIER I — INITIATION",
    flag: makeFlag("OPEN_SESAME"),
    clues: [
      {
        id: 1,
        text: "Welcome, Archivist.\n\nThe Archive awakens only for those who know its first word.\n\nWhat is the opposite of CLOSED?\n\n(one word)",
        answer: norm("open"),
        hint: "You do this to a door or a book before you begin."
      },
      {
        id: 2,
        text: "Good. The Archive recognises you.\n\nNow prove you understand reversal.\n\nWrite the word OPEN backwards — letter by letter.",
        answer: norm("nepo"),
        hint: "Take each letter of OPEN and flip the order."
      },
      {
        id: 3,
        text: "Interesting. You understand mirrors.\n\nNow count:\n\nHow many letters does the word ARCHIVE contain?\n\n(submit the number)",
        answer: norm("7"),
        hint: "A-R-C-H-I-V-E. Count carefully."
      },
      {
        id: 4,
        text: "The Archive hides a phrase in plain sight.\n\nDecode this by taking the FIRST letter of each word:\n\n\"Owls Prefer Eating Nocturnally, Silence Ensures Safety, And Moonlight Enables\"\n\n(submit the resulting word)",
        answer: norm("opensesame"),
        hint: "Extract the first letter of every word and join them."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 1\n\nThe ancient phrase that opens all locked doors in folklore and literature:\n\nThe word 'open' combined with a famous Arabic phrase meaning 'sesame' — what is the full expression?\n\n(no spaces, all lowercase)\n\nSubmit as FLAG{PHRASE}",
        answer: norm("flag{open_sesame}"),
        hint: "Ali Baba's famous words. Combine OPEN and SESAME with an underscore."
      }
    ]
  },

  {
    id: 2,
    name: "The Cipher Room",
    tier: "TIER I — INITIATION",
    flag: makeFlag("CAESAR"),
    clues: [
      {
        id: 1,
        text: "A Caesar cipher shifts every letter forward by a fixed number.\n\nShift = 3:\n  A → D\n  B → E\n  C → F\n\nDecode: KHOOR\n\n(what English word does this produce?)",
        answer: norm("hello"),
        hint: "Shift each letter BACK by 3. K becomes H, H becomes E…"
      },
      {
        id: 2,
        text: "Same shift of 3. Decode:\n\nZRUOG",
        answer: norm("world"),
        hint: "Z − 3 = W, R − 3 = O, U − 3 = R, O − 3 = L, G − 3 = D"
      },
      {
        id: 3,
        text: "Now work the other direction — ENCODE with shift 13 (ROT13):\n\nEncode the word: SECRET\n\n(ROT13: A=N, B=O, C=P… M=Z, N=A, O=B…)",
        answer: norm("frperg"),
        hint: "S+13=F, E+13=R, C+13=P, R+13=E, E+13=R, T+13=G"
      },
      {
        id: 4,
        text: "ROT13 applied TWICE to any message returns the original.\n\nThis Morse sequence decodes to a Roman emperor's name associated with this cipher:\n\n−·−· ·− · ··· ·− ·−·\n\n(Morse: A=·− B=−··· C=−·−· D=−·· E=· R=·−· S=··· )\n\nWhat Roman emperor's name do you get?",
        answer: norm("caesar"),
        hint: "C=−·−·, A=·−, E=·, S=···, A=·−, R=·−·"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 2\n\nThe cipher you've been using all stage is named after a famous Roman.\n\nSubmit his name as the flag.\n\nFLAG{NAME}",
        answer: norm("flag{caesar}"),
        hint: "Julius ___. The man behind the cipher."
      }
    ]
  },

  {
    id: 3,
    name: "Binary Depths",
    tier: "TIER I — INITIATION",
    flag: makeFlag("FORTYTWO"),
    clues: [
      {
        id: 1,
        text: "Binary uses only 0 and 1.\n\nConvert this binary number to decimal:\n\n00001010\n\n(each position from right: 1, 2, 4, 8, 16, 32, 64, 128)",
        answer: norm("10"),
        hint: "Only positions with value 2 and 8 are set: 2 + 8 = 10"
      },
      {
        id: 2,
        text: "Convert decimal 42 to binary.\n\n42 = 32 + 8 + 2\n\n(express as 8-bit binary)",
        answer: norm("00101010"),
        hint: "Position 32=1, 16=0, 8=1, 4=0, 2=1, 1=0 → 00101010"
      },
      {
        id: 3,
        text: "Each group of 8 bits = 1 byte = 1 ASCII character.\n\nDecode this binary to a single ASCII letter:\n\n01000001\n\n(ASCII: A=65, B=66, ... Z=90)",
        answer: norm("a"),
        hint: "01000001 = 64 + 1 = 65 = ASCII 'A'"
      },
      {
        id: 4,
        text: "Decode these 5 bytes to an English word:\n\n01001000 01000101 01001100 01001100 01001111\n\n(decimal values: 72, 69, 76, 76, 79)",
        answer: norm("hello"),
        hint: "H=72, E=69, L=76, L=76, O=79"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 3\n\nThe answer to life, the universe, and everything — according to The Hitchhiker's Guide to the Galaxy — in decimal:\n\n42\n\nSpell it out as a word.\n\nFLAG{WORD}",
        answer: norm("flag{fortytwo}"),
        hint: "The number 42, written as a word with no space."
      }
    ]
  },

  {
    id: 4,
    name: "The Hex Vault",
    tier: "TIER I — INITIATION",
    flag: makeFlag("DEADBEEF"),
    clues: [
      {
        id: 1,
        text: "Hexadecimal (base 16) uses 0–9 and A–F.\n\nA=10, B=11, C=12, D=13, E=14, F=15\n\nWhat is the decimal value of hex FF?",
        answer: norm("255"),
        hint: "F=15. FF = 15×16 + 15×1 = 240 + 15 = 255"
      },
      {
        id: 2,
        text: "Convert decimal 173 to hexadecimal.\n\n173 = 10×16 + 13×1\n\n(A=10, D=13)",
        answer: norm("ad"),
        hint: "10 in hex is A. 13 in hex is D. So 173 = AD"
      },
      {
        id: 3,
        text: "This hex string decodes to an ASCII word:\n\n41 52 43 48 49 56 45\n\n(hex to decimal first, then to ASCII)\n\nA=65, R=82, C=67, H=72, I=73, V=86, E=69",
        answer: norm("archive"),
        hint: "0x41=65=A, 0x52=82=R, 0x43=67=C, 0x48=72=H, 0x49=73=I, 0x56=86=V, 0x45=69=E"
      },
      {
        id: 4,
        text: "In computing, certain hex patterns appear so often they have nicknames.\n\n0xDEAD = used to mark uninitialized memory\n0xBEEF = used in debugging\n\nCombined: 0xDEADBEEF\n\nHow many hexadecimal digits does 0xDEADBEEF contain?\n(ignore the 0x prefix)",
        answer: norm("8"),
        hint: "D-E-A-D-B-E-E-F. Count the letters."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 4\n\nThe famous magic debugging constant: 0xDEADBEEF\n\nSubmit only the hex digits (no 0x prefix, uppercase).\n\nFLAG{HEXDIGITS}",
        answer: norm("flag{deadbeef}"),
        hint: "Just the 8 hex characters after 0x: DEADBEEF"
      }
    ]
  },

  {
    id: 5,
    name: "Pattern Recognition",
    tier: "TIER I — INITIATION",
    flag: makeFlag("FIBONACCI"),
    clues: [
      {
        id: 1,
        text: "Complete the sequence:\n\n2, 4, 8, 16, 32, ___\n\n(each term is multiplied by 2)",
        answer: norm("64"),
        hint: "32 × 2 = 64"
      },
      {
        id: 2,
        text: "Complete the Fibonacci sequence:\n\n0, 1, 1, 2, 3, 5, 8, 13, 21, ___\n\n(each term = sum of the two before it)",
        answer: norm("34"),
        hint: "13 + 21 = 34"
      },
      {
        id: 3,
        text: "In the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...\n\nWhich term position (1-indexed) is the number 55?",
        answer: norm("11"),
        hint: "Count from the beginning: 0(1), 1(2), 1(3), 2(4), 3(5), 5(6), 8(7), 13(8), 21(9), 34(10), 55(11)"
      },
      {
        id: 4,
        text: "The golden ratio φ ≈ 1.618 is related to Fibonacci.\n\nAs Fibonacci numbers get larger, the ratio of consecutive terms approaches φ.\n\n55 / 34 ≈ ?\n\n(round to 3 decimal places)",
        answer: norm("1.618"),
        hint: "55 ÷ 34 = 1.61764... ≈ 1.618"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 5\n\nThe sequence you've been exploring all stage — each number is the sum of the two preceding ones.\n\nWhat is this sequence called?\n\nFLAG{NAME}",
        answer: norm("flag{fibonacci}"),
        hint: "Named after the 13th-century Italian mathematician Leonardo ___."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER II — THE STACKS  (Stages 6–10)
     Moderate: encoding, networking basics, logic, hashing.
     ═══════════════════════════════════════════ */
  {
    id: 6,
    name: "Network Nodes",
    tier: "TIER II — THE STACKS",
    flag: makeFlag("LOCALHOST"),
    clues: [
      {
        id: 1,
        text: "IP addresses identify devices on a network.\n\nWhat does 'IP' stand for in full?\n\n(two words)",
        answer: norm("internet protocol"),
        hint: "I_ P_______. The foundation of internet addressing."
      },
      {
        id: 2,
        text: "The loopback address — used to refer to your own machine — is:\n\n127.___.___.___\n\n(complete the address — all remaining octets are the same digit)",
        answer: norm("127.0.0.1"),
        hint: "The loopback address is 127 followed by three zeros, dot-separated."
      },
      {
        id: 3,
        text: "Port numbers identify specific services on a host.\n\nMatch the port:\n\nHTTP uses port ___\n\n(the most common web port)",
        answer: norm("80"),
        hint: "The standard, unencrypted web port. Every web developer knows this."
      },
      {
        id: 4,
        text: "A DNS lookup converts a domain name to an IP address.\n\nWhat does DNS stand for?\n\n(three words)",
        answer: norm("domain name system"),
        hint: "D_____ N___ S_____. The internet's phone book."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 6\n\nThe hostname that always resolves to your own machine — the loopback hostname.\n\nIt means 'this machine' and is used in every developer's environment.\n\nFLAG{HOSTNAME}",
        answer: norm("flag{localhost}"),
        hint: "localhost. The name every server developer knows by heart."
      }
    ]
  },

  {
    id: 7,
    name: "Hash Corridors",
    tier: "TIER II — THE STACKS",
    flag: makeFlag("MD5_BROKEN"),
    clues: [
      {
        id: 1,
        text: "A hash function converts input of any size into a fixed-size output.\n\nMD5 always produces a hash of how many bits?\n\n(it's also 32 hexadecimal characters)",
        answer: norm("128"),
        hint: "32 hex chars × 4 bits per hex char = 128 bits"
      },
      {
        id: 2,
        text: "The MD5 hash of the empty string is:\n\nd41d8cd98f00b204e9800998ecf8427e\n\nHow many hexadecimal characters long is this hash?",
        answer: norm("32"),
        hint: "Count the characters: d-4-1-d-8-c-d-9-8-f-0-0-b-2-0-4-e-9-8-0-0-9-9-8-e-c-f-8-4-2-7-e"
      },
      {
        id: 3,
        text: "MD5 is considered cryptographically broken because it is vulnerable to what type of attack?\n\nTwo different inputs that produce the SAME hash output.\n\n(two words)",
        answer: norm("collision attack"),
        hint: "When two different inputs produce the same hash, it's called a hash ________ (7 letters)."
      },
      {
        id: 4,
        text: "SHA-256 is a more secure alternative to MD5.\n\nSHA-256 produces a hash of how many bits?\n\n(the name is a hint)",
        answer: norm("256"),
        hint: "SHA-___ → the number is in the name."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 7\n\nMD5 is widely considered _______ for security-critical applications because collision vulnerabilities were demonstrated.\n\nTwo words, underscore-separated: what is MD5's security status?\n\nFLAG{STATUS}",
        answer: norm("flag{md5_broken}"),
        hint: "MD5 is _____ (6 letters). Combine with 'MD5' and underscore: MD5_BROKEN"
      }
    ]
  },

  {
    id: 8,
    name: "Logic Gates",
    tier: "TIER II — THE STACKS",
    flag: makeFlag("NAND_UNIVERSAL"),
    clues: [
      {
        id: 1,
        text: "Boolean logic: AND gate.\n\nA AND B is true ONLY when both A and B are true.\n\nA=1, B=0 → A AND B = ?",
        answer: norm("0"),
        hint: "AND requires both to be 1. One is 0, so result is 0."
      },
      {
        id: 2,
        text: "XOR gate: outputs 1 when inputs DIFFER.\n\n  A=0, B=0 → 0\n  A=0, B=1 → 1\n  A=1, B=0 → 1\n  A=1, B=1 → 0\n\nEvaluate: (1 XOR 1) XOR (0 XOR 1) = ?",
        answer: norm("1"),
        hint: "(1 XOR 1)=0, (0 XOR 1)=1, then 0 XOR 1 = 1"
      },
      {
        id: 3,
        text: "NAND gate = NOT(A AND B)\n\nComplete the NAND truth table:\n\n  0 NAND 0 = ?\n  0 NAND 1 = ?\n  1 NAND 0 = ?\n  1 NAND 1 = ?\n\nSubmit all four results as a 4-digit binary string (in order above)",
        answer: norm("1110"),
        hint: "NOT(0 AND 0)=NOT(0)=1, NOT(0 AND 1)=1, NOT(1 AND 0)=1, NOT(1 AND 1)=NOT(1)=0"
      },
      {
        id: 4,
        text: "A 'universal gate' can be used to construct any other logic gate.\n\nNAND is universal. Using only NAND gates, you can build AND, OR, NOT, and XOR.\n\nHow many NAND gates does it take to implement a NOT gate?\n\n(use a single-input NAND: connect both inputs together)",
        answer: norm("1"),
        hint: "NOT(A) = A NAND A. Just one gate with both inputs tied together."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 8\n\nNAND (and NOR) are called what type of gate?\n\nTwo words, underscore-separated.\n\nFLAG{TYPE}",
        answer: norm("flag{nand_universal}"),
        hint: "NAND and NOR are _______ gates — each can build any other gate: NAND_UNIVERSAL"
      }
    ]
  },

  {
    id: 9,
    name: "The Web Inspector",
    tier: "TIER II — THE STACKS",
    flag: makeFlag("DEVTOOLS"),
    clues: [
      {
        id: 1,
        text: "HTTP status codes communicate outcomes.\n\nWhat does a 404 status code mean?\n\n(three words)",
        answer: norm("not found"),
        hint: "The requested resource could not be ___."
      },
      {
        id: 2,
        text: "What HTTP status code indicates a successful request?\n\n(the three-digit number)",
        answer: norm("200"),
        hint: "200 OK — the most successful of all responses."
      },
      {
        id: 3,
        text: "In a browser, which keyboard shortcut opens Developer Tools on most systems?\n\n(format: F followed by number, or key name)",
        answer: norm("f12"),
        hint: "It's a function key. The 12th one."
      },
      {
        id: 4,
        text: "In the browser Network tab, what does XHR stand for?\n\n(three words)",
        answer: norm("xmlhttprequest"),
        hint: "XML HTTP Request — the original AJAX mechanism. No spaces."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 9\n\nThe browser panel that lets you inspect HTML, CSS, JavaScript, network requests, and console output.\n\nWhat is it called? (one word, commonly used by developers)\n\nFLAG{TOOLNAME}",
        answer: norm("flag{devtools}"),
        hint: "Chrome DevTools, Firefox DevTools... just DevTools."
      }
    ]
  },

  {
    id: 10,
    name: "The Regex Labyrinth",
    tier: "TIER II — THE STACKS",
    flag: makeFlag("REGEX_MASTER"),
    clues: [
      {
        id: 1,
        text: "Regular expressions (regex) describe patterns in text.\n\nWhat symbol in regex means 'one or more' of the preceding character?\n\n(single character)",
        answer: norm("+"),
        hint: "a+ means one or more 'a' characters."
      },
      {
        id: 2,
        text: "In regex, the ^ symbol inside a character class [^...] means:\n\n(one word)",
        answer: norm("not"),
        hint: "[^abc] matches any character that is NOT a, b, or c."
      },
      {
        id: 3,
        text: "This regex pattern:\n\n^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n\nWhat type of string is it designed to validate?\n\n(two words)",
        answer: norm("email address"),
        hint: "The @ symbol is a strong hint. It validates an ___ ______."
      },
      {
        id: 4,
        text: "In JavaScript regex, the /g flag means:\n\n(one word)",
        answer: norm("global"),
        hint: "Without /g, only the first match is found. With /g, all matches are found — it's a ___ search."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 10\n\nSomeone who has mastered regex is informally called:\n\n(two words, underscore-separated, all caps)\n\nFLAG{TITLE}",
        answer: norm("flag{regex_master}"),
        hint: "A regex expert could be called a REGEX _____. Someone who has mastered something."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER III — RESTRICTED SECTION (Stages 11–15)
     Technical + analytical. Linux, algorithms, crypto, JS.
     ═══════════════════════════════════════════ */
  {
    id: 11,
    name: "Linux Shell",
    tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("BASH_MASTER"),
    clues: [
      {
        id: 1,
        text: "In Linux, what command lists files and directories in the current directory?\n\n(two lowercase letters)",
        answer: norm("ls"),
        hint: "Short for 'list'. Two letters."
      },
      {
        id: 2,
        text: "What Linux command prints the current working directory?\n\n(three lowercase letters — stands for Print Working Directory)",
        answer: norm("pwd"),
        hint: "P___ W_____ D_______."
      },
      {
        id: 3,
        text: "What does this Linux pipeline do?\n\ncat /etc/passwd | grep root | cut -d: -f1\n\nDescribe in one word what is ultimately extracted:",
        answer: norm("username"),
        hint: "The -f1 flag extracts field 1, which in /etc/passwd is the ________."
      },
      {
        id: 4,
        text: "In Linux file permissions:\n\nrwxr-xr--\n\nWhat is the octal (numeric) representation of this permission string?\n\n(three digits: owner, group, others)",
        answer: norm("754"),
        hint: "rwx=7, r-x=5, r--=4. Owner=7, Group=5, Others=4."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 11\n\nThe most common Unix/Linux shell, and the default on most systems.\n\nIts name combined with 'master' (underscore-separated, uppercase).\n\nFLAG{SHELL_MASTER}",
        answer: norm("flag{bash_master}"),
        hint: "B___. Bourne Again SHell. BASH_MASTER."
      }
    ]
  },

  {
    id: 12,
    name: "Algorithm Vault",
    tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("BIG_O_HERO"),
    clues: [
      {
        id: 1,
        text: "Big O notation describes algorithm complexity.\n\nAn algorithm that always takes the same time regardless of input size is:\n\nO(___)",
        answer: norm("1"),
        hint: "O(1) — constant time. The best possible complexity."
      },
      {
        id: 2,
        text: "Binary search on a sorted array of n elements:\n\nEach step halves the search space. The complexity is:\n\nO(log ___)",
        answer: norm("n"),
        hint: "O(log n). The input size is conventionally called n."
      },
      {
        id: 3,
        text: "Bubble sort has a worst-case time complexity of O(n²).\n\nFor n=1000 elements, approximately how many comparisons does this represent?\n\n(express in scientific notation with one significant figure, e.g. 1e6)",
        answer: norm("1e6"),
        hint: "1000² = 1,000,000 = 1×10^6 = 1e6"
      },
      {
        id: 4,
        text: "Merge sort divides an array in half, sorts each half, then merges.\n\nIts time complexity is:\n\nO(n log ___)",
        answer: norm("n"),
        hint: "O(n log n). More efficient than O(n²)."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 12\n\nSomeone who deeply understands algorithmic complexity is called a:\n\n(three words, underscore-separated, uppercase)\n\nFLAG{TITLE}",
        answer: norm("flag{big_o_hero}"),
        hint: "BIG_O_HERO. A hero of Big O analysis."
      }
    ]
  },

  {
    id: 13,
    name: "JavaScript Shadows",
    tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("TYPEOF_UNDEFINED"),
    clues: [
      {
        id: 1,
        text: "JavaScript has some surprising type behaviours.\n\nWhat does this expression evaluate to?\n\ntypeof null\n\n(one word — not what you'd expect!)",
        answer: norm("object"),
        hint: "This is a famous JS bug. typeof null returns 'object', not 'null'."
      },
      {
        id: 2,
        text: "Evaluate this JavaScript expression:\n\n0.1 + 0.2 === 0.3\n\n(true or false)",
        answer: norm("false"),
        hint: "Floating point: 0.1 + 0.2 = 0.30000000000000004 in IEEE 754"
      },
      {
        id: 3,
        text: "What is the result of this JavaScript?\n\n[] + []\n\n(describe exactly — might be surprising)",
        answer: norm("empty string"),
        hint: "[] coerces to '' (empty string). '' + '' = ''"
      },
      {
        id: 4,
        text: "Evaluate:\n\ntypeof typeof 42\n\n(one word — think carefully about the return type of typeof)",
        answer: norm("string"),
        hint: "typeof 42 = 'number' (a string). Then typeof 'number' = 'string'."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 13\n\nWhat does JavaScript's typeof operator return for an undeclared variable?\n\n(one word — underscore-separated with 'typeof' in the flag)\n\nFLAG{TYPEOF_RESULT}",
        answer: norm("flag{typeof_undefined}"),
        hint: "typeof undeclaredVar returns 'undefined'. FLAG: TYPEOF_UNDEFINED"
      }
    ]
  },

  {
    id: 14,
    name: "Cryptography Chamber",
    tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("PUBLIC_KEY"),
    clues: [
      {
        id: 1,
        text: "RSA is an asymmetric encryption algorithm.\n\nIn RSA, there are two keys. One encrypts, the other decrypts.\n\nWhat is the key that you share openly with everyone called?\n\n(two words)",
        answer: norm("public key"),
        hint: "One key is ______, one key is private. The shared one is ______."
      },
      {
        id: 2,
        text: "RSA security relies on the difficulty of factoring large numbers.\n\nWhat mathematical operation is hard to reverse for large numbers?\n\n(one word — the inverse of multiplication)",
        answer: norm("factoring"),
        hint: "Given N = p × q, finding p and q is called ________."
      },
      {
        id: 3,
        text: "In RSA, we choose two prime numbers p and q.\n\nIf p=11 and q=13, what is n = p × q?\n\n(the RSA modulus)",
        answer: norm("143"),
        hint: "11 × 13 = 143"
      },
      {
        id: 4,
        text: "Euler's totient function φ(n) for RSA: φ(n) = (p-1)(q-1)\n\nUsing p=11 and q=13:\n\nφ(143) = (11-1) × (13-1) = ?",
        answer: norm("120"),
        hint: "10 × 12 = 120"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 14\n\nIn public-key cryptography, the key you share with the world is called:\n\n(two words, underscore-separated, uppercase)\n\nFLAG{KEY_TYPE}",
        answer: norm("flag{public_key}"),
        hint: "The non-secret key in asymmetric cryptography. PUBLIC_KEY."
      }
    ]
  },

  {
    id: 15,
    name: "Data Structures",
    tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("HEAP_OVERFLOW"),
    clues: [
      {
        id: 1,
        text: "A stack follows LIFO — Last In, First Out.\n\nYou push: A, B, C onto a stack.\n\nWhat do you get when you pop THREE times? List in pop order, comma-separated.",
        answer: norm("c,b,a"),
        hint: "Last pushed (C) is first out, then B, then A."
      },
      {
        id: 2,
        text: "A queue follows FIFO — First In, First Out.\n\nItems enqueued in order: X, Y, Z\n\nAfter two dequeue operations, what single item remains?",
        answer: norm("z"),
        hint: "X leaves first (enqueued first), then Y, leaving Z."
      },
      {
        id: 3,
        text: "A binary search tree stores elements so that:\n- Values less than node go LEFT\n- Values greater than node go RIGHT\n\nInsert these values in order: 5, 3, 7, 1, 4\n\nWhat is the in-order traversal? (comma-separated, left-root-right)",
        answer: norm("1,3,4,5,7"),
        hint: "In-order traversal visits Left, Root, Right — producing sorted order."
      },
      {
        id: 4,
        text: "A min-heap is a complete binary tree where every parent ≤ its children.\n\nAfter inserting [10, 20, 5, 7, 3] and heapifying:\n\nWhat is the ROOT value of the resulting min-heap?",
        answer: norm("3"),
        hint: "In a min-heap, the root is always the MINIMUM element."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 15\n\nA classic memory corruption vulnerability where writing beyond the bounds of a heap allocation corrupts adjacent memory.\n\n(two words, underscore-separated)\n\nFLAG{VULNERABILITY}",
        answer: norm("flag{heap_overflow}"),
        hint: "Buffer overflow on the heap = HEAP_OVERFLOW."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER IV — DEEP ARCHIVE  (Stages 16–20)
     Advanced: OS, security, encoding, reverse engineering.
     ═══════════════════════════════════════════ */
  {
    id: 16,
    name: "The Encoding Engine",
    tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("BASE64_ENCODE"),
    clues: [
      {
        id: 1,
        text: "Base64 encodes binary data as ASCII text using 64 characters (A-Z, a-z, 0-9, +, /).\n\nBase64 represents 3 bytes as how many Base64 characters?",
        answer: norm("4"),
        hint: "3 bytes = 24 bits → 4 groups of 6 bits → 4 Base64 characters."
      },
      {
        id: 2,
        text: "Decode this Base64 string:\n\naGVsbG8=\n\n(standard Base64 decode — what ASCII text does it represent?)",
        answer: norm("hello"),
        hint: "aGVs = hel, bG8= = lo. Result: hello"
      },
      {
        id: 3,
        text: "Encode the word 'hi' in Base64.\n\nASCII: h=104 (01101000), i=105 (01101001)\n\nGroup into 6-bit chunks: 011010 000110 1001__ (pad with zeros)\n= 26, 6, 36 → Z, G, k, then padding =\n\nFull Base64 encoded result:",
        answer: norm("aGk="),
        hint: "h=01101000, i=01101001. Combine: 011010 000110 1001. Pad to 011010 000110 100100. Values: 26=a (wait, A=0...) actually: a=0? No: A=0,B=1...Z=25,a=26...z=51,0=52...9=61,+=62,/=63. 011010=26=a, 000110=6=G, 100100=36=k, pad==. Result: aGk="
      },
      {
        id: 4,
        text: "A Base64-encoded JWT (JSON Web Token) has three parts separated by dots.\n\nDecode this Base64 JWT header:\n\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\n\nWhat algorithm (alg) is specified?\n\n(the value, not the key)",
        answer: norm("hs256"),
        hint: "Decode: {\"alg\":\"HS256\",\"typ\":\"JWT\"}. The alg field value is HS256."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 16\n\nThe encoding scheme you've been using all stage:\n\n(two words, underscore-separated)\n\nFLAG{ENCODING}",
        answer: norm("flag{base64_encode}"),
        hint: "BASE64_ENCODE. The encoding that converts binary to ASCII-safe text."
      }
    ]
  },

  {
    id: 17,
    name: "SQL Injection Dossier",
    tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("DROP_TABLE"),
    clues: [
      {
        id: 1,
        text: "SQL injection inserts malicious SQL into a query.\n\nA login form sends:\n\nSELECT * FROM users WHERE username='{input}' AND password='{pass}'\n\nIf input = admin' --\n\nWhat does the resulting query look like? (complete the query, show what happens to the password check)",
        answer: norm("bypassed"),
        hint: "The -- comments out everything after. The password check is bypassed."
      },
      {
        id: 2,
        text: "The most destructive SQL injection payload:\n\n'; DROP TABLE users; --\n\nWhat SQL command is used to permanently remove a table?\n\n(two words)",
        answer: norm("drop table"),
        hint: "DROP TABLE tablename. It permanently removes the table and all its data."
      },
      {
        id: 3,
        text: "SQL UNION injection extracts data from other tables.\n\n' UNION SELECT username, password FROM users --\n\nThis works only if the number of columns in the injected query matches the original.\n\nWhat is this technique called?\n\n(two words)",
        answer: norm("union injection"),
        hint: "Using the UNION keyword to inject = UNION ________."
      },
      {
        id: 4,
        text: "Parameterized queries (prepared statements) prevent SQL injection because:\n\nUser input is treated as ___, not executable code.\n\n(one word — the safe alternative to string concatenation)",
        answer: norm("data"),
        hint: "When input is treated as pure ___, it cannot be interpreted as SQL commands."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 17\n\nThe infamous SQL injection payload that destroys a table:\n\n'; DROP TABLE users; --\n\nSubmit the two SQL keywords (underscore-separated, uppercase).\n\nFLAG{COMMAND}",
        answer: norm("flag{drop_table}"),
        hint: "DROP_TABLE. The two SQL words that remove a table permanently."
      }
    ]
  },

  {
    id: 18,
    name: "Steganography Sector",
    tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("HIDDEN_IN_PLAIN"),
    clues: [
      {
        id: 1,
        text: "Steganography hides messages inside other data.\n\nWhat does 'steganography' mean literally?\n\n(two words — from Greek: steganos = covered, graphos = writing)",
        answer: norm("covered writing"),
        hint: "Steganos (covered) + graphos (writing) = _______ _______."
      },
      {
        id: 2,
        text: "In LSB (Least Significant Bit) steganography:\n\nIf an image pixel has R=11111110, what is the maximum change to R value when hiding 1 bit?\n\n(numeric answer: how many units can R change?)",
        answer: norm("1"),
        hint: "Flipping only the LSB changes the value by at most 1."
      },
      {
        id: 3,
        text: "A hidden message is encoded in the FIRST LETTER of each sentence below:\n\n\"Here lies the answer you seek.\n\"Identify the pattern carefully.\n\"Don't overlook what is obvious.\n\"Dark shadows conceal the way.\n\"Every letter matters here.\n\"Never stop looking.\"\n\nExtract the hidden word:",
        answer: norm("hidden"),
        hint: "H-I-D-D-E-N. First letter of each sentence."
      },
      {
        id: 4,
        text: "In the following binary sequence, a message is hidden using every 8th bit:\n\nPositions: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16...\nBit string: 0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0...\n\nExtract bits at positions 8 and 16:\n\nBits: 1, 0 → Binary: 10 → Decimal: ?",
        answer: norm("2"),
        hint: "Binary 10 = 1×2 + 0×1 = 2"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 18\n\nThe concept that steganography exploits: a message hidden where nobody thinks to look.\n\n(three words, underscore-separated)\n\nFLAG{CONCEPT}",
        answer: norm("flag{hidden_in_plain}"),
        hint: "Hidden in plain sight → HIDDEN_IN_PLAIN."
      }
    ]
  },

  {
    id: 19,
    name: "Reverse Engineering",
    tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("DECOMPILE_ME"),
    clues: [
      {
        id: 1,
        text: "Reverse engineering recovers high-level source from compiled binaries.\n\nWhat tool converts compiled Java .class files back to readable .java source?\n\n(one word — Java ___compiler)",
        answer: norm("decompiler"),
        hint: "The opposite of a compiler. A ___________."
      },
      {
        id: 2,
        text: "This assembly instruction:\n\nMOV EAX, 0x2A\n\n0x2A in decimal is:\n\n(0x2A = 2×16 + 10 = ?)",
        answer: norm("42"),
        hint: "2×16 = 32, plus A=10: 32+10 = 42"
      },
      {
        id: 3,
        text: "In x86 assembly, what register typically holds a function's return value?\n\n(three uppercase letters)",
        answer: norm("eax"),
        hint: "The Extended Accumulator register. EAX."
      },
      {
        id: 4,
        text: "Trace this pseudocode:\n\nfunction mystery(n):\n  if n <= 1: return n\n  return mystery(n-1) + mystery(n-2)\n\nmystery(6) = ?",
        answer: norm("8"),
        hint: "This is Fibonacci! F(6) = F(5)+F(4) = 5+3 = 8"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 19\n\nThe process of taking compiled binary code and recovering source — what a reverse engineer does to a program.\n\n(two words, underscore-separated)\n\nFLAG{PROCESS}",
        answer: norm("flag{decompile_me}"),
        hint: "What a reverse engineer does: DECOMPILE_ME."
      }
    ]
  },

  {
    id: 20,
    name: "Crypto Deep Dive",
    tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("ZERO_KNOWLEDGE"),
    clues: [
      {
        id: 1,
        text: "A Diffie-Hellman key exchange allows two parties to establish a shared secret over an insecure channel — without ever transmitting the secret.\n\nThis shared secret can then be used for:\n\n(one word — what type of encryption uses this shared key?)",
        answer: norm("symmetric"),
        hint: "Diffie-Hellman creates a shared key for _________ encryption (same key on both sides)."
      },
      {
        id: 2,
        text: "In a Zero-Knowledge Proof, a prover convinces a verifier of a fact:\n\nWithout revealing ___ about the fact itself.\n\n(one word)",
        answer: norm("anything"),
        hint: "The prover reveals nothing — _______. That's what makes it zero-knowledge."
      },
      {
        id: 3,
        text: "A cryptographic nonce is:\n\nA number used ___ once\n\n(one word — complete the phrase)",
        answer: norm("only"),
        hint: "Nonce = Number used ___ once. Prevents replay attacks."
      },
      {
        id: 4,
        text: "Perfect Forward Secrecy (PFS) means that if a long-term key is compromised, past sessions cannot be decrypted because:\n\nEach session used an _________ session key.\n\n(one word — keys that are not reused)",
        answer: norm("ephemeral"),
        hint: "Ephemeral = temporary. Each session generates its own _______ key."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 20\n\nThe proof system where you prove you know something WITHOUT revealing what you know.\n\n(two words, underscore-separated)\n\nFLAG{PROOF_TYPE}",
        answer: norm("flag{zero_knowledge}"),
        hint: "ZERO_KNOWLEDGE proof. You prove without revealing."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER V — THE VAULT  (Stages 21–25)
     Extremely difficult. Multi-step technical puzzles.
     ═══════════════════════════════════════════ */
  {
    id: 21,
    name: "The Polyglot Cipher",
    tier: "TIER V — THE VAULT",
    flag: makeFlag("VIGENERE_BROKEN"),
    clues: [
      {
        id: 1,
        text: "Vigenère cipher: each letter in the key determines a Caesar shift.\n\nKey: CAT (C=2, A=0, T=19)\nPlaintext: DOG\n\nShift D by 2 → ?\nShift O by 0 → ?\nShift G by 19 → ?\n\n(Submit 3-letter ciphertext)",
        answer: norm("foz"),
        hint: "D+2=F, O+0=O, G+19: G=6, 6+19=25=Z. Result: FOZ"
      },
      {
        id: 2,
        text: "Vigenère with key: KEY (K=10, E=4, Y=24)\n\nDecrypt: RIJVS\n\nR-10=?, I-4=?, J-24=?, V-10=?, S-4=?\n\n(modular arithmetic, wrap around if negative)",
        answer: norm("hello"),
        hint: "R(17)-10=7=H, I(8)-4=4=E, J(9)-24= -15 mod 26=11=L, V(21)-10=11=L, S(18)-4=14=O"
      },
      {
        id: 3,
        text: "The Kasiski examination finds repeated sequences in Vigenère ciphertext to determine key length.\n\nIf the pattern 'XYZ' appears at positions 5 and 20, the distance is 15.\n\nPossible key lengths are factors of 15: 1, 3, 5, 15.\n\nWhich is the most likely non-trivial key length for a reasonable password?\n\n(single digit — the middle factor)",
        answer: norm("3"),
        hint: "Factors of 15: 1, 3, 5, 15. Key length 1 is trivial (Caesar). Most likely: 3 or 5. The middle value."
      },
      {
        id: 4,
        text: "The Index of Coincidence (IC) for English text ≈ 0.065.\nFor random text IC ≈ 0.038.\n\nIf IC of individual columns (after splitting by key length) approaches 0.065, it confirms:\n\n(two words — what does a high IC confirm about the column?)",
        answer: norm("correct length"),
        hint: "High IC close to English IC confirms you found the _______ key _______."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 21\n\nVigenère was long considered unbreakable — 'le chiffre indéchiffrable'.\n\nBut it was broken by analyzing repeated patterns and using Kasiski/IC.\n\nSubmit the status of this 'unbreakable' cipher:\n\nFLAG{CIPHER_STATUS}",
        answer: norm("flag{vigenere_broken}"),
        hint: "The 'unbreakable' cipher that was broken. VIGENERE_BROKEN."
      }
    ]
  },

  {
    id: 22,
    name: "Memory Exploitation",
    tier: "TIER V — THE VAULT",
    flag: makeFlag("SMASH_THE_STACK"),
    clues: [
      {
        id: 1,
        text: "A buffer overflow writes beyond the bounds of a buffer.\n\nOn a 32-bit system, a stack frame typically contains:\n- Local variables\n- Saved base pointer (EBP)\n- Return address (EIP/RIP)\n\nAn attacker overwrites the _______ to redirect execution.\n\n(two words)",
        answer: norm("return address"),
        hint: "The value that tells the CPU where to return after a function. RETURN ADDRESS."
      },
      {
        id: 2,
        text: "NOP sled technique: fill memory with NOP (No Operation) instructions before shellcode.\n\nIn x86, the NOP instruction opcode is:\n\n0x___ (single hex byte)",
        answer: norm("90"),
        hint: "The NOP sled uses byte 0x90 — the x86 NOP instruction."
      },
      {
        id: 3,
        text: "ASLR (Address Space Layout Randomization) mitigates exploitation by:\n\nRandomizing memory _______ at each execution.\n\n(one word — where code/stack/heap are placed)",
        answer: norm("addresses"),
        hint: "ASLR randomizes memory _______ so attackers can't predict where to jump."
      },
      {
        id: 4,
        text: "Return-Oriented Programming (ROP) bypasses non-executable memory by:\n\nChaining existing code _______ (small sequences ending in 'ret') already in the binary.\n\n(one word — term for these small code sequences)",
        answer: norm("gadgets"),
        hint: "Small code sequences ending in 'ret' are called ROP _______."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 22\n\nThe classic Aleph One paper title about stack buffer overflows (1996):\n\n'_______ the Stack for Fun and Profit'\n\n(one word — what you do to a stack in an overflow attack)\n\nFLAG{VERB_THE_STACK}",
        answer: norm("flag{smash_the_stack}"),
        hint: "Aleph One's paper: 'Smashing the Stack for Fun and Profit'. SMASH_THE_STACK."
      }
    ]
  },

  {
    id: 23,
    name: "Protocol Dissection",
    tier: "TIER V — THE VAULT",
    flag: makeFlag("THREE_WAY_HANDSHAKE"),
    clues: [
      {
        id: 1,
        text: "TCP establishes connections using a 3-step process.\n\nStep 1: Client sends SYN\nStep 2: Server sends ___\nStep 3: Client sends ___\n\nSubmit the two flags in order, comma-separated (uppercase).",
        answer: norm("syn-ack,ack"),
        hint: "SYN → SYN-ACK → ACK. The three-way handshake."
      },
      {
        id: 2,
        text: "In TCP, a packet's sequence number tracks byte position in the stream.\n\nIf the initial sequence number (ISN) is 1000 and we send 500 bytes:\n\nThe next sequence number is:",
        answer: norm("1500"),
        hint: "ISN + bytes_sent = 1000 + 500 = 1500"
      },
      {
        id: 3,
        text: "A SYN flood attack exploits the TCP handshake by:\n\nSending many SYN packets but never completing the handshake, exhausting the server's _______ connection table.\n\n(one word — the state of incomplete connections)",
        answer: norm("half-open"),
        hint: "Connections with SYN sent but no ACK returned are HALF-OPEN connections."
      },
      {
        id: 4,
        text: "Wireshark display filter for TCP connections to port 443 (HTTPS):\n\ntcp.port == ___\n\n(the HTTPS port number)",
        answer: norm("443"),
        hint: "HTTPS runs on port 443. tcp.port == 443"
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 23\n\nThe TCP connection establishment process — three steps, three words:\n\n(three words, underscore-separated)\n\nFLAG{PROCESS_NAME}",
        answer: norm("flag{three_way_handshake}"),
        hint: "THREE_WAY_HANDSHAKE. The fundamental TCP connection process."
      }
    ]
  },

  {
    id: 24,
    name: "The Turing Vault",
    tier: "TIER V — THE VAULT",
    flag: makeFlag("HALTING_PROBLEM"),
    clues: [
      {
        id: 1,
        text: "Alan Turing's theoretical 'Turing Machine' consists of:\n\n- An infinite tape\n- A read/write head\n- A state register\n- A _______ table (rules for transitions)\n\n(one word — what guides the machine's behavior)",
        answer: norm("transition"),
        hint: "The machine's behavior is defined by its _______ table — rules for what to do in each state."
      },
      {
        id: 2,
        text: "A language is Turing-complete if:\n\nIt can simulate any Turing Machine.\n\nIs the game of Conway's Game of Life Turing-complete?\n\n(yes or no)",
        answer: norm("yes"),
        hint: "Yes — Conway's Game of Life has been proven Turing-complete."
      },
      {
        id: 3,
        text: "The Church-Turing thesis states:\n\nAny computation that can be physically performed can be computed by a _______ machine.\n\n(one word — the machine described by the thesis)",
        answer: norm("turing"),
        hint: "Named after Alan _______.."
      },
      {
        id: 4,
        text: "Turing proved in 1936 that no algorithm can determine, for all programs and inputs, whether the program will:\n\n_______ or run forever.\n\n(two words — the opposite of running forever)",
        answer: norm("halt"),
        hint: "The program either _____ (stops) or runs forever. The Halting Problem."
      },
      {
        id: 5,
        text: "FINAL SEAL — STAGE 24\n\nThe undecidable problem Turing proved in 1936: no algorithm can determine whether an arbitrary program will terminate.\n\n(two words, underscore-separated)\n\nFLAG{PROBLEM_NAME}",
        answer: norm("flag{halting_problem}"),
        hint: "The HALTING_PROBLEM. Proved undecidable by Turing in 1936."
      }
    ]
  },

  {
    id: 25,
    name: "The Final Seal",
    tier: "TIER V — THE VAULT",
    flag: makeFlag("ARCHIVE_COMPLETE"),
    clues: [
      {
        id: 1,
        text: "THE FINAL STAGE — PART I\n\nYou have traversed 24 stages of The Archive.\n\nThis final stage tests everything.\n\nStep 1: From Stage 3, the answer to life the universe and everything was 42.\nStep 2: From Stage 8, how many NAND gates build a NOT? → 1\nStep 3: 42 in hex is: 0x__",
        answer: norm("2a"),
        hint: "42 decimal: 2×16 + 10 = 0x2A. Submit: 2a"
      },
      {
        id: 2,
        text: "THE FINAL STAGE — PART II\n\nCombine your knowledge:\n\nROT13('ARCHIVE') = ?\n\n(apply ROT13 to each letter: shift by 13 in the alphabet)",
        answer: norm("nepuver"),
        hint: "A→N, R→E, C→P, H→U, I→V, V→I, E→R = NEPUVER"
      },
      {
        id: 3,
        text: "THE FINAL STAGE — PART III\n\nAtbash cipher (mirror: A↔Z, B↔Y, C↔X...)\n\nAtbash encode: VAULT\n\n(V↔E, A↔Z, U↔F, L↔O, T↔G)",
        answer: norm("ezfog"),
        hint: "V→E, A→Z, U→F, L→O, T→G = EZFOG"
      },
      {
        id: 4,
        text: "THE FINAL STAGE — PART IV\n\nHash this string using the pattern:\nTake each letter's position in alphabet (A=1...Z=26), sum them, multiply by the number of characters.\n\nWord: DONE\n\nD=4, O=15, N=14, E=5\nSum = 38\nLength = 4\n38 × 4 = ?",
        answer: norm("152"),
        hint: "D(4) + O(15) + N(14) + E(5) = 38. 38 × 4 = 152."
      },
      {
        id: 5,
        text: "THE FINAL SEAL — STAGE 25\n\nYou have reached the innermost chamber of The Archive.\n\nThe final flag acknowledges your complete mastery.\n\n25 stages. 125 clues. One archive.\n\nFLAG{ACHIEVEMENT}",
        answer: norm("flag{archive_complete}"),
        hint: "You completed The Archive. The flag: ARCHIVE_COMPLETE."
      }
    ]
  }
];

// Validate data integrity on load
function validateStages() {
  if (STAGES.length !== 25) throw new Error(`Expected 25 stages, got ${STAGES.length}`);
  STAGES.forEach((stage, si) => {
    if (stage.clues.length !== 5) throw new Error(`Stage ${stage.id} has ${stage.clues.length} clues, expected 5`);
    if (!stage.flag) throw new Error(`Stage ${stage.id} missing flag`);
  });
  console.log('[Archive] Stage data validated: 25 stages × 5 clues = 125 clues total.');
}

validateStages();

module.exports = { STAGES, norm };
