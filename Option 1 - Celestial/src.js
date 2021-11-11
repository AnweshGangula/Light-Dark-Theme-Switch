// Reference: https://codepen.io/chrisgannon/pen/eezVOJ

var select = function (s) {
    return document.querySelector(s);
}
var selectAll = function (s) {
    return document.querySelectorAll(s);
}
var hit = select('.hit')
var allStars = selectAll('.starGroup *')
var allClouds = selectAll('.cloud')
var allCloudPuffs = selectAll('.cloud circle')

gsap.set('svg', {
    visibility: 'visible'
})
gsap.set(allStars, {
    transformOrigin: '50% 50%'
})
gsap.defaults({ ease: "elastic(0.58,0.8)" });
var tl = gsap.timeline({ paused: true });
tl.to(['.sun', '.moonMask', '.moon'], {
    duration: 1,
    attr: gsap.utils.wrap([{ cx: '-=140', cy: '-=20' }, { cx: '-=140', cy: '-=20' }, { cx: '-=90', cy: '-=0' }])
    , stagger: 0
})

    .to(['.moon', '.sun'], {
        duration: 1,
        alpha: gsap.utils.wrap([1, 0]),
        stagger: 0
    },
        '-=1')
    .to('body', {
        duration: 1
        //backgroundColor:'#2C3E7B'
    }, '-=1')
    .to('.outline', {
        duration: 1,
        stroke: '#6172AD',
        fill: '#45568D'
    }, '-=1')

    .from(allStars, {
        duration: 0.9,
        x: gsap.utils.wrap([-20, 30, 40, -30, 60, -40, 80, 90, 100, 110, 120]),
        alpha: 0,
        stagger: 0.005
    }, '-=1')

    .to(allClouds, {
        duration: 1,
        x: gsap.utils.wrap([40, 20]),
        alpha: 0,
        stagger: 0
    }, '-=1')

    .addPause()

    .to(['.sun', '.moonMask', '.moon'], {
        duration: 1,
        attr: gsap.utils.wrap([{ cx: '+=140', cy: '+=20' }, { cx: '+=140', cy: '+=20' }, { cx: '+=90', cy: '+=0' }]),
        stagger: 0
    })
    .to(['.moon', '.sun'], {
        duration: 1,
        alpha: gsap.utils.wrap([0, 1]),
        stagger: 0
    }, '-=1')
    .to('body', {
        duration: 1,
        //backgroundColor:'#26D6FE',
        ease: "none"
    }, '-=1')
    .to('.outline', {
        duration: 1,
        stroke: '#FCFDFE',
        fill: '#85E8FE'
    }, '-=1')
    .to(allStars, {
        duration: 1,
        alpha: 0,
        stagger: 0
    }, '-=1')
    .fromTo(allClouds, {
        duration: 0.6,
        y: gsap.utils.wrap([120, 160]),
        x: gsap.utils.wrap([0])
    },
        {
            duration: 0.6,
            y: gsap.utils.wrap([0]),
            x: gsap.utils.wrap([0]),
            alpha: 1,
            immediateRender: false,
            stagger: 0.06,
        }, '-=1')

    .from(['.plane', '.contrail'], {
        duration: 0.7,
        x: -400,
        ease: "none"
    }, '-=1')

    .to('.contrail', {
        duration: 0.5,
        alpha: 0,
        ease: "sine.out"
    })

//ScrubGSAPTimeline(tl);

function clickToggle(e) {
    if (tl.time() > 0 && tl.time() < tl.duration()) {
        tl.play()
    }
    else {
        tl.play(0)
    }
}

tl.timeScale(1);
hit.onclick = clickToggle;
gsap.globalTimeline.timeScale(1.3);
