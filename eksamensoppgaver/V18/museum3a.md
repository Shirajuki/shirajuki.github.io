```
Pseudokode:
const obj array = blåseinstrument og lyd
onload : tegnelementer()

funksjon tegnElementer():
	henter data fra obj array, skriver og tegner som DOM elementer i html ved hjelp av createElement
	nyttelement som bilde
	setter nyttelement.id = tall
	Setter nyttelement.value = lyd directory
	nyttelement.onclick kjører funksjon gjett(this.id)

	Oppretter en knapp til slutt som kjører en funksjon onclick: spillTilfeldigLyd

funksjon getrndinteger(fra,till):
	returnerer en tilfeldig tall med fra og til parameter

funksjon spillLyd(lyd directory):
	spiller lyd fra parameteren

funksjon spillTilfeldigLyd():
	hvis ikke valgt tilfeldi tall:
		tilfeldigtall fra 0 til lengden til obj array, med getrndinteger()
		tilfeldig tall som global variabel lagres, spiller dermed lyd fra obj array med det tallet
	spiller lyd med det lagrede tilfeldige tallet: spillLyd()

funksjon gjett(id)
	spill lyd med id

	bruker id parameter for å sjekke om den er lik tilfeldigtall lagret som global variabel
	Hvis id == tifleldigtall ovenfor:
		spill lyd riktig: spillLyd(riktig.mp3)
		Hvis antall forsøk
		kjører funksjon lagreHighschore()
	ellers
		global variabel forsøk += 1
		spill lyd feil: spillLyd(feil.mp3)

funksjon lagreHighschore():
	???
```
