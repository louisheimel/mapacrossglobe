fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')
.then(data => data.json())
.then(data => {
  console.log(data)
})
