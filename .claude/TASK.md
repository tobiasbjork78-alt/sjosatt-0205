# TASK: Quick-picker för Yatzy-kategorier

**Skapad:** 2026-02-04 03:46
**Projekt:** sjosatt-0205
**Status:** PÅGÅENDE

---

## 🎯 Uppdrag

Implementera quick-picker popup-system för alla Yatzy-kategorier utom Chans. Användaren klickar på en kategori-ruta och får en popup med endast giltiga värden för den kategorin. Chans behåller textfält med validering 5-30.

---

## 📋 Steg

1. [ ] Skapa popup-komponent med dynamiska värden baserat på kategori
2. [ ] Implementera övre sektionens quick-pickers (Ettorna: 0-5, Tvåorna: 0,2,4,6,8,10, etc.)
3. [ ] Implementera nedre sektionens quick-pickers (Par: 0,2,4,6,8,10,12, Två par: 0,6,8,10,12,14,16,18,20,22, etc.)
4. [ ] Behåll textfält för Chans med validering 5-30 och integrera med popup-systemet
5. [ ] Deploy till Vercel med quick-picker funktionalitet

---

## ✅ Acceptanskriterier

- [ ] Alla kategorier utom Chans har quick-picker popup
- [ ] Popup visar endast giltiga värden för respektive kategori
- [ ] Chans behåller textfält med validering 5-30
- [ ] Responsiv design med bra UX för popup-interaktion
- [ ] Fungerar i produktion
- [ ] Deployad till Vercel

---

## 🔧 Tech Stack

- Next.js 15.5
- Tailwind CSS 4
- TypeScript

---

## 📜 Ändringshistorik

### 2026-02-04 03:46 - Initial version
- Projekt skapades
- Task definition slutförd
- Status: 📝 PLANERAD