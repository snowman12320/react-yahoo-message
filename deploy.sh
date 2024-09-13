pnpm run build

cd dist

# need bought domain
echo 'yahoo.messenger.william.name' > CNAME  

# git init
# git add -A
# git commit -m "deploy"

cd ..

# git subtree push --prefix dist origin gh-pages