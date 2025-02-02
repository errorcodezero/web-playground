# Web Playground

Created for [raspapi.hackclub.com](raspapi.hackclub.com). Essentially imagine an area where you can alter the environment with others around you and hide secrets. That's what the idea of this is. It's an api to let you do that.

# API Docs

## GET /

Returns the emojis that make up the grid. They may look like this for example:
```
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
```

## POST /set

Changes one of the tiles on the grid to the input tile sent by the user. Example input is as such:

```json
{
    "x": 5,
    "y": 7,
    "input": "Red"
}
```

- x and y are whole numbers less than 12
- input is Red, Orange, Yellow, Green, Blue, Purple, Brown, White, Black

Returns empty text.

## POST /setSecret

Sets the secret of a certain coordinate.

```json
{
    "x": 5,
    "y": 7,
    "input": "😎"
}
```

- x and y are whole numbers less than 12
- input is a valid emoji

Returns empty text.

## POST /search

Searches for a secret at the coords sent by the user. Example input is as such:

```json
{
    "x": 5,
    "y": 7
}
```

- x and y are whole numbers less than 12

If there is a secret at the location, you will get a response similar to such:

```json
{
    "secret": "😎",
}
```

Else, you will get a response as such:

```json
{
    "secret": ""
}
```

## GET /changes

### /

Returns the total amount of changes done to the grid as text. For example:

```
100
```

### /outside

Returns the total amount of changes done to the tiles. For example:

```
75
```

### /inside

Returns the total amount of changes done to the secrets. For example:

```
25
```
