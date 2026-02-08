const n=`# Bare-Metal Programming in Arduino: What I Didn’t Understand at First

When I started with Arduino, it honestly felt like cheating.

I wrote a few lines of code, clicked upload, and an LED started blinking. I didn’t really know *why* it blinked, but it did—and that felt good enough at the time.

Later, when I moved to STM32 and started writing code by touching registers directly, everything suddenly felt painful. Things stopped working for no obvious reason. One missing bit and nothing ran. At first I thought, *why would anyone choose this pain when Arduino already works so well?*

This post is basically me trying to answer that question for myself.

I’ll use the simplest possible example—**blinking an LED**—and look at what changes when you go from the usual Arduino way to a more bare-metal way of thinking.

---

## The Arduino Way (What Most of Us Start With)

If you’ve ever used Arduino, you’ve probably written this:

\`\`\`cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
\`\`\`

This feels almost like scripting.

You tell the board:

* this pin is an output
* turn it on
* wait
* turn it off

And it works.

At this stage, I didn’t think about *how* pin 13 becomes HIGH. I just trusted that \`digitalWrite()\` knew what it was doing. And to be fair, for learning and prototyping, that trust is completely fine.

But here’s the important thing I didn’t realize back then:

> Arduino is not hiding the hardware.
> It is just touching the hardware **on your behalf**.

---

## So What Is Bare-Metal Programming?

Bare-metal programming just means **talking to the microcontroller more directly**, without helper functions doing everything for you.

Instead of saying:

\`\`\`cpp
digitalWrite(13, HIGH);
\`\`\`

you end up doing something like:

* enable a clock
* set a specific bit in a specific register
* write a value to a memory location

It sounds scary at first, but it’s really just being explicit.

---

## What Are Registers (In Simple Terms)

This part confused me for a long time.

A **register** is just a small chunk of memory inside the microcontroller.
Each register controls *something specific* in the hardware.

Some registers:

* control whether a pin is input or output
* control whether a peripheral gets power
* hold the value that actually appears on a pin

When you write to a register, you are not calling a function.
You are literally changing the electrical behavior of the chip.

That’s it. No magic.

---

## Blinking an LED the Bare-Metal Way (Arduino Still Involved)

Even on Arduino boards (like AVR-based ones), underneath everything, this is roughly what happens.

Instead of \`digitalWrite()\`, you could do something like:

\`\`\`c
DDRB |= (1 << 5);   // Set pin as output (PB5 = Arduino pin 13)

while (1) {
  PORTB |= (1 << 5);   // LED ON
  _delay_ms(1000);
  PORTB &= ~(1 << 5);  // LED OFF
  _delay_ms(1000);
}
\`\`\`

This looks ugly compared to Arduino code, but now something important changes:

I know **exactly** which pin I am touching.
I know **exactly** which bit controls it.
Nothing else happens unless I explicitly say so.

That clarity is uncomfortable at first, but also kind of empowering.

---

## What Arduino Is Actually Doing for You

When you write:

\`\`\`cpp
digitalWrite(13, HIGH);
\`\`\`

Arduino:

* figures out which port and pin number this maps to
* checks if the pin mode is correct
* sets or clears the correct bit
* adds safety and portability

That convenience has a cost:

* extra instructions
* extra time
* less predictable timing

Most of the time, you don’t care.

Sometimes, you really do.

---

## Why Would Anyone Prefer Bare-Metal Programming?

I used to think people wrote bare-metal code just to look smart.

That’s not true.

After writing register-level code on STM32 and then coming back to Arduino, I realized why bare-metal exists:

When you write bare-metal code:

* nothing happens unless *you* make it happen
* timing becomes predictable
* power usage becomes understandable
* debugging becomes more honest

You stop guessing.

If the LED doesn’t blink, it’s not because a library did something weird in the background. It’s because *you missed something*. That’s frustrating—but it also teaches you a lot faster.

---

## Does This Mean Arduino Is Bad? Not at All.

Arduino is the reason many of us even touched embedded systems.

It’s great for:

* learning
* quick experiments
* validating ideas
* building things fast

The problem is stopping there and never asking:

> “What is this function actually doing?”

Bare-metal programming doesn’t replace Arduino.
It **changes how you think**, even when you go back to using Arduino.

---

## What Changed for Me

After writing bare-metal code, I noticed something strange:

Even when I used \`digitalWrite()\` again, I started thinking:

* which register is this touching?
* how slow is this?
* do I actually need this abstraction here?

I didn’t become anti-Arduino.
I just stopped treating the microcontroller like a black box.

---

## Final Thought

Blinking an LED is the same problem whether you use Arduino or bare-metal C.

The difference is **how much responsibility you take**.

Arduino says:

> “Don’t worry, I’ve got this.”

Bare-metal says:

> “You asked for control. Now deal with it.”

Both are valid.
But understanding bare-metal—even a little—changes how you see embedded systems forever.`;export{n as default};
