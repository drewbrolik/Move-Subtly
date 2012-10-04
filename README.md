Move-Subtly
===========

Move Subtly is a jQuery plugin that takes any image and turns it into a subtly moving/scaling image.

## Documentation

### Basic usage

```javascript
$("img").moveSubtly();
$("img").moveSubtly({
	moveTime:4000,
	stillTime:2000,
	percentageChange:6%,
	lockSide:"random",
	loop:true
});
```

### Default Options

```javascript
{
	moveTime:4000,
	stillTime:2000,
	percentageChange:6%,
	lockSide:"random",
	loop:true
}
```