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
                        try {
                            const regExp = new RegExp(input.value, 'gi');
                            para.innerHTML = (para.textContent).replace(regExp, `<mark style="background-color: ${this.getAttribute('color')}; color: ${this.getAttribute('txtcolor')}; border-radius: ${this.getAttribute('rounded')}px;">$&</mark>`);
                        } catch (err) {
                            input.value = err;
                            input.style.color = '#f00';
                            input.setAttribute('disabled', '');
                            throw new Error(err);
                        }
                    }
                }
            } catch {
                throw new Error('The text/paragraph cannot be selected');
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

// Creates the "ews-bing-img" element
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

                URL.revokeObjectURL(blob);

                clearInterval(loop);
            }
        }, this.getAttribute('ms'));
    }
}

customElements.define('ews-dt', EwsDt);

// Creates the "ews-ap" element
class EwsAudioPlayer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let isPlaying = false;

        const audio = new Audio(this.getAttribute('src'));

        this.innerHTML = `
            <button>${this.getAttribute('playtext') || 'Play'}</button>
            <div id="range-container">
                <div id="thumb"></div>
                <div id="track"></div>
            </div>
        `;

        const toggle = this.querySelector('button');

        toggle.addEventListener('click', () => {
            isPlaying = !isPlaying;

            if (isPlaying) {
                toggle.innerHTML = this.getAttribute('pausetext') || 'Pause';
                audio.play();
            } else {
                toggle.innerHTML = this.getAttribute('playtext') || 'Play';
                audio.pause();
            }
        });

        const rangeContainer = this.querySelector("#range-container");
        const thumb = this.querySelector("#thumb");
        const track = this.querySelector("#track");

        let value = this.getAttribute('value') || 0;
        let isDragging = false;

        function updateValue() {
            const thumbLeft = thumb.offsetLeft;
            const containerWidth = rangeContainer.offsetWidth - thumb.offsetWidth;
            if (!isNaN(thumbLeft) && !isNaN(containerWidth) && containerWidth !== 0) {
                value = Math.round((thumbLeft / containerWidth) * 100);
            }
        }

        function handleMouseDown() {
            isDragging = true;
        }

        function handleMouseMove(event) {
            if (!isDragging) {
                return;
            }
            let thumbLeft = event.clientX - rangeContainer.offsetLeft - (thumb.offsetWidth / 2);
            thumbLeft = Math.max(0, Math.min(thumbLeft, rangeContainer.offsetWidth - thumb.offsetWidth));
            thumb.style.left = thumbLeft + "px";
            track.style.width = thumbLeft + "px";
            updateValue();
        }

        function handleMouseUp() {
            isDragging = false;

            const seekTime = (value / 100) * audio.duration;
            audio.currentTime = seekTime;
        }

        thumb.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        updateValue();

        audio.addEventListener("timeupdate", () => {
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            const progress = (currentTime / duration) * 100;

            const containerWidth = rangeContainer.offsetWidth - thumb.offsetWidth;
            const thumbLeft = (progress / 100) * containerWidth;
            thumb.style.left = thumbLeft + "px";
            track.style.width = thumbLeft + "px";
        });

        audio.addEventListener('ended', () => {
            isPlaying = false;
            toggle.innerHTML = this.getAttribute('playtext') || 'Play';
            thumb.style.left = rangeContainer.offsetWidth - thumb.offsetWidth + "px";
            track.style.width = rangeContainer.offsetWidth - thumb.offsetWidth + "px";
            updateValue();
        });
    }
}

customElements.define('ews-ap', EwsAudioPlayer);

// Creates the "ews-ddm" element
class EwsDropDownMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.style.display = "none";

        let isOpened = false;

        const element = document.createElement("div");
        element.classList.add("ews-ddm");
        const options = this.querySelectorAll("option");
        const elements = document.createElement("div");

        document.body.insertBefore(element, this);

        const rect = element.getBoundingClientRect();

        elements.style.left = `${rect.x}px`;
        elements.style.top = `${rect.y + 55}px`;

        for (let i = 0; i < options.length; i++) {
            element.innerHTML = options[0].textContent;

            const eachElement = document.createElement("div");
            eachElement.classList.add("ews-ddm-option");
            eachElement.innerHTML = options[i].innerHTML;
            elements.appendChild(eachElement);

            const eventAttr = options[i].getAttribute("on");

            if (eventAttr) {
                const eventDefs = eventAttr.split("@@");

                for (let j = 0; j < eventDefs.length; j++) {
                    const [eventType, eventHandler] = eventDefs[j].split("::");

                    if (!eventType.startsWith("#")) {
                        throw new Error(`Event type '${eventType}' should start with '#' symbol`);
                    }

                    const eventName = eventType.slice(1);

                    eachElement.addEventListener(eventName, () => {
                        eval(eventHandler);
                    });
                }
            }

            eachElement.addEventListener("click", () => {
                isOpened = false;
                element.innerHTML = options[i].textContent;
                elements.style.opacity = 0;
                setTimeout(() => elements.remove(), 200);
            });
        }

        element.addEventListener("click", () => {
            isOpened = !isOpened;

            if (isOpened) {
                elements.classList.add("ews-ddm-options");
                document.body.appendChild(elements);

                const elementsRect = elements.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const distanceToBottom = viewportHeight - elementsRect.bottom;

                if (distanceToBottom < 0) {
                    elements.style.top = `${parseFloat(elements.style.top) + distanceToBottom - 10}px`;
                }

                setTimeout(() => {
                    elements.style.opacity = 1;
                });
            } else {
                elements.style.opacity = 0;
                setTimeout(() => elements.remove(), 200);
            }

            document.addEventListener("click", e => {
                if (!element.contains(e.target) && !elements.contains(e.target)) {
                    isOpened = false;
                    elements.style.opacity = 0;
                    setTimeout(() => elements.remove(), 200);
                }
            });
        });
    }
}

customElements.define('ews-ddm', EwsDropDownMenu);

// Creates the "ews-charts" element
class EwsCharts extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const charts = [];
        for (let i = 1; i <= Object.keys(this.attributes).length; i++) {
            const chartAttr = this.getAttribute(`chart${i}`);
            if (chartAttr) {
                const chart = {};
                chartAttr.split(';').forEach((property) => {
                    const [name, value] = property.split(':');
                    if (name && value) {
                        chart[name.trim()] = value.trim();
                    }
                });

                const text = chart.text;
                if (text && !(/^'.*'$/.test(text))) {
                    throw new Error(`Chart text property "${text}" must be enclosed in single quotes`);
                }

                charts.push(chart);
            }
        }

        for (const chart of charts) {
            const chartElement = document.createElement('div');
            chartElement.style.height = '30px';
            chartElement.style.width = `${parseInt(chart.value) * 10}px`;
            chartElement.style.backgroundColor = chart.background || 'gray';

            const text = chart.text;
            if (text) {
                chartElement.innerText = text.slice(1, -1);
            }

            this.appendChild(chartElement);
        }
    }
}

customElements.define('ews-charts', EwsCharts);

// Creates the "ews-collapsible" element
class EwsCollapsible extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const content = document.createElement('div');
        content.classList.add('collapsible-content');
        content.innerHTML = this.innerHTML;
        this.innerHTML = '';

        const heading = document.createElement('div');
        heading.classList.add('collapsible-heading');
        heading.innerHTML = `${this.getAttribute('value')} ${this.getAttribute('expanded') === 'true' ? '&#9662;' : '&#9656;'}`;
        this.appendChild(heading);

        this.appendChild(content);

        let isCollapsed = this.getAttribute('expanded') === 'false' || false;
        this.setAttribute('aria-expanded', !isCollapsed);

        content.style.maxHeight = isCollapsed ? '0px' : content.scrollHeight + 'px';

        heading.addEventListener('click', () => {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            content.style.maxHeight = expanded ? '0px' : content.scrollHeight + 'px';
            heading.innerHTML = `${this.getAttribute('value')} ${expanded ? '&#9656;' : '&#9662;'}`;
        });
    }
}

customElements.define('ews-collapsible', EwsCollapsible);

// Creates the "ews-sort" element
class EwsSort extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const sortMenu = document.createElement('select');
        sortMenu.classList.add('sort-menu');
        sortMenu.innerHTML = `
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
        `;
        this.appendChild(sortMenu);

        const items = Array.from(this.children);
        const defaultSort = this.getAttribute('default');

        if (defaultSort) {
            if (defaultSort === 'A-Z') {
                sortMenu.value = 'az';
                items.sort((a, b) => a.textContent.localeCompare(b.textContent));
            } else if (defaultSort === 'Z-A') {
                sortMenu.value = 'za';
                items.sort((a, b) => b.textContent.localeCompare(a.textContent));
            } else if (defaultSort === 'random') {
                sortMenu.value = Math.random() < 0.5 ? 'az' : 'za';
                items.sort(() => Math.random() - 0.5);
            } else {
                throw new Error('Invalid default sort option. Please choose "A-Z", "Z-A", or "random"');
            }
        }

        for (const item of items) {
            this.appendChild(item);
        }

        sortMenu.addEventListener('change', () => {
            const sortBy = sortMenu.value;

            if (sortBy === 'az') {
                items.sort((a, b) => a.textContent.localeCompare(b.textContent));
            } else if (sortBy === 'za') {
                items.sort((a, b) => b.textContent.localeCompare(a.textContent));
            }

            for (const item of items) {
                this.appendChild(item);
            }
        });
    }
}

customElements.define('ews-sort', EwsSort);

class EwsImageSlide extends HTMLElement {
    constructor() {
        super();
        this.currentSlide = 0;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let imageLinks = [];
        for (let i = 1; i <= Infinity; i++) {
            const src = this.getAttribute(`src${i}`);
            if (!src) break;
            imageLinks.push(src);
        }

        const slider = document.createElement("div");
        slider.classList.add("slider");

        const slide = document.createElement("div");
        slide.classList.add("slide");

        const img = document.createElement("img");
        img.setAttribute("src", imageLinks[this.currentSlide]);
        img.setAttribute("alt", `Slide ${this.currentSlide + 1}`);

        slide.appendChild(img);
        slider.appendChild(slide);

        const prevButton = document.createElement("button");
        prevButton.classList.add("prev");
        prevButton.textContent = "<";
        prevButton.addEventListener("click", () => {
            this.showSlide(this.currentSlide - 1, imageLinks);
        });

        const nextButton = document.createElement("button");
        nextButton.classList.add("next");
        nextButton.textContent = ">";
        nextButton.addEventListener("click", () => {
            this.showSlide(this.currentSlide + 1, imageLinks);
        });

        this.appendChild(slider);
        this.appendChild(prevButton);
        this.appendChild(nextButton);

        this.showSlide(0, imageLinks);
    }

    showSlide(slideIndex, imageLinks) {
        if (slideIndex >= imageLinks.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = imageLinks.length - 1;
        }
        const slide = this.querySelector(".slide");
        slide.style.opacity = 0;
        setTimeout(() => {
            const img = this.querySelector(".slide img");
            img.setAttribute("src", imageLinks[slideIndex]);
            img.setAttribute("alt", `Slide ${slideIndex + 1}`);
            slide.style.opacity = 1;
            this.currentSlide = slideIndex;
        }, 500);
    }
}

customElements.define("ews-is", EwsImageSlide);

// Creates the "ews-sr" element
class EwsSr extends HTMLElement {
    constructor() {
        super();
        this.stars = this.getAttribute('maxvalue') || 5;
        this.value = 0;
    }

    connectedCallback() {
        this.render();
        const stars = this.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.setAttribute('value', index + 1);
            });
        });
    }

    render() {
        const STAR_ICON = `
            <svg viewBox="0 0 24 24">
              <path d="M12 1.302l3.094 6.215 6.906 1-5 4.854 1.173 6.821L12 18.819l-6.173 3.484L7 12.371 2 7.517l6.906-1L12 1.302z"/>
            </svg>
        `;

        let starsHtml = '';
        for (let i = 1; i <= this.stars; i++) {
            const active = i <= this.value ? 'active' : '';
            starsHtml += `<i class="star ${active}" data-index="${i}">${STAR_ICON}</i>`;
        }

        this.innerHTML = starsHtml;

        const starElems = this.querySelectorAll('.star');
        starElems.forEach(starElem => {
            starElem.addEventListener('click', () => {
                const value = parseInt(starElem.dataset.index);
                this.setAttribute('value', value);
            });
        });
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && oldValue !== newValue) {
            this.value = parseInt(newValue, 10) || 0;
            this.render();
        }
    }
}

customElements.define('ews-sr', EwsSr);

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
            defaultColor: 'rgb(86, 156, 214)',
            inactiveColor: 'rgb(87, 166, 74)',
            attrColor: 'rgb(156, 220, 254)',
            strColor: 'rgb(206, 145, 120)'
        }

        this.innerHTML = `
            <div class="close">X</div>
            <div>Name: EWS</div>
            <div>Description: <b>E</b>asy <b>W</b>eb un<b>S</b>uffering | Gives you more HTML tags</div>
            <div>Version: e2.1</div>
            <div>Author: YSSF</div>
            <div>GitHub: <a href="https://github.com/YSSF8" target="_blank">https://github.com/YSSF8</a></div>
            <div>Repository: <a href="https://github.com/YSSF/EWS" target="_blank">https://github.com/YSSF/EWS</a></div>
            <h3>How to import</h3>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- Add both of these to the "head" tag<br>Linking with JavaScript --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">script <span style="color: ${style.attrColor}">src=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./ews.js</span>"</span> defer</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">script</span>&gt;</div>
                <div style="color: ${style.inactiveColor}">&lt;!-- Linking with CSS --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">link <span style="color: ${style.attrColor}">rel=<span style="color: ${style.strColor}">"stylesheet"</span> href=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./ews.css</span>"</span></span></span>&gt;</div>
            </div>
            <h3>How to use</h3>
            <h4>Make a ready button (styled)</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- This button has the ripple effect --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-button</span>&gt;Download&lt;/<span style="color: ${style.defaultColor}">ews-button</span>&gt;</div>
            </div>
            <h4>Make text input/textarea (styled)</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- Text input --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-text</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-text</span>&gt;<div>
                <br>
                <div style="color: ${style.inactiveColor}">&lt;!-- Textarea --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-textarea</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-textarea</span>&gt;</div>
            </div>
            </div>
            </div>
            <h4>Make auto counting element</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- ms means milliseconds, event means that you will choose between increasing or decreasing<br>to count (inc, dec) --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-counter</span> <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"0"</span> ms=<span style="color: ${style.strColor}">"1000"</span> event=<span style="color: ${style.strColor}">"inc"</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-counter</span>&gt;</div>
            </div>
            <h4>Make ip address viewer element</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- before means that it will put a text before the ip address, after means that it will put a text<br>after the ip address --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-ip-address</span> <span style="color: ${style.attrColor}">before=<span style="color: ${style.strColor}">"Your IP Adress is: '"</span> after=<span style="color: ${style.strColor}">"'"</span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-ip-address</span>&gt;</div>
                <div style="color: ${style.inactiveColor}">&lt;!-- The result is (Your IP address is: 'ip-address') --&gt;</div>
            </div>
            <h4>Make a lot of counted elements</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-to-num <span style="color: ${style.attrColor}">startValue=<span style="color: ${style.strColor}">"0"</span> endValue=<span style="color: ${style.strColor}">"9"</span></span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-to-num</span>&gt;</div>
            </div>
            <h4>Make a checkbox (styled)</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- the "checked" attribue can be true or false, if but it's not important if you want it false --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-checkbox <span style="color: ${style.attrColor}">checked=<span style="color: ${style.strColor}">"true"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-checkbox</span>&gt;</div>
            </div>
            <h4>Make a progress bar</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- ms means milliseconds, percentage is the first percentage the "progress bar" starts with --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-progress-bar <span style="color: ${style.attrColor}">ms=<span style="color: ${style.strColor}">"100"</span> percentage=<span style="color: ${style.strColor}">"0"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-progress-bar</span>&gt;</div>
            </div>
            <h4>Make a custom context menu</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- hr adds a line, you can onclick attribute and set functions with JavaScript to make things<br>happening --&gt;</div>
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
                <div style="color: ${style.inactiveColor}">&lt;!-- add the "href" attribute to set a link --&gt;</div>
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
                <div style="color: ${style.inactiveColor}">&lt;!-- inside the selector attribute you can select the text/paragraph you want to search in like the<br>query selector/CSS selector --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-finder <span style="color: ${style.attrColor}">selector=<span style="color: ${style.strColor}">".example"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-finder</span>&gt;</div>
            </div>
            <h4>Make an element to add a lot of images fast</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- To add images you can add attributes like this (img1="./example.png" img2="./example.jpg") --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-img-glr <span style="color: ${style.attrColor}">img1=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./myImage1.png</span>"</span> img2=<span style="color: ${style.strColor}">"<span style="text-decoration: underline;">./myImage2.png</span>"</span> img3=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./myImage3.jpg</span>"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-img-glr</span>&gt;</div>
            </div>
            <h4>Add bing's image (API made by <a href="https://github.com/TimothyYe" target="_blank">TimothyYe</a>)</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-bing-img</span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-bing-img</span>&gt;</div>
            </div>
            <h4>Add a counter with a download button</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- This element allows you to make a file download with a timer, when the timer hits the 0 the<br>download button will appear, so if you wanna make a site with a premium plans you can use it --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-dt <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"5"</span> ms=<span style="color: ${style.strColor}">"1000"</span> file=<span style="color: ${style.strColor}">"<span style="text-decoration: underline">./ews.js</span>"</span> filename=<span style="color: ${style.strColor}">"ews"</span> filetype=<span style="color: ${style.strColor}">"js"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-dt</span>&gt;</div>
            </div>
            <h4>Custom modern audio player</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-ap <span style="color: ${style.attrColor}">src=<span style="color: ${style.strColor}">"[AUDIO_PATH/AUDIO_LINK]"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-ap</span>&gt;</div>
            </div>
            <h4>Custom dropdown menu</h4>
            <div class="code">
                <div>&lt;<span style="color: ${style.defaultColor}">ews-ddm</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option <span style="color: ${style.attrColor}">on=<span style="color: ${style.strColor}">"#mousemove::console.log('Hello, Josh');@@#mouseout::console.log('Goodbye, Josh');"</span></span></span>&gt;<br>Josh&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option <span style="color: ${style.attrColor}">on=<span style="color: ${style.strColor}">"#mousemove::console.log('Hello, Marry');@@#mouseout::console.log('Goodbye, Marry');"</span></span></span>&gt;<br>Marry&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">option <span style="color: ${style.attrColor}">on=<span style="color: ${style.strColor}">"#mousemove::console.log('Hello, Peter');@@#mouseout::console.log('Goodbye, Peter');"</span></span></span>&gt;<br>Peter&lt;/<span style="color: ${style.defaultColor}">option</span>&gt;</div>
                <div>&lt;/<span style="color: ${style.defaultColor}">ews-ddm</span>&gt;</div>
            </div>
            <h4>Charts system</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- You can use the chart[NUMBER] attributes to add charts --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-charts <span style="color: ${style.attrColor}">chart1=<span style="color: ${style.strColor}">"value: 40; background: red; text: 'Red Text';"</span>&nbsp;<span>chart2=<span style="color: ${style.strColor}">"value: 30; background: green;<br>text: 'Green Text';"</span>&nbsp;<span>chart3=<span style="color: ${style.strColor}">"value: 20; background: blue; text: 'Blue Text';"</span></span></span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-charts</span>&gt;</div>
            </div>
            <h4>Collapsible content</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- Get it expanded by default by setting the "expanded" attribute to true, else false --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-collapsible <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"People"</span>&nbsp;expanded=<span style="color: ${style.strColor}">"false"</span></span></span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Josh&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Marry&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Peter&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&lt;/<span style="color: ${style.defaultColor}">ews-collapsible</span>&gt;</div>
            </div>
            <h4>Sorting system</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- The "default" attribute only works with these values: "A-Z", "Z-A", and "random" --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-sort <span style="color: ${style.attrColor}">default=<span style="color: ${style.strColor}">"A-Z/Z-A/random"</span></span></span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Aaron&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Barbra&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Camila&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&nbsp;&nbsp;&lt;<span style="color: ${style.defaultColor}">div</span>&gt;Daisy&lt;/<span style="color: ${style.defaultColor}">div</span>&gt;</div>
                <div>&lt;/<span style="color: ${style.defaultColor}">ews-sort</span>&gt;</div>
            </div>
            <h4>Image Slider</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- src1, src2, src3, src4, etc. It goes forever --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-is <span style="color: ${style.attrColor}">src1=<span style="color: ${style.strColor}">"[IMAGE_PATH/IMAGE_LINK]"</span>&nbsp;<span>src2=<span style="color: ${style.strColor}">"[IMAGE_PATH/IMAGE_LINK]"</span><br><span>src3=<span style="color: ${style.strColor}">"[IMAGE_PATH/IMAGE_LINK]"</span></span></span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-is</span>&gt;</div>
                <div style="color: ${style.inactiveColor}">&lt;!-- The ">" button goes to the next image, else previous image --&gt;</div>
            </div>
            <h4>Star rating</h4>
            <div class="code">
                <div style="color: ${style.inactiveColor}">&lt;!-- The "value" attribute sets the star rating to the value you want, max value changes<br>the max value of the stars --&gt;</div>
                <div>&lt;<span style="color: ${style.defaultColor}">ews-sr <span style="color: ${style.attrColor}">value=<span style="color: ${style.strColor}">"5"</span> maxvalue=<span style="color: ${style.strColor}">"10"</span></span></span>&gt;&lt;/<span style="color: ${style.defaultColor}">ews-sr</span>&gt;</div>
                <div style="color: ${style.inactiveColor}">&lt!-- For example in the given example it will be 5/10 stars. Note: the stars are clickable and can be changed<br>by the user when interacting with. --&gt;</div>
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