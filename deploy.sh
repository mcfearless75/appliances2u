#!/usr/bin/env sh
# Build the site and publish dist/ to the gh-pages branch (served by GitHub Pages).
set -e
cd "$(dirname "$0")"
node build.mjs
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f -q "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Deployed to gh-pages"
