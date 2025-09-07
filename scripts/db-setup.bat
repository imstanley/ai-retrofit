@echo off
echo 🗄️ Setting up AI Retrofit Database...

echo.
echo 1. Starting Supabase local development...
call npx supabase start

echo.
echo 2. Applying migrations...
call npx supabase db push

echo.
echo 3. Seeding database...
call npx supabase db seed

echo.
echo 4. Generating TypeScript types...
call npx supabase gen types typescript --local > packages\shared\src\types\database.ts

echo.
echo ✅ Database setup complete!
echo.
echo Available commands:
echo   npm run db:start     - Start local Supabase
echo   npm run db:stop      - Stop local Supabase
echo   npm run db:studio    - Open Supabase Studio
echo   npm run db:reset     - Reset database
echo   npm run db:migrate   - Push migrations to remote
echo.
echo Local Supabase is running at:
echo   API URL: http://localhost:54321
echo   Studio: http://localhost:54323
echo.
pause
