const body = document.querySelector("body");
const photoCredit = document.querySelector("#photoCredit");


// LOCK BACKGROUND IMAGE 
const unlocked = document.getElementById("unlocked");
const locked = document.getElementById("locked");
const IS_LOCKED = "isLocked"
const BACKGROUND_IMG_LOCKED = "bgImgLocked"

function setIsLocked(bull){
    localStorage.setItem(IS_LOCKED, bull);
}

function getIsLocked(){
    return localStorage.getItem(IS_LOCKED);
}

function setImageLocked(currentImgNumber){
    localStorage.setItem(BACKGROUND_IMG_LOCKED, currentImgNumber);
}

function unlockBackground(){
    locked.classList.add("hide");
    setIsLocked(false);
    paintLock();
}

function lockBackground(){
    unlocked.classList.add("hide");
    setIsLocked(true);
    paintLock();

    const BgimgArray = localStorage.getItem(BACKGROUND_IMGS);
    const arrayParsed = JSON.parse(BgimgArray);
    setImageLocked(arrayParsed[0]);
}

function paintLock(){
    const isLocked = JSON.parse(getIsLocked());
    if (isLocked === true){
        locked.classList.remove("hide");
    }
    else{
        unlocked.classList.remove("hide");
    }
}


function saveIsLocked(){
    const isLocked = localStorage.getItem(IS_LOCKED);
    if (isLocked === null){
        setIsLocked(false);
    }
    paintLock();
}

// PHOTO SOURCE PHOTO SOURCE PHOTO SOURCE PHOTO SOURCE PHOTO SOURCE 
const photographerList = {
    0: ["Kevin Lanceplaine", "https://unsplash.com/@lanceplaine"],
    1: ["Silas Baisch", "https://unsplash.com/@silasbaisch"],
    2: ["Dino Reichmuth", "https://unsplash.com/@dinoreichmuth"],
    3: ["Timothy Simon", "https://unsplash.com/@timtimo"],
    4: ["Ryan Schroeder", "https://unsplash.com/@ryanschroeder"],
    5: ["Eberhard grossgasteiger", "https://unsplash.com/@eberhardgross"]
}

function openPhotographerProfile(){
    window.open(photographerList[currentImgNumber][1]);
}

function ShowPhotographerName(imgNumber){
    photoCredit.innerText =`@ ${photographerList[imgNumber][0]} / Unsplash`;
}


// BACKGROUND CONTROL BACKGROUND CONTROL BACKGROUND CONTROL 
const BACKGROUND_IMGS = 'backgroundImages';
const BackgroundImgCount = 6;
const BackgroundImgArray = [...Array(BackgroundImgCount).keys()];

function changeBackgroundImage(){
    const BgImgArraySaved = localStorage.getItem(BACKGROUND_IMGS);
    if (BgImgArraySaved === null){
        saveBackgroundImgArray(BackgroundImgArray);
        return 0
    }
    else if (getIsLocked() === 'true'){
        const bgImgLocked = localStorage.getItem(BACKGROUND_IMG_LOCKED);
        return parseInt(bgImgLocked)
    }
    else{
        const arrayParsed = JSON.parse(BgImgArraySaved);
        arrayParsed.unshift(arrayParsed.pop());
        saveBackgroundImgArray(arrayParsed);
        return arrayParsed[0]
    }
}

const currentImgNumber = changeBackgroundImage()

function paintBackground(number){
    const image = new Image();
    image.src = `images/${number}.jpg`;
    image.classList.add("bg");
    body.append(image);
}

function saveBackgroundImgArray(array){
    localStorage.setItem(BACKGROUND_IMGS, JSON.stringify(array));
}


function init(){
    paintBackground(currentImgNumber);
    ShowPhotographerName(currentImgNumber);
    saveIsLocked();
}

init();


