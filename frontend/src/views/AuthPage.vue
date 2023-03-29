<!-- done, but could be better -->
<template>
  <div class = "container animate__animated animate__fadeInDown">
    <div class = "form-container signin-container">  
      <form>
        <h2 class = "AuthWord" id = "AuthWord">Log In</h2>
        <br/>
        <div>
          <label for="logInusername">Your Username:</label>
          <br/>
          <input
            type="username"
            name="username"
            id="logInusername"
            required
          />
        </div>
        
        <div>
          <label for="logInpassword">Your Password:</label>
          <br/>
          <input
            type="password"
            name="password"
            id="logInpassword"
            required
          />
        </div>
        <button type="button" class = "btn mt-5" @click="login">Login</button>  
      </form>
    </div>


    <div class = "form-container signup-container">
      <form>
        <h2 class = "AuthWord" id = "AuthWord">Sign Up</h2>
        <br/>
        <div>
          <label for="signUsername">Your Username:</label>
          <br/>
            <input 
              type="text" 
              name="name" 
              id="signUsername" 
              required 
            />
        </div>
        <div>
          <label for="password1">Your Password:</label>
          <br/>
            <input 
              type="password" 
              name="password" 
              id="password1" 
              required 
            />
        </div>
        <div>
          <label for="password2">Verify Your Password:</label>
          <br/>
            <input 
              type="password" 
              name="password" 
              id="password2" 
              required 
            />
        </div>
        <button type="button" class="btn mt-5" @click="register">Register</button>
      </form>
    </div>
    <!-- ======= -->
    <div class="overlay-container">
      <!-- <video  autoplay muted loop>
        <source src="https://storage.coverr.co/videos/coverr-italian-old-city-1570370740593?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTg1NjM4MTMxfQ.O0oXifvIX_nFLO3JzgH2GTW3JNCokuMvCzdcsesGj4g" type="video/mp4">
      </video> -->
      
		  <div class="overlay">
        
        <div class = "overlay-panel overlay-right">
          <h1 class = "h1Word">Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="btn mt-5" @click="ClickSignUp">Sign Up</button>
        </div >
        <div class = "overlay-panel overlay-left">
          <h1 class = "h1Word">Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="btn mt-5" @click="ClickSignIn">Sign In</button>
        </div>
        
		  </div>
	  </div>
    <!-- ========== -->


  </div>
  </template>

  <script>
  import axios from "axios";
  import Cookies from "js-cookie";
  export default {
    name: "AuthPage",
    setup() {
      
      
      const ClickSignUp = () => {
        
        const container = document.querySelector(".container"); 
        container.classList.add("right-panel-active");
        
        
      };
      const ClickSignIn = () => {
        const container = document.querySelector(".container");       
        container.classList.remove("right-panel-active");
      };
      const login = () => {
        const username = document.getElementById("logInusername").value;
        const password = document.getElementById("logInpassword").value;
        const data = { username, password };
        if (!username || !password) {
          alert("Please enter username and password!");
          return;
        }
        //post data with axios, if response is 200, pop up a message then redirect to home page, else pop up a message
        axios
          .post("http://localhost:3000/login", data, {
            //Allow cookies to be saved
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Login successfully!");
              Cookies.set("jwt", res.data.token, { expires: 1 });
              Cookies.set("username", username, { expires: 1 });
              window.location.href = "/";
              //window.location.href = "/";
            }
          })
          .catch((err) => {
            alert("Login failed!");
            console.log(err);
          });
      };
      const register = () => {
        let username = document.getElementById("signUsername").value;
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;
        if (!username || !password1 || !password2) {
          alert("Please enter username and password!");
          return;
        }
        if (password1 !== password2) {
          alert("Passwords do not match!");
          return;
        }
        const password = password1;
        const data = { username, password };
        axios
          .post("http://localhost:3000/user/create", data)
          .then((res) => {
            if (res.status === 200) {
              alert("Register successfully! Please log in again.");
              window.location.href = "/";
            }
            //if get a response with 201, pop up a message with "username already exists"
            if (res.status === 201) {
              alert("Username already exists!");
            }
          })
          .catch((err) => {
            alert("Register failed!");
            console.log(err);
          });
      }
      return { ClickSignUp, ClickSignIn, login, register};
    },
  };
  </script>

  <style>
  body {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    min-height: 100vh;
  }
  
  h1{
    font-weight: 600;
  }

  h2{
    font-weight: 900;
    background-image: url("pexels-miriam-espacio-1881621");
    background-size: cover;
    color: transparent;
    -webkit-background-clip:text;
    background-clip: text;
    background-position: fixed;
  }
  
  
  </style>