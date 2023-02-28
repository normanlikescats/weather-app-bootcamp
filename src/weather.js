import React from 'react';
import axios from 'axios';

export default class WeatherForm extends React.Component{
  constructor(props){
    super(props)

    this.state={
      userInput: '',
      city: '',
      weatherDescription:'',
      temp:0,
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
    
    let currTemp = '';
    let currDescription = '';
    let weatherData = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.userInput}&appid=a38217d581109b2be9c0e961cc2fa6d3`)
    .then((res)=>{
      currTemp = res.data.main.temp;
      currDescription = res.data.weather[0].main + ', ' + res.data.weather[0].description
      console.log(currDescription)
      console.log(currTemp)
    })

    this.setState=({
      city: this.state.userInput,
      temp: currTemp,
      weatherDescription: currDescription
    })
  }


    

  render(){
    console.log(this.state.weatherDescription)
    console.log(this.state.currTemp)
    return(
      <div>
        <form onSubmit = {this.onSubmit}>
          <input type="input" value={this.props.userInput} onChange = {this.handleChange}/>
          <input type="submit" value = "Submit" />
        </form>
        <div>
          <p>City: {this.state.city}</p>
          <p>Temperature: {this.state.temp}</p>
          <p>Description: {this.state.weatherDescription}</p>
        </div>
      </div>
    )
  }
}