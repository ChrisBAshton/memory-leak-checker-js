=======
memory-leak-checker-js
======================

Realtime memory-leak scanner for JavaScript

## Intro

This is still in the early experimentation stage.

On instantiation, check the window object and count number of properties.

In a setTimeout loop, keep checking the window object and console log a warning if something is added to the global scope, thereby spotting a memory leak!