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

## Re-creating the issue

* Start the dev server - `npm run dev`
* Start zero cache - `npm run dev:zero-cache`
* Open `localhost:4000/messages`

You should see the following output

```
re-rendering messages page
calling query, what are props? id desc
messages count 0 {type: 'unknown'}

re-rendering messages page
calling query, what are props? id desc
messages count 0 {type: 'unknown'}

re-rendering messages page
calling query, what are props? id desc
messages count 1000 {type: 'complete'}
```

This is good and what we expect!

* Now click on the `Other Page` link and then back on the `Messages` link

You should see the following output

```
re-rendering messages page
calling query, what are props? id desc
messages count 0 {type: 'unknown'}

re-rendering messages page
calling query, what are props? id desc
messages count 0 {type: 'unknown'}

re-rendering messages page
calling query, what are props? id desc
messages count 1000 {type: 'complete'}

re-rendering messages page
calling query, what are props? id desc
messages count 0 {type: 'complete'}

re-rendering messages page
calling query, what are props? id desc
messages count 1000 {type: 'complete'}
```

The flicker occurs when we go from `messages count 1000 {type: 'complete'}` to `messages count 0 {type: 'complete'}`
and back to `messages count 1000 {type: 'complete'}`
