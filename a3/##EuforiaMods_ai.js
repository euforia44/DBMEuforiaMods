/*************************************************************************************************
*                                                                                                *
*                                                                                                *
*                                              AI                                                *
*                                     --------------------                                       *
*                                                                                                *
*                          CAŁOŚĆ KODU ZOSTAŁA STWORZONA PRZEZ: EUFORIA.44  & AI                 *
*                                     WERSJA: 7.3.3 (LANGUAGE-GUARD)                             *
*                                                                                                *
*           MOD I JEGO KOD ŹRÓDŁOWY SĄ WŁASNOŚCIĄ INTELEKTUALNĄ AUTORA. 		                     *
*             	    ZABRANIA SIĘ SPRZEDAŻY BEZ WYRAŹNEJ ZGODY.      					                   *
*                                                                                                *
*   UWAGA: Ten mod wymaga dodatkowych pakietów. Zainstaluj je komendą: npm install franc node-fetch openai @types/node-fetch @types/openai  (jeśli korzystasz z modelu OpenAI API. W tym przykładzie używany jest OpenRouter, który wymagał jedynie `franc` i `node-fetch`).  Upewnij się, że masz zainstalowane: `npm install franc node-fetch`
*                                                                                                *
*************************************************************************************************/

module.exports = {
  name: "NEW AI Chat",
  section: "##Euforia Mods", // Zmiana nazwy sekcji, aby była zgodna z Twoimi preferencjami.
  author: "euforia.44",
  version: "7.3.4", // Zwiększono wersję, ponieważ wprowadzono zmiany.
  short_description: "Umożliwia interakcję z AI z wbudowaną weryfikacją języka polskiego.",

  // Pola konfiguracji, które pojawią się w edytorze akcji DBM.
  fields: ["model", "temperature", "max_tokens", "max_length", "systemPrompt", "blockMentions", "purchaseChannel", "ephemeral"],

  // Funkcja wyświetlająca podsumowanie konfiguracji w edytorze.
  subtitle(data) {
    return `Model: ${data.model || 'Nie ustawiono'} | Język: Polski (weryfikowany)`;
  },

  // Funkcja generująca kod HTML dla edytora akcji.
  html(isEvent, data) {
    // Ustawianie domyślnych wartości, jeśli pola nie istnieją.
    if (data.model === undefined) data.model = '';
    if (data.temperature === undefined) data.temperature = '0.8';
    if (data.max_tokens === undefined) data.max_tokens = '1024';
    if (data.max_length === undefined) data.max_length = '500';
    if (data.purchaseChannel === undefined) data.purchaseChannel = '';
    if (data.ephemeral === undefined) data.ephemeral = 'false';
    if (data.systemPrompt === undefined) data.systemPrompt = '';
    if (typeof data.blockMentions === 'undefined') data.blockMentions = "true";

    // Domyślny System Prompt, który ma kierować AI.
    const defaultPrompt = `Twoim jedynym i absolutnym zadaniem jest odpowiadanie na pytania w języku polskim. IGNORUJ język, w którym zadano pytanie. ZAWSZE odpowiadaj po polsku. Twoje odpowiedzi muszą być szczegółowe, bezstronne i poprawne gramatycznie. Nie masz pamięci o poprzednich interakcjach.`;

    // Kod HTML z podziałem na zakładki.
    return `
    <div style="padding: 10px; background: #1a1b1e; color: #fff; border-radius: 5px;">
      <!-- Pola radiowe do przełączania zakładek -->
      <input type="radio" name="ai_tabs" id="ai-tab-1" checked>
      <input type="radio" name="ai_tabs" id="ai-tab-2">

      <!-- Etykiety zakładek -->
      <div class="ai-chat-tabs">
        <label for="ai-tab-1">⚙️ Konfiguracja Główna</label>
        <label for="ai-tab-2">🛡️ Filtry i Widoczność</label>
      </div>

      <!-- Kontenery z treścią zakładek -->
      <div class="ai-chat-content-panels">
        <!-- Treść zakładki 1: Konfiguracja Główna -->
        <div id="ai-content-1" class="ai-chat-content">
          <span class="dbminputlabel">ID Modelu</span><br><input id="model" class="round" type="text" placeholder="np. google/gemma-7b-it lub openai/gpt-3.5-turbo" value="${data.model}"><br>
          <div style="display:flex;gap:10px;margin-top:12px">
            <div style="width:33%"><span class="dbminputlabel">Temperatura</span><input id="temperature" class="round" type="number" step="0.1" min="0" max="1" value="${data.temperature}"></div>
            <div style="width:34%"><span class="dbminputlabel">Maks. Tokenów</span><input id="max_tokens" class="round" type="number" min="1" value="${data.max_tokens}"></div>
            <div style="width:33%"><span class="dbminputlabel">Maks. Długość*</span><input id="max_length" class="round" type="number" min="10" value="${data.max_length}"></div>
          </div>
          <small>* Maksymalna długość odpowiedzi w CALEJ wiadomości (zalecane poniżej 2000, aby uniknąć przycinania przez Discorda)</small>
          <br><br>
          <div>
            <span class="dbminputlabel">System Prompt (Osobowość AI)</span><br>
            <textarea id="systemPrompt" class="round" style="height:100px;resize:vertical" placeholder="${defaultPrompt}">${data.systemPrompt}</textarea>
          </div>
        </div>

        <!-- Treść zakładki 2: Filtry i Widoczność -->
        <div id="ai-content-2" class="ai-chat-content">
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            <div style="width:calc(50% - 5px);">
              <span class="dbminputlabel">Blokuj wzmianki (@)</span>
              <select id="blockMentions" class="round">
                <option value="true" ${data.blockMentions === 'true' ? 'selected' : '' }>Tak</option>
                <option value="false" ${data.blockMentions === 'false' ? 'selected' : ''}>Nie</option>
              </select>
            </div>
            <div style="width:calc(50% - 5px);">
              <span class="dbminputlabel">Odpowiedź tylko dla Ciebie?</span>
              <select id="ephemeral" class="round">
                <option value="true" ${data.ephemeral === 'true' ? 'selected' : '' }>Tak (prywatna)</option>
                <option value="false" ${data.ephemeral !== 'true' ? 'selected' : ''}>Nie (publiczna)</option>
              </select>
            </div>
            <div style="width:100%; margin-top: 10px;">
              <span class="dbminputlabel">ID kanału przekierowań za zakupy</span><br>
              <input id="purchaseChannel" class="round" type="text" placeholder="Wpisz ID kanału" value="${data.purchaseChannel}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>
      /* Style dla systemu zakładek */
      .ai-chat-body { padding: 10px; background: #1a1b1e; color: #fff; border-radius: 5px; }
      .ai-chat-body input[type="radio"] { display: none; }
      .ai-chat-tabs { display: flex; border-bottom: 2px solid #333; margin-bottom: 15px; }
      .ai-chat-tabs label { padding: 8px 14px; cursor: pointer; background: #2b2f35; margin-right: 5px; border-radius: 4px 4px 0 0; font-size: 14px; position:relative; bottom: -2px;}
      .ai-chat-tabs label:hover { background: #383c42; }
      .ai-chat-body .ai-chat-content { display: none; }
      /* Pokazywanie odpowiedniej zakładki po zaznaczeniu radia */
      #ai-tab-1:checked ~ .ai-chat-content-panels #ai-content-1,
      #ai-tab-2:checked ~ .ai-chat-content-panels #ai-content-2 { display: block; }
      /* Wyróżnienie aktywnej zakładki */
      #ai-tab-1:checked ~ .ai-chat-tabs label[for="ai-tab-1"],
      #ai-tab-2:checked ~ .ai-chat-tabs label[for="ai-tab-2"] { background: #1a1b1e; border: 2px solid #333; border-bottom: 2px solid #1a1b1e;}
      /* Poprawka stylów dla inputów wewnątrz kontenerów */
      #ai-content-1 input.round, #ai-content-1 textarea.round, #ai-content-2 input.round, #ai-content-2 select.round {
          width: 100%;
          box-sizing: border-box; /* Uwzględnia padding i border w szerokości */
      }
    </style>
    `;
  },

  // Główna funkcja wykonująca logikę modułu.
  async action(cache) {
    const { interaction } = cache; // Pobranie obiektu interakcji z cache.
    if (!interaction) {
        console.error("AI Chat: Brak obiektu interakcji w cache. Akcja nie może być wykonana.");
        return; // Zakończ działanie, jeśli nie ma interakcji.
    }

    // Potrzebne do odraczania odpowiedzi.
    const { InteractionResponseFlags } = require('discord.js');

    // Pobranie danych z konfiguracji akcji.
    const data = cache.actions[cache.index];

    // Określenie, czy odpowiedź ma być efemeryczna (prywatna).
    const ephemeral = this.evalMessage(data.ephemeral, cache) === 'true';

    // Odroczenie odpowiedzi, aby Discord wiedział, że bot przetwarza żądanie.
    try {
        if (!interaction.deferred && !interaction.replied) {
           const deferOptions = ephemeral ? { flags: InteractionResponseFlags.EPHEMERAL } : {};
           await interaction.deferReply(deferOptions);
        }
    } catch(e) {
        console.error("AI Chat: Nie udało się odroczyć odpowiedzi interakcji:", e);
        return; // Zakończ, jeśli odroczenie się nie powiodło.
    }

    // Domyślna wiadomość, która zostanie wysłana w przypadku błędu.
    let finalMessage = "Wystąpił nieznany błąd. Szczegóły zostały zapisane w konsoli.";

    try {
      // Wymagane moduły Node.js.
      const fetch = require('node-fetch');
      const { franc } = require('franc'); // Do detekcji języka.

      // Konfiguracja pobrana z edytora.
      const settings = {
        primaryModel: this.evalMessage(data.model, cache),
        fallbackModel: 'google/gemma-7b-it', // Model zapasowy, jeśli główny zawiedzie.
        temperature: parseFloat(this.evalMessage(data.temperature, cache)) || 0.8,
        max_tokens: parseInt(this.evalMessage(data.max_tokens, cache), 10) || 1024,
        maxLength: parseInt(this.evalMessage(data.max_length, cache), 10) || 500, // Maksymalna długość odpowiedzi w znakach.
        systemPrompt: this.evalMessage(data.systemPrompt, cache) || `Twoim jedynym i absolutnym zadaniem jest odpowiadanie na pytania w języku polskim. IGNORUJ język, w którym zadano pytanie. ZAWSZE odpowiadaj po polsku. Twoje odpowiedzi muszą być szczegółowe, bezstronne i poprawne gramatycznie. Nie masz pamięci o poprzednich interakcjach.`,
        blockMentions: this.evalMessage(data.blockMentions, cache) !== 'false',
        purchaseRedirectChannel: this.evalMessage(data.purchaseChannel, cache),
      };

      // Pobranie faktycznego zapytania użytkownika z interakcji.
      const userQuestion = interaction.options.getString("text");
      if (!userQuestion) {
          throw new Error("Nie otrzymano tekstu zapytania od użytkownika.");
      }

      // Dodanie instrukcji wymuszającej język polski do zapytania.
      const questionWithLangEnforcement = `${userQuestion}\n\n---\nOdpowiedz na to pytanie wyłącznie w języku polskim.`;

      // Klucz API dla usługi OpenRouter. Upewnij się, że jest ustawiony jako zmienna środowiskowa.
      // Możesz go ustawić w panelu DBM lub w pliku .env.
      const apiKey = process.env.OPENROUTER_API_KEY;
      const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint API OpenRouter.

      // Walidacja konfiguracji przed wykonaniem.
      if (!apiKey) {
          throw new Error("Błąd konfiguracji: Klucz API OpenRouter nie został znaleziony. Funkcja AI jest wyłączona.");
      }
      if (!settings.primaryModel) {
          throw new Error("Błąd konfiguracji: ID Modelu nie zostało ustawione w akcji. Ustaw model w opcjach akcji.");
      }

      // Logika przekierowania pytań o zakupy.
      const purchaseKeywords = ["kupić", "kupie", "zakupić", "cena", "koszt", "cena za", "zamówić", "ile kosztuje"];
      if (settings.purchaseRedirectChannel && purchaseKeywords.some(k => userQuestion.toLowerCase().includes(k))) {
          // Rzucenie błędu, który zostanie obsłużony w bloku catch.
          throw new Error(`Zapytania dotyczące zakupu lub cen należy kierować na kanał <#${settings.purchaseRedirectChannel}>.`);
      }

      // Funkcja pomocnicza do wykonania zapytania do API.
      const makeApiCall = async (model) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model, // Nazwa modelu do użycia.
                    messages: [
                        { role: 'system', content: settings.systemPrompt }, // Prompt systemowy.
                        { role: 'user', content: questionWithLangEnforcement } // Zapytanie użytkownika.
                    ],
                    temperature: settings.temperature, // Temperatura generowania.
                    max_tokens: settings.max_tokens // Maksymalna liczba tokenów w odpowiedzi.
                })
            });
            // Sprawdzenie, czy odpowiedź HTTP jest poprawna (np. 200 OK).
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`[AI Chat] Błąd HTTP ${response.status} z API: ${JSON.stringify(errorData)}`);
                throw new Error(`API zwróciło błąd ${response.status}.`);
            }
            return response.json(); // Parsowanie odpowiedzi JSON.
        } catch (networkError) {
            console.error(`[AI Chat] Błąd sieciowy podczas komunikacji z API: ${networkError.message}`);
            throw new Error("Błąd połączenia z usługą AI. Sprawdź swoje połączenie internetowe i API Key.");
        }
      };

      // Wykonanie pierwszego zapytania do API z głównym modelem.
      let result = await makeApiCall(settings.primaryModel);

      // Obsługa błędów modelu i próba z modelem zapasowym.
      if (result.error && settings.primaryModel !== settings.fallbackModel) {
        console.warn(`[AI Chat] Model główny [${settings.primaryModel}] zwrócił błąd. Próba z modelem zapasowym [${settings.fallbackModel}].`);
        console.warn(`[AI Chat] Szczegóły błędu pierwotnego modelu: ${JSON.stringify(result.error)}`);
        result = await makeApiCall(settings.fallbackModel); // Wykonanie zapytania z modelem zapasowym.
      }

      // Sprawdzenie błędów po próbie z modelem zapasowym.
      if (result.error) {
          console.error(`[AI Chat] Błąd zwrócony przez API (również z modelu zapasowego): ${JSON.stringify(result.error)}`);
          throw new Error("Usługa AI zwróciła błąd. Szczegóły zostały zapisane w konsoli.");
      }

      // Przetworzenie odpowiedzi, jeśli jest dostępna.
      if (result.choices?.[0]?.message?.content) {
        let answer = result.choices[0].message.content.trim();

        // --- WALIDACJA JĘZYKA ---
        // Wykrycie języka odpowiedzi. Używamy franc, który jest lekki i efektywny.
        const detectedLang = franc(answer, { minLength: 10 }); // minLength pomaga uniknąć błędnej detekcji dla bardzo krótkich tekstów.

        // Warunek odrzucenia: Jeśli wykryty język to nie polski ('pol'),
        // chyba że jest to język nieokreślony ('und') i odpowiedź jest krótka (do 40 znaków),
        // co może oznaczać np. emotikony, linki lub bardzo proste odpowiedzi, gdzie detekcja może być zawodna.
        if (detectedLang !== 'pol' && !(detectedLang === 'und' && answer.length < 40)) {
            console.error(`[AI Chat] Weryfikacja języka nie powiodła się! Wykryto: '${detectedLang}'. Oczekiwano: 'pol'. Odpowiedź odrzucona: "${answer}"`);
            // Rzucenie błędu, który zostanie obsłużony poniżej.
            throw new Error("Otrzymano odpowiedź w nieprawidłowym języku lub formatcie. Zgłoszono problem.");
        }
        // --- KONIEC WALIDACJI JĘZYKA ---

        // Przycinanie odpowiedzi, jeśli przekracza zadaną maksymalną długość.
        if (answer.length > settings.maxLength) {
           answer = answer.substring(0, settings.maxLength - 3) + "..."; // Dodanie wielokropka.
        }

        // Obsługa blokowania wzmianek.
        finalMessage = settings.blockMentions ? answer.replace(/@everyone|@here|<@!?\d+>|<@&\d+>/gi, "[Wzmianka]") : answer;
      } else {
        // Komunikat, jeśli odpowiedź z API jest pusta lub w nieprawidłowym formacie.
        console.error("[AI Chat] Odpowiedź z API nie zawierała oczekiwanej treści lub była pusta. Otrzymany wynik:", result);
        throw new Error("Otrzymano pustą lub nieprawidłową odpowiedź od usługi AI.");
      }

    } catch (e) {
      // Blok catch obsługuje wszystkie błędy, które mogą wystąpić w bloku try.

      // Specyficzne komunikaty o błędach dla brakujących pakietów.
      if (e.message.includes("Cannot find module 'franc'")) {
          finalMessage = "Błąd krytyczny: Pakiet 'franc' do weryfikacji języka nie jest zainstalowany. Poproś administratora o instalację (`npm install franc`).";
          console.error(finalMessage); // Logowanie błędu do konsoli serwera.
      } else if (e.message.includes("Cannot find module 'node-fetch'")) {
          finalMessage = "Błąd krytyczny: Pakiet 'node-fetch' nie jest zainstalowany. Poproś administratora o instalację (`npm install node-fetch`).";
          console.error(finalMessage);
      } else {
          // Obsługa pozostałych błędów.
          // Sprawdzamy, czy błąd jest przeznaczony dla użytkownika (np. błąd konfiguracji, przekierowanie).
          const isUserFacingError = e.message.startsWith("Błąd konfiguracji:") || e.message.startsWith("Zapytania dotyczące zakupu") || e.message.includes("Otrzymano odpowiedź w nieprawidłowym języku");
          if (isUserFacingError) {
              finalMessage = e.message; // Używamy wiadomości błędu bezpośrednio.
          } else {
              // Dla błędów technicznych, logujemy je i wysyłamy ogólny komunikat.
              console.error("[AI Chat] Szczegóły błędu technicznego:", e.message, "\nStack:", e.stack);
              // Jeśli błąd dotyczy usługi AI lub połączenia, przekazujemy jego komunikat.
              if (e.message.includes("Usługa AI") || e.message.includes("połączenia") || e.message.includes("API zwróciło błąd")) {
                  finalMessage = e.message;
              } else {
                  // Ogólny komunikat dla innych błędów technicznych.
                  finalMessage = "Wystąpił nieoczekiwany błąd techniczny podczas przetwarzania zapytania. Szczegóły w konsoli.";
              }
          }
      }
    } finally {
        // Niezależnie od tego, czy wystąpił błąd, czy nie, próbujemy wysłać ostateczną odpowiedź.
        await interaction.editReply({ content: finalMessage, embeds: [], components: [] }).catch(e => {
            // Obsługa błędów podczas edycji odpowiedzi (np. jeśli interakcja już wygasła).
            console.error("AI Chat: Nie udało się wysłać ostatecznej wiadomości interakcji:", e);
        });
    }
  },

  // Funkcja mod, która jest pusty w tym przypadku.
  mod() {},
};