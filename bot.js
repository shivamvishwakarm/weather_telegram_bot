const axios  = require("axios");
const {Telegraf} = require("telegraf");
const https = require("https"); // Adding in build module https
const { url } = require("inspector");


const TOKEN = '6682224937:AAGPJJ4xOD9N62070O1nqQ6f0hPDTm6JDJQ';
const APIKEY = "f67f6acb62a497586156160e65f1bf7c";
const bot = new Telegraf(TOKEN);
const unit = "metric";
const URL = "https://api.openweathermap.org/data/2.5/weather?q="

const fetchData = async(cityName) =>{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=${unit}`)
    // console.log(res.data);
    return res;
}

// fetchData("Delhi,In");

bot.start((ctx)=> {
    ctx.reply("Hello ankit");
});

bot.on("text", async(ctx)=>{
    const {message} = ctx;
    const {data} = await fetchData(message.text);
    if(data.success === false){
        ctx.reply("Enter a valid city name:");
    }
    else{
        const {main, weather,name,sys} = data;
        const weatherStatus = weather[0].description;

        ctx.reply(`City: ${name}(${sys.country}) 🏙️ \n Temperature: ${Math.round(main.temp)}°C 🌡️\n Real feel: ${Math.round(main.feels_like)}°C 🌡️\n Status: ${weather[0].main}\n Humidity: ${main.humidity}%`)
    }
})



bot.launch();
