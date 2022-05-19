function hide (e) {
    e.classList.add("hide");
    setTimeout(() => {
        e.classList.add("put");
    }, 200);
}
function show (e) {
    e.classList.remove("put");
    setTimeout(() => {
        e.classList.remove("hide");
    }, 10);
}
function checkArrow() {
    let arrows = document.querySelectorAll('.arr');
    arrows.forEach((item) => {
        let parent = item.closest('.tab_item');
        let obj = parent.querySelector('.view_con');
        if ((+(obj.style.marginLeft.replace('px','')) == 0)) {
            if (item.classList[0] == 'left') {
                hide(item);
            }
        } else if ((+(obj.style.marginLeft.replace('px','')) == ((obj.children.length - 1) * obj.offsetWidth) * -1)) {
            if (item.classList[0] =='right') {
                hide(item);
            }
        } else {
            show(item);
        }
    });
}

function hidePopUp (e) {
    let popUp = e.path[0].closest(".popUp");
    hide(popUp);
}
function showPopUp (e) {
    let popUp = document.querySelector('[data-id="' + e.path[0].dataset.id + '"]');
    show(popUp);
}
function isclickPopUp (e) {
    let popUp = e.path[0];
    if (popUp === this) {
        hide(popUp);
    }
}
function changeLine (line) {
    line.classList.toggle("active");
}
function slider (e) {
    let parent = this.closest('.tab_item');
    let con    = parent.querySelector(".view_con");

    let lines  = parent.querySelectorAll(".line");
    let linesCount  = parent.querySelectorAll(".line").length;

    let icons = parent.querySelectorAll(".s");

    let width = parent.offsetWidth;
    let margin = +(con.style.marginLeft.replace('px',''));
    let lineNumber = (margin === 0) ? 0 : Math.abs(Math.round(margin/width));

    switch (this.name) {
        case 'right':
            if (margin > (-width * (linesCount - 1))) {
                margin = margin - width + 'px';
                con.style.marginLeft = margin;

                changeLine(lines[lineNumber]);
                changeLine(lines[lineNumber + 1]);

                hide(icons[lineNumber]);
                setTimeout(() => {
                    show(icons[lineNumber + 1]);
                }, 200);


            }
            break;
        case 'left':
            if (margin < 0) {
                margin = margin + width + "px";
                con.style.marginLeft = margin;

                changeLine(lines[lineNumber]);
                changeLine(lines[lineNumber - 1]);

                hide(icons[lineNumber]);
                setTimeout(() => {
                    show(icons[lineNumber - 1]);
                }, 200);


            }
            break;
        default:
            break;
    }
    checkArrow();
}
function fbuttons (line) {
    let id = this.dataset.button_id;

    document.querySelectorAll("[data-button_id]").forEach((e) => {
        e.classList.remove('active');
    });
    this.classList.add('active');

    document.querySelectorAll("[data-section_id]").forEach((e) => {
        hide(e);
    });
    setTimeout(() => {
        show(document.querySelector('[data-section_id="'+id+'"]'));
    }, 200);

}

let item = 0;
function tscroll (e) {
    let scroll = e.target.scrollLeft;
    let width = e.target.children[0].offsetWidth;
    let selfWidth = e.target.offsetWidth;
    let parent = e.target.closest(".tab_item");
    let icons = parent.querySelectorAll(".s");
    let this_item = Math.trunc((scroll + selfWidth - 10)/width)

    if (item != this_item) {
        item = this_item;
        icons.forEach((icon, i) => {
            if (i == item) {
                setTimeout(() => {
                    show(icon);
                }, 200);
            } else {
                hide(icon);
            }
        });
    }
}




document.querySelectorAll("[name=exit]").forEach(e => {
    e.addEventListener("click", hidePopUp);
});

document.querySelectorAll("[name=exemple]").forEach(e => {
    e.addEventListener("click", showPopUp);
});

document.querySelectorAll(".popUp").forEach(e => {
    e.addEventListener("click", isclickPopUp);
});

document.querySelectorAll(".arr").forEach(e => {
    e.addEventListener("click", slider);
});

document.querySelectorAll("[data-button_id]").forEach(e => {
    e.addEventListener("click", fbuttons);
});

document.querySelector(".tab_item4 .view_con").addEventListener("scroll", tscroll);
document.querySelector(".tab_item2 .view_con").addEventListener("scroll", tscroll);

// document.querySelectorAll("table").forEach(e => {
//     e.addEventListener("touchstart", mobileScroll);
// });
//
// document.querySelectorAll("table").forEach(e => {
//     e.addEventListener("touchmove", mobileScroll);
// });
// let scroll = 0;
// let positionStart = 0;
// let margin = 0;
// function mobileScroll (e) {
//     let type = e.type;
//     let width = this.offsetWidth;
//     let parent = this.closest('.tab_item');
//     let con    = parent.querySelector(".view_con");
//
//     switch (type) {
//         case 'touchstart':
//             positionStart = e.changedTouches[0].clientX;
//             break;
//         case 'touchmove':
//             margin = margin + (positionStart - e.changedTouches[0].clientX);
//             positionStart = e.changedTouches[0].clientX;
//             break;
//         default:
//
//     }
//     console.log(width);
//     if (margin >= 0 && margin <= width) {
//         this.style.marginLeft = -margin + "px";
//     } else if (margin < 0) {
//         margin = 0;
//     } else if (margin > width) {
//         margin = width;
//     }
// }
checkArrow();
