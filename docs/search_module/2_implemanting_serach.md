# Implementing Search

## STEP 1: install langchain

```bash
    npm install langchain
    npm i @langchain/openai
```


## STEP 3: backend Create a new file `search.ts` in the `services` folder


## STEP 4: expose an endpoint to search


## STEP 5: test with curl

```bash
    curl -X POST -H "Content-Type: application/json" -d '{"query":"movie to make me cry"}' http://localhost:3000/search
```

## STEP 6: Create a search component

```bash
    ng generate component search
```

## STEP 7: explore `store.similaritySearchWithScore(query, count);`
