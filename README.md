<!--
title: url scraping
framework: v1
platform: AWS
language: nodeJS
-->

## Setup

```
npm install
serverless deploy
```


## Test

```
npm test
```


## Curl Command

```bash

```curl -XPOST -H "Content-type: application/json" -d '{
   "url" : "https://www.amazon.com/Apple-iPhone-16gb-Space-Unlocked/dp/B00NQGP42Y/"
}' '{{url}}/dev/scraper/'

