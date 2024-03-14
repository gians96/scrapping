const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1 });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://developer.chrome.com/");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};
//Capturar una pantalla
const captureScreenshot = async (res) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1 });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://developer.chrome.com/");
    await page.screenshot({ path: "exmanepl.png" });
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

const quotesToScrape = async (res) => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://quotes.toscrape.com/");
    //Da click en elemento que se encuentra con la siguiente etiqueta
    await page.click('a[href="/login"]');
    //se espera esa cantidad antes de terminar la funcion
    await new Promise((r) => setTimeout(r, 5000));

    //para tipear
    //await page.type(".search-box__input", "automate beyond recorder");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

const extraerInformacion = async (res) => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://www.example.com/");

    const result = await page.evaluate(() => {
      const title = document.querySelector("h1").innerHTML;
      const description = document.querySelector("p").innerHTML;
      const more = document.querySelector("a").innerHTML;
      return { title, description, more };
    });
    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

const handleDynamicWebPage = async (res) => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://quotes.toscrape.com/");

    const result = await page.evaluate(() => {
      const quotes = document.querySelectorAll(".quote");
      const data = [...quotes].map((quote) => {
        const quoteText = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;
        const tags = [...quote.querySelectorAll(".tag")].map(
          (tag) => tag.innerText
        );
        return { quoteText, author, tags };
      });

      return data;
    });
    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

//MINISTERIO DE LA PRODUCCION
//https://esiscasv2.produce.gob.pe/E_Inicio.aspx
const c1 = async (dni) => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const { performance } = require("perf_hooks");

  var start = performance.now();
  const browser = await puppeteer.launch({
    //cuando esta en true no se muestra el navegador, por defecto esta en true,
    headless: false,
    // slowMo: 5
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    slowMo: 5,
  });
  try {
    const page = await browser.newPage();
    //va a la pagina
    await page.goto("https://esiscasv2.produce.gob.pe/E_Inicio.aspx");
    await new Promise((r) => setTimeout(r, 50));
    await page.waitForSelector(
      "#modalavisoactualizarperfilinicio > div > div.modal-footer > button",
      { visible: true }
    );
    await page.click(
      "#modalavisoactualizarperfilinicio > div > div.modal-footer > button"
    );
    await page.waitForSelector("#ltbpostulante", { visible: true });
    await new Promise((r) => setTimeout(r, 120));
    await page.click("#ltbpostulante");

    await page.waitForSelector("#txtdni", { visible: true });
    await new Promise((r) => setTimeout(r, 300));
    await page.type("#txtdni", dni);

    await page.waitForSelector("#btnbuscarreniec", { visible: true });
    await new Promise((r) => setTimeout(r, 150));

    await page.click("#btnbuscarreniec");
    await new Promise((r) => setTimeout(r, 2000));
    const data = await page.evaluate(() => {
      const dni = document.querySelector("#txtdni").value;
      const nombres = document.querySelector("#txtnombres").value;
      const apPaterno = document.querySelector("#txtapellidopat").value;
      const apMaterno = document.querySelector("#txtapellidomat").value;
      const fechaNacimiento = document.querySelector("#txtfechanac").value;
      const estadoCivil = document.querySelector("#ddlestadocivil").value;
      const direccion = document.querySelector("#txtdireccion").value;
      return {
        dni,
        nombres,
        apPaterno,
        apMaterno,
        fechaNacimiento,
        estadoCivil,
        direccion,
      };
    });
    console.log(data);
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

const mefUNDC = async () => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const { performance } = require("perf_hooks");

  var start = performance.now();
  const browser = await puppeteer.launch({
    //cuando esta en true no se muestra el navegador, por defecto esta en true,
    // headless: false,
    // slowMo: 5
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    slowMo: 5,
  });
  try {
    const page = await browser.newPage();
    //va a la pagina

    await page.goto(
      "https://apps5.mineco.gob.pe/transparencia/Navegador/default.aspx"
    );
    await new Promise((r) => setTimeout(r, 500));


    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#tr0 ").click();
    });
    await new Promise((r) => setTimeout(r, 500));

    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#ctl00_CPH1_BtnTipoGobierno").click();
    });
    await new Promise((r) => setTimeout(r, 500));

    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#tr0").click()
    });
    await new Promise((r) => setTimeout(r, 500));

    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#ctl00_CPH1_BtnSector").click()
    });
    await new Promise((r) => setTimeout(r, 500));

    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#tr8").click()

    });
    await new Promise((r) => setTimeout(r, 500));

    await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      frameDocument.querySelector("#ctl00_CPH1_BtnPliego").click()
    });
    await new Promise((r) => setTimeout(r, 500));

    const allData = await page.evaluate(() => {
      const frame = document.getElementById("frame0");
      const frameDocument = frame.contentDocument;
      const rows = frameDocument.querySelectorAll("#PnlData > table.Data > tbody > tr")
      const data = [];
      rows.forEach(row => {
        // Obtener los datos de cada celda en la fila
        const cells = row.querySelectorAll('td');

        // Crear un objeto para almacenar los datos de esta fila
        const rowData = {
          codigo: cells[0].querySelector('input').getAttribute('value').split('/')[0],
          descripcion: cells[1].textContent.trim(),
          pia: cells[2].textContent.trim(),
          pim: cells[3].textContent.trim(),
          certificacion: cells[4].textContent.trim(),
          compromiso_anual: cells[5].textContent.trim(),
          compromiso_mensual: cells[6].textContent.trim(),
          devengado: cells[7].textContent.trim(),
          girado: cells[8].textContent.trim(),
          porcentaje_avance: cells[9].textContent.trim()
        };

        // Agregar el objeto al array de datos
        data.push(rowData);
      });
      return data
    });
    console.log(await allData)
    await new Promise((r) => setTimeout(r, 500));
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

mefUNDC();
//scrapeLogic()
// captureScreenshot()
// quotesToScrape()
// extraerInformacion()
// handleDynamicWebPage()
// c1("71690440")
module.exports = { scrapeLogic };
