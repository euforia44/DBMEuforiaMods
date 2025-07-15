document.getElementById("updatebtn").addEventListener("click", async () => {
  const spinner = document.getElementById("loadingSpinner");
  const button = document.getElementById("updatebtn");

  try {
    spinner.style.display = "inline-block";
    button.disabled = true;
    button.style.cursor = "not-allowed";

    const selectedValue = document.getElementById("updatePackageSelect").value;
    const fs = require("fs");
    const path = require("path");

    const actLoc = this.DBM.actLocs.toString();
    const evtLoc = this.DBM.evtLocs.toString();
    const baseDir = path.dirname(actLoc);
    const extensionsDir = path.join(baseDir, "extensions");
    const dbmResourcesPath = path.join(
      "C:",
      "Program Files (x86)",
      "Steam",
      "steamapps",
      "common",
      "Discord Bot Maker",
      "resources",
      "app"
    );

    const endpoints = {
      actions: "https://api.github.com/repos/DBM-POLSKA/DBM-14/contents/bot-files/actions",
      actionsEuforia: "https://api.github.com/repos/euforia44/DBMEuforiaMods/contents/actions?ref=4ebed4cf964e400f8a648af7e0bdb5928bc23212",
      events: "https://api.github.com/repos/DBM-POLSKA/DBM-14/contents/bot-files/events",
      extensions: "https://api.github.com/repos/DBM-POLSKA/DBM-14/contents/bot-files/extensions",
      botJS: "https://raw.githubusercontent.com/DBM-POLSKA/DBM-14/main/bot-files/bot.js",
    };

    const downloadAndWriteFiles = async (url, targetPath) => {
      const res = await fetch(url);
      const files = await res.json();

      if (!Array.isArray(files)) {
        throw new Error("Incorrect response from GitHub.");
      }

      for (const file of files) {
        if (file.type === "file" && file.download_url) {
          const content = await fetch(file.download_url).then((res) => res.text());
          const finalPath = path.join(targetPath, file.name);
          saveFileLocally(finalPath, content);
        }
      }
    };

    const downloadSingleFile = async (url, fileName, targetDir) => {
      const content = await fetch(url).then((res) => res.text());
      const finalPath = path.join(targetDir, fileName);
      saveFileLocally(finalPath, content);
    };

    switch (selectedValue) {
      case "0":
        await downloadAndWriteFiles(endpoints.actions, actLoc);
        await downloadAndWriteFiles(endpoints.actionsEuforia, actLoc);
        alert("Actions (DBM + Euforia Mods) have been updated!");
        break;

      case "1":
        await downloadAndWriteFiles(endpoints.events, evtLoc);
        alert("Events have been updated!");
        break;

      case "2":
        await downloadSingleFile(
          `${endpoints.extensions}/bot_intents.js`,
          "bot_intents.js",
          extensionsDir
        );
        alert("Intents have been updated!");
        break;

      case "3":
        await downloadSingleFile(
          `${endpoints.extensions}/bot_partials.js`,
          "bot_partials.js",
          extensionsDir
        );
        alert("Partials have been updated!");
        break;

      case "4":
        await downloadAndWriteFiles(endpoints.extensions, extensionsDir);
        alert("All extensions have been updated!");
        break;

      case "5":
        await downloadSingleFile(endpoints.botJS, "bot.js", baseDir);
        alert("bot.js have been updated!");
        break;

      case "6": {
        const dbmEnhancedPaths = [
          "html",
          "html/dbm_enhanced/css",
          "html/dbm_enhanced/img",
          "html/dbm_enhanced/js"
        ];

        const basePathOfficial = "https://api.github.com/repos/DBM-POLSKA/DBM-14/contents/dbm-files/resources/app";
        const basePathEuforia = "https://api.github.com/repos/euforia44/DBMEuforiaMods/contents/resources?ref=90029851bc9c9afe4d919592b7f3d32394d9ace7";

        const useOfficialSource = async () => {
          try {
            const res1 = await fetch(`${basePathOfficial}`);
            const res2 = await fetch(`${basePathEuforia}`);
            const data1 = await res1.json();
            const data2 = await res2.json();

            if (!Array.isArray(data1) || !Array.isArray(data2)) return false;

            const match = data1.every((file1) => {
              const file2 = data2.find((f) => f.name === file1.name);
              return file2 && file1.sha === file2.sha;
            });

            return !match; // true = używaj oficjalnych, false = twoje
          } catch {
            return false;
          }
        };

        const useOfficial = await useOfficialSource();

        for (const folder of dbmEnhancedPaths) {
          const fullPath = path.join(dbmResourcesPath, folder);
          const fullUrl = useOfficial
            ? `${basePathOfficial}/${folder}`
            : `${basePathEuforia}/${folder.split("/").slice(1).join("/")}`;

          await downloadAndWriteFiles(fullUrl, fullPath);
        }

        alert(`DBM Enhanced interface has been updated from ${useOfficial ? "official" : "your custom"} source!`);
        break;
      }

      default:
        alert("Unsupported option.");
        break;
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("An error occurred while updating.");
  } finally {
    spinner.style.display = "none";
    button.disabled = false;
    button.style.cursor = "pointer";
  }
});

function saveFileLocally(filePath, content) {
  const fs = require("fs");
  const path = require("path");

  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, content, "utf8");
}
