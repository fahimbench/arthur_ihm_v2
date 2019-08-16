#!/bin/bash

git config credential.helper store
git pull origin master
npm install
npm update
npm run build -- --mode production