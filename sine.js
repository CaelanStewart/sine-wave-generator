class Sine {
    constructor(canvas, options = { }) {
        if(typeof canvas === 'string') {
            canvas = document.querySelector(canvas);
        }

        if(!canvas instanceof HTMLElement) {
            throw new Error('Invalid canvas element');
        }

        this.canvas = canvas;

        this.options = {
            amplitude: 20,
            frequency: 5,
            speed: 100
        };

        this.loopId = 0;

        Object.assign(this.options, options);

        this.prepareCanvas();
        this.beginLoop();
    }

    prepareCanvas() {
        this.canvas.width = this.canvas.offsetWidth * 2;
        this.canvas.height = this.canvas.offsetHeight * 2;

        this.context = this.canvas.getContext('2d');
    }

    beginLoop() {
        let c = this.context,
            cw = this.canvas.width,
            ch = this.canvas.height,
            o = this.options,
            Tx = 0, // x axis translation
            Ty = Math.ceil(this.canvas.height / 2), // translate the y axis by half of the canvas height
            loopId = ++this.loopId,
            t1 = Date.now(),
            vx = 0;

        //c.clearRect(0, 0, cw, ch);

        let frame = () => {
            if(loopId !== this.loopId) {
                return;
            }

            c.clearRect(0, 0, cw, ch);

            let A = o.amplitude,
                f = o.frequency,
                s = o.speed,
                w = s / f, // wavelength
                t2 = Date.now(),
                dt = t2 - t1,
                lx = 0,
                ly = 0,
                x,
                ps;

            vx = vx + (dt / 1000 * s);
            ps = (vx % w) / w * 360;

            c.beginPath();

            for(x = 0; x < cw; ++x) {
                let a = (x % w) / w * 360,
                    y = Math.sin((a - ps) * Math.PI / 180) * A;

                c.moveTo(lx + Tx, ly + Ty);
                c.lineTo(x + Tx, y + Ty);

                lx = x;
                ly = y;
            }

            c.lineWidth = 2;
            c.stroke();

            t1 = t2;

            window.requestAnimationFrame(frame);
        };

        window.requestAnimationFrame(frame);
    }
}