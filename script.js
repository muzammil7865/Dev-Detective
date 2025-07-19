//Variables
//start to study from listeners then functions
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);// defining get function(it is just like getElementById)
const url = "https://api.github.com/users/";// API
const noresults = get("no-results");
const btnmode = get("btn-mode"); // get means getElementById (get is a fuction similar to getelementById)
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");//image
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;// initially dark mode is false 

// Event Listeners
//here we have 4 event listener 1.dark mode 2.search button 3.key down 4.input 
btnsubmit.addEventListener("click", function () { //search vala button
  if (input.value !== "") {
    getUserData(url + input.value); //getting user data after clicking on search button by passing url and input value (input means name we typed on search bar)
  }
});

input.addEventListener(// we applying for input tag(that is search bar)
  "keydown",// search in mdn as keydown 
  function (e) {
    if (e.key == "Enter") { //agar meri  paressed key enter hai //agar me enter bi click karu to search hona chayiye
      if (input.value !== "") {
        getUserData(url + input.value);// get the user data 
      }
    }
  },
  false
);

input.addEventListener("input", function () {
  noresults.style.display = "none";//remove no search results
});

btnmode.addEventListener("click", function () {// when you click
  if (darkMode == false) {
    darkModeProperties();// dark mode ki properties lago
  } else {
    lightModeProperties();// light mode ki properties lagado
  }
});

// Functions

//API CALL
function getUserData(gitUrl) {
  fetch(gitUrl)//calling API
    .then((response) => response.json()) // we are converting to json//to understand then see book in book we wrote diff b/w then and await
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;// jobi error define kiya huva hai usko dika dega
    });
}


//RENDER
function updateProfile(data) {
  if (data.message !== "Not Found") { //
    noresults.style.display = "none";//hiding
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    
    avatar.src = `${data.avatar_url}`;// url daldo 
    userName.innerText = data.name === null ? data.login : data.name;//ternary operator
    user.innerText = `@${data.login}`;// @ is simply used
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";// its checking null or not
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}



//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");//just we are changing values(colors) of glocal variables which we have declared in css
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");// changing the image
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");

  console.log("setting dark mode to true");

}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";// changing the image
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}


//INITIALISE UI
function init() {
  //initialise dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h 
  //darMode = false -> light mode enable karna h 
  darkMode = false;

  //HW
// const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const value = localStorage.getItem("dark-mode");// checking ki user pehle se hi preference set kiya huva hai ya nahi(means pehle se hi dark rakha huva to kolne ke bad dark dikhao nahi to set karneke liye choice do)

  if(value === null) {
    console.log("null k andar");
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  }
  else if(value == "true") {
    console.log("true k andar");
    darkModeProperties();
  }
  else if(value == "false") {
    console.log("false k andar");
    lightModeProperties();
  }


  //by default, pranaygupta ki info show krre h UI pr
  getUserData(url + "thepranaygupta");
}

init();
