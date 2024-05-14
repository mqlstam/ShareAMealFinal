# Share-a-Meal Applicatie

Dit is de backend applicatie voor het Share-a-Meal project, ontwikkeld als onderdeel van de module Programmeren 4 aan de Avans Hogeschool.

## Beschrijving

Share-a-Meal is een applicatie waarmee gebruikers maaltijden kunnen aanbieden en andere gebruikers zich kunnen aanmelden om aan die maaltijden deel te nemen. Deze repository bevat de backend API voor de applicatie, gebouwd met Node.js en Express.

## Functies

- **Authenticatie**: Gebruikers kunnen zich registreren en inloggen om toegang te krijgen tot de beveiligde functionaliteiten van de applicatie.
- **Gebruikersbeheer**: Nieuwe gebruikers kunnen worden geregistreerd, en bestaande gebruikers kunnen hun profielgegevens bekijken, bijwerken en verwijderen.
- **Maaltijdbeheer**: Gebruikers kunnen nieuwe maaltijden toevoegen, bestaande maaltijden bijwerken en verwijderen, en een overzicht van alle beschikbare maaltijden bekijken.
- **Deelname beheren**: Gebruikers kunnen zich aanmelden voor een maaltijd, hun deelname annuleren, en de deelnemerslijst en details van deelnemers bekijken (alleen voor de eigenaar van de maaltijd).

## Vereisten

- Node.js (versie 14 of hoger)
- MySQL database

## Installatie

1. Kloon deze repository naar je lokale machine.
2. Navigeer naar de projectmap in je terminal.
3. Kopieer het `.env.example` bestand naar `.env` en vul de benodigde configuratiegegevens in (zoals database-instellingen en geheime sleutels).
4. Installeer de vereiste afhankelijkheden met het commando `npm install`.
5. Start de applicatie met het commando `npm start`.

## Testen

Deze applicatie heeft een reeks unit- en integratietests. Je kunt deze tests uitvoeren met het commando `npm test`.
