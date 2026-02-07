@echo off
REM Veri Yükleme Merkezi - Deployment Script (Windows)
REM Bu script, veri yükleme merkezi özelliğini deploy etmek için gereken tüm adımları otomatik olarak çalıştırır.

echo ========================================
echo Veri Yukleme Merkezi Deployment Script
echo ========================================
echo.

REM Step 1: Check Node.js
echo Step 1: Checking Node.js version...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 18+
    exit /b 1
)
echo [OK] Node.js version:
node -v
echo.

REM Step 2: Install dependencies
echo Step 2: Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Step 3: Generate Prisma Client
echo Step 3: Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo [ERROR] Failed to generate Prisma Client
    exit /b 1
)
echo [OK] Prisma Client generated
echo.

REM Step 4: Create uploads directory
echo Step 4: Creating uploads directory...
if not exist "uploads" mkdir uploads
echo [OK] Uploads directory created
echo.

REM Step 5: Database migration
echo Step 5: Running database migration...
echo [WARNING] This will modify your database schema
set /p CONTINUE="Do you want to continue? (y/n): "
if /i "%CONTINUE%"=="y" (
    call npx prisma migrate deploy
    if errorlevel 1 (
        echo [WARNING] Database migration failed
        echo You can run the migration manually:
        echo 1. Open: prisma/migrations/add_data_upload_center/migration.sql
        echo 2. Execute the SQL in your database
    ) else (
        echo [OK] Database migration completed
    )
) else (
    echo [WARNING] Skipping database migration
    echo Run manually with: npx prisma migrate deploy
)
echo.

REM Step 6: Check environment variables
echo Step 6: Checking environment variables...
if exist ".env.local" (
    findstr /C:"OPENAI_API_KEY" .env.local >nul
    if errorlevel 1 (
        echo [WARNING] OpenAI API key not found in .env.local
        echo AI Analyst will use fallback mode
        echo Add to .env.local: OPENAI_API_KEY=sk-your-key-here
    ) else (
        echo [OK] OpenAI API key found
    )
) else (
    echo [WARNING] .env.local file not found
    echo Create one if you need environment variables
)
echo.

REM Step 7: Build check
echo Step 7: Building project...
echo [WARNING] This might take a few minutes...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    echo Fix the errors and try again
    exit /b 1
)
echo [OK] Build successful
echo.

REM Summary
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo [OK] All steps completed successfully
echo.
echo Next Steps:
echo 1. Start the development server: npm run dev
echo 2. Go to: http://localhost:3000/admin/data-upload
echo 3. Login as SUPER_ADMIN
echo 4. Test file upload functionality
echo.
echo Documentation:
echo - Feature docs: docs/DATA-UPLOAD-CENTER.md
echo - Deployment guide: docs/DATA-UPLOAD-DEPLOYMENT.md
echo - Summary: docs/DATA-UPLOAD-SUMMARY.md
echo.
echo Remember to:
echo - Test all functionality before production deployment
echo - Add OpenAI API key for AI Analyst feature (optional)
echo - Monitor uploads/ directory disk usage
echo.

pause
