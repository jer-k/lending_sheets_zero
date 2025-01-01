# Recreating query flicker in Zero

[Discord Thread](https://discord.com/channels/830183651022471199/1288232858795769917/1322102519987572747)

Basically when running a query, I've been able to see the following outputs

```
re-rendering clients page
clients count 0 {type: 'unknown'}

re-rendering clients page
clients count 101 {type: 'complete'}

re-rendering clients page
clients count 101 {type: 'complete'}

re-rendering clients page
clients count 0 {type: 'complete'}

re-rendering clients page
clients count 101 {type: 'complete'}
```

Which ends up causing a flicker because the count of records goes back to 0. Not entirely sure why this happening.

# Using this repo

I set up the `schema.ts` to be the same as `hello-zero` so you should be able to change the values in `.env` to point
to your local copy and this repo *should* just work.
