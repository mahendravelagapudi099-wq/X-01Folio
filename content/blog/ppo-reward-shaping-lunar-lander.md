---
title: "Reinforcement Learning Reward Shaping Experiments on LunarLander-v3"
slug: "ppo-reward-shaping-lunar-lander"
excerpt: "Comparing four reward-shaping formulations using PPO in Gymnasium with Stable-Baselines3 across 3 seeds and 1M training steps."
published_at: "2026-10-28T10:00:00.000Z"
featured: false
reading_time: "4 min read"
tags:
  - "Reinforcement Learning"
  - "PyTorch"
  - "PPO"
  - "Gymnasium"
feature_image: "/assets/project-04-lunar-lander.webp"
---

## Why Reward Shaping Matters in RL

In reinforcement learning, reward design directly determines policy convergence velocity and stability. Naive sparse rewards lead to sample inefficiency, while poorly tuned dense rewards can introduce unintended policy side effects.

## Experimental Setup

Using Gymnasium's LunarLander-v3 and Stable-Baselines3 PPO, we evaluated four distinct reward formulations systematically:

1. Default environment reward
2. Velocity-penalized descent shaping
3. Angular-tilt stabilization bonus
4. Distance-to-pad Euclidean discount shaping

To ensure scientific reproducibility, each formulation was trained over 1,000,000 timesteps across 3 fixed random seeds.

```python
# PPO training harness setup
import gymnasium as gym
from stable_baselines3 import PPO

SEEDS = [42, 1337, 2026]
TOTAL_TIMESTEPS = 1_000_000

for seed in SEEDS:
    env = gym.make("LunarLander-v3")
    env.reset(seed=seed)
    
    model = PPO(
        "MlpPolicy",
        env,
        learning_rate=3e-4,
        n_steps=2048,
        batch_size=64,
        gamma=0.99,
        seed=seed,
        verbose=0
    )
    model.learn(total_timesteps=TOTAL_TIMESTEPS)
    model.save(f"./models/ppo_lunar_{seed}")
```

## Reproducibility & Verification

All training logs and evaluation benchmarks are covered by 51 passing unit and regression tests, verifying deterministic seed execution and rollout consistency.

Check the source code and experiment logs:
https://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab
