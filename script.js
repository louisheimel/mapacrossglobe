fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')
.then(data => data.json())
.then(data => {
  const config = {
    // code adapted from http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71
    width: 960,
    height: 500,
    margin: '0 auto',
    display: 'block',
    border: '1px solid black',
    bgColor: '#6fe2f7'
  }
  var svg = d3.select('body').append('svg')

  var projection = d3.geoMercator()
    .scale(config.width / 2 / Math.PI)
    .translate([config.width / 2, config.height / 2])

  var path = d3.geoPath()
    .projection(projection)

  var url = 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson'
  d3.json(url, (err, geojson) => {
    svg
      .style('width', config.width)
      .style('height', config.height)
      .style('margin', config.margin)
      .style('display', config.display)
      .style('border', config.border)
      .style('background-color', config.bgColor)
      .append('path')
      .attr('d', path(geojson))
  })
  console.log(data)
})
