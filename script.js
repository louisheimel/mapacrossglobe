fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')
.then(data => data.json())
.then(data => {
  data.features = data.features.filter(e => e.properties.mass)
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

  const scalePointSizeByMass = (d) => {
    const mass = +d.properties.mass
    const takeLog = () => Math.log10(+d.properties.mass)
    const scaleFactorLog = () => Math.log10(d.properties.mass) / 3
    const scaleFactorLinear = () => d.properties.mass
    return path.pointRadius(scaleFactorLog)(d)
  }

  const meteoriteInfo = (() => {
    const meteoriteInfoBox = d3.select("body").append("div")
                                .style("display", "none");

    const showMeteoriteInfo = (e) => {
      console.log(e)
      meteoriteInfoBox.style('display', 'block')
         .text('hello')
         .style("left", (d3.event.pageX + 20) + "px")
         .style("top", (d3.event.pageY - 40) + "px")
         .style('position', 'absolute')
         .style('width', 'auto')
         .style('height', 'auto')
         .style('background-color', '#c7c7c7')
         .style('padding', '10px')
         .style('border-radius', '20px')
         .style('white-space', 'pre-wrap')
    }

    const hideMeteoriteInfo = (e) => {
      meteoriteInfoBox.style('display', 'none')
    }

    return {
      show: showMeteoriteInfo,
      hide: hideMeteoriteInfo
    }
  })()

  d3.json(url, (err, geojson) => {
    svg
      .style('width', config.width)
      .style('height', config.height)
      .style('margin', config.margin)
      .style('display', config.display)
      .style('border', config.border)
      .style('background-color', config.bgColor)
      .append('path')
      .attr('fill', 'green')
      .attr('d', path(geojson))
      .data(data.features)
    
    const meteorites = svg.selectAll('.meteorite')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', scalePointSizeByMass)
      .attr('fill', 'pink')
      .attr('stroke', 'black')
      .attr('stroke-width', '.1')

    meteorites.on('mouseover', meteoriteInfo.show)

    meteorites.on('mouseleave', meteoriteInfo.hide)
  })

})
