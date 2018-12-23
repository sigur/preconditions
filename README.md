**work in progress**
# Preconditions
Preconditions is a small Javascript library based on TypeScript, which is derived from the Google Java library: Guava.
This version is an "as-is" translation from Java to Javascript of Guava Preconditions class.

See [the Guava official wiki](https://github.com/google/guava/wiki/PreconditionsExplained) for more info.

### Description
The scope of this library is to provide static method utilities to improve readability of code, and to help the calling 
method to collaborate with its caller if it has made an invalid request.

For every method the idea is to provide the possibility of thown an exception:
1. Without error messages;
1. With a static error message string;
1. With a dynamic string for the message. 

The last point is like a template literal, but without the backtick, because it behaves like it but common string interpolation 
are used (double quotes or single quote). Reason is for efficiency, because it's resolved in lazy way, when an error occurs.
Placeholder keys/positions and placeholder values are required for this version. 

### Examples
**Without error message**
```javascript
Preconditions.checkArgument(two < 1);
```

**With static error message**
```javascript
Preconditions.checkArgument(two < 1, 'Number is not less than one');
```

**With dynamic error message**
```javascript
Preconditions.checkArgument(two < 1, 'The param value ${two} is not less than ${one}', {two: 'Two', one: '1'});
Preconditions.checkArgument(two < 1, 'The param value ${0} is not less than ${1}', ['Two', '1']);
```