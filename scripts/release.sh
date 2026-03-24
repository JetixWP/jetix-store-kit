#!/bin/bash
#
# Build a distributable release zip for Store Kit for WooCommerce.
#
# Usage:  ./scripts/release.sh
# Output: build/store-kit.zip  (and build/store-kit/ as the source folder)
#
set -euo pipefail

PLUGIN_SLUG="store-kit"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PLUGIN_DIR/build"
DEST_DIR="$BUILD_DIR/$PLUGIN_SLUG"

# Read version from the main plugin file header.
VERSION=$(grep -m1 "Version:" "$PLUGIN_DIR/$PLUGIN_SLUG.php" | sed 's/.*Version:[[:space:]]*//' | xargs)

echo "==> Building $PLUGIN_SLUG v$VERSION"

# 1. Clean previous build.
rm -rf "$BUILD_DIR"
mkdir -p "$DEST_DIR"

# 2. Install production dependencies and compile assets.
echo "==> Installing dependencies..."
cd "$PLUGIN_DIR"
npm ci --ignore-scripts 2>/dev/null || npm install --ignore-scripts 2>/dev/null

echo "==> Compiling assets..."
npm run build

# 2b. Generate translation template.
if command -v wp &> /dev/null; then
	echo "==> Generating .pot file..."
	mkdir -p "$PLUGIN_DIR/languages"
	wp i18n make-pot "$PLUGIN_DIR" "$PLUGIN_DIR/languages/$PLUGIN_SLUG.pot" \
		--slug="$PLUGIN_SLUG" --domain="$PLUGIN_SLUG" \
		--exclude=node_modules,build,action-plan --merge
else
	echo "==> WP-CLI not found, skipping .pot generation."
fi

# 3. Copy plugin files (exclude dev-only files).
echo "==> Copying plugin files..."

# Directories to include.
rsync -a --exclude="*.map" "$PLUGIN_DIR/assets/" "$DEST_DIR/assets/"
rsync -a "$PLUGIN_DIR/includes/" "$DEST_DIR/includes/"

# Root files to include.
for file in store-kit.php uninstall.php readme.txt; do
	if [ -f "$PLUGIN_DIR/$file" ]; then
		cp "$file" "$DEST_DIR/$file"
	fi
done

# Include languages dir if it exists.
if [ -d "$PLUGIN_DIR/languages" ]; then
	rsync -a "$PLUGIN_DIR/languages/" "$DEST_DIR/languages/"
fi

# 4. Create the zip.
echo "==> Creating zip archive..."
cd "$BUILD_DIR"
zip -qr "$PLUGIN_SLUG.zip" "$PLUGIN_SLUG/"

ZIP_SIZE=$(du -h "$PLUGIN_SLUG.zip" | cut -f1 | xargs)
echo "==> Done! build/$PLUGIN_SLUG.zip ($ZIP_SIZE)"
