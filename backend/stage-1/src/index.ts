import express from "express";
import { CorsOptions } from "cors";
import axios from "axios";
import  cors from "cors";



const app = express();

app.use(cors());
app.get("/api/hello", async (req, res) => {
 const visitorName =  req.query.visitor_name;
 const apiKey = "18e8579b9f367714bf5e7e01c346f50c"
 const visitorIP = req.ip == "::1" ? "103.23.29.120": req.ip; 
 const url = `http://api.ipstack.com/${visitorIP}?access_key=${apiKey}`;

 console.log(req.ip);
 
 try {
   const response = await axios.get(url);
   const location = response.data;


   res.json({
        client_ip:visitorIP,
        location: location.country_name,
        greeting: `Hello, ${visitorName}`,
   });
 } catch (error) {
   console.error("Error fetching location data:", error);
   res.send(`Hello, ${visitorName}`);
 }
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});