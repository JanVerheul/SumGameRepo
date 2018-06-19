import React from 'react';
import BlackCadre from './BlackCadre';
import GameButton from './GameButton';

export const gameRulesEnglish = <div>
    <p>
        The game consists of a configurable number of cells with numbers and buttons in them (2, 3, 4 or 5 cells).
        The objective of the game is to reduce the numbers in all cells of the game to zero. Each cell has two buttons labeled with a plus sign and
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
        values of the cells. If we define the difficulty of a given game as the maximum of the absolute values of the cells, then solving a game with difficulty N
        can be done:
		<ul>
			<li>For 2 cells in about 8 log10 N steps.</li>
            <li>For 3 cells in about 6 log10 N steps.</li>
            <li>For 4 cells in about 13 log10 N steps.</li>
            <li>For 5 cells in about 18 log10 N steps.</li>
		</ul>
        These figures will be approached by the hint calculator that is available in the game, but are very difficult to attain by human players. The figures
        are averages over thousants of randomly generated cell contents (with evenly distributed random numbers). Starting with a sequence of equal fixed
        numbers will usually take a bit more steps than the above mentioned formulas.
    </p>
    <p>
        Learning strategies to play the game can be done by selecting the checkbox "Playing Hints" at Game Configuration and look at the moves that are
		suggested by the program. Keep in mind the definition of difficulty of a particular game given above. Any strategy that reduces this difficulty measure
		each step will eventually solve the game.
    </p>
</div>

export const gameRulesDutch = <div>
    <p>
        Het spel bestaat uit een configureerbaar aantal cellen met getallen en knoppen erin (2, 3, 4 of 5 cellen).
        Het doel van het spel is het terugbrengen tot nul van alle waarden in alle cellen. Elke cel heeft twee knoppen gelabeld met een plus-teken en twee
        knoppen gelabeld met een min-teken. Drukken op een plus-knop heeft het verhogen met &#233;&#233;n van de celwaarde tot gevolg. Drukken op een min-knop
		heeft het verlagen van de celwaarde met &#233;&#233;n tot gevolg. Het drukken van de linker plus-knop heeft verder tot gevolg dat alle celwaarden
		verhoogd worden met de waarde in de cel waarin de knop gedrukt is voordat de cel zelf ge&#239;ncrementeerd wordt. Het drukken van de rechter plus-knop
		heeft verder tot gevolg dat alle celwaarden verhoogd worden met de waarde in de cel waarin de knop gedrukt is nadat de cel zelf ge&#239;ncrementeerd is.
		Soortgelijk gedrag van de knoppen met min-tekens. Het drukken van de linker min-knop heeft verder tot gevolg dat alle celwaarden verlaagd worden met de
		waarde in de cel waarin de knop gedrukt is voordat de cel zelf gedecrementeerd wordt. Het drukken van de rechter min-knop heeft verder tot gevolg dat
		alle celwaarden verlaagd worden met de waarde in de cel waarin de knop gedrukt is nadat de cel zelf gedecrementeerd is.
    </p>
    <p>
		Als een goede strategie gevolgd wordt is het aantal stappen dat nodig is om een verzameling celwaarden tot nul te reduceren logaritmisch gerelateerd
		met het maximum van de absolute waarden van de celinhoud. Als we de moeilijkheidsgraad van een bepaalde verzameling celwaarden defini&#235;ren als het
		maximum van de absolute waarden van de celinhoud, dan geldt voor het oplossen van een spel met moeilijkheidsgraad N:
        <ul>
			<li>Oplossen van 2 cellen kost ongeveer 8 log10 N stappen.</li>
            <li>Oplossen van 3 cellen kost ongeveer 6 log10 N stappen.</li>
            <li>Oplossen van 4 cellen kost ongeveer 13 log10 N stappen.</li>
            <li>Oplossen van 5 cellen kost ongeveer 18 log10 N stappen.</li>
		</ul>
    </p>
    <p>
        Deze getallen zullen benaderd worden door het hint-mechanisme dat aanwezig is in het spel, maar zijn zeer moeilijk te bereiken door menselijke spelers.
        De getallen zijn gemiddelden over duizenden reeksen cellen met willekeurig gegenereerde inhoud. Als begonnen wordt met een reeks cellen met gelijke
        inhoud zal het aantal stappen iets hoger liggen.
    </p>
    <p>
		Het leren van strategie&#235;n om het spel te spelen kan door het aanvinken van "Playing Hints" in de configuratiefase en goed te kijken naar de zetten
		die aanbevolen worden door het programma. Onthoudt de hierboven gegeven definitie van de moeilijkheidsgraad van een gegeven verzameling celwaarden.
		Iedere strategie die de moeilijkheidsgraad elke stap reduceert zal uiteindelijk het spel oplossen.
    </p>

</div>
