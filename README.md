# 🎲 Yatsy Digital Protokoll

En modern webbaserad ersättning för papper och penna när ni spelar Yatsy! Ingen mer fladdrar av papper runt spelbordet.

## ✨ Funktioner

- **📝 Spelarlista**: Lägg till och ta bort spelare dynamiskt
- **🎯 Komplett poängtabell**: Alla 15 Yatsy-kategorier (övre + nedre sektionen)
- **🧮 Automatisk räkning**: Summa, bonus och totalt räknas automatiskt
- **👆 Klickbar poängifyllning**: Klicka på rutorna för att fylla i poäng
- **📊 Spelhistorik**: Sparar automatiskt alla avslutade spel lokalt
- **📱 Mobilanpassad**: Perfekt för användning runt spelbordet
- **🏆 Vinnare**: Automatisk ranking när spelet är slut

## 🚀 Komma igång

### Utveckling

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Öppna http://localhost:3000 i webbläsaren
```

### Produktion

```bash
# Bygga för produktion
npm run build

# Starta produktionsserver
npm start
```

## 🎮 Hur man spelar

1. **Lägg till spelare**: Skriv in spelarnas namn (minst 2 spelare)
2. **Starta spel**: Klicka på "Starta Spel"
3. **Fyll i poäng**: Klicka på rutorna i tabellen för att mata in poäng
4. **Automatisk räkning**: Summa, bonus (50p vid ≥63 i övre sektionen) och totalt räknas automatiskt
5. **Se vinnaren**: När alla 13 kategorier är ifyllda visas resultatet

## 🎲 Yatsy-regler

### Övre sektionen (1-6)
- **Ettorna - Sexorna**: Summan av alla tärningar med det värdet

### Nedre sektionen
- **Triss**: Summan av alla tärningar (om minst 3 lika)
- **Fyrtal**: Summan av alla tärningar (om minst 4 lika)
- **Kåk**: 25 poäng (om triss + par)
- **Liten stege**: 30 poäng (om 1-2-3-4 eller 2-3-4-5 eller 3-4-5-6)
- **Stor stege**: 40 poäng (om 1-2-3-4-5 eller 2-3-4-5-6)
- **Yatsy**: 50 poäng (om alla 5 tärningar lika)
- **Chans**: Summan av alla tärningar

## 🛠 Tech Stack

- **Next.js 15.5** - React-ramverk
- **TypeScript** - Typsäkerhet
- **Tailwind CSS** - Styling
- **localStorage** - Lokal datalagring

## 📱 Mobilanpassning

Appen är helt responsiv och fungerar perfekt på:
- 📱 Mobiler
- 📟 Surfplattor
- 💻 Datorer

Perfekt för att lägga mobilen på bordet och dela poängtabellen!

## 🎯 Funktioner som kan läggas till

- Export till PDF
- Online multiplayer
- Tärningssimulator
- Statistik per spelare
- Anpassade spelregler

## 🐛 Rapportera problem

Om du hittar buggar eller har förslag på förbättringar, skapa gärna en issue!

---

**Utvecklat för att göra Yatsy-kvällar smidigare och roligare! 🎲✨**