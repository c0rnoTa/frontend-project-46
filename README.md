# GenDiff

Hexlet tests and linter status

[![Actions Status](https://github.com/c0rnoTa/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/c0rnoTa/frontend-project-46/actions)
[![tests](https://github.com/c0rnoTa/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/c0rnoTa/frontend-project-46/actions/workflows/tests.yml)
[![eslint](https://github.com/c0rnoTa/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/c0rnoTa/frontend-project-46/actions/workflows/linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/3a2cbf12eabe0fcc1378/maintainability)](https://codeclimate.com/github/c0rnoTa/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3a2cbf12eabe0fcc1378/test_coverage)](https://codeclimate.com/github/c0rnoTa/frontend-project-46/test_coverage)

### gendiff JSON
[![asciicast](https://asciinema.org/a/pdqEddzfdDvZAP65OwI6L2dgb.svg)](https://asciinema.org/a/pdqEddzfdDvZAP65OwI6L2dgb)

### gendiff YAML
[![asciicast](https://asciinema.org/a/z2GoaBOrr2qreDEuJbkAtDUET.svg)](https://asciinema.org/a/z2GoaBOrr2qreDEuJbkAtDUET)

### gediff stylish format
[![asciicast](https://asciinema.org/a/nyquPJyGNoQgQf1LF0c63cGa4.svg)](https://asciinema.org/a/nyquPJyGNoQgQf1LF0c63cGa4)

### gediff plain format
[![asciicast](https://asciinema.org/a/sxtqz4imseduvaDgq5rJ1XvO1.svg)](https://asciinema.org/a/sxtqz4imseduvaDgq5rJ1XvO1)

### gendiff JSON format
[![asciicast](https://asciinema.org/a/fMWCol6gaWgxHqJI388EbMvM5.svg)](https://asciinema.org/a/fMWCol6gaWgxHqJI388EbMvM5)

## AST design

В каждом узле AST мне нужно знать:

1. Имя ключа - тип "срока".
2. Статус ключа - тип "строка", где значение может быть одно из следующих: 
  - "неизменён" - ключ есть в исходном и в целевом сравниваемом объекте одинакого типа, тип значения ключа простой или массив;
  - "добавлен" - ключ есть только в целевом объекте;
  - "удалён" - ключ есть только в исходном объекте;
  - "изменён" - ключ есть в исходном и в целевом сравниваемом объекте; либо тип значения ключа одинаковый: простой или массив, и поменялось его содержимое, либо изменился тип значения ключа;
  - "объект" - ключ есть в исходном и в целевом сравниваемом объекте, тип значения ключа одинковый - объект (не массив).
3. Значение ключа (для ключа со статусом "изменён" будет значение ДО и значение ПОСЛЕ той же структуры, что представлено ниже) - тип "объект", где атрибутами объекта являются:
3.1. Тип данных - тип "строка", где значение может быть одного из следующих:
   - "простое значение" (для данных в виде строки, числа, null и всяких undefined, при рендере будут выводиться такие данные как есть и переходить к следующему узлу AST)
   - "массив" (для массива, при рендере будут выводиться только значения из массива, обёрнутые в [])
   - "объект" (для объекта, при рендере будет выводиться каждый элемент массива как ключ и значение, обёрнут в {}, такой тип данных может быть только при изменении типа данных и нужен для сортировки ключей)
3.1.1. Если тип данных (пункт 3.1) - "массив", то данные в значении ключа AST (пункт 3.2) - это массив объектов, где каждый объект имеет атрибуты "тип данных" и "данные", по аналогии с значением ключа AST (пункт 3).
3.1.2. Для типа данных (пункт 3.1) - "объект", то данные в значении ключа AST (пункт 3.2) - это двумерный массив, где каждый элемент массива - это массив из имени ключа объекта (отсортирован) и объекта с атрибутами "тип данных" и "данные", по аналогии с значением ключа AST (пункт 3).
3.2. Данные - это либо простое значение (типа строка, число, null и всякие undefined), либо массив (3.1.1 и 3.1.2).
4. Дочерний узел AST (если статус ключа, пункт 2 - "объект")


```
[
  {
    имя: "addedComplex",
    статус: "добавлен",
    значение: {
      тип: "массив",
      данные: [
        {
          тип: "простое значение",
          данные: "a"
        },
        {
          тип: "объект",
          данные: [
            ["object", {
              тип: "простое значение",
              данные: "bar"
            }],
            ["unsorted", {
              тип: "простое значение",
              данные: "foo"
            }]
          ]
        }
      ]
    }
  },
  {
    имя: "sameSimple",
    статус: "неизменён",
    значение: {
      тип: "простое значение",
      данные: 1
    }
  }
]
```