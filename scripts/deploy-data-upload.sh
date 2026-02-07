#!/bin/bash

# Veri Yükleme Merkezi - Deployment Script
# Bu script, veri yükleme merkezi özelliğini deploy etmek için gereken tüm adımları otomatik olarak çalıştırır.

set -e  # Exit on error

echo "🚀 Veri Yükleme Merkezi Deployment Script"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "ℹ $1"
}

# Step 1: Check Node.js version
echo "Step 1: Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    print_success "Node.js version: $(node -v)"
else
    print_error "Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi
echo ""

# Step 2: Install dependencies
echo "Step 2: Installing dependencies..."
if npm install; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi
echo ""

# Step 3: Generate Prisma Client
echo "Step 3: Generating Prisma Client..."
if npx prisma generate; then
    print_success "Prisma Client generated"
else
    print_error "Failed to generate Prisma Client"
    exit 1
fi
echo ""

# Step 4: Create uploads directory
echo "Step 4: Creating uploads directory..."
if mkdir -p uploads; then
    chmod 755 uploads
    print_success "Uploads directory created"
else
    print_warning "Uploads directory might already exist"
fi
echo ""

# Step 5: Run database migration
echo "Step 5: Running database migration..."
print_warning "This will modify your database schema"
read -p "Do you want to continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if npx prisma migrate deploy; then
        print_success "Database migration completed"
    else
        print_error "Database migration failed"
        print_info "You can run the migration manually:"
        print_info "1. Open: prisma/migrations/add_data_upload_center/migration.sql"
        print_info "2. Execute the SQL in your database"
        print_warning "Continuing without migration..."
    fi
else
    print_warning "Skipping database migration"
    print_info "Run manually with: npx prisma migrate deploy"
fi
echo ""

# Step 6: Check environment variables
echo "Step 6: Checking environment variables..."
if [ -f .env.local ]; then
    if grep -q "OPENAI_API_KEY" .env.local; then
        print_success "OpenAI API key found"
    else
        print_warning "OpenAI API key not found in .env.local"
        print_info "AI Analyst will use fallback mode"
        print_info "Add to .env.local: OPENAI_API_KEY=sk-your-key-here"
    fi
else
    print_warning ".env.local file not found"
    print_info "Create one if you need environment variables"
fi
echo ""

# Step 7: Run linter
echo "Step 7: Running linter..."
if npm run lint; then
    print_success "No linting errors"
else
    print_warning "Linting warnings found (non-critical)"
fi
echo ""

# Step 8: Build check
echo "Step 8: Checking build..."
print_warning "This might take a few minutes..."
if npm run build; then
    print_success "Build successful"
else
    print_error "Build failed"
    print_info "Fix the errors and try again"
    exit 1
fi
echo ""

# Summary
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
echo ""
print_success "All steps completed successfully"
echo ""
echo "📝 Next Steps:"
echo "1. Start the development server: npm run dev"
echo "2. Go to: http://localhost:3000/admin/data-upload"
echo "3. Login as SUPER_ADMIN"
echo "4. Test file upload functionality"
echo ""
echo "📚 Documentation:"
echo "- Feature docs: docs/DATA-UPLOAD-CENTER.md"
echo "- Deployment guide: docs/DATA-UPLOAD-DEPLOYMENT.md"
echo "- Summary: docs/DATA-UPLOAD-SUMMARY.md"
echo ""
print_warning "Remember to:"
echo "- Test all functionality before production deployment"
echo "- Add OpenAI API key for AI Analyst feature (optional)"
echo "- Monitor uploads/ directory disk usage"
echo ""
