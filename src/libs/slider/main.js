export default class Slider {
    constructor({ slider, button_next, button_prev, slider_count }) {
        this.slider = slider;
        this.button_next = button_next;
        this.button_prev = button_prev;
        this.slider_count = slider_count;
        this.index = 0;
        // this.dots = dots;
        this.moving = false;
    }


    addClass = () => {
        for (let i = 0; i < this.children.length; i++) {
            if (i !== this.index) {
            this.children[i].classList.remove('react');
            }
        }
        this.children[this.index].classList.add('react');
    }

    next = () => {

        if (this.children.length === this.index || this.index > this.children.length) {

            this.index = 0;

        }
        if (this.index === this.children.length - 1) {
            // this.prev();
            return;
        }


        if (this.moving) return;
        this.moving = true;

        this.index += 1;
        this.children[this.index].style.zIndex = 999;
        this.children[this.index].style.transform = 'translateX(0)';

        // this.activeDots();
        this.addClass();


        this.children[this.index].addEventListener('transitionend', (event) => {
            if (!event.target.classList.contains('react')) return;
            if (this.children[this.index - 1]) {
                this.children[this.index - 1].style.transform = 'translateX(-100%)';
            }

            for (let i = 0; i < this.children.length; i++) {
                if (i !== this.index) {
                    this.children[i].style.zIndex = i;
                } else {
                    this.children[i].style.zIndex = 998;
                }
            }

            this.moving = false;

        }, true);

        this.move();
    }

    prev = () => {
        if (this.index === 0) return;
        if (this.moving) return;

        this.moving = true;
        this.index -= 1;

        this.children[this.index].style.transform = 'translateX(0)';
        // this.activeDots();
        this.addClass();

        this.children[this.index].style.zIndex = 999;

        this.children[this.index].addEventListener('transitionend', (event) => {
            if (!event.target.classList.contains('react')) return;
            for (let i = 0; i < this.children.length; i++) {
                if (i !== this.index) {
                    this.children[i].style.zIndex = i;

                } else {
                    this.children[i].style.zIndex = 998;
                }
            }

            for (let i = this.index; i < this.children.length; i++) {
                if (this.children[i + 1]) {
                    this.children[i + 1].style.transform = 'translateX(100%)';
                }
            }

            this.moving = false;

        });

        this.move();
    }

    // activeDots = () => {
    //     for (let i = 0; i < this.dotsChildren.length; i++) {
    //         this.dotsChildren[i].classList.remove('active');
    //     }
    //     this.dotsChildren[this.index].classList.add('active');
    // }

    init = (index = 0) => {
        this.button_next = document.querySelector(this.button_next);
        this.button_prev = document.querySelector(this.button_prev);
        this.slider_count = document.querySelector(this.slider_count);
        this.slider = document.querySelector(this.slider);
        this.children = this.slider.children;
        // this.dots = document.querySelector(this.dots);
        // this.dotsChildren = this.dots.children;
        this.index = index;
        this.children[this.index].classList.add('react');
        // this.dotsChildren[this.index].classList.add('active');
        this.button_next.addEventListener('click', () => {
            this.next();
        });

        this.button_prev.addEventListener('click', () => {
            this.prev();
        });

        // setInterval(() => {
        //     this.next();
        // }, 1000);

    }

    move = () => {
        // this.slider_count.innerHTML = `${this.index + 1} / ${this.children.length}`;
    }

}


// document.addEventListener('DOMContentLoaded', function () {

//     // const slider_wellcome = new Slider({
//     //     slider: '#slider',
//     //     button_prev: '#button_prev',
//     //     button_next: '#button_next',
//     //     slider_count: '#slider-count',
//     //     dots: '#slider-dots'
//     // });

//     // slider_wellcome.init();


// });


