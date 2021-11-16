/**
* 이미지 크롭 정보 구하는 함수
* @param {Image} image 이미지 객체
* @param {Object} size 이미지 표현하는 영역의 가로 세로 정보
* @param {String} clipPosition Crop 종류 ([가로-세로])
* @returns {Object} Crop정보
*/
const getCrop = function (image, size, clipPosition = "center-middle") {
    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;
    const imageRatio = image.width / image.height;
    let newWidth;
    let newHeight;

    if (aspectRatio >= imageRatio) {
        newWidth = image.width;
        newHeight = image.width / aspectRatio;
    } else {
        newWidth = image.height * aspectRatio;
        newHeight = image.height;
    }

    let x = 0;
    let y = 0;
    if (clipPosition === "left-top") {
        x = 0;
        y = 0;
    } else if (clipPosition === "left-middle") {
        x = 0;
        y = (image.height - newHeight) / 2;
    } else if (clipPosition === "left-bottom") {
        x = 0;
        y = image.height - newHeight;
    } else if (clipPosition === "center-top") {
        x = (image.width - newWidth) / 2;
        y = 0;
    } else if (clipPosition === "center-middle") {
        x = (image.width - newWidth) / 2;
        y = (image.height - newHeight) / 2;
    } else if (clipPosition === "center-bottom") {
        x = (image.width - newWidth) / 2;
        y = image.height - newHeight;
    } else if (clipPosition === "right-top") {
        x = image.width - newWidth;
        y = 0;
    } else if (clipPosition === "right-middle") {
        x = image.width - newWidth;
        y = (image.height - newHeight) / 2;
    } else if (clipPosition === "right-bottom") {
        x = image.width - newWidth;
        y = image.height - newHeight;
    } else if (clipPosition === "scale") {
        x = 0;
        y = 0;
        newWidth = width;
        newHeight = height;
    } else {
        console.error(
            new Error("Unknown clip position property - " + clipPosition)
        );
    }
    // console.log("영역", width, height, aspectRatio);
    // console.log("이미지", image.width, image.height, imageRatio);
    return {
        x: x,
        y: y,
        width: newWidth,
        height: newHeight,
    };
}

/**
* 이미지 리사이즈 정보 구하는 함수
* @param {Image} image 이미지 객체
* @param {Object} size 이미지 표현하는 영역의 가로 세로 정보
* @returns {Object} 리사이즈 정보
*/
const getImageReposition = function (image, size) {

    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;
    const imageRatio = image.width / image.height;
    let newWidth;
    let newHeight;
    let x = 0;
    let y = 0;

    if (aspectRatio >= imageRatio) {
        newWidth = width;
        newHeight = width / imageRatio;
        y = (height - newHeight) / 2
    } else {
        newWidth = height * imageRatio;
        newHeight = height;

        x = (width - newWidth) / 2
    }

    // console.log("resize 영역", width, height, aspectRatio);
    // console.log("resize 이미지", image.width, image.height, imageRatio);
    // console.log("resize 계산", x, y, newWidth, newHeight, aspectRatio >= imageRatio);
    return {
        x: x,
        y: y,
        width: newWidth,
        height: newHeight,
    };
}

/**
* 특정 픽셀의 퍼센트를 구하는 함수
* @param {Number} fullSize 특정 축의 100% Pixel 크기
* @param {Number} percent fullSize에서 원하는 % 
* @returns {Number} Crop정보
*/
const getPixelToPercent = function (fullSize, percent) {
    if (typeof fullSize == "number" && typeof percent == "number") {
        return fullSize * (percent / 100)
    } else {
        console.error(
            new Error("Unknown fullSize or Percent property - fullSize : " + fullSize + ", percent : " + percent)
        );
    }
}

/**
* base64 정보를 파일로 변환하는 함수
* @param {String} dataurl Base64 Data
* @param {String} fileName 파일 이름
* @returns {File} File
*/
const dataURLtoFile = function (dataurl, fileName) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
};

/**
* base64 정보를 파일로 저장하는 함수
* @param {String} uri Base64 Data
* @param {String} name 저장하고 싶은 이름
* @returns {File} File
*/
const downloadURI = function (uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
    link = null;
};


export { getCrop, getPixelToPercent, getImageReposition, dataURLtoFile, downloadURI }