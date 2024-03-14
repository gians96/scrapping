const puppeteer = require("puppeteer");
const { insertDataMef } = require('./services/mef.services.js')
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
        await new Promise((r) => setTimeout(r, 1500));


        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#tr0 ").click();
        });
        await new Promise((r) => setTimeout(r, 1500));

        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#ctl00_CPH1_BtnTipoGobierno").click();
        });
        await new Promise((r) => setTimeout(r, 1500));

        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#tr0").click()
        });
        await new Promise((r) => setTimeout(r, 1500));

        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#ctl00_CPH1_BtnSector").click()
        });
        await new Promise((r) => setTimeout(r, 1500));

        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#tr8").click()

        });
        await new Promise((r) => setTimeout(r, 1500));

        await page.evaluate(() => {
            const frame = document.getElementById("frame0");
            const frameDocument = frame.contentDocument;
            frameDocument.querySelector("#ctl00_CPH1_BtnPliego").click()
        });
        await new Promise((r) => setTimeout(r, 1500));

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
                rowData.pia = parseInt(rowData.pia.replace(/,/g, ''), 10)
                rowData.pim = parseInt(rowData.pim.replace(/,/g, ''), 10)
                rowData.certificacion = parseInt(rowData.certificacion.replace(/,/g, ''), 10)
                rowData.compromiso_anual = parseInt(rowData.compromiso_anual.replace(/,/g, ''), 10)
                rowData.compromiso_mensual = parseInt(rowData.compromiso_mensual.replace(/,/g, ''), 10)
                rowData.devengado = parseInt(rowData.devengado.replace(/,/g, ''), 10)
                rowData.girado = parseInt(rowData.girado.replace(/,/g, ''), 10)
                rowData.porcentaje_avance = parseFloat(rowData.porcentaje_avance.replace(/,/g, ''))
                // Agregar el objeto al array de datos
                data.push(rowData);
            });
            return data
        });
        // console.log(await allData)
        let res = insertDataMef(await allData)

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
        await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
};

mefUNDC();

module.exports = { mefUNDC }