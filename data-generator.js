const blessed = require('blessed')
const contrib = require('blessed-contrib')
const moment = require('moment')

let data = {
  x: [],
  y: []
}

let screen = blessed.screen()

// Para crear un grid con 12 columnas y 12 filas, así darle formato a los elementos de la pantalla
const grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen
})

// Se agrega una caja de texto
let map = grid.set(0, 0, 2, 12, blessed.box, {content: '  Random data with layout :)'})

// Se agregan los graficos en linea para graficar la información
let line = grid.set(2,0, 10, 12, contrib.line, {
  style: {
    line: "yellow",
    text: "green",
    baseline: "black"
  },
  xLabelPadding: 3,
  xPadding: 5,
  label: 'Random Info Chart',
} )

line.setData([data]) // Se establece la información
screen.key(['escape', 'q', 'C-c'], (ch, key) => {  //las teclas escape, la letra q o la combinación de control c
  process.exit(0) //salir de forma exitosa
})

//metodo que genera nueva información y solo muestra los ultimos 6 registros
const getNewData = () => {
  let newData = generateData();
  data.x.push(newData.x)
  data.y.push(newData.y)

  let series = {
    x: data.x.slice(-6),
    y: data.y.slice(-6)
  }

  line.setData([series])
  screen.render()  // se debe repintar el grafico
}

// genera un objeto con la hora y un numero aleatorio
const generateData = () => {
  let x = moment().format('HH:mm:ss')
  let y = Math.floor((Math.random() * 10) + 1);
  return {
    x,
    y
  }
}

setInterval(getNewData, 1000); // para generar informacion cada segundo

screen.render()