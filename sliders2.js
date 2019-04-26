  var data = [0.8, 1.97];//boundaries of slider
  var input1 = 450//dummy values for each input, to be replaced with data from the columns of our geojson
  var input2 = 3.6
  var input3 = 280.48
  var slider1Value = 1//default position of the sliders
  var slider2Value = 1
  var slider3Value = 1
  //define the slider
  var sliderA= d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(130)
    .ticks(5)
    .default(1)
    .on('onchange', function(d){//this function detects when the slider moves


//the first function I wrote
  function yourCalculations(slider1Value, input1){
    if (input1 < 427){
          var f = input1*1.56*slider1Value;
        } else if (input1 < 488){
          var f = input1*slider1Value;
        } else {
          var f = input1
        }
      return f
  }
        //NEW:

        //these console log statements just checks for different things for me to become familiar with your map
     //   console.log(map.getStyle().layers)//this gets all the layers on your map
      //  console.log(map.getLayer("puertoRicoAll"))//this is to get that right layer to change
       // console.log(puertoricodata)//this is the data we used for the map before

        //the puertoricodata variable is what we want to use for starting values.
        //this goes through that data variable, and for each district... gets a value to put into slider
        for(var i in puertoricodata["features"]){
            //each feature here is a district
            var feature = puertoricodata["features"][i]

            //input 1 used to be the dummy value, now it is a value from each district
            var input1 = feature["properties"]["AverageWee"]//I chose the weekly income for now

            //d is the slider value, and input is each of the feature's value
            var slider1Output = yourCalculations(d, input1)//this is the new income

            //let's add the new value to the data
            //let's save this data to our puertorico data, it is saved each time the slider moves
            puertoricodata["features"][i]["properties"]["slider1"]= slider1Output
        }

        //now let's color the map with the new values

        //we can do the same color scale, but replace the averageWee get with slider1
        var newIncomeColor = [
                         'interpolate',
                         ['linear'],
                         ['get', 'slider1'],
                         0, '#F2F12D',
                         300, '#EED322',
                         450, '#E6B71E',
                         600, '#DA9C20',
                         750, '#CA8323',
                         900, '#B86B25'
                     ]

        //now we have to update the data the map is using because we added a slider 1 value
        mapAnnualincome.getSource("puertoRicoAll").setData(puertoricodata)
        //finally we set the map layer's colors this way - data we redefined in the line avoe, the attribute and the color scale.
        mapAnnualincome.setPaintProperty("puertoRicoAll","fill-color",newIncomeColor)



        //here these divs do not exist in the new combined html, so we can not use them, or add these divs to the main index.html page.
        d3.select('#sliderValue').text(d);//this displays the slider value
        slider1Value = d;
         var valueAfterCalculations = yourCalculations(d, input1)//the first of such variables, and the variables it uses
          var valueAfterCalculations2 = yourCalculations2(d, input3, slider2Value)//the second such variable
          var valueAfterCalculations3 = yourCalculations3(slider3Value, input2, slider2Value)//and the third such variable
        d3.select('#outputValue').text(valueAfterCalculations);//this displays the results of the calcualtions
        d3.select('#outputValue2').text(valueAfterCalculations2);//this is important: it makes sure slider2 updates with changes to slider1
   


        var Annualincome = d3.max(puertoricodata, function(d) { return d.AverageWee; });
        
        svgA1.append('text')
            .attr('x', 0)
            .attr('y', 70)
            .text('Most Unemployment :' + feature.properties.MUNICIPALI)

    });



//an svg to put slider on


 var svgA1 = d3.select('#A1')
    .append('svg')
    .attr('width', 180)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,15)');
//call the slider as you would an axis
 svgA1.call(sliderA);

// Show the Maximum Province


//********************************Here's the stuff for my second slider*************************************************

  //A new variable for the boundaries of my second slider
      var data2 = [0, 3.56];
  //I define the second slider
  var sliderB= d3
    .sliderBottom()
    .min(d3.min(data2))//I assume I need to put data2 here
    .max(d3.max(data2))//and here
    .width(130)
    .ticks(5)
    .default(1)
    .on('onchange', function(d){//this function detects when the slider moves

          //NEW: I copied the code you added, making the changes you see below

          //again I assumed that the puertoricodata variable is what we want to use for starting values.
          //as before, this goes through that data variable, and for each district... gets a value to put into slider

          var slider2Value = d;

          for(var i in puertoricodata["features"]){
              //each feature here is a district
              var feature = puertoricodata["features"][i]

              //input 3 used to be the dummy value, now it is a value from each district
              var input3 = feature["properties"]["TANF_Numbe"]//in this case we want the number of families on welfare

              // if(puertoricodata["features"][i]["properties"]["slider1"]!=undefined){
              //     var slider1Value = parseFloat(puertoricodata["features"][i]["properties"]["slider1"] )//this was made to be for sliderOutput
              // }else{
              //     var slider1Value = parseFloat(puertoricodata["features"][i]["properties"]["AverageWee"])
              // }

              //d (I assume) is the slider2 value, and input is each of the feature's value
              var slider2Ouptput = yourCalculations2(slider2Value, slider1Value, input3)//slider2Ouptput should do the same as sliderOutput in line 40. Is it possible I need to define slider1Value here?
             // console.log(slider2Value)
              //Again I assume we need to add the new value to the data
              //And save it to our puertorico data, which is saved each time the slider moves

              puertoricodata["features"][i]["properties"]["slider2"] = parseFloat(slider2Ouptput)

              console.log(slider2Ouptput)
          }

          //We color the map with the new values

          //scale taken from map.js file

          var newtanfColor = [
                         'interpolate',
                         ['linear'],
                         ['get', 'slider2'],//BIG QUESTION: technically speaking, the welfare map should be colored according to changes in slider 1 and slider 2
                          31,'#edf8fb',    //So would I want to put information here regarding the input to color the welfare map? Or just try and layer these maps

                           500,'#ccece6',
                           1000,'#99d8c9',
                           1500,'#66c2a4',
                           2000,'#41ae76',
                           2500,'#238b45',
                           3500,'#005824'
                                           ]

          //now we update the data the map is using because we added a slider 2 value
           mapWelfare.getSource("puertoRicoAll").setData(puertoricodata)
          //finally we set the map layer's colors this way - data we redefined in the line avoe, the attribute and the color scale.
          mapWelfare.setPaintProperty("puertoRicoAll","fill-color", newtanfColor)

//***********************************END OF NEW CODE*******************************************************


       d3.select('#sliderValue2').text(d);//this displays the slider value
       slider2Value = d;
         var valueAfterCalculations = yourCalculations(slider1Value, input1)
         var valueAfterCalculations2 = yourCalculations2(slider1Value, input3, d)
         var valueAfterCalculations3 = yourCalculations3(slider3Value, input2, d)
       d3.select('#outputValue2').text(valueAfterCalculations2);//this displays the results of the calcualtions
       d3.select('#outputValue3').text(valueAfterCalculations3);//very important: it makes sure slider3 updates with changes to slider2
   });





 //an svg to put slider2 on
 var svg = d3.select('#A2')
   .append('svg')
   .attr('width', 180)
   .attr('height', 100)
   .append('g')
   .attr('transform', 'translate(30,30)');
 //call the slider as you would an axis
 svg.call(sliderB);


 //the second function I wrote
 function yourCalculations2(slider2Value, slider1Value, input3){
   if (input3 < 485.75){
     var g = input3;
     console.log(input3)
   } else {
     var g = ((1-slider1Value)*(500.77)+input3)*slider2Value;
   }
   return g
 }

//**********************************************************Here's the stuff for my third slider****************************************

    //A new variable for the boundaries of my third slider
        var data3 = [0.43, 1.79];
    //I define the third slider
    var sliderC= d3
      .sliderBottom()
      .min(d3.min(data3))
      .max(d3.max(data3))
      .width(130)
      .ticks(5)
      .default(1)
      .on('onchange', function(d){//this function detects when the slider moves

          //NEW:

          //these console log statements just checks for different things for me to become familiar with your map
       //   console.log(map.getStyle().layers)//this gets all the layers on your map
        //  console.log(map.getLayer("puertoRicoAll"))//this is to get that right layer to change
         // console.log(puertoricodata)//this is the data we used for the map before

          //the puertoricodata variable is what we want to use for starting values.
          //this goes through that data variable, and for each district... gets a value to put into slider
          for(var i in puertoricodata["features"]){
              //each feature here is a district
              var feature = puertoricodata["features"][i]

              //input 1 used to be the dummy value, now it is a value from each district
              var input2 = feature["properties"]["NSA_Unempl"]//I chose the weekly income for now

              //d is the slider value, and input is each of the feature's value
              var slider3Output = yourCalculations3(d, input2)//this is the new income

              //let's add the new value to the data
              //let's save this data to our puertorico data, it is saved each time the slider moves
              puertoricodata["features"][i]["properties"]["slider3"]= slider3Output
          }

          //now let's color the map with the new values

          //we can do the same color scale, but replace the averageWee get with slider1
          var newunemploymentColor = [
                           'interpolate',
                           ['linear'],
                           ['get', 'slider3'],
                           3,'#800026',
                           6,'#BD0026',
                           9,'#E31A1C',
                           12,'#FC4E2A',
                           15,'#FD8D3C'
                       ]

          //now we have to update the data the map is using because we added a slider 1 value
           mapUnemployment.getSource("puertoRicoAll").setData(puertoricodata)
          //finally we set the map layer's colors this way - data we redefined in the line avoe, the attribute and the color scale.
          mapUnemployment.setPaintProperty("puertoRicoAll","fill-color",newunemploymentColor)




          d3.select('#sliderValue3').text(d);//this displays the slider value
          slider3Value = d;
            var valueAfterCalculations = yourCalculations(slider1Value, input1)
            var valueAfterCalculations2 = yourCalculations2(slider1Value, input3, slider2Value)
            var valueAfterCalculations3 = yourCalculations3(d, input2, slider2Value)
          d3.select('#outputValue3').text(valueAfterCalculations3);//this displays the results of the calcualtions

      });

    //an svg to put slider3 on
    var svg = d3.select('#A3')
      .append('svg')
      .attr('width', 130)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,45)');
    //call the slider as you would an axis
    svg.call(sliderC);


    //this third and final function I wrote
    function yourCalculations3(slider3Value, input2){
            var h = slider3Value*input2;
        return h
    }
