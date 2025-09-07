# 🗄️ Database Management

This directory contains all Supabase database configuration, migrations, and management scripts for the AI Retrofit project.

## 📁 Structure

```
supabase/
├── config.toml          # Supabase project configuration
├── migrations/          # Database migration files
│   └── 20250907173703_create_intercom_tables.sql
├── seed.sql            # Initial data seeding
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Start Local Development

```bash
# Start local Supabase instance
npm run db:start

# This will start:
# - PostgreSQL database on port 54322
# - Supabase API on port 54321
# - Supabase Studio on port 54323
```

### 2. Apply Migrations

```bash
# Apply all migrations to local database
npm run db:migrate

# Or reset and apply all migrations
npm run db:reset
```

### 3. Seed Database

```bash
# Add initial data
npm run db:seed
```

### 4. Generate TypeScript Types

```bash
# Generate types from current database schema
npm run db:generate-types
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:start` | Start local Supabase development environment |
| `npm run db:stop` | Stop local Supabase |
| `npm run db:reset` | Reset database and apply all migrations |
| `npm run db:migrate` | Push migrations to remote database |
| `npm run db:studio` | Open Supabase Studio (web interface) |
| `npm run db:seed` | Run seed.sql to populate initial data |
| `npm run db:generate-types` | Generate TypeScript types from schema |

## 🔧 Development Workflow

### Creating New Migrations

```bash
# Create a new migration
npx supabase migration new your_migration_name

# This creates a file in supabase/migrations/
# Edit the file with your SQL changes
```

### Working with Remote Database

```bash
# Link to your remote Supabase project
npx supabase link --project-ref YOUR_PROJECT_REF

# Push migrations to remote
npm run db:migrate

# Pull remote schema changes
npx supabase db pull
```

### Database Studio

Access the web interface at http://localhost:54323 when running locally, or use your project's Supabase dashboard for remote.

## 📊 Database Schema

### Tables

#### `intercom_actions`
Tracks all intercom-related actions performed by users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to auth.users |
| `action` | TEXT | Type of action ('buzz', 'status_check') |
| `status` | TEXT | Action status ('pending', 'success', 'failed') |
| `created_at` | TIMESTAMP | When action was created |
| `completed_at` | TIMESTAMP | When action was completed |
| `error_message` | TEXT | Error message if failed |

#### `intercom_status`
Tracks the current status of the intercom system.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `is_online` | BOOLEAN | Whether intercom is online |
| `last_buzz` | TIMESTAMP | Last time intercom was buzzed |
| `battery_level` | INTEGER | Battery level (0-100) |
| `signal_strength` | INTEGER | Signal strength (0-100) |
| `updated_at` | TIMESTAMP | Last update time |

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only view their own intercom actions
- Authenticated users can view intercom status
- All operations are logged for audit purposes

## 🔐 Environment Variables

Make sure these are set in your environment files:

**Local Development:**
```env
# These are automatically set when using local Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
```

**Production:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 54321-54323 are available
2. **Migration errors**: Check SQL syntax in migration files
3. **Type generation fails**: Ensure database is running and accessible
4. **RLS policies**: Verify user authentication is working

### Reset Everything

```bash
# Stop Supabase
npm run db:stop

# Remove all data and start fresh
npx supabase db reset

# Start again
npm run db:start
```

## 📚 Resources

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Database Migrations Guide](https://supabase.com/docs/guides/database/migrations)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
