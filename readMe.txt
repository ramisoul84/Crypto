
1. npx create-react-app cryptography
2. npm i -D react-router-dom
3. npm i react-icons --save


1. npm i gh-pages --save-dev
2. package.json -> "homepage": "https://ramisoul84.github.io/crypto"
3. package.json -> scripts -> 
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
4.
        git init
        git commit -m "first commit"
        git branch -M main
        git remote add origin https://github.com/ramisoul84/rami-suliman.git
        git push -u origin main

5. npm run deploy
