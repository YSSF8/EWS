// Creates the "ews-button" element
class EwsButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.addEventListener('click', e => {
            let x = e.clientX, y = e.clientY;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => ripple.remove(), 500);
        });
    }
}

customElements.define('ews-button', EwsButton);

// Creates the "ews-text" element
class EwsText extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.contentEditable = true;
    }
}

customElements.define('ews-text', EwsText);

// Creates the "ews-counter" element
class EwsCounter extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get value() {
        return this.getAttribute('value');
    }

    get ms() {
        return this.getAttribute('ms');
    }

    get event() {
        const attr = this.getAttribute('event');
        if (attr == 'inc') {
            this.shadow.innerHTML++;
        } else if (attr == 'dec') {
            this.shadow.innerHTML--;
        } else {
            throw new Error(`The allowed values for the "event" attribute is "inc", "dec". The value is "${attr}"`);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = this.value;
        let loop = setInterval(() => {
            this.event;
            this.setAttribute('value', this.shadow.innerHTML);
            if (this.shadow.innerHTML <= 0) {
                clearInterval(loop);
            }
        }, this.ms);
    }
}

customElements.define('ews-counter', EwsCounter);

// Creates the "ews-ip-address" element
class EwsIpAddress extends HTMLElement {
    constructor() {
        super();
    }

    get before_() {
        return this.getAttribute('before');
    }

    get after_() {
        return this.getAttribute('after');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        fetch('https://api64.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => {
                this.innerHTML = this.before_ + data['ip'] + this.after_;
                if (this.before_ == null || this.after_ == null) {
                    this.innerHTML = data['ip'];
                }
            });
    }
}

customElements.define('ews-ip-address', EwsIpAddress);

// Creates the "ews-to-num" element
class EwsToNum extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get startValue() {
        return this.getAttribute('startValue');
    }

    get endValue() {
        return this.getAttribute('endValue');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        for (let i = this.startValue; i <= this.endValue; i++) {
            const element = document.createElement('div');
            element.innerHTML = `${i},&nbsp;`;
            this.shadow.appendChild(element);

            if (i == this.endValue) {
                element.innerHTML = i;
            }
        }
    }
}

customElements.define('ews-to-num', EwsToNum);

// Creates the "ews-checkbox" element
class EwsCheckbox extends HTMLElement {
    constructor() {
        super();
    }

    get checked() {
        return this.getAttribute('checked');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let isChecked = false;

        if (this.checked == 'true') {
            isChecked = true;
        } else if (this.checked == 'false' || this.checked == null) {
            isChecked = false;
        } else {
            isChecked = false;
            throw new Error('The "checked" attribute only allows boolean');
        }

        if (isChecked == true) {
            this.innerHTML = '✓';
            this.style.background = 'rgb(11, 133, 214)';
        } else if (isChecked == false) {
            this.innerHTML = '';
            this.style.background = 'none';
        }

        this.addEventListener('click', () => {
            isChecked = !isChecked;
            this.setAttribute('checked', isChecked);
            this.render();
        });
    }
}

customElements.define('ews-checkbox', EwsCheckbox);

// Creates the "ews-progress-bar" element
class EwsProgressBar extends HTMLElement {
    constructor() {
        super();
    }

    get ms() {
        return this.getAttribute('ms');
    }

    get percentage() {
        return this.getAttribute('percentage');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let percentage = this.percentage;

        const pb = document.createElement('div');
        pb.style.width = percentage + '%';
        this.appendChild(pb);

        const txt = document.createElement('span');
        txt.innerHTML = percentage + '%';
        pb.appendChild(txt);

        let loop = setInterval(() => {
            percentage++;
            txt.innerHTML = percentage + '%';
            pb.style.width = percentage + '%';

            if (percentage >= 100) clearInterval(loop);
        }, this.ms);
    }
}

customElements.define('ews-progress-bar', EwsProgressBar);

// Creates the "ews-textarea" element
class EwsTextarea extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.contentEditable = true;
    }
}

customElements.define('ews-textarea', EwsTextarea);

// Creates the "ews-context" element
class EwsContext extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        document.addEventListener('contextmenu', e => {
            let x = e.clientX, y = e.clientY;
            e.preventDefault();

            this.style.left = x + 'px';
            this.style.top = y + 'px';
            this.classList.add('active')
        });
        document.addEventListener('click', () => {
            this.classList.remove('active');
        });
    }
}

customElements.define('ews-context', EwsContext);

// creates the "ews-anchor" element
class EwsAnchor extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    get href() {
        return this.getAttribute('href');
    }

    render() {
        const urlView = document.createElement('div');
        this.addEventListener('click', () => {
            window.open(this.href);
        });
        this.addEventListener('mousemove', e => {
            let x = e.clientX, y = e.clientY;
            urlView.innerHTML = this.href;
            urlView.classList.add('url');
            this.appendChild(urlView);

            urlView.style.left = `${x + 7}px`;
            urlView.style.top = `${y + 7}px`;
        });
        this.addEventListener('mouseout', () => {
            urlView.remove();
        });
        this.addEventListener('mousedown', e => {
            if (e.button == 1) {
                navigator.clipboard.writeText(this.href);
                urlView.innerHTML = 'Copied!';
                setTimeout(() => urlView.remove(), 1000);
            }
        });
    }
}

customElements.define('ews-anchor', EwsAnchor);

// Creates the "ews-day" element
class EwsDay extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        switch (new Date().getDay()) {
            case 0:
                this.innerHTML = 'Sunday';
                break;
            case 1:
                this.innerHTML = 'Monday';
                break;
            case 2:
                this.innerHTML = 'Tuesday';
                break;
            case 3:
                this.innerHTML = 'Wednesday';
                break;
            case 4:
                this.innerHTML = 'Thursday';
                break;
            case 5:
                this.innerHTML = 'Friday';
                break;
            case 6:
                this.innerHTML = 'Saturday';
                break;
        }
    }
}

customElements.define('ews-day', EwsDay);

// Creates the "ews-timer" element
class EwsTimer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        for (let i = 0; i < 5; i++) {
            const span = document.createElement('span');
            this.appendChild(span);
        }

        document.querySelector('ews-timer span:nth-child(2)').innerHTML = ':';
        document.querySelector('ews-timer span:nth-child(4)').innerHTML = ':';

        setInterval(() => {
            const time = new Date();
            let hours = addZero(time.getHours());
            let minutes = addZero(time.getMinutes());
            let seconds = addZero(time.getSeconds());

            document.querySelector('ews-timer span:first-child').innerHTML = hours;
            document.querySelector('ews-timer span:nth-child(3)').innerHTML = minutes;
            document.querySelector('ews-timer span:last-child').innerHTML = seconds;

            function addZero(num) {
                return num < 10 ? `0${num}` : num;
            }
        }, 1000);
    }
}

customElements.define('ews-timer', EwsTimer);

// Creates the "ews-finder" element
class EwsFinder extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Find...';
        this.appendChild(input);

        input.addEventListener('keyup', e => {
            try {
                if (e.key == 'Enter') {
                    const para = document.querySelector(this.getAttribute('selector'));
                    if (input.value != '') {
                        let regExp = new RegExp(input.value, 'gi');
                        para.innerHTML = (para.textContent).replace(regExp, '<mark>$&</mark>');
                    }
                }
            } catch {
                throw new Error('The text/paragraph can not be selected');
            }
        });
    }
}

customElements.define('ews-finder', EwsFinder);

// Creates the "ews-img-glr" element
class EwsImgGlr extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const attributes = this.attributes;

        for (let i = 0; i < attributes.length; i++) {
            const attributeName = attributes[i].name;
            const attributeValue = attributes[i].value;

            if (attributeName.startsWith('img')) {
                const img = document.createElement('img');
                img.src = attributeValue;
                img.alt = '';
                this.appendChild(img);
            }
        }
    }
}

customElements.define('ews-img-glr', EwsImgGlr);

class EwsBingImg extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        fetch('https://bing.biturl.top/')
            .then(res => res.json())
            .then(data => {
                const img = document.createElement('img');
                img.src = data['url'];
                img.alt = '';
                this.appendChild(img);
            });
    }
}

customElements.define('ews-bing-img', EwsBingImg);

// Creates the "ews-dt" element
class EwsDt extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        return this.getAttribute('value');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `You can download in ${this.value}.`;
        let value = this.value;

        let loop = setInterval(() => {
            value--;
            this.innerHTML = `You can download in ${value}.`;

            if (value <= 0) {
                const blob = new Blob([this.getAttribute('file')], { type: 'text/plain' });

                const btn = document.createElement('ews-button');
                btn.innerHTML = `<a href="${URL.createObjectURL(blob)}" download="${this.getAttribute('filename')}.${this.getAttribute('filetype')}" style="color: #fff; text-decoration: none;">Download</a>`;
                this.appendChild(btn);

                console.log(getComputedStyle(this.querySelector('ews-button')).getPropertyValue('width'));
                URL.revokeObjectURL(blob);

                clearInterval(loop);
            }
        }, this.getAttribute('ms'));
    }
}

customElements.define('ews-dt', EwsDt);

// Creates the "ews-about" element
class EwsAbout extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
        const style = {
            defaultColor: 'rgb(11, 133, 214)',
            unactiveColor: 'rgb(32, 134, 32)',
            attrColor: 'rgb(65, 176, 219)',
            strColor: 'rgb(151, 83, 19)'
        }
        this.innerHTML = `
            <div class="close">X</div>
            <div>Name: EWS</div>
            <div>Description: <b>E</b>asy <b>W</b>eb un<b>S</b>uffering | Gives you more HTML tags</div>
            <div>Version: 1.3</div>
            <div>Author: YSSF</div>
            <div>GitHub: <a href="https://github.com/YSSF8" target="_blank">https://github.com/YSSF8</a></div>
            <div>Repository: <a href="https://github.com/YSSF/EWS" target="_blank">https://github.com/YSSF/EWS</a></div>
            <h3>How to import</h3>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- Add both of these to the "head" tag<br>Linking with JavaScript --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">script <span style="color: ${style.attrColor}">src=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./ews.js</span>"</span> defer</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">script</span>&gt;</div>
                <div style="color: ${style.unactiveColor}">&lt;!-- Linking with CSS --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">link <span style="color: ${style.attrColor}">rel=<span style="color: ${style.strColor}">"stylesheet"</span> href=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./ews.css</span>"</span></span></span>&gt;</div>
            </div>
            <h3>How to use</h3>
            <h4>Make a ready button (styled)</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- This button has the ripple effect --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-button</span>&gt;Download&lt;/<span style="color: ${style.defaultColor}">ews-button</span>&gt;</div>
            </div>
            <h4>Make text input/textarea (styled)</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- Text input --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-text</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-text</span>&gt;<div>
                <br>
                <div style="color: ${style.unactiveColor}">&lt;!-- Textarea --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-textarea</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-textarea</span>&gt;</div>
            </div>
            </div>
            </div>
            <h4>Make auto counting element</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- ms means milliseconds, event means that you will choose between increasing or decreasing<br>to count (inc, dec) --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-counter</span> <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"0"</span> ms=<span style="color: ${style.strColor}">"1000"</span> event=<span style="color: ${style.strColor}">"inc"</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-counter</span>&gt;</div>
            </div>
            <h4>Make ip address viewer element</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- before means that it will put a text before the ip address, after means that it will put a text<br>after the ip address --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-ip-address</span> <span style="color: ${style.attrColor}">before=<span style="color: ${style.strColor}">"Your IP Adress is: '"</span> after=<span style="color: ${style.strColor}">"'"</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-ip-address</span>&gt;</div>
                <div style="color: ${style.unactiveColor}">&lt;!-- The result is (Your IP address is: 'ip-address') --&gt;</div>
            </div>
            <h4>Make a lot of counted elements</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-to-num <span style="color: ${style.attrColor}">startValue=<span style="color: ${style.strColor}">"0"</span> endValue=<span style="color: ${style.strColor}">"9"</span></span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-to-num</span>&gt;</div>
            </div>
            <h4>Make a checkbox (styled)</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- the "checked" attribue can be true or false, if but it's not important if you want it false --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-checkbox <span style="color: ${style.attrColor}">checked=<span style="color: ${style.strColor}">"true"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-checkbox</span>&gt;</div>
            </div>
            <h4>Make a progress bar</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- ms means milliseconds, percentage is the first percentage the "progress bar" starts with --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-progress-bar <span style="color: ${style.attrColor}">ms=<span style="color: ${style.strColor}">"100"</span> percentage=<span style="color: ${style.strColor}">"0"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-progress-bar</span>&gt;</div>
            </div>
            <h4>Make a custom context menu</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- hr adds a line, you can onclick attribute and set functions with JavaScript to make things<br>happening --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-context</span>&gt;
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option</span>&gt;Copy&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option</span>&gt;Paste&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option</span>&gt;Cut&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">hr</span>&gt;</div>
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option</span>&gt;Reload&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                    <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option</span>&gt;Delete&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                &lt;/<span style="color: ${style.defaultColor}">ews-context</span>&gt;</div>
            </div>
            <h4>Make anchor element (styled)</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- add the "href" attribute to set a link --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-anchor <span style="color: ${style.attrColor}">href=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">https://youtu.be/dQw4w9WgXcQ</span>"</span></span></span>&gt;Example&lt;/<span style="color: ${style.defaultColor}">ews-anchor</span>&gt;</div>
            </div>
            <h4>Make an element shows the current day</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-day</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-day</span>&gt;</div>
            </div>
            <h4>Make an element shows the hours/minutes/seconds</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-timer</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-timer</span>&gt;</div>
            </div>
            <h4>Make a text finder element (to search a paragraph...)</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- inside the selector attribute you can select the text/paragraph you want to search in like the<br>query selector/CSS selector --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-finder <span style="color: ${style.attrColor}">selector=<span style="color: ${style.strColor}">".example"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-finder</span>&gt;</div>
            </div>
            <h4>Make an element to add a lot of images fast</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- To add images you can add attributes like this (img1="./example.png" img2="./example.jpg") --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-img-glr <span style="color: ${style.attrColor}">img1=<span style="color: ${style.strColor}">"./myImage1.png"</span> img2=<span style="color: ${style.strColor}">"./myImage2.png"</span> img3=<span style="color: ${style.strColor}">"./myImage3.jpg"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-img-glr</span>&gt;</div>
            </div>
            <h4>Add bing's image (API made by <a href="https://github.com/TimothyYe" target="_blank">TimothyYe</a>)</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-bing-img</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-bing-img</span>&gt;</div>
            </div>
            <h4>Add a counter with a download button</h4>
            <div class="code">
                <div style="color: ${style.unactiveColor}">&lt;!-- This element allows you to make a file download with a timer, when the timer hits the 0 the<br>download button will appear, so if you wanna make a site with a premium plans you can use it --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-dt <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"5"</span> ms=<span style="color: ${style.strColor}">"1000"</span> file=<span style="color: ${style.strColor}">"./ews.js"</span> filename=<span style="color: ${style.strColor}">"ews"</span> filetype=<span style="color: ${style.strColor}">"js"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-dt</span>&gt;</div>
            </div>
            <h4>To get the help</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-about</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-about</span>&gt;</div>
            </div>
        `;
        document.addEventListener('keyup', e => {
            if (e.key == 'Escape') {
                this.style.opacity = 0;
                setTimeout(() => this.remove(), 200);
                document.body.style.removeProperty('pointer-events');
                document.body.style.removeProperty('user-select');
            }
        });
        document.querySelector('ews-about .close').addEventListener('click', () => {
            this.style.opacity = 0;
            setTimeout(() => this.remove(), 200);
            document.body.style.removeProperty('pointer-events');
            document.body.style.removeProperty('user-select');
        });
    }
}

customElements.define('ews-about', EwsAbout);