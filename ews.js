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
        let value = this.value;
        let loop = setInterval(() => {
            this.event;
            value++;
            this.setAttribute('value', value);
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
            <div>Version: 1.0</div>
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