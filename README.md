# @lunjs/decode-uri-component

### Code points

1. Code points range: `0x0000` - `0x10FFFF`
2. Hight surrogate area: `0xD800` - `0xDBFF`
3. Low surrogate area: `0xDC00` - `0xDFFF`

### Ranges

- `00..7F`

|      | Unicode | Binary   | Hex  |
| --   | --      | --       | --   |
| From | 0x00    | 00000000 | 0x00 |
| To   | 0x7F    | 01111111 | 0x7F |

- `C2..DF 80..BF`

|      | Unicode | Binary            | Hex       |
| --   | --      | --                | --        |
| From | 0x0080  | 11000010 10000000 | 0xC2 0x80 |
| To   | 0x07FF  | 11011111 10111111 | 0xDF 0xBF |

- `E0..E0 A0..BF 80..BF`

|      | Unicode | Binary                     | Hex            |
| --   | --      | --                         | --             |
| From | 0x0800  | 11100000 10100000 10000000 | 0xE0 0xA0 0x80 |
| To   | 0x0FFF  | 11100000 10111111 10111111 | 0xE0 0xBF 0xBF |

- `E1..EC 80..BF 80..BF`

|      | Unicode | Binary                     | Hex            |
| --   | --      | --                         | --             |
| From | 0x1000  | 11100001 10000000 10000000 | 0xE1 0x80 0x80 |
| To   | 0xCFFF  | 11101100 10111111 10111111 | 0xEC 0xBF 0xBF |

- `ED..ED 80..9F 80..BF`

|      | Unicode | Binary                     | Hex            |
| --   | --      | --                         | --             |
| From | 0xD000  | 11101101 10000000 10000000 | 0xED 0x80 0x80 |
| To   | 0xD7FF  | 11101101 10011111 10111111 | 0xED 0x9F 0xBF |

- `EE..EF 80..BF 80..BF`

|      | Unicode | Binary                     | Hex            |
| --   | --      | --                         | --             |
| From | 0xE000  | 11101110 10000000 10000000 | 0xEE 0x80 0x80 |
| To   | 0xFFFF  | 11101111 10111111 10111111 | 0xEF 0xBF 0xBF |

- `F0..F0 90..BF 80..BF 80..BF`

|      | Unicode  | Binary                              | Hex                 |
| --   | --       | --                                  | --                  |
| From | 0x10000  | 11110000 10010000 10000000 10000000 | 0xF0 0x90 0x80 0x80 |
| To   | 0x3FFFF  | 11110000 10111111 10111111 10111111 | 0xF0 0xBF 0xBF 0xBF |

- `F1..F3 80..BF 80..BF 80..BF`

|      | Unicode  | Binary                              | Hex                 |
| --   | --       | --                                  | --                  |
| From | 0x40000  | 11110001 10000000 10000000 10000000 | 0xF1 0x80 0x80 0x80 |
| To   | 0xFFFFF  | 11110011 10111111 10111111 10111111 | 0xF3 0xBF 0xBF 0xBF |

- `F4..F4 80..8F 80..BF 80..BF`

|      | Unicode   | Binary                              | Hex                 |
| --   | --        | --                                  | --                  |
| From | 0x100000  | 11110100 10000000 10000000 10000000 | 0xF4 0x80 0x80 0x80 |
| To   | 0x10FFFF  | 11110100 10001111 10111111 10111111 | 0xF4 0x8F 0xBF 0xBF |

### DFA with range transitions

![DFA with range transitions](https://raw.githubusercontent.com/lunjs/decode-uri-component/master/dfa-bytes.svg)

### type

| bytes  | type |
| --     | --   |
| 00..7F | 0    |
| 80..8F | 1    |
| 90..9F | 2    |
| A0..BF | 3    |
| C0..C1 | 4    |
| C2..DF | 5    |
| E0..E0 | 6    |
| E1..EC | 7    |
| ED..ED | 8    |
| EE..EF | 7    |
| F0..F0 | 9    |
| F1..F3 | 10   |
| F4..F4 | 11   |
| F5..FF | 4    |

### DFA with class transitions

![DFA with class transitions](https://raw.githubusercontent.com/lunjs/decode-uri-component/master/dfa-classes.svg)

### state

- ACCEPT: `0`
- REJECT: `12`

- `00..7F`

```
    0  1  2  3  4  5  6  7  8  9

0   0
1         12
```

- `C2..DF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13
1         12 12 0  0  0  12 12 12
2   12 12 12 12 12 12
```

- `E0..E0 A0..BF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26
1         12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12
```

- `E1..EC 80..BF 80..BF`
- `EE..EF 80..BF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26 39
1         12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12 12
4   13 13 13 12 12 12 12 12 12 12
5   12 12
```

- `ED..ED 80..9F 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26 39 52
1         12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12 12
4   13 13 13 12 12 12 12 12 12 12
5   12 12 12 13 13 12 12 12 12 12
6   12 12 12 12 12
```

- `F0..F0 90..BF 80..BF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26 39 52 65
1         12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12 12
4   13 13 13 12 12 12 12 12 12 12
5   12 12 12 13 13 12 12 12 12 12
6   12 12 12 12 12 12 12 39 39 12
7   12 12 12 12 12 12 12 12
```

- `F1..F3 80..BF 80..BF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26 39 52 65
1   78    12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12 12
4   13 13 13 12 12 12 12 12 12 12
5   12 12 12 13 13 12 12 12 12 12
6   12 12 12 12 12 12 12 39 39 12
7   12 12 12 12 12 12 12 12 12 39
8   39 39 12 12 12 12 12 12 12 12
9   12
```

- `F4..F4 80..8F 80..BF 80..BF`

```
    0  1  2  3  4  5  6  7  8  9

0   0  12 12 12 12 13 26 39 52 65
1   78 91 12 12 0  0  0  12 12 12
2   12 12 12 12 12 12 12 12 12 13
3   12 12 12 12 12 12 12 12 12 12
4   13 13 13 12 12 12 12 12 12 12
5   12 12 12 13 13 12 12 12 12 12
6   12 12 12 12 12 12 12 39 39 12
7   12 12 12 12 12 12 12 12 12 39
8   39 39 12 12 12 12 12 12 12 12
9   12 12 39 12 12 12 12 12 12 12
10  12 12 12 12
```


## Acknowledgements

- [delvedor/fast-decode-uri-component](https://github.com/delvedor/fast-decode-uri-component)
- [jridgewell/safe-decode-uri-component](https://github.com/jridgewell/safe-decode-uri-component)
- [Flexible and Economical UTF-8 Decoder](http://bjoern.hoehrmann.de/utf-8/decoder/dfa/)

## License

- [lunjs/decode-uri-componen - MIT](https://github.com/lunjs/decode-uri-componen/blob/master/LICENSE)
- [delvedor/fast-decode-uri-component - MIT](https://github.com/delvedor/fast-decode-uri-component/blob/master/LICENSE)
- [jridgewell/safe-decode-uri-component - MIT](https://github.com/jridgewell/safe-decode-uri-component/blob/master/LICENSE)
