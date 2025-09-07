@echo off
echo 🏠 Setting up AI Retrofit...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install:all

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create environment files if they don't exist
echo 🔧 Setting up environment files...

if not exist "apps\web\.env.local" (
    echo Creating apps\web\.env.local...
    (
        echo # Supabase Configuration
        echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        echo SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
        echo.
        echo # API Configuration
        echo NEXT_PUBLIC_API_URL=http://localhost:3000
    ) > apps\web\.env.local
    echo ✅ Created apps\web\.env.local
) else (
    echo ✅ apps\web\.env.local already exists
)

if not exist "apps\mobile\.env" (
    echo Creating apps\mobile\.env...
    (
        echo # Supabase Configuration
        echo EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
        echo EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        echo.
        echo # API Configuration
        echo EXPO_PUBLIC_API_URL=http://localhost:3000
    ) > apps\mobile\.env
    echo ✅ Created apps\mobile\.env
) else (
    echo ✅ apps\mobile\.env already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Create a Supabase project at https://supabase.com
echo 2. Run the database schema from database\schema.sql in your Supabase SQL editor
echo 3. Update the environment files with your Supabase credentials
echo 4. Run 'npm run dev' to start both web and mobile apps
echo.
echo For detailed instructions, see README.md
pause
