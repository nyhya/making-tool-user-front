
import * as UTIL from "@/utils/Util.js";




let COMMON_LAYOUT = {
    WINDOW_WIDTH: window.innerWidth - 60,
    WINDOW_HEIGHT: (window.innerWidth - 60) * 1.5,
    DESIGN_TYPE_A: {
        containerPadding: { left: UTIL.getPixelToPercent(window.innerWidth - 60, 4.25), right: 15, top: 15, bottom: 15 },
    },
    DESIGN_TYPE_B: {
        containerPadding: { left: UTIL.getPixelToPercent(window.innerWidth - 60, 6.25), right: 15, top: 15, bottom: 15 },
    },
    DESIGN_TYPE_C: {
        containerPadding: { left: 20, right: 15, top: 15, bottom: 15 },
    },
    DESIGN_TYPE_D: {
        containerPadding: { left: UTIL.getPixelToPercent(window.innerWidth - 60, 4.3), right: 15, top: 15, bottom: 15 },
    },
    fontFamily: "Noto Sans KR",
}

var reSizeWidth = window.innerWidth;
var reSizeHeight = window.innerHeight;
var aspectRatio = reSizeWidth / reSizeHeight;

/* 작은 디바이스 */
if (aspectRatio > 0.565) {
    // alert("작은폰 비율");
    // alert("디바이스 높이" + window.innerHeight)
    COMMON_LAYOUT.WINDOW_WIDTH = (window.innerWidth - 100);
    COMMON_LAYOUT.WINDOW_HEIGHT = (window.innerWidth - 100) * 1.5;
}

if (aspectRatio > 0.565 && window.innerHeight == 635) {
    // alert("아이폰 xs ?");
    COMMON_LAYOUT.WINDOW_WIDTH = (window.innerWidth - 55);
    COMMON_LAYOUT.WINDOW_HEIGHT = (window.innerWidth - 55) * 1.5;
}





const IMAGE_LIST = {
    DESIGN_TYPE_A: {
        backgroundThumb: {
            TYPE_01: "./images/thumb/1_bg_thumb_1.jpg",
            TYPE_02: "./images/thumb/1_bg_thumb_2.jpg"
        },
        backgroundOrigin: {
            TYPE_01: "./images/bg/1_bg_1.jpg",
            TYPE_02: "./images/bg/1_bg_2.jpg"
        },
        symbol: { path: "./images/symbol_type01.png", x: 15, y: 11, width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 26.25) },
        trophyThumb: "./images/thumb/trophy_thumb_1.jpg",
        trophyOrigin: { path: "./images/trophy/trophy_type01.png", x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 60.75), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 51.25), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 40), height: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 43.5) },
        kyoboLogo: { path: "./images/kyoboLogo-white.png", x: COMMON_LAYOUT.WINDOW_WIDTH / 2 - (UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75) / 2), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 141.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75), height: 200 }

    },
    DESIGN_TYPE_B: {
        backgroundThumb: {
            TYPE_01: "./images/thumb/2_bg_thumb_1.jpg",
            TYPE_02: "./images/thumb/2_bg_thumb_2.jpg"
        },
        backgroundOrigin: {
            TYPE_01: "./images/bg/2_bg_1.jpg",
            TYPE_02: "./images/bg/2_bg_2.jpg"
        },
        symbol: { path: "./images/symbol_type02.png", x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 70), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 3.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 25) },
        trophyThumb: "./images/thumb/trophy_thumb_2.jpg",
        trophyOrigin: { path: "./images/trophy/trophy_type02.png", x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 0.5), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 91.3), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 30), height: 234 },
        kyoboLogo: { path: "./images/kyoboLogo-blue.png", x: COMMON_LAYOUT.WINDOW_WIDTH / 2 - (UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75) / 2), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 141.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75), height: 200 }

    },
    DESIGN_TYPE_C: {
        backgroundThumb: {
            TYPE_01: "./images/thumb/3_bg_thumb_1.jpg",
            TYPE_02: "./images/thumb/3_bg_thumb_2.jpg"
        },
        backgroundOrigin: {
            TYPE_01: "./images/bg/3_bg_1.jpg",
            TYPE_02: "./images/bg/3_bg_2.jpg"
        },
        symbol: { path: "./images/symbol_type02.png", x: COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left, y: 20, width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 27.25) },
        trophyThumb: "./images/thumb/trophy_thumb_3.jpg",
        trophyOrigin: { path: "./images/trophy/trophy_type03.png", x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 49), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 52.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 49), height: 234 },
        kyoboLogo: { path: "./images/kyoboLogo-white.png", x: COMMON_LAYOUT.WINDOW_WIDTH / 2 - (UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75) / 2), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 141.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75), height: 200 }
    },
    DESIGN_TYPE_D: {
        backgroundThumb: {
            TYPE_01: "./images/thumb/4_bg_thumb_1.jpg",
            TYPE_02: "./images/thumb/4_bg_thumb_2.jpg"
        },
        backgroundOrigin: {
            TYPE_01: "./images/bg/4_bg_1.jpg",
            TYPE_02: "./images/bg/4_bg_2.jpg"
        },
        symbol: { path: "./images/symbol_type02.png", x: COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left, y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 27.5) },
        trophyThumb: "./images/thumb/trophy_thumb_4.jpg",
        trophyOrigin: { path: "./images/trophy/trophy_type04.png", x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 63.75), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 103), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 43.5), height: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 42.5) },
        kyoboLogo: { path: "./images/kyoboLogo-blue.png", x: COMMON_LAYOUT.WINDOW_WIDTH / 2 - (UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75) / 2), y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 141.75), width: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 18.75), height: 200 }
    }
}


const PROFILE_IMAGE = {
    DESIGN_TYPE_A: COMMON_LAYOUT.WINDOW_WIDTH * 0.195,
    DESIGN_TYPE_B: COMMON_LAYOUT.WINDOW_WIDTH * 0.230,
    DESIGN_TYPE_C: COMMON_LAYOUT.WINDOW_WIDTH * 0.23,
    DESIGN_TYPE_D: COMMON_LAYOUT.WINDOW_WIDTH * 0.15,
}

const PROFILE_OPTION = {
    DEFAULT_IMAGE: { path: "./images/profile_default.jpg" },
    DESIGN_TYPE_A: {
        x: COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left + PROFILE_IMAGE.DESIGN_TYPE_A / 2,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 55.25) + PROFILE_IMAGE.DESIGN_TYPE_A / 2,
        size: PROFILE_IMAGE.DESIGN_TYPE_A
    },
    DESIGN_TYPE_B: {
        x: COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left + PROFILE_IMAGE.DESIGN_TYPE_B / 2,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 9.5) + PROFILE_IMAGE.DESIGN_TYPE_B / 2,
        size: PROFILE_IMAGE.DESIGN_TYPE_B
    },
    DESIGN_TYPE_C: {
        x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 70) + PROFILE_IMAGE.DESIGN_TYPE_C / 2,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5.25) + PROFILE_IMAGE.DESIGN_TYPE_C / 2,
        size: PROFILE_IMAGE.DESIGN_TYPE_C
    },
    DESIGN_TYPE_D: {
        x: COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left + PROFILE_IMAGE.DESIGN_TYPE_D / 2,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 24) + PROFILE_IMAGE.DESIGN_TYPE_D / 2,
        size: PROFILE_IMAGE.DESIGN_TYPE_D
    }
}

const USER_NAME = {
    DESIGN_TYPE_A: {
        x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 26),
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 58.55)
    },
    DESIGN_TYPE_B: {
        x: COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left + PROFILE_IMAGE.DESIGN_TYPE_B + 10,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 14.2)
    },
    DESIGN_TYPE_C: {
        x: COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 57.5)
    },
    DESIGN_TYPE_D: {
        x: COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 41)
    }
}

const ACTIVITY_RESION = {
    DESIGN_TYPE_A: {
        x: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 26),
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 67.5),
        rectColor: "#2a2a2a",
    },
    DESIGN_TYPE_B: {
        x: COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left + PROFILE_IMAGE.DESIGN_TYPE_B + 10,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 24.75),
        rectColor: "#412802",
    },
    DESIGN_TYPE_C: {
        x: COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 68),
        rectColor: "#B29468",
    },
    DESIGN_TYPE_D: {
        x: COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left,
        y: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 49.5),
        rectColor: "#644a23",
    }
}

const SALES_INTRODUCE = {
    DESIGN_TYPE_A: {
        titleX: 15,
        titleY: 15,
        titleWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 50),
        contentWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 100) - 30 - 30,
        contentPadding: 0,
        containerX: COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left,
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 77.75)
    },
    DESIGN_TYPE_B: {
        titleX: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 2.5),
        titleY: 0,
        titleWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 65),
        contentWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 88.75) - 20,
        contentPadding: 0,
        containerX: COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left + 6, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 91.5)
    },
    DESIGN_TYPE_C: {
        titleX: 0,
        titleY: 0,
        titleWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 60),
        contentWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 100) - 50,
        contentPadding: 0,
        containerX: COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 21.25)
    },
    DESIGN_TYPE_D: {
        titleX: 0,
        titleY: 0,
        titleWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 34),
        contentWidth: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 34),
        contentPadding: 0,
        containerX: COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 60.5970149)
    }
}


const SALES_AWARD = {
    DESIGN_TYPE_A: {
        txtX: 5,
        txtY: 0,
        txtWidth: COMMON_LAYOUT.WINDOW_WIDTH - 30,
        txtAlign: "left",
        padding: 10,
        containerX: COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left,
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 114)
    },
    DESIGN_TYPE_B: {
        txtX: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 12) + 5,//bullet 반지름,
        txtY: 0,
        txtWidth: COMMON_LAYOUT.WINDOW_WIDTH - 30,
        padding: 0,
        txtAlign: "left",
        containerX: COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left + 6, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 92.5)
    },
    DESIGN_TYPE_C: {
        txtX: 0,
        txtY: 0,
        txtWidth: COMMON_LAYOUT.WINDOW_WIDTH - 30,
        padding: 0,
        txtAlign: "left",
        containerX: COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 77)
    },
    DESIGN_TYPE_D: {
        txtX: 0,
        txtY: 0,
        txtWidth: COMMON_LAYOUT.WINDOW_WIDTH - 30,
        padding: 10,
        txtAlign: "left",
        containerX: COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left, // bullet 반지름, 
        containerY: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 111.25)
    }
}


const RECTANGLE_OPTION = {
    DESIGN_TYPE_A: {
        introduceBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left * 2, height: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 33), rectColor: "rgba( 0,0,0,0.5)", rectRadius: 10 },
        awardHistoryBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_A.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0.5)", rectRadius: 10 },
    },
    DESIGN_TYPE_B: {
        introduceBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0)", rectRadius: 10 },
        awardHistoryBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_B.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0)", rectRadius: 10 },
    },
    DESIGN_TYPE_C: {
        introduceBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0.0)", rectRadius: 10 },
        awardHistoryBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_C.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0.0)", rectRadius: 10 },
    },
    DESIGN_TYPE_D: {
        introduceBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left * 2, rectColor: "rgba( 0,0,0,0)", rectRadius: 10 },
        awardHistoryBox: { width: COMMON_LAYOUT.WINDOW_WIDTH - COMMON_LAYOUT.DESIGN_TYPE_D.containerPadding.left * 2, rectColor: "#f3ede9", rectRadius: 15 },
    }
}

const FONT_OPTION = {
    DESIGN_TYPE_A: {
        userName: { fontSize: getFontSize("font28"), fontWeight: "bold", fontColor: "#fff", textLineHeight: null, textLetterSpascing: -1, textAlign: "left", textVerticalAlign: "middle", },
        salesRegion: { fontSize: getFontSize("font10"), fontWeight: "normal", fontColor: "#fff", textLineHeight: null, textLetterSpascing: null, textAlign: "center", textVerticalAlign: "middle", rectHeight: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5) },
        salesIntroduceTitle: { fontSize: getFontSize("font22"), fontWeight: "bold", fontColor: "#fff", textLineHeight: 1.2, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        salesIntroduceContent: { fontSize: getFontSize("font12"), fontWeight: "normal", fontColor: "#fff", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        awardsHistory: { fontSize: getFontSize("font14"), fontWeight: "normal", fontColor: "#fff", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle" }
    },
    DESIGN_TYPE_B: {
        userName: { fontSize: getFontSize("font35"), fontWeight: "bold", fontColor: "#9f7433", textLineHeight: null, textLetterSpascing: -1, textAlign: "left", textVerticalAlign: "middle" },
        salesRegion: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#fff", textLineHeight: null, textLetterSpascing: null, textAlign: "center", textVerticalAlign: "middle", rectHeight: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5.3) },
        salesIntroduceTitle: { fontSize: getFontSize("font22"), fontWeight: "bold", fontColor: "#715427", textLineHeight: 1.2, textLetterSpascing: -0.5, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        salesIntroduceContent: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#3B2B1F", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        awardsHistory: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#3B2B1F", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle" }
    },
    DESIGN_TYPE_C: {
        userName: { fontSize: getFontSize("font34"), fontWeight: "bold", fontColor: "#644824", textLineHeight: null, textLetterSpascing: -1, textAlign: "left", textVerticalAlign: "middle" },
        salesRegion: { fontSize: getFontSize("font12"), fontWeight: "normal", fontColor: "#fff", textLineHeight: null, textLetterSpascing: null, textAlign: "center", textVerticalAlign: "middle", rectHeight: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5.3) },
        salesIntroduceTitle: { fontSize: getFontSize("font20"), fontWeight: "bold", fontColor: "#3B3027", textLineHeight: 1.2, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        salesIntroduceContent: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#3B3027", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle", warp: "word" },
        awardsHistory: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#3B3027", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle" }
    },
    DESIGN_TYPE_D: {
        userName: { fontSize: getFontSize("font27"), fontWeight: "bold", fontColor: "#000000", textLineHeight: null, textLetterSpascing: -1, textAlign: "left", textVerticalAlign: "middle" },
        salesRegion: { fontSize: getFontSize("font9"), fontWeight: "normal", fontColor: "#fff", textLineHeight: null, textLetterSpascing: null, textAlign: "center", textVerticalAlign: "middle", rectHeight: UTIL.getPixelToPercent(COMMON_LAYOUT.WINDOW_WIDTH, 5.5) },
        salesIntroduceTitle: { fontSize: getFontSize("font22"), fontWeight: "bold", fontColor: "#684E41", textLineHeight: 1.2, textLetterSpascing: -1, textAlign: "left", textVerticalAlign: "middle", wrap: 'word' },
        salesIntroduceContent: { fontSize: getFontSize("font12"), fontWeight: "normal", fontColor: "#272222", textLineHeight: 1.4, textLetterSpascing: -0.5, textAlign: "left", textVerticalAlign: "middle", wrap: 'word' },
        awardsHistory: { fontSize: getFontSize("font13"), fontWeight: "normal", fontColor: "#272222", textLineHeight: 1.4, textLetterSpascing: 0, textAlign: "left", textVerticalAlign: "middle" }
    }
}

const DESIGN_GUIDE = {
    type01: { x: 0, y: 0 },
    type02: { x: 0, y: 0 },
    type03: { x: 0, y: 0 },
    type04: { x: 0, y: 0 }
}


/**
 * @param {String} fontSize
 * @returns {Number} 폰트사이즈
 */
function getFontSize(fontSize) {
    let temp = "";
    switch (fontSize) {
        case "font9":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.025;
            break;
        case "font10":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.0275;
            break;
        case "font12":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.0295;
            break;
        case "font13":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.0325;
            break;
        case "font14":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.035;
            break;
        case "font20":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.05;
            break;
        case "font22":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.05866667;
            break;
        case "font27":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.0675;
            break;
        case "font28":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.075;
            break;
        case "font34":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.085;
            break;
        case "font35":
            temp = COMMON_LAYOUT.WINDOW_WIDTH * 0.0875;
            break;

    }
    return temp;
}


export { getFontSize, PROFILE_OPTION, FONT_OPTION, IMAGE_LIST, RECTANGLE_OPTION, USER_NAME, ACTIVITY_RESION, SALES_INTRODUCE, SALES_AWARD, COMMON_LAYOUT, DESIGN_GUIDE }