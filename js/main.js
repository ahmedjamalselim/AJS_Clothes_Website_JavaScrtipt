/** @format */

// global variables
let toggleBk = true;
let toggleInt;

// check local storage color
let mainColor = localStorage.getItem("main-color");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".option-box .color-set li").forEach((li) => {
    if (li.classList.contains("active")) {
      li.classList.remove("active");
    }

    if (li.dataset.color == mainColor) {
      li.classList.add("active");
    }
  });
}
// check local storage background status
let bgLocalStatus = localStorage.getItem("background-status");

if (bgLocalStatus !== null) {
  if (bgLocalStatus === "true") {
    toggleBk = true;
  } else {
    toggleBk = false;
  }

  document.querySelectorAll(".background-option span").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.toggle === bgLocalStatus) {
      ele.classList.add("active");
    }
  });
}
// check local storage sidebar status
let sideButStatus = localStorage.getItem("sideBar status");

if (sideButStatus !== null) {
  if (sideButStatus === "hide") {
    document.querySelector(".side-bullet").style.display = "none";
  } else {
    document.querySelector(".side-bullet").style.display = "block";
  }
  document.querySelectorAll(".setting-area .side-bar span").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.appear === sideButStatus) {
      ele.classList.add("active");
    }
  });
}

// start setting box...
let gear = document.querySelector(".setting-box .gear");

gear.onclick = () => {
  document.querySelector(".setting-box").classList.toggle("clicked");
  document.querySelector(".setting-box .gear-icon").classList.toggle("opened");
};
// end setting box...

// start setting the site colors
let liList = document.querySelectorAll(".option-box .color-set li");

liList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,

      //setting the color in the local storage
      localStorage.setItem("main-color", e.target.dataset.color),

      // removing and adding active class to the target element only
      e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
        ele.classList.remove("active");
      }),

      e.target.classList.add("active")
    );
  });
});
// end setting the site colors

// start background status
let statusButton = document.querySelectorAll(".background-option span");
toggleBackground();

statusButton.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    statusButton.forEach((but) => {
      but.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.toggle === "true") {
      toggleBk = true;
      toggleBackground();
      localStorage.setItem("background-status", true);
    } else if (e.target.dataset.toggle === "false") {
      toggleBk = false;
      clearInterval(toggleInt);
      localStorage.setItem("background-status", false);
    }
  });
});
// end background status

// changing the landing background image...
let imgsArr = [
  "landing1.jpg",
  "landing2.jpg",
  "landing3.jpg",
  "landing4.jpg",
  "landing5.jpg",
];

function toggleBackground() {
  if (toggleBk === true) {
    toggleInt = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArr.length);
      document.querySelector(".landing").style.backgroundImage =
        'url("imgs/' + imgsArr[randomNum] + '")';
    }, 5000);
  }
}
// changing the landing background image...

// start our skills
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  let sectionOffset = ourSkills.offsetTop;
  let sectionHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let currentOffset = this.pageYOffset;

  if (currentOffset > sectionOffset + sectionHeight - windowHeight) {
    document
      .querySelectorAll(".our-skills .skill span.skill-value")
      .forEach((skill) => {
        skill.style.width = skill.dataset.value;
      });
  }
};
// end our skills

// start gallery
let galleryImg = document.querySelectorAll(".gallery .img-cont img");

galleryImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    document.body.appendChild(popupOverlay);

    let imgBox = document.createElement("div");
    imgBox.classList.add("popup-img-cont");

    if (img.alt !== "") {
      let altTxtHead = document.createElement("h2");
      altTxtHead.className = "alt-txt";
      altTxtHead.appendChild(document.createTextNode(e.target.alt));
      imgBox.appendChild(altTxtHead);
    }

    let theImg = document.createElement("img");
    theImg.src = img.src;

    imgBox.appendChild(theImg);
    document.body.appendChild(imgBox);

    let existBut = document.createElement("span");
    existBut.classList.add("exist-button");
    existBut.appendChild(document.createTextNode("X"));
    imgBox.appendChild(existBut);

    existBut.addEventListener("click", (e) => {
      if (e.target.classList.contains("exist-button")) {
        e.target.parentElement.remove();

        document.querySelector(".popup-overlay").remove();
      }
    });
  });
});
// end gallery

// start bullets
let bullet = document.querySelectorAll(".side-bullet .bullet");

bullet.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// end bullets

// start sideBar
showBut = document.querySelectorAll(".setting-area .side-bar span");

showBut.forEach((but) => {
  but.addEventListener("click", (e) => {
    if (e.target.classList.contains("hide")) {
      document.querySelector(".side-bullet").style.display = "none";
      localStorage.setItem("sideBar status", "hide");
    } else if (e.target.classList.contains("show")) {
      document.querySelector(".side-bullet").style.display = "block";
      localStorage.setItem("sideBar status", "show");
    }
    showBut.forEach((but) => {
      but.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
// end sideBar

// start reset button
let resetBut = document.querySelector(".setting-box .option-box.reset button");

resetBut.onclick = function () {
  localStorage.clear();
  document.location.reload();
};
// end reset button

// start the menu
let linksBars = document.querySelector(".links-bars");
let links = document.querySelector(".header .links");

linksBars.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== linksBars && e.target !== links) {
    if (links.classList.contains("open")) {
      linksBars.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});

links.onclick = function (e) {
  e.stopPropagation();
};
// end the menu
