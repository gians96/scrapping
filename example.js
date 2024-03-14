const puppeteer = require('puppeteer')
require('dotenv').config()

const scrapeLogic = async res => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1 })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://developer.chrome.com/')
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}
//Capturar una pantalla
const captureScreenshot = async res => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1 })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://developer.chrome.com/')
    await page.screenshot({ path: 'exmanepl.png' })
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}

const quotesToScrape = async res => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://quotes.toscrape.com/')
    //Da click en elemento que se encuentra con la siguiente etiqueta
    await page.click('a[href="/login"]')
    //se espera esa cantidad antes de terminar la funcion
    await new Promise(r => setTimeout(r, 5000))

    //para tipear
    //await page.type(".search-box__input", "automate beyond recorder");
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}

const extraerInformacion = async res => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://www.example.com/')

    const result = await page.evaluate(() => {
      const title = document.querySelector('h1').innerHTML
      const description = document.querySelector('p').innerHTML
      const more = document.querySelector('a').innerHTML
      return { title, description, more }
    })
    console.log(result)
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}

const handleDynamicWebPage = async res => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://quotes.toscrape.com/')

    const result = await page.evaluate(() => {
      const quotes = document.querySelectorAll('.quote')
      const data = [...quotes].map(quote => {
        const quoteText = quote.querySelector('.text').innerText
        const author = quote.querySelector('.author').innerText
        const tags = [...quote.querySelectorAll('.tag')].map(
          tag => tag.innerText
        )
        return { quoteText, author, tags }
      })

      return data
    })
    console.log(result)
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}

//MINISTERIO DE LA PRODUCCION
//https://esiscasv2.produce.gob.pe/E_Inicio.aspx
const c1 = async (dni) => {
  //slowMo, por cada accion se realiza un tiempo de espera
  const { performance } = require('perf_hooks')

  var start = performance.now()
  const browser = await puppeteer.launch({
    // headless: false, slowMo: 5

    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zygote'
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    slowMo: 5
  })
  try {
    const page = await browser.newPage()
    //va a la pagina
    await page.goto('https://esiscasv2.produce.gob.pe/E_Inicio.aspx')
    await new Promise(r => setTimeout(r, 50))
    await page.waitForSelector('#modalavisoactualizarperfilinicio > div > div.modal-footer > button', { visible: true })
    await page.click(
      '#modalavisoactualizarperfilinicio > div > div.modal-footer > button'
    )
    await page.waitForSelector('#ltbpostulante', { visible: true })
    await new Promise(r => setTimeout(r, 120))
    await page.click('#ltbpostulante')

    await page.waitForSelector('#txtdni', { visible: true })
    await new Promise(r => setTimeout(r, 300))
    await page.type('#txtdni', dni)

    await page.waitForSelector('#btnbuscarreniec', { visible: true })    
    await new Promise(r => setTimeout(r, 150))
    
    await page.click('#btnbuscarreniec')
    await new Promise(r => setTimeout(r, 2000))
    const data = await page.evaluate(() => {
      const dni = document.querySelector('#txtdni').value
      const nombres = document.querySelector('#txtnombres').value
      const apPaterno = document.querySelector('#txtapellidopat').value
      const apMaterno = document.querySelector('#txtapellidomat').value
      const fechaNacimiento = document.querySelector('#txtfechanac').value
      const estadoCivil = document.querySelector('#ddlestadocivil').value
      const direccion = document.querySelector('#txtdireccion').value
      return {
        dni,
        nombres,
        apPaterno,
        apMaterno,
        fechaNacimiento,
        estadoCivil,
        direccion
      }
    })
    console.log(data)
    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
}

//scrapeLogic()
// captureScreenshot()
// quotesToScrape()
// extraerInformacion()
// handleDynamicWebPage()
c1("71690440")
module.exports = { scrapeLogic }
