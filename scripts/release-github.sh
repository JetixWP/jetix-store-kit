#!/bin/bash
#
# Build a release zip using already-installed dependencies (no npm/composer install).
# Intended for use in CI / GitHub Actions where deps are pre-installed.
#
# Usage:  ./scripts/release-github.sh
# Output: build/jetix-store-toolkit.zip  (and build/jetix-store-toolkit/ as the source folder)
#
set -euo pipefail

PLUGIN_SLUG="jetix-store-toolkit"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PLUGIN_DIR/build"
DEST_DIR="$BUILD_DIR/$PLUGIN_SLUG"

# Read version from the main plugin file header.
VERSION=$(grep -m1 "Version:" "$PLUGIN_DIR/$PLUGIN_SLUG.php" | sed 's/.*Version:[[:space:]]*//' | xargs)

echo "==> Building $PLUGIN_SLUG v$VERSION (GitHub mode — skipping install steps)"

# 1. Clean previous build.
rm -rf "$BUILD_DIR"
mkdir -p "$DEST_DIR"

cd "$PLUGIN_DIR"

# 2. Compile assets (assumes node_modules already present).
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

# 3. Copy plugin files — include/exclude lists are defined in package.json["release"].
echo "==> Copying plugin files..."

INCLUDE=()
while IFS= read -r line; do
	INCLUDE+=("$line")
done < <(node -e "const r=require('./package.json').release||{}; (r.include||[]).forEach(e=>console.log(e))")

EXCLUDE=()
while IFS= read -r line; do
	EXCLUDE+=("$line")
done < <(node -e "const r=require('./package.json').release||{}; (r.exclude||[]).forEach(e=>console.log(e))")

EXCLUDE_FLAGS=()
for pattern in "${EXCLUDE[@]}"; do
	EXCLUDE_FLAGS+=("--exclude=$pattern")
done

for entry in "${INCLUDE[@]}"; do
	src="$PLUGIN_DIR/$entry"
	if [ -d "$src" ]; then
		mkdir -p "$DEST_DIR/$entry"
		rsync -a "${EXCLUDE_FLAGS[@]}" "$src/" "$DEST_DIR/$entry/"
	elif [ -f "$src" ]; then
		cp "$src" "$DEST_DIR/$entry"
	else
		echo "    (skipping '$entry' — not found)"
	fi
done

# 4. Create the zip.
echo "==> Creating zip archive..."
cd "$BUILD_DIR"
zip -qr "$PLUGIN_SLUG.zip" "$PLUGIN_SLUG/"

ZIP_SIZE=$(du -h "$PLUGIN_SLUG.zip" | cut -f1 | xargs)
echo "==> Done! build/$PLUGIN_SLUG.zip ($ZIP_SIZE)"
