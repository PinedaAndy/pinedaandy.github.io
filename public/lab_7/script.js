

function convertRestaurantsToCategories(restaurantList) {

  
  const list = restaurantList.reduce((collection, item, i) => {
    //Checks for item category and append if not in arrray 
    const findCat = collection.find((f) => f.label === item.category);


    if (!findCat) {
      collection.push({
        label: item.cateogry,
        y:1, 
      });
    } else 
    { 
      findCat.y += 1; 
    }


    return collection;
  }, []); 

  
  console.table(list)
  return list;

}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    "#B19BBF",
    "#7E9CD9",
    "#D9BD30",
    "#73553C",
    "#D9593D",
    "#BDE3F2",
    "#A68C3F",
    "#D9A171",
    "#593527",
    "#A6654E"

  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Change This Title',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [{
        
        startValue: 40,
        endValue: 50,
        color: "orange",
        type: "zigzag"

      },
      {
        startValue: 85,
        endValue: 100,
        color: "orange",
        type: "zigzag"
      },
      {
        
        startValue: 140,
        endValue: 175,
        color: "orange",
        type: "zigzag"

      }]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  

  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});