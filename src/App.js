import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      userInput: '',
      currCity: '',
      currWeatherDescription:'',
      currTemp: '',
      error: false,
    }
  }

  handleChange=(e)=>{
    let currUserInput = e.target.value;

    this.setState({
      userInput: currUserInput
    })
  }

  onSubmit=(e)=>{
    e.preventDefault();
    console.log('run')
    let currTemp = '';
    let currTempKelvin = '';
    let currDescription = '';
    let currCity = '';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.userInput}&appid=a38217d581109b2be9c0e961cc2fa6d3`)
    .then((res)=>{
      currTempKelvin = res.data.main.temp-273.15;
      currTemp = Math.round(currTempKelvin * 100) / 100; 
      currDescription = res.data.weather[0].main + ', ' + res.data.weather[0].description
      currCity = res.data.name
      console.log('run1')

        this.setState({
          userInput: '',
          currCity: currCity,
          currTemp: currTemp,
          currWeatherDescription: currDescription,
          error: false,
        })
    }).catch((error)=>{
        console.log('error')
        this.setState({
          userInput: '',
          error: true,
        })
      }
    )
  }

  render(){
    let outputMessage = '';
    if (this.state.error === true){
      outputMessage = 'Please enter an actual city.'
    } else{
      outputMessage = 'Please enter a city name to find the weather there!'
    }

    return(
      <div className="App">
        <header className="App-header">
          <form onSubmit = {this.onSubmit}>
            <input type="input" value={this.state.userInput} onChange = {this.handleChange}/>
            <input type="submit" value = "Submit" />
          </form>
          {this.state.currTemp !== '' && this.state.error !== true
          ? <div>
            <p>City: {this.state.currCity}</p>
            <p>Temperature: {this.state.currTemp}°C</p>
            <p>Description: {this.state.currWeatherDescription}</p>
          </div>
          : <p>{outputMessage}</p>}
        </header>
      </div>
    )
  }
}

export default App;
