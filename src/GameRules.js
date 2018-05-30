import React from 'react';
import BlackCadre from './BlackCadre';
import GameButton from './GameButton';

export const gameRulesEnglish = <div>
    <p>
        The objective of the game is to reduce the numeric values in all cells of the game to zero. Each cell has two buttons labeled with a plus sign and
        two buttons labeled with a minus sign. When pressing a button with a plus sign, the value of that cell is incremented by one. When pressing a button
        with a minus sign, the value of that cell is decremented by one. When pressing the left side button with plus sign, all other cells are incremented by the
        value in the cell in which the button is pressed before the cell value is incremented itself. When pressing the right side button with plus sign, all other
        cells are incremented by the value in the cell in which the button is pressed after the cell value is incremented itself. Similar behaviour for the
        buttons with minus signs. When pressing the left side button with minus sign, all other cells are decremented by the value in the cell in which the button is
        pressed before the cell value is decremented itself. When pressing the right side button with minus sign, all other cells are decremented by the value in the
        cell in which the button is pressed after the cell value is decremented itself.
    </p>
    <p>
        When using a good strategy, the number of steps necessary to reduce a given set of cell values to zero is log-related to the maximum of the absolute
        values of the cells. If we define the difficulty of a given set of cell values as the maximum of the absolute values of the cells, then in case of 3 cells,
        solving a game that is 10 times as difficult as a given game will take about 13 additional steps. To put it in more concrete figures:
		<ul>
			<li>Solving (10, 10, 10) can be done in 12 steps (likely the absolute minimum).</li>
			<li>Solving (100, 100, 100) can be done in 26 steps or less.</li>
			<li>Solving (1000, 1000, 1000) can be done in 40 steps or less.</li>
			<li>Solving (10,000, 10,000, 10,000) can be done in 48 steps or less.</li>
			<li>Solving (100,000, 100,000, 100,000) can be done in 66 steps or less.</li>
			<li>Solving (1,000,000, 1,000,000, 1,000,000) can be done in 72 steps or less.</li>
		</ul>
    </p>
    <p>
        Learning strategies to play the game can be done by selecting the checkbox "Playing Hints" at Game Configuration and look at the moves that are
		suggested by the program. Keep in mind the definition of difficulty of a particular game given above. Any strategy that reduces this difficulty measure
		each step will eventually solve the game.
    </p>
</div>

export const gameRulesDutch = <div>
    <p>
        Het doel van het spel is het terugbrengen tot nul van alle waarden in alle cellen. Elke cel heeft twee knoppen gelabeld met een plus-teken en twee
        knoppen gelabeld met een min-teken. Drukken op een plus-knop heeft het verhogen met &#233;&#233;n van de celwaarde tot gevolg. Drukken op een min-knop
		heeft het verlagen van de celwaarde met &#233;&#233;n tot gevolg. Het drukken van de linker plus-knop heeft verder tot gevolg dat alle celwaarden
		verhoogd worden met de waarde in de cel waarin de knop gedrukt is voordat de cel zelf ge&#239;ncrementeerd wordt. Het dukken van de rechter plus-knop
		heeft verder tot gevolg dat alle celwaarden verhoogd worden met de waarde in de cel waarin de knop gedrukt is nadat de cel zelf ge&#239;ncrementeerd is.
		Soortgelijk gedrag van de knoppen met min-tekens. Het drukken van de linker min-knop heeft verder tot gevolg dat alle celwaarden verlaagd worden met de
		waarde in de cel waarin de knop gedrukt is voordat de cel zelf gedecrementeerd wordt. Het dukken van de rechter min-knop heeft verder tot gevolg dat
		alle celwaarden verlaagd worden met de waarde in de cel waarin de knop gedrukt is nadat de cel zelf gedecrementeerd is.
    </p>
    <p>
		Als een goede strategie gevolgd wordt is het aantal stappen dat nodig is om een verzameling celwaarden tot nul te reduceren logaritmisch gerelateerd
		met het maximum van de absolute waarden van de celinhoud. Als we de moeilijkheidsgraad van een bepaalde verzameling celwaarden defini&#235;ren als het
		maximum van de absolute waarden van de celinhoud, dan geldt voor een spel met 3 cellen dat het oplossen van een spel met een 10 maal zo hoge
		moeilijkheidsgraad ongeveer 13 extra stappen kost. Concrete cijfers:
		<ul>
			<li>Het oplossen van (10, 10, 10) kan in 12 stappen (waarschijnlijk het absolute minimum).</li>
			<li>Het oplossen van (100, 100, 100) kan in 26 stappen of minder.</li>
			<li>Het oplossen van (1000, 1000, 1000) kan in 40 stappen of minder.</li>
			<li>Het oplossen van (10.000, 10.000, 10.000) kan in 48 stappen of minder.</li>
			<li>Het oplossen van (100.000, 100.000, 100.000) kan in 66 stappen of minder.</li>
			<li>Het oplossen van (1.000.000, 1.000.000, 1.000.000) kan in 72 stappen of minder.</li>
		</ul>
    </p>
    <p>
		Het leren van strategie&#235;n om het spel te spelen kan door het aanvinken van "Playing Hints" in de configuratiefase en goed te kijken naar de zetten
		die aanbevolen worden door het programma. Onthoudt de hierboven gegeven definitie van de moeilijkheidsgraad van een gegeven verzameling celwaarden.
		Iedere strategie die de moeilijkheidsgraad elke stap reduceert zal uiteindelijk het spel oplossen.
    </p>

</div>
