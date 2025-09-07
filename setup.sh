#!/bin/bash

# AI Retrofit Setup Script
echo "🏠 Setting up AI Retrofit..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f "web/.env.local" ]; then
    echo "Creating web/.env.local..."
    cat > web/.env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF
    echo "✅ Created web/.env.local"
else
    echo "✅ web/.env.local already exists"
fi

if [ ! -f "mobile/.env" ]; then
    echo "Creating mobile/.env..."
    cat > mobile/.env << EOF
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
EOF
    echo "✅ Created mobile/.env"
else
    echo "✅ mobile/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Run the database schema from database/schema.sql in your Supabase SQL editor"
echo "3. Update the environment files with your Supabase credentials"
echo "4. Run 'npm run dev' to start both web and mobile apps"
echo ""
echo "For detailed instructions, see README.md"
