module.exports = {
  name: "Portfolio Mod v8",
  displayName: "Portfolio Mod v8",
  section: "##Euforia Mods",
  author: "euforia.44 (poprawki i feat. by AI)",
  version: "9.0.0", // Final Version
  short_description: "Generuje profesjonalną grafikę portfolio z licznymi opcjami personalizacji.",
  subtitle(data) {
    return "Zaawansowany generator grafik portfolio z licznymi opcjami personalizacji.";
  },
  fields: [
    "targetChannelID", "embedTitle", "embedDesc", "embedColor", "realizatorField", "dlaKogoField",
    "fontPath", "fontSize", "fontColor", "textShadowColor", "textVerticalAlign", "textShadowBlur",
    "textShadowOffsetX", "textShadowOffsetY", "mainImageScale", "cornerRadius", "shadowColor",
    "shadowBlur", "shadowOffsetX", "shadowOffsetY", "watermarkTransparency", "watermark",
    "topLayerImageURL", "backgroundImageURL", "reaction1", "reaction2", "reaction3", "reaction4",
    "enableLinkButton", "buttonPosition", "buttonLabel", "buttonLinkURL", "secondMessageImageURL",
  ],

  html(isEvent, data) {
    return `
      <div style="padding: 10px;">
        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px; margin-bottom: 10px;">
          <b>Ważne:</b> Jeśli obrazy tła lub ramki się nie ładują (błąd 404 w konsoli), oznacza to, że linki z Discorda wygasły. Wklej w odpowiednie pola nowe, stałe linki.
        </div>
        <tab-system>
          <tab label="Konfiguracja" icon="cogs">
            <div style="padding: 10px;">
              <div style="width: 100%; margin-bottom: 12px;">
                <label>ID Kanału do Wysyłki (zostaw puste, aby wysyłać na obecnym kanale)</label>
                <input id="targetChannelID" class="round" type="text" placeholder="Wklej tutaj ID kanału...">
              </div>
              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <div style="width: 60%;"><label>Tytuł Embedu</label><input id="embedTitle" class="round" type="text" value="PORTFOLIO"></div>
                <div style="width: 40%;"><label>Kolor Embedu</label><input id="embedColor" class="round" type="text" value="#ea29d1"></div>
              </div>
              <div style="margin-bottom: 12px;">
                <label>Opis Embedu</label><textarea id="embedDesc" class="round" rows="2" style="width: 100%; resize: vertical;">Nowa praca już wleciała! Podoba się? Zostaw reakcję!</textarea>
              </div>
              <div style="display: flex; gap: 10px;">
                <div style="width: 50%;"><label>Pole "Wykonane przez"</label><input id="realizatorField" class="round" type="text" value="\${slashParams('Wykonawca')}"></div>
                <div style="width: 50%;"><label>Pole "Dla kogo"</label><input id="dlaKogoField" class="round" type="text" value="\${slashParams('dlakogo')}"></div>
              </div>
            </div>
          </tab>

          <tab label="Styl Tekstu" icon="font">
            <div style="padding: 10px;">
              <p style="font-size: 13px; margin-bottom: 15px;">Główny tekst jest pobierany z opcji komendy slash o nazwie <b>tekst_grafiki</b>.</p>
              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <div style="flex-grow: 1;"><label>Czcionka</label><input id="fontPath" class="round" type="text" value="fonts/proxima.otf"></div>
                <div style="width: 90px;"><label>Maks. Rozmiar</label><input id="fontSize" class="round" type="number" value="180"></div>
                <div style="width: 90px;"><label>Kolor</label><input id="fontColor" class="round" type="text" value="#FFFFFF"></div>
              </div>
              <div style="margin-top: 8px; margin-bottom: 12px;"><label><b>Cień dla Tekstu</b></label></div>
              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <div style="width: 25%;"><label>Kolor</label><input id="textShadowColor" class="round" type="text" value="#000000"></div>
                <div style="width: 25%;"><label>Rozmycie</label><input id="textShadowBlur" class="round" type="number" value="5"></div>
                <div style="width: 25%;"><label>Offset X</label><input id="textShadowOffsetX" class="round" type="number" value="2"></div>
                <div style="width: 25%;"><label>Offset Y</label><input id="textShadowOffsetY" class="round" type="number" value="2"></div>
              </div>
              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                 <div style="width: 50%;">
                    <label>Wyrównanie Tekstu w Pionie</label>
                    <select id="textVerticalAlign" class="round">
                        <option value="top" selected>Góra</option>
                        <option value="bottom">Dół</option>
                    </select>
                </div>
                <div style="width: 50%;">
                  <label>Znak wodny (pobierany z opcji "watermark", opcjonalny)</label>
                  <input id="watermark" class="round" type="text" value="\${slashParams('watermark')}">
                </div>
              </div>
            </div>
          </tab>

          <tab label="Wygląd Grafiki" icon="image">
            <div style="padding: 10px;">
              <div style="margin-bottom: 15px;"><label><b>Warstwa Ramki</b></label><input id="topLayerImageURL" class="round" type="text" value="https://media.discordapp.net/attachments/1113880193892417646/1113912779937095830/fale.png"></div>
              <div style="margin-bottom: 15px;">
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                  <div style="width: 50%;"><label>Skala Grafiki (%)</label><input id="mainImageScale" class="round" type="number" value="60"></div>
                  <div style="width: 50%;"><label>Zaokrąglenie (px)</label><input id="cornerRadius" class="round" type="number" value="50"></div>
                </div>
                <div style="margin-top: 8px;"><label><b>Cień dla Grafiki</b></label></div>
                <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                  <div style="width: 25%;"><label>Kolor</label><input id="shadowColor" class="round" type="text" value="#000000"></div>
                  <div style="width: 25%;"><label>Rozmycie</label><input id="shadowBlur" class="round" type="number" value="15"></div>
                  <div style="width: 25%;"><label>Offset X</label><input id="shadowOffsetX" class="round" type="number" value="0"></div>
                  <div style="width: 25%;"><label>Offset Y</label><input id="shadowOffsetY" class="round" type="number" value="10"></div>
                </div>
                <div style="width: 50%;"><label>Przezroczystość Znaku Wodnego (%)</label><input id="watermarkTransparency" class="round" type="number" value="35"></div>
              </div>
              <div><label><b>Warstwa Tła</b></label><input id="backgroundImageURL" class="round" type="text" value="https://media.discordapp.net/attachments/1113880193892417646/1113912780289413210/tloportfolio.png"></div>
            </div>
          </tab>

          <tab label="Interakcje" icon="hand pointer outline">
            <div style="padding: 10px;">
              <div style="margin-bottom: 20px;">
                <p style="font-size: 13px; margin-bottom: 10px;">Wpisz do czterech emoji, którymi bot ma zareagować na wiadomość. Puste pola zostaną zignorowane.</p>
                <div style="display: flex; gap: 10px;">
                  <div style="width: 25%;"><label>Reakcja #1</label><input id="reaction1" class="round" type="text" value="🔥"></div>
                  <div style="width: 25%;"><label>Reakcja #2</label><input id="reaction2" class="round" type="text"></div>
                  <div style="width: 25%;"><label>Reakcja #3</label><input id="reaction3" class="round" type="text"></div>
                  <div style="width: 25%;"><label>Reakcja #4</label><input id="reaction4" class="round" type="text"></div>
                </div>
              </div>
              <hr>
              <div style="margin-top: 20px;">
                <p style="font-size: 13px; margin-bottom: 10px;">Dodaj przycisk z linkiem do wiadomości.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                  <div style="width: 50%;">
                    <label>Włącz Przycisk</label>
                    <select id="enableLinkButton" class="round">
                      <option value="false" selected>Nie</option>
                      <option value="true">Tak</option>
                    </select>
                  </div>
                  <div style="width: 50%;">
                    <label>Pozycja Przycisku</label>
                    <select id="buttonPosition" class="round">
                      <option value="below" selected>Pod Embedem</option>
                      <option value="above">Nad Embedem</option>
                    </select>
                  </div>
                </div>
                <div style="margin-bottom: 12px;">
                  <label>Etykieta Przycisku</label>
                  <input id="buttonLabel" class="round" type="text" value="Zobacz więcej">
                </div>
                <div>
                  <label>URL Linku Przycisku</label>
                  <input id="buttonLinkURL" class="round" type="text" value="https://cracko.lol">
                </div>
              </div>
              <div style="margin-top: 12px;">
                  <label>URL Obrazu w drugiej wiadomości</label>
                  <input id="secondMessageImageURL" class="round" type="text" value="https://media.discordapp.net/attachments/1113880193892417646/1113880228308258816/evbanner.png">
              </div>
            </div>
          </tab>
        </tab-system>
      </div>
    `;
  },

  async action(cache) {
    const {
      AttachmentBuilder,
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
      MessageFlags,
    } = require("discord.js");
    const {
      createCanvas,
      loadImage,
      registerFont
    } = require("canvas");
    const path = require("path");
    const {
      interaction
    } = cache;
    const MOD_NAME = "[Portfolio Mod]";

    const getData = (fieldName) => {
        const actionData = cache.actions[cache.index];
        return this.evalMessage(actionData[fieldName], cache);
    };

    async function loadImageFromUrl(url) {
        if (!url) return null;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
            const buffer = Buffer.from(await response.arrayBuffer());
            return await loadImage(buffer);
        } catch (error) {
            console.error(`${MOD_NAME} Failed to load image from ${url}:`, error);
            return null;
        }
    }

    if (!interaction || !interaction.deferReply) {
      console.error(`${MOD_NAME} Interaction object is missing or invalid.`);
      return this.callNextAction(cache);
    }

    try {
      if (!interaction.deferred && !interaction.replied) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
      }
    } catch (e) {
      console.error(`${MOD_NAME} Failed to defer reply:`, e);
      return this.callNextAction(cache);
    }

    try {
      await interaction.editReply({ content: "Twoje polecenie zostało przyjęte. Generowanie grafiki...", flags: MessageFlags.Ephemeral });

      const CANVAS_WIDTH = 1920;
      const CANVAS_HEIGHT = 1080;
      const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      const ctx = canvas.getContext("2d");

      const defaults = {
        mainImageScale: 60, cornerRadius: 50, shadowColor: "#000000", shadowBlur: 15,
        shadowOffsetX: 0, shadowOffsetY: 10, fontPath: "fonts/proxima.otf", fontSize: 180,
        fontColor: "#FFFFFF", textVerticalAlign: "top", watermarkTransparency: 35,
        textShadowColor: "#000000", textShadowBlur: 5, textShadowOffsetX: 2, textShadowOffsetY: 2,
      };

      const parseNumber = (value, fallback) => {
        const num = parseInt(value, 10);
        return isNaN(num) ? fallback : num;
      };

      const backgroundImage = await loadImageFromUrl(getData("backgroundImageURL"));
      if (backgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      const attachment = interaction.options.getAttachment("zalacznik");
      let imageCenterY = CANVAS_HEIGHT / 2, imageHeight = 0;

      if (attachment && attachment.url) {
        const mainImage = await loadImageFromUrl(attachment.url);
        if (mainImage) {
            const mainImageScale = parseNumber(getData("mainImageScale"), defaults.mainImageScale) / 100;
            const cornerRadius = parseNumber(getData("cornerRadius"), defaults.cornerRadius);
            const aspectRatio = mainImage.width / mainImage.height;
            let drawWidth = CANVAS_WIDTH * mainImageScale;
            let drawHeight = drawWidth / aspectRatio;
            if (drawHeight > CANVAS_HEIGHT * mainImageScale) {
                drawHeight = CANVAS_HEIGHT * mainImageScale;
                drawWidth = drawHeight * aspectRatio;
            }
            const x = (CANVAS_WIDTH - drawWidth) / 2;
            const y = (CANVAS_HEIGHT - drawHeight) / 2;
            imageCenterY = y; imageHeight = drawHeight;
            ctx.save();
            const shadowBlur = parseNumber(getData("shadowBlur"), defaults.shadowBlur);
            if (shadowBlur > 0) {
                ctx.shadowColor = getData("shadowColor") || defaults.shadowColor;
                ctx.shadowBlur = shadowBlur;
                ctx.shadowOffsetX = parseNumber(getData("shadowOffsetX"), defaults.shadowOffsetX);
                ctx.shadowOffsetY = parseNumber(getData("shadowOffsetY"), defaults.shadowOffsetY);
            }
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y);
            ctx.arcTo(x + drawWidth, y, x + drawWidth, y + cornerRadius, cornerRadius);
            ctx.arcTo(x + drawWidth, y + drawHeight, x + drawWidth - cornerRadius, y + drawHeight, cornerRadius);
            ctx.arcTo(x, y + drawHeight, x, y + drawHeight - cornerRadius, cornerRadius);
            ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(mainImage, x, y, drawWidth, drawHeight);
            ctx.restore();
        }
      }

      const fontPath = getData("fontPath") || defaults.fontPath;
      const FONT_FAMILY = "CustomFont";
      try {
        const resolvedFontPath = path.resolve(process.cwd(), fontPath);
        registerFont(resolvedFontPath, { family: FONT_FAMILY });

        const mainText = this.evalMessage("\${slashParams('tekst_grafiki')}", cache);
        if (mainText) {
          ctx.save();
          const textShadowBlur = parseNumber(getData("textShadowBlur"), defaults.textShadowBlur);
          if (textShadowBlur > 0) {
            ctx.shadowColor = getData("textShadowColor") || defaults.textShadowColor;
            ctx.shadowBlur = textShadowBlur;
            ctx.shadowOffsetX = parseNumber(getData("textShadowOffsetX"), defaults.textShadowOffsetX);
            ctx.shadowOffsetY = parseNumber(getData("textShadowOffsetY"), defaults.textShadowOffsetY);
          }
          let fontSize = parseNumber(getData("fontSize"), defaults.fontSize);
          const maxTextWidth = CANVAS_WIDTH * 0.9;
          do {
            ctx.font = `bold ${fontSize}px "${FONT_FAMILY}", sans-serif`;
            if (ctx.measureText(mainText).width <= maxTextWidth) break;
            fontSize -= 5;
          } while (fontSize > 10);
          ctx.fillStyle = getData("fontColor") || defaults.fontColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const verticalAlign = getData("textVerticalAlign") || defaults.textVerticalAlign;
          const textY = verticalAlign === "bottom" ? imageCenterY + imageHeight + (CANVAS_HEIGHT - (imageCenterY + imageHeight)) / 2 : imageCenterY / 2;
          ctx.fillText(mainText, CANVAS_WIDTH / 2, textY);
          ctx.restore();
        }

        const watermarkText = getData("watermark");
        if (watermarkText) {
          const transparency = parseNumber(getData("watermarkTransparency"), defaults.watermarkTransparency);
          ctx.globalAlpha = Math.max(0, Math.min(100, transparency)) / 100;
          ctx.font = `bold 30px "${FONT_FAMILY}", sans-serif`;
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.fillText(watermarkText, CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20);
          ctx.globalAlpha = 1.0;
        }
      } catch (err) {
        console.error(`${MOD_NAME} Błąd operacji na tekście lub czcionce:`, err);
      }

      const topLayerImage = await loadImageFromUrl(getData("topLayerImageURL"));
      if (topLayerImage) {
        ctx.drawImage(topLayerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      const finalAttachment = new AttachmentBuilder(canvas.toBuffer("image/png"), { name: "portfolio.png" });
      const { guild } = interaction;

      const embed = new EmbedBuilder()
        .setColor(getData("embedColor") || "#ea29d1").setTitle(getData("embedTitle") || null)
        .setDescription(getData("embedDesc") || null).setImage("attachment://portfolio.png")
        .setThumbnail(guild.iconURL({ extension: "png", size: 128 }))
        .setFooter({ text: `${guild.name} • dc.euforia.fun`, iconURL: guild.iconURL() });
      const realizatorField = getData("realizatorField");
      const dlaKogoField = getData("dlaKogoField");
      if (realizatorField || dlaKogoField) {
        embed.addFields(
            { name: "Wykonane przez:", value: realizatorField || " ", inline: true },
            { name: "Dla kogo:", value: dlaKogoField || " ", inline: true }
        );
      }
      
      const buttonRow = new ActionRowBuilder();
      if (getData("enableLinkButton") === "true" && getData("buttonLinkURL")) {
        buttonRow.addComponents(new ButtonBuilder().setLabel(getData("buttonLabel") || "Zobacz więcej").setURL(getData("buttonLinkURL")).setStyle(ButtonStyle.Link));
      }

      let targetChannel = interaction.channel;
      const targetChannelID = getData("targetChannelID");
      if (targetChannelID) {
        try {
            const fetchedChannel = await guild.channels.fetch(targetChannelID);
            if (fetchedChannel && fetchedChannel.isTextBased()) targetChannel = fetchedChannel;
        } catch(e) { console.log(`${MOD_NAME} Nie znaleziono kanału docelowego, wysyłanie na obecnym kanale.`); }
      }
      
      if (buttonRow.components.length > 0 && getData("buttonPosition") === 'above') {
        await targetChannel.send({ components: [buttonRow] });
      }
      const sentMessage = await targetChannel.send({ embeds: [embed], files: [finalAttachment] });
      if (buttonRow.components.length > 0 && getData("buttonPosition") === 'below') {
        await targetChannel.send({ components: [buttonRow] });
      }
      
      if (sentMessage) {
        const reactions = [getData("reaction1"), getData("reaction2"), getData("reaction3"), getData("reaction4")].filter(Boolean);
        for (const reaction of reactions) {
          try { await sentMessage.react(reaction); } catch (err) { console.error(`${MOD_NAME} Nie udało się dodać reakcji "${reaction}":`, err); }
        }
      }

      const secondMessageImageURL = getData("secondMessageImageURL");
      if (secondMessageImageURL) {
        try { await targetChannel.send({ content: secondMessageImageURL }); }
        catch (err) { console.error(`${MOD_NAME} Nie udało się wysłać drugiej wiadomości:`, err); }
      }

    } catch (err) {
      console.error(`${MOD_NAME} Wystąpił krytyczny błąd:`, err);
      try {
        await interaction.editReply({ content: "Wystąpił nieoczekiwany błąd. Sprawdź konsolę bota.", flags: MessageFlags.Ephemeral, embeds:[], files:[], components:[] });
      } catch (e) { console.error(`${MOD_NAME} Nie udało się nawet wysłać wiadomości o błędzie:`, e); }
    } finally {
      this.callNextAction(cache);
    }
  },
  mod() {},
};
