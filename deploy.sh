pnpm run build

cd dist

echo 'yahoo.messenger' > CNAME

git init
git add -A
git commit -m "deploy"

cd ..

git subtree push --prefix dist origin gh-pages