# youtube-video-like-automation

>This project automates the process of liking YouTube videos and selectively engaging with comments in a controlled, repeatable way. It is designed to reduce manual interaction overhead while maintaining consistent behaviour across sessions. The automation is suitable for teams that need reliable YouTube engagement workflows without constant hands-on effort.

The youtube like bot logic is implemented with safety-first controls, making it practical for structured operations rather than uncontrolled activity.

<p align="center">
  <a href="https://t.me/devpilot1" target="_blank"><img src="https://img.shields.io/badge/Chat%20on-Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"></a>
  <a href="mailto:support@appilot.app" target="_blank"><img src="https://img.shields.io/badge/Email-support@appilot.app-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"></a>
  <a href="https://Appilot.app" target="_blank"><img src="https://img.shields.io/badge/Visit-Website-007BFF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website"></a>
  <a href="https://discord.gg/3YrZJZ6hA2" target="_blank"><img src="https://img.shields.io/badge/Join-Appilot_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Appilot Discord"></a>
</p>

<p align="center">
Created by Appilot, built to showcase our approach to Automation! <br>
If you are looking for custom <strong> youtube like bot </strong>, you've just found your team — Let’s Chat.&#128070; &#128070;
</p>

## Introduction

Manually liking videos or comments across multiple YouTube sessions quickly becomes repetitive and error-prone. Users managing several channels or testing engagement flows often face inconsistent results due to fatigue, timing issues, or missed actions.

This automation addresses that problem by handling likes and comment likes automatically, with predictable pacing and built-in safeguards. By automating the workflow, teams gain better consistency, reduced manual effort, and clearer operational control.

### Engagement Automation in Practice

- Eliminates repetitive manual clicks on videos and comments  
- Maintains consistent interaction timing across sessions  
- Helps validate engagement flows during testing or QA  
- Reduces human error in large-scale interaction routines  

## Core Features

| Feature | Description |
|-------|-------------|
| Automated video likes | Automatically likes specified YouTube videos using authenticated browser sessions with human-like interaction timing. |
| Comment like support | Supports liking comments on target videos, enabling workflows similar to a comment like bot for YouTube without manual navigation. |
| Session-aware execution | Each run uses a clean, isolated session to avoid state conflicts and unintended carryover between actions. |
| Rate-controlled actions | All likes are paced with configurable delays to prevent rapid or unnatural interaction patterns. |
| Failure recovery | Handles navigation errors, missing elements, and partial loads with retries and graceful fallbacks. |

## How It Works

| Step | Description |
|-----|-------------|
| Trigger | A video URL or list of URLs is provided as input to the automation runner. |
| Core logic | The system launches a browser session, navigates to the video, validates page state, and performs like or comment-like actions. |
| Output | Successful likes are logged with timestamps and execution metadata for traceability. |
| Safety controls | Includes rate limiting, randomized delays, retry caps, and session resets to reduce detection risk. |

## Tech Stack

- Playwright for browser-based YouTube interaction  
- Node.js for orchestration and control flow  
- Docker for environment consistency and deployment  

## Directory Structure Tree

    youtube-video-like-automation/
        config/
            runtime.config.json
        logs/
            execution.log
        scripts/
            likeVideo.js
            likeComment.js
        sessions/
            cookies.store.json
        src/
            browser.js
            executor.js
            safeguards.js
        package.json
        Dockerfile
        README.md

## Use Cases

- QA engineers use it to validate YouTube interaction flows, so they can test engagement logic reliably.  
- Content teams use it to like internal test videos, so they can verify visibility and UI behaviour.  
- Automation engineers use it to simulate controlled engagement, so they can benchmark interaction timing.  
- Tooling teams use it to prototype a free YouTube like bot workflow in staging environments, so they can assess feasibility safely.  

## FAQs

**What environment is required to run this project?**  
A system with Node.js 18+, Docker (optional), and a supported Chromium-based browser is required.

**Does it support both video likes and comment likes?**  
Yes. The automation can like videos and selected comments, similar to a YouTube like and comment bot, depending on configuration.

**Are there safeguards against excessive actions?**  
All actions are rate-limited and capped per run to prevent uncontrolled behaviour.

**Is this suitable for large-scale parallel execution?**  
It is designed for controlled scaling. Running too many sessions in parallel is intentionally restricted by default.

## Performance & Reliability Benchmarks

- Average execution time per video: 6–10 seconds  
- Observed success rate: ~92% under stable network conditions  
- Recommended concurrency limit: 3–5 sessions per machine  
- Memory usage: ~300–400 MB per active browser session  
- Automatic recovery from transient failures such as slow loads or missing UI elements is built in, with capped retries to avoid infinite loops  


<p align="center">
<a href="https://cal.com/app-pilot-m8i8oo/30min" target="_blank">
 <img src="https://img.shields.io/badge/Book%20a%20Call%20with%20Us-34A853?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Book a Call">
</a>
 <a href="https://www.youtube.com/@Appilot-app/videos" target="_blank">
  <img src="https://img.shields.io/badge/ð¥%20Watch%20demos%20-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch on YouTube">
 </a>
</p>
