# StivenFun - Deploy (GitHub + Vercel)

## Wymagania
- Node.js 18+

## Lokalnie
- Dev: `npm run dev`
- Build: `npm run build`
- Preview builda: `npm run preview`

## Upload na GitHub
1. `git init`
2. `git add .`
3. `git commit -m "Initial deploy setup"`
4. Utwórz repo na GitHub.
5. `git remote add origin <URL_REPO>`
6. `git branch -M main`
7. `git push -u origin main`

## Deploy na Vercel
1. Zaloguj się do Vercel i kliknij **New Project**.
2. Wybierz repo z GitHub.
3. Framework: **Other** (auto).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.
