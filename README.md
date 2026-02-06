# water tracker

a simple app to help my friend remember to drink water

## what it does

- tracks how many glasses you drank today
- reminds you to drink water at intervals you choose
- shows encouraging messages when you log water
- saves your progress (resets each day)
- works on phone and desktop

## how to run

```bash
npm install
npm run dev
```

open localhost:3000

## deploying

easiest way is vercel:
- push to github
- import to vercel
- done

or use vercel cli:
```bash
vercel
```

## how to use

1. click "i drank water" when you finish a glass
2. set reminder interval in the settings
3. enable browser notifications if you want
4. try to hit 8 glasses a day

## tech

- next.js
- react
- typescript
- tailwind

## changing stuff

- messages are in `app/page.tsx` 
- change the goal from 8 to whatever
- colors and fonts in `app/globals.css`

made for a friend who forgets to drink water

