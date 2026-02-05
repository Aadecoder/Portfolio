# Tuning a PID for a Self-Balancing Bot

I built a self-balancing bot in CoppeliaSim and spent most of the time dialing in the PID gains.

## Takeaways
- Start with a stable P-only loop to understand drift.
- Add D to damp oscillations, then add a small I term to remove bias.
- Clamp the output to protect the motors and avoid runaway.

## Loop cadence
- Sample at a fixed, fast rate.
- Log angle error over time to visualize settling.

The result was a bot that stays upright with quick recovery after small nudges.
