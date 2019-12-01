# Virtual Selection

## Summary

🚧

## Background

🚧

## Detailed Design

🚧

### UX

🚧

### Schema

```proto
message VirtualSelection {
  enum Mode {
    BLACK = 0;
    WHITE = 1;
  }
  Mode mode = 1;
  repeated string list = 2;
}
```

## Examples

Given the following source:

```
["1", "2", "3", "4", "5"]
```

### Nothing is selected

```json
{
  "mode": "WHITE",
  "list": []
}
```

or

```json
{
  "mode": "BLACK",
  "list": ["1", "2", "3", "4", "5"]
}
```

**Result:** `[]`

### Everything is selected

```json
{
  "mode": "WHITE",
  "list": ["1", "2", "3", "4", "5"]
}
```

or

```json
{
  "mode": "BLACK",
  "list": []
}
```

**Result:** `["1", "2", "3", "4", "5"]`

### Partial selection

```json
{
  "mode": "WHITE",
  "list": ["2", "3", "5"]
}
```

or

```json
{
  "mode": "BLACK",
  "list": ["1", "4"]
}
```

**Result:** `["2", "3", "5"]`

## FAQ

> **Q:** What if the user manually selects **many** items in a very large list? With this pattern, that will manifest as a very large list in memory.
>
> **A:** To each their own! 🤷‍♀️ This doesn't need to be an up-front concern. The delta between _a scary amount of memory being used_ and _the amount of time a user will reasonably spend manually selecting items_ is large and heavily in favor of memory.
