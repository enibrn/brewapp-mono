# Esempi di Markdown

Questa pagina contiene esempi di sintassi Markdown che puoi utilizzare come riferimento.

## Intestazione 2

### Intestazione 3

#### Intestazione 4

##### Intestazione 5

###### Intestazione 6

## Testo formattato

Prova **Testo in grassetto**

Prova *Testo in corsivo*

***Testo in grassetto e corsivo***

~~Testo barrato~~

## Liste

### Lista non ordinata

* Elemento 1
* Elemento 2
  * Sotto-elemento 2.1
  * Sotto-elemento 2.2
* Elemento 3

### Lista ordinata

1. Primo elemento
2. Secondo elemento
   1. Sotto-elemento 2.1
   2. Sotto-elemento 2.2
3. Terzo elemento

### Lista di attività

* [x] Attività completata
* [ ] Attività da completare
* [ ] Altra attività da completare

## Link

[Link a Google](https://www.google.com)

[Link con titolo](https://www.example.com "Titolo del link")

URL diretto: <https://www.example.com>

## Immagini

![Testo alternativo](https://via.placeholder.com/150 "Titolo dell'immagine")

## Citazioni (Blockquote)

> Questa è una citazione.
>
> Può estendersi su più paragrafi.
>
> > È possibile annidare le citazioni.

## Linee orizzontali

---

## Tabelle

| Intestazione 1 | Intestazione 2 | Intestazione 3 |
|----------------|----------------|----------------|
| Cella 1        | Cella 2        | Cella 3        |
| Cella 4        | Cella 5        | Cella 6        |

| Allineamento a sinistra | Allineamento al centro | Allineamento a destra |
|:------------------------|:----------------------:|------------------------:|
| Testo                   | Testo                  | Testo                   |
| Altro testo             | Altro testo            | Altro testo             |

## Codice

Codice inline: `var example = "hello";`

### Blocchi di codice con evidenziazione della sintassi

#### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Hello, ${name}!`;
}

// Chiamata della funzione
greet("World");
```

#### Python

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Calcola il fattoriale di 5
result = factorial(5)
print(f"Il fattoriale di 5 è {result}")
```

#### HTML

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Esempio HTML</title>
</head>
<body>
    <h1>Ciao, mondo!</h1>
    <p>Questo è un paragrafo di esempio.</p>
</body>
</html>
```

#### CSS

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}
```

## Note a piè di pagina

Ecco una nota a piè di pagina[^1].

[^1]: Questa è la nota a piè di pagina.

## Evidenziazione

==Testo evidenziato== (supportato in alcune implementazioni Markdown)
