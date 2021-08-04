/*=============================================
   =                Helpers              =
   =============================================*/

$id = id => document.getElementById(id);

$class = classe => Array.from(document.getElementsByClassName(classe));


/*=============================================
   =                md5      =
   =============================================*/

const md5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

/**************************************************************************************************************************
 * @class FileRw
 *
 * read and write files
 */

class FileRw {
    constructor(model) {
        this.model = model
    }

    read = (filename, callback = () => { }) => {
        const data = { action: "read", filename: filename };
        const fd = new FormData();
        for(let i in data){
            fd.append(i,data[i]);
        }
        fetch("/ajax/file-rw", {
            method: 'post',
            body: fd
        }).then(res => {
            return res.text().then(text => {
                callback(text)

            })        
        })
    }

    write = (filename, content, callback = () => { }) => {
        const data = {action:"write", filename: filename, content: content };
        const fd = new FormData();
        for(let i in data){
            fd.append(i,data[i]);
        }
        fetch("/ajax/file-rw", {
            method: 'post',
            body: fd
        }).then(res => {
            return res.text().then(text => {
                console.log(filename)
                callback(text)
            })            
        })
    }

    loadTex = (basename, callback) => {
        // const config = this.model.config
        // const fn = config["latex-dir"] + basename + ".tex"
        // this.read(fn, callback)
        const url = new URL(window.location.href);
        const from = url.searchParams.get("from") == "local" ? "local" : "remote";
        const config = this.model.config
        const tex_source = config[from + "-url"] + "tex-source/?filename=" + basename
        console.log(tex_source)

        fetch("/ajax/file-rw", {
            method: 'post',
            body: { action: "read", filename: tex_source }
        }).then(res => {
            callback(res.text())
        })
        const texmaker_bat = "\"C:/Program Files (x86)/Texmaker/texmaker.exe\" " + config["latex-dir"] + basename + ".tex"

        fetch("/ajax/file-rw", {
            method: 'post',
            body: { action: "write", filename: "C:/batchs/OpenTex.bat", content: texmaker_bat }
        }).then(res => {
            console.log("OpenTex.bat : ")
            console.log(texmaker_bat)
        })

    }

    backup = (metas, content) => {
        const config = this.model.config
        const filename = config["latex-dir"] + metas["basename"] + ".tex";
        const start = new Date(2020, 1, 1);
        const now = new Date();
        const backupname = config["backup-dir"] + metas["basename"] + "-" + Math.floor((now.getTime() - start.getTime()) / 1000) + ".tex";
        this.write(filename, content)
        this.write(backupname, content)
        console.log(backupname)
    }

    transfert = (metas, input, output, dest = "local") => {
        // console.log(metas)
        // const config = this.model.config
        // const html_filename = config["latex-dir"] + metas["basename"] + ".htm";
        // if (dest == "local") {
        //     const content = output + "\n<!--texsrc\n" + input + "\ntexsrc-->"
        //     this.write(html_filename, content, () => {
        //         window.open(config["local-url"] + "pageadmin/mise-a-jour-article/?mode=html&filename=" + metas["basename"])
        //     })
        // } else {
        //     this.result = this.transfert_src(output)
        //     let content = output.replace(new RegExp("src=\"" + config["local-url"], "g"), "src=\"/")
        //     content += "\n<!--texsrc\n" + input + "\ntexsrc-->"
        //     this.write(html_filename, content, () => {
        //         const remote_filename = html_filename.replace(config["local-dir"], config["remote-dir"])
        //         console.log(remote_filename)
        //         this.transfert_ftp(html_filename, remote_filename, (res) => {
        //             console.log(res)
        //             console.log(config["remote-url"] + "pageadmin/mise-a-jour-article/?mode=html&filename=" + metas["basename"])
        //             window.open(config["remote-url"] + "pageadmin/mise-a-jour-article/?mode=html&filename=" + metas["basename"])
        //         })
        //     })
        // }
    }

    transfert_pdf = (metas) => {
        const config = this.model.config
        const pdf_filename = config["latex-dir"] + metas["basename"] + ".pdf";
        const remote_filename = pdf_filename.replace(config["local-dir"], config["remote-dir"])
        this.transfert_ftp(pdf_filename, remote_filename, (res) => {
            console.log(res)
            console.log(pdf_filename + " -> " + remote_filename)
        })
    }

    transfert_src = (content) => {
        const config = this.model.config
        const regex = new RegExp("src=\"" + config["psimg-url"] + "([^\"]*)\"", "g")
        let result = regex.exec(content)
        while (result) {
            const input_filename = config["psimg-dir"] + result[1]
            const output_filename = input_filename.replace(config["local-dir"], config["remote-dir"])
            this.transfert_ftp(input_filename, output_filename, (res) => {
                console.log(res)
            })
            result = regex.exec(content)
        }
    }

    transfert_ftp = (local, remote, callback = () => { }) => {
        fetch("/ajax/file-rw", {
            method: 'post',
            body: { action: "transfert", src: local, dest: remote, config: JSON.stringify(this.model.config) }
        }).then(res => {
            callback(res.text())
        })
    }
}
/**************************************************************************************************************************
 * @class Shortkeys
 *
*/

class Shortkeys {

    static maths = key => {
        const tbl = {
            cc: "\\mathbb{C} @",
            dd: "\\mathbb{D} @",
            nn: "\\mathbb{N} @",
            qq: "\\mathbb{Q} @",
            rr: "\\mathbb{R} @",
            zz: "\\mathbb{Z} @",
            curs: "\\mathscr{@} @",
            ga: "\\alpha @",
            ge: "\\epsilon @",
            gb: "\\beta @",
            gd: "\\delta @",
            gg: "\\gamma @",
            gD: "\\Delta @",
            gG: "\\Gamma @",
            gO: "\\Omega @",
            gF: "\\Phi @",
            gP: "\\Pi @",
            gS: "\\Sigma @",
            gl: "\\lambda @",
            gm: "\\mu @",
            go: "\\omega @",
            gf: "\\phi @",
            gp: "\\pi @",
            gq: "\\psi @",
            gr: "\\rho @",
            gs: "\\sigma @",
            gt: "\\theta @",
            "|->": " \\longmapsto @",
            "*": " \\times @",
            "=>": " \\Rightarrow @",
            oo: " \\infty @",
            "+oo": " +\\infty @",
            "-oo": " -\\infty @",
            ssi: " \\Leftrightarrow @",
            "~": " \\approx @",
            "<=": " \\leqslant @",
            ">=": " \\geqslant @",
            "!=": " \\neq @",
            "O/": " \\varnothing @",
            lim: " \\lim\\limits_{ @ \\rightarrow @ } @",
            limn: " \\lim\\limits_{ n \\rightarrow +\\infty } @",
            inter: " \\cap @",
            union: " \\cup @",
            "*": " \\times @",
            ".": " \\cdot @",
            "...": " \\cdots @",
            in: " \\in @",
            "!in": " \\notin @",
            inc: " \\subset @",
            pi: " \\pi @",
            cut: "$\\nosp$@",
            fr: "\\frac{ @ }{ @ } @",
            rc: "\\sqrt{ @ } @",
            cos: " \\cos @",
            ln: " \\ln @",
            sin: " \\sin @",
            tan: " \\tan @",
            "{": " \\left\\{ @ \\right\\} @",
            "\\": "\\backslash @",
            ang: " \\widehat{ @ } @",
            bar: " \\overline{ @ } @",
            "|": " \\left| @ \\right| @",
            "||": " \\lVert @ \\rVert @",
            "(": " \\left( @ \\right) @",
            "[": " \\left[ @ \\right] @",
            "[]": " \\left[ @~;~@ \\right] @",
            "][": " \\left] @~;~@ \\right[ @",
            "[[": " \\left[ @~;~@ \\right[ @",
            "]]": " \\left] @~;~@ \\right] @",
            "()": " \\left( @~;~@ \\right) @",
            vec: " \\overrightarrow{ @ } @",
            exp: " \\text{e}^{ @ } @",
            ex: " \\text{e}^{ x } @",
            int: " \\int_{@}^{@} @ \\text{d}@",
            sys:
                " \\left\\{ \\begin{matrix}  @  \\\\  @  \\\\  @   \\end{matrix} \\right. @",
            mat: " \\begin{pmatrix} @ \\\\ @ \\end{pmatrix} @",
            col2: " \\begin{multicols}{2}\n\\columnbreak\n\n @ \\end{multicols}@ ",
        }
        if (key in tbl) {
            return tbl[key]
        } else {
            return false
        }
    }

    static noMaths = key => {
        const tbl = {
            "": "\\\\@",
            "\\\\": "\\par@",
            "\\par": "\\medskip@",
            "\\medskip": "\\bigskip@",
            ":": String.fromCharCode(126) + ": @",
            ";": String.fromCharCode(126) + "; @",
            "_": "_{ @ } @",
            "^": "^{ @ } @",
            "%": "\\% @",
            bold: " \\textbf{@} @",
            width: 'style="width:4@0rem"',
            og: " \\og @ \\fg{} @",
            it: " \\textit{@} @",
            code: "\\begin{code}\n @ \n\\end{code}\n",
            note: "\\begin{note}\n @ \n\\end{note}\n",
            h2: "\\begin{h2} @ \\end{h2}\n",
            h3: "\\begin{h3} @ \\end{h3}\n",
            def: "\n\\cadre{bleu}{Définition}{ % id=d@ \n} % fin définition@",
            th: "\n\\cadre{rouge}{Théorème}{ % id=t@ \n} % fin théorème@",
            pr: "\n\\cadre{vert}{Propriété}{ % id=p@ \n} % fin propriété@",
            rem: "\n\\bloc{cyan}{Remarque}{ % id=r@ \n} % fin remarque@",
            ex: "\n\\bloc{orange}{Exemple}{ % id=e@ \n} % fin exemple@",
            py: "\n\\begin{lstlisting}[language=Python]\n@\n\\end{lstlisting}@",
            link: "\\mcLien{/@}{@})",
            pdficon: "\\imgsvg{pdf-icon}{0.1}% alt=\"pdf-icon\" style=\"width:2rem\" ",
            cen: "\n\\begin{center}\n@\n\\end{center}@",
            cor: "\n\\begin{corrige}\n@\n\\end{corrige}",
            "-l": "\n\\begin{itemize}[label=--]\n\\item\n@\n\\end{itemize}@",
            ul: "\n\\begin{itemize}\n\\item\n@\n\\end{itemize}@",
            al: "\n\\begin{enumerate}[label=\\alph*.]\n\\item\n@\n\\end{enumerate}@",
            alp: "[label=\\alph*.]@",
            ol: "\n\\begin{enumerate}\n\\item\n@\n\\end{enumerate}@",
            li: "\n\\item\n@",
            cut: "$\\nosp$@",
            ext: "\n\\begin{center}\n\\begin{extern}%alt=\"@\" style=\"width:40rem\"\n@\n\\end{extern}\n\\end{center}",
            img: "\n\\begin{center}\n\\img{@}{0.1}%alt=\"@\" style=\"width:40rem\"\n\\end{center}",
            svg: "\n\\begin{center}\n\\imgsvg{@}{0.3}% alt=\"@\" style=\"width:30rem\"\n\\end{center}",
            qv: "\n%---------------------------------------------\n\\intro{@}\n\\affirm{@}\n\\vrai{@}@",
            qf: "\n%---------------------------------------------\n\\intro{@}\n\\affirm{@}\n\\faux{@}@",
            tt: " \\texttt{@} ",
            ttp: " \\texttp{@} ",
            py: "\\begin{lstlisting}[language=Python]\n@\n\\end{lstlisting}@",
            table: "\\begin{tabularx}{0.8\\linewidth}{|*{3}{>{\\centering \\arraybackslash }X|}}%class=\"compact\" width=\"600\"\n     \\hline\n &   &  &   &   &  \n     \\\\ \\hline\n     &    &    &    &    &  \n     \\\\ \\hline\n     &   &   &   &  & \n     \\\\ \\hline\n\\end{tabularx}",
            t1: "\n   @",
            t2: "\n      @",
            t3: "\n         @",
            t4: "\n            @",
            "\\vrai{}": "\n\\vrai{\nC'est vrai.\n\\par\n@\n}",
            "\\vrai{}f": "\n\\faux{}@",
            "\\faux{}v": "\n\\vrai{}@",
            "\\faux{}": "\n\\faux{\nC'est faux.\n\\par\n@\n}",
            pdf: "\\imgsvg{pdf-icon}{0.1}% alt=\"pdf\" style=\"width:2rem\"\n\\mcLien{/assets/pdf/@.pdf}{Solution rédigée par @} ",
            tabvar: "%##\n% type=table; width=35; l3=20\n%--\n% x|   -\\infty   ~    \\frac{ 3 }{ 4 }   ~   4  ~   +\\infty \n% f'(x)|  ~       -               :0             +   :0   -     ~\n% f(x)|  +\\infty    \\          :0              /   :5   \\   -\\infty\n%--\n%##",
            tabvar2: "%##\n% type=table; width=35; l3=20; c7=2; c1=15\n%--\n% x|   -\\infty   ~    \\frac{ 3 }{ 4 }   ~   ~      9   ~    ~   +\\infty\n% f'(x)|  ~       -               :0             +    ~     :0    ~    -     ~\n% \\dfrac{\\text{e}^{x+1}-1}{x}|  +\\infty    \\     :0     /     +\\infty      ||   +\\infty     \\    -\\infty\n%--\n%##",
            tabsig: "%##\n% type=table; width=45; c1=30\n%--\n% x|   -\\infty   ~    \\frac{ 4 }{ 3 }   ~   3  ~   +\\infty \n% x-3|  ~       -               :        -   :0   +     ~\n% 4-3x|  ~       +               :0      -   :   -     ~\n% (x-3)(4-3x)|  ~    -       :0     +  :0   -   ~\n%--\n%##",
            tabsig2: "%##\n% type=table; width=40; c1=20; l4=15\n%--\n% x|   -\\infty   ~    \\frac{ 1 }{ 2 }   ~    \\frac{ 5 }{ 2 }   ~   +\\infty \n% 5-2x|  ~       +               :      +   :0   -     ~\n% 2x-1|  ~       -               :0     +  :   +     ~\n% \\dfrac{5-2x}{2x-1}|  ~    -       ||    +  :0   -   ~\n%--\n%##",
            arbre: "%##\n% type=arbre; width=25; wcell=3.5; hcell=1.5\n%--\n% >A:0,6\n% >>V:0,1\n% >>F:0,9\n% >\\overline{A}:0,4\n% >>V:0,8\n% >>F:0,2\n%--\n%##",
            fct: "%##\n% type=graphic;   width=30; \n% xmin=-4.5; xmax=4.5; ymin=-2.9; ymax=9.5; xunit=1; yunit=1\n%--\n%grid=1;subgriddiv=1\n%repere=0\n%axes=1\n%fct=x*x;linecolor=blue\n%fct=2*x-1;linecolor=red\n%text=\\blue \\mathscr{C}_f;pos=[t](3.5,9)\n%--\n%##",
            fct2: "%##\n% type=graphic;   width=30; \n% xmin=-4.5; xmax=4.5; ymin=-5.5; ymax=5.5; xunit=1; yunit=1\n%--\n%grid=1;subgriddiv=1\n%repere=0\n%axes=1\n%fct=1/x;linecolor=blue;def=\\xmin,-0.01\n%fct=1/x;linecolor=blue;def=0.01,\\xmax\n%fct=ln(x);linecolor=red;def=0.01,\\xmax\n%text=\\blue \\mathscr{C}_f;pos=[t](0.8,5)\n%--%##",
            geo: "%##\n% type=graphic; width=20; alt=\"Géométrie\"\n% xmin=.01; xmax=6; ymin=0.01; ymax=6; xunit=1; yunit=1\n%--\n%grid=0;subgriddiv=1\n%repere=0\n%axes=0\n%point=A(1,1)(.7,.7);linecolor=blue\n%point=B(5,1)(5.3,.7);linecolor=blue\n%point=C(5,5)(5.3,5.3);linecolor=blue\n%point=D(1,5)(.7,5.3);linecolor=blue\n%ligne=A,B,C,D,A\n%--\n%##",
            cube: "%##\n% type=graphic; width=25; alt=\"Cube\"\n% xmin=-.5; xmax=8; ymin=-.5; ymax=8; xunit=1; yunit=1\n%--\n%grid=0;subgriddiv=1\n%repere=0\n%axes=0\n%point=A(0,0)(-.3,0)\n%point=B(6,0)(6.4,0)\n%point=C(7,1)(7.3,1)\n%point=D(1,1)(.5,1)\n%point=E(0,6)(-.3,6)\n%point=F(6,6)(6.4,6)\n%point=G(7,7)(7.3,7)\n%point=H(1,7)(.5,7)\n%ligne=A,B,C\n%ligne=E,F,G,H,E\n%ligne=E,A\n%ligne=F,B\n%ligne=G,C\n%ligne=D,A;linestyle=dashed\n%ligne=D,C;linestyle=dashed\n%ligne=D,H;linestyle=dashed\n%--\n%##"
        }
        if (key in tbl) {
            return tbl[key]
        } else {
            return false
        }
    }

    static replaceShortkey = (input) => {
        const pos = input.selectionStart
        const deb_ligne = input.value.substring(0, pos).lastIndexOf("\n") + 1
        const deb_cmd = input.value.substring(deb_ligne, pos).trimEnd().lastIndexOf(" ") + deb_ligne + 1
        const cmd = input.value.substring(deb_cmd, pos)

        const fullTex = Shortkeys.fullTex(cmd, input)
        if (fullTex) {
            const pos_curs = fullTex.indexOf("@")
            input.value = input.value.substring(0, deb_cmd) + fullTex.replace("@", "") + input.value.substring(pos)
            input.selectionStart = deb_cmd + pos_curs
            input.selectionEnd = input.selectionStart
        }
    }

    static fullTex = (cmd, input) => {
        let result = "@"
        if (cmd.length == 1 && !Shortkeys.inMaths(input)) {
            result = "$" + cmd + "$ @"
        }
        else {
            result = Shortkeys.maths(cmd)
            if (result) {
                if (!Shortkeys.inMaths(input)) {
                    result = "$ " + result + " $"
                }
            }
            else {
                result = Shortkeys.noMaths(cmd)
                if (!result) {
                    result = cmd + " @"
                }
            }
        }

        return result
    }

    static inMaths = (input) => {
        const content = input.value.substring(0, input.selectionStart)
        const count = content.length - content.replace(/\$/g, "").length;
        return count % 2 == 1;
    }

}
/**************************************************************************************************************************
 * @class Macros
 *
*/

class Macros {

    static execMacro = (input) => {
        let pos = input.selectionStart
        let inputVal = input.value
        // inputVal = inputVal.substring(0, pos) + "¤" + input.value.substring(pos)
        // pos = inputVal.indexOf("¤")
        inputVal = Macros.traiteMacros(inputVal)
        //       inputVal = inputVal.replaceAll("¤", "")
        input.value = inputVal
        input.selectionStart = pos
        input.selectionEnd = pos
    }


    //=======================================================================================
    //  Traitement macros
    //=======================================================================================
    static traiteMacros = (input) => {
        //  Extrait les macros   
        const macros = input.split("%##")
        if (macros.length % 2 == 0) {
            return input
        }
        macros.forEach((item, i, macros) => {
            if (i % 2 == 1) {
                macros[i] = Macros.traiteUneMacro(item.trim())
            } else {
                macros[i] = item.trim()
            }
        })
        input = macros.join("\n%##\n")
        return input
    }

    static traiteUneMacro = (macro) => {
        // console.log(macro)
        const blocs = macro.split('%--')
        if (blocs.length != 3) {
            console.log("Erreur macro : manque section %--")
        } else {
            let vars = Macros.strToVars(blocs[0])
            const tikz = Macros.buildTikz(blocs[1], vars)
            macro = blocs[0].trim() + "\n%--\n" + blocs[1].trim() + "\n%--\n" + tikz.trim()
        }
        // console.log(macro)
        return macro
    }

    static strToVars = (text) => {
        text = text.replaceAll("%", ";").replaceAll(/(\n|\r|\s)/g, "")
        const assigns = text.split(';')
        let items = []
        const vars = {}
        let val = 0
        assigns.forEach((assign, i) => {
            items = assign.split("=")
            if (items.length == 2) {
                val = parseFloat(items[1])
                if (isNaN(val)) {
                    val = items[1]
                }
                vars[items[0]] = val
            }
        })
        // console.log(vars)
        return vars
    }

    static buildTikz = (blocLigne, vars) => {
        if (vars['type'] == 'table') {
            return Macros.buildTableTikz(blocLigne, vars)
        }
        if (vars['type'] == 'arbre') {
            return Macros.buildArbreTikz(blocLigne, vars)
        }
        if (vars['type'] == 'graphic') {
            console.log(vars)
            return Macros.buildGraphicTikz(blocLigne, vars)
        }

    }

    /**
     * 
     * Arbres
     * 
     */

    static splitArbreSource = (text) => {
        const items = text.trim().replaceAll(/(\s|%)/gm, "").replaceAll(">", "¦>").replaceAll(">¦", ">").split("¦")
        items.shift()
        console.log(items)
        let level = 0
        let prefix = 'r'
        let content = ''
        const arbre = { r: { content: '' } }
        items.forEach((item) => {
            if (item[level] == '>') { // on passe au niveau suivant
                prefix += 'a'
            } else { // on reste au même niveau ou on remonte                
                while (item[level] != '>') {
                    level = level - 1
                }
                prefix = prefix.substring(0, level + 1) + String.fromCharCode(prefix.charCodeAt(level + 1) + 1)
            }
            level += 1
            content = item.substring(level)
            arbre[prefix] = { content: content }
        })
        Macros.calcArbreTopBottom(arbre, 'r', 0)
        console.log(arbre)
        return arbre
    }

    static calcArbreTopBottom = (arbre, key, top) => {
        arbre[key]['top'] = top
        let bottom = top
        let childLetter = 'a'
        let next
        if (!(key + childLetter) in arbre) {
            arbre[key]['bottom'] = top
        } else {
            while ((key + childLetter) in arbre) {
                next = bottom + (childLetter == 'a' ? 0 : 1)
                bottom = Macros.calcArbreTopBottom(arbre, key + childLetter, next)
                childLetter = String.fromCharCode(childLetter.charCodeAt(0) + 1)
            }
            arbre[key]['bottom'] = bottom
        }
        return bottom
    }

    // static calculateArbreVars = (vars, lignes) => {

    // }

    static buildArbreTikz = (blocLigne, vars) => {
        const tikz = []
        tikz.push('\\begin{center}')
        tikz.push(' \\begin{extern}%style="width:' + (vars['width'] ? vars['width'] : '30') + 'rem" alt="Arbre pondéré"')
        tikz.push('    \\resizebox{11cm}{!}{')
        tikz.push('       \\definecolor{dark}{gray}{0.1}')
        tikz.push('       \\begin{tikzpicture}[scale=.8, line width=.5pt, dark]')
        tikz.push('       \\def\\width{' + (vars['wcell'] ? vars['wcell'] : '3') + '}')
        tikz.push('       \\def\\height{' + (vars['hcell'] ? vars['hcell'] : '1.5') + '}')
        tikz.push('       \\tikzstyle{noeud}=[fill=white,circle,draw]')
        tikz.push('       \\tikzstyle{poids}=[fill=white,font=\\footnotesize,midway]')
        const arbre = Macros.splitArbreSource(blocLigne)
        Macros.buildNodeArbreTikz(arbre, 'r', tikz)
        tikz.push('       \\end{tikzpicture}')
        tikz.push('      }')
        tikz.push('   \\end{extern}')
        tikz.push('\\end{center}')
        console.log(tikz)
        return tikz.join("\n")
    }

    static buildNodeArbreTikz = (arbre, key, tikz) => {
        const x = key.length
        const y = -(arbre[key]['top'] + arbre[key]['bottom']) / 2
        const content = arbre[key]['content'].split(':')
        const poids = content.length > 1 ? ' node [poids] {$' + content[1] + '$}' : ''
        tikz.push('    \\node[noeud] (' + key + ') at ({' + x + '*\\width},{' + y + '*\\height}) {$' + content[0] + '$};')
        if (key.length > 1) {
            tikz.push('     \\draw (' + key.substr(0, key.length - 1) + ') -- (' + key + ')' + poids + ';')
        }
        let childLetter = 'a'
        while ((key + childLetter) in arbre) {
            Macros.buildNodeArbreTikz(arbre, key + childLetter, tikz)
            childLetter = String.fromCharCode(childLetter.charCodeAt(0) + 1)
        }
    }

    /**
     * 
     * TABLES
     * 
     */

    static splitTableSource = (text) => {
        text = text.trim().replaceAll("\r", "").replaceAll("\n", "").replaceAll(/\s{2,}/g, "¦")
            .replaceAll("%¦", "%").replaceAll("¦%", "%").replaceAll("% ", "%").replaceAll(" %", "%")
        return text.split("%")
    }

    static calculateTableVars = (vars, lignes) => {
        vars['nblignes'] = lignes.length
        vars['nbcols'] = lignes[0].split("¦").length
        if (!('wcell' in vars)) {
            vars['wcell'] = 10
        }
        if (!('hcell' in vars)) {
            vars['hcell'] = 10
        }
        if (!('wsep' in vars)) {
            vars['wsep'] = 8
        }
        vars['xtabul'] = [0]
        vars['ytabul'] = [0]
        vars['xpos'] = []
        vars['ypos'] = []
        for (let i = 1; i <= vars['nbcols']; i++) {
            vars['xtabul'][i] = vars['xtabul'][i - 1] + ('c' + i.toString() in vars ? vars['c' + i.toString()] : ((i % 2 == 1) ? vars['wcell'] : vars['wsep']))
            vars['xpos'][i - 1] = (vars['xtabul'][i - 1] + vars['xtabul'][i]) * 0.5
        }
        for (let j = 1; j <= vars['nblignes']; j++) {
            console.log('l' + j.toString())
            console.log(vars['l' + j.toString()])
            vars['ytabul'][j] = vars['ytabul'][j - 1] - ('l' + j.toString() in vars ? vars['l' + j.toString()] : vars['hcell'])
            vars['ypos'][j - 1] = (vars['ytabul'][j - 1] + vars['ytabul'][j]) * 0.5
        }
        console.log(vars)
        return vars
    }

    static buildTableTikz = (blocLigne, vars) => {
        const tikz = []
        const fleches = []
        let cells = []
        let valigns = []
        let cell = ''
        let lignes = Macros.splitTableSource(blocLigne)
        lignes = lignes.filter(ligne => ligne != '')
        vars = Macros.calculateTableVars(vars, lignes)
        tikz.push('\\begin{center}')
        tikz.push(' \\begin{extern}%style="width:' + (vars['width'] ? vars['width'] : '30') + 'rem" alt="Exercice"')
        tikz.push('    \\resizebox{11cm}{!}{')
        tikz.push('       \\definecolor{dark}{gray}{0.1}')
        tikz.push('       \\definecolor{light}{gray}{0.8}')
        tikz.push('       \\tikzstyle{fleche}=[->,>=latex]')
        tikz.push('       \\begin{tikzpicture}[scale=.8, line width=.5pt, dark]')
        tikz.push('       \\def\\width{.15}')
        tikz.push('       \\def\\height{.10}')
        for (let i = 0; i < vars['nblignes']; i++) {
            for (let j = 0; j < vars['nbcols']; j++) {
                valigns[j] = vars['ypos'][i]
            }
            cells = lignes[i].split("¦")
            for (let j = 1; j < vars['nbcols']; j++) {
                cell = cells[j].trim()
                if (cell == "\\") {
                    valigns[j - 1] = (vars['ypos'][i] + vars['ytabul'][i]) / 2
                    valigns[j + 1] = (vars['ypos'][i] + vars['ytabul'][i + 1]) / 2
                }
                if (cell == "/") {
                    valigns[j - 1] = (vars['ypos'][i] + vars['ytabul'][i + 1]) / 2
                    valigns[j + 1] = (vars['ypos'][i] + vars['ytabul'][i]) / 2
                }
            }
            tikz.push('       \\draw (0, ' + vars['ytabul'][i + 1] + '*\\height) -- (' + vars['xtabul'][vars['nbcols']] + '*\\width, ' + vars['ytabul'][i + 1] + '*\\height);')
            for (let j = 0; j < vars['nbcols']; j++) {
                cell = cells[j].trim()
                console.log(cell)
                if (cell == "||") {
                    cell = "~"
                    tikz.push('       \\draw[double distance=2pt] (' + vars['xpos'][j] + '*\\width, ' + vars['ytabul'][i] + '*\\height) -- (' + vars['xpos'][j] + '*\\width, ' + vars['ytabul'][i + 1] + '*\\height);')
                }
                if (cell[cell.length - 1] == "|") {
                    cell = cell.substring(0, cell.length - 1)
                    tikz.push('       \\draw (' + vars['xtabul'][j + 1] + '*\\width, ' + vars['ytabul'][i] + '*\\height) -- (' + vars['xtabul'][j + 1] + '*\\width, ' + vars['ytabul'][i + 1] + '*\\height);')
                }
                if (cell[cell.length - 1] == "|") {
                    cell = cell.substring(0, cell.length - 1)
                    tikz.push('       \\draw (' + vars['xtabul'][j + 1] + '*\\width, ' + vars['ytabul'][i] + '*\\height) -- (' + vars['xtabul'][j + 1] + '*\\width, ' + vars['ytabul'][i + 1] + '*\\height);')
                }
                if (cell[0] == ":") {
                    cell = cell.substring(1)
                    tikz.push('       \\draw[light] (' + vars['xpos'][j] + '*\\width, ' + vars['ytabul'][i] + '*\\height) -- (' + vars['xpos'][j] + '*\\width, ' + vars['ytabul'][i + 1] + '*\\height);')
                }
                if (cell == "\\" || cell == "/") {
                    fleches.push('       \\draw[fleche] (l' + i + 'c' + (j - 1) + ') -- (l' + i + 'c' + (j + 1) + ');')
                    cell = "~"
                }
                tikz.push('       \\node (l' + i + 'c' + j + ') at (' + vars['xpos'][j] + '*\\width,' + valigns[j] + '*\\height) {' + '$ ' + cell + ' $' + '};')
            }
        }

        tikz.push('       \\draw (0, 0) rectangle (' + vars['xtabul'][vars['nbcols']] + '*\\width, ' + vars['ytabul'][vars['nblignes']] + '*\\height);')
        tikz.push(fleches.join("\n"))
        //  \draw[cadre] (\gauche,\lignex) -- (\droite,\lignex);
        tikz.push('       \\end{tikzpicture}')
        tikz.push('      }')
        tikz.push('   \\end{extern}')
        tikz.push('\\end{center}')
        return tikz.join("\n")
    }

    /**
     * 
     * Graphique
     * 
     */
    static splitGraphicSource = (text) => {
        const items = text.replaceAll(/(\n\r)/gm, "").split("%")
        items.forEach((item) => {
            item = item.trim()
        })
        let lines = []
        return lines
    }

    static buildGraphicTikz = (blocLigne, vars) => {
        const points = {}
        const tikz = []
        tikz.push('\\begin{center}')
        tikz.push(' \\begin{extern}%style="width:' + (vars['width'] ? vars['width'] : '30') + 'rem" alt="Fonction"')
        tikz.push('    \\resizebox{11cm}{!}{')
        tikz.push('       \\definecolor{dark}{gray}{0.1}')
        tikz.push('       \\definecolor{light}{gray}{0.8}')
        tikz.push('       \\def\\xmin{' + (vars['xmin'] ? vars['xmin'] : '-5') + '}')
        tikz.push('       \\def\\xmax{' + (vars['xmax'] ? vars['xmax'] : '5') + '}')
        tikz.push('       \\def\\ymin{' + (vars['ymin'] ? vars['ymin'] : '-5') + '}')
        tikz.push('       \\def\\ymax{' + (vars['ymax'] ? vars['ymax'] : '5') + '}')
        tikz.push('       \\def\\xunit{' + (vars['xunit'] ? vars['xunit'] : '1') + '}')
        tikz.push('       \\def\\yunit{' + (vars['yunit'] ? vars['yunit'] : '1') + '}')
        tikz.push('       \\psset{xunit=\\xunit, yunit=\\yunit, algebraic=true}')
        tikz.push('       \\fontsize{15pt}{15pt}\\selectfont')
        tikz.push('       \\begin{pspicture*}[linewidth=1pt](\\xmin,\\ymin)(\\xmax,\\ymax)')
        blocLigne.replaceAll("\r", "").replaceAll("\n", "").split("%").forEach((line) => {
            Macros.buildGraphicLine(line, tikz, points)
        })
        tikz.push('       \\end{pspicture*}')
        tikz.push('      }')
        tikz.push('   \\end{extern}')
        tikz.push('\\end{center}')
        return tikz.join("\n")
    }

    static buildGraphicLine = (line, tikz, points) => {
        let items = line.split(';')
        let keys = items.shift().split('=')
        if (keys.length < 2) {
            return
        }
        let key = keys[0].trim()
        let content = keys[1].trim()
        let params = {}
        items.forEach(item => {
            const it = item.split('=')
            if (it.length == 2) {
                params[it[0].trim()] = it[1].trim()
            }
        })

        console.log(content)
        if (key == 'grid' && content != '0') {
            let paramsString = Macros.getParamsString(params, { 'gridcolor': 'light', 'subgriddiv': '1', 'gridlabels': '0pt' })
            console.log(paramsString)
            tikz.push('       \\psgrid' + paramsString + '(\\xmin,\\ymin)(\\xmax,\\ymax)')
        }
        else if (key == 'axes' && content != '0') {
            tikz.push('       \\psaxes[linewidth=0.75pt,showorigin=false]{->}(0,0)(\\xmin,\\ymin)(\\xmax,\\ymax)')
            tikz.push('       \\rput(-0.5,-0.5){$O$}')
        }
        else if (key == 'point') {
            let paramsString = Macros.getParamsString(params, { 'dotsize': '2pt 0' })
            content = content.replaceAll(')', '(')
            const contents = content.replaceAll('((', '(').split('(')
            const color = ('linecolor' in params) ? '\\' + params['linecolor'] + ' ' : ''
            tikz.push('                    \\psdots' + paramsString + '(' + contents[1] + ')')
            tikz.push('       \\rput(' + contents[2] + '){$' + color + contents[0] + '$}')
            console.log(points)
            points[contents[0]] = contents[1]
        }
        else if (key == 'cercle') {
            let paramsString = Macros.getParamsString(params, { 'linecolor': 'dark' })
            tikz.push('                    \\pscircle' + paramsString + content)
        }
        else if (key == 'segment') {
            let paramsString = Macros.getParamsString(params, { 'linecolor': 'dark' })
            tikz.push('                    \\psline' + paramsString + content)
        }
        else if (key == 'ligne') {
            let paramsString = Macros.getParamsString(params, { 'linecolor': 'dark' })
            const contents = content.split(',')
            let orig = contents.shift()

            contents.forEach((point) => {
                tikz.push('                    \\psline' + paramsString + '(' + points[orig] + ')(' + points[point] + ')')
                orig = point
            })
        }
        else if (key == 'vecteur') {
            let paramsString = Macros.getParamsString(params, { 'linecolor': 'dark' })
            tikz.push('                    \\psline' + paramsString + '{->}' + content)
        }
        else if (key == 'text') {
            tikz.push('       \\rput' + params['pos'] + '{$' + content + '$}')
        }
        else if (key == 'repere' && content != '0') {
            tikz.push('       \\psline[linewidth=1.25pt]{->}(0,0)(0,1)')
            tikz.push('       \\psline[linewidth=1.25pt]{->}(0,0)(1,0)')
            tikz.push('       \\rput[t](0.5,-0.03){$\\overrightarrow{ i } $}')
            tikz.push('       \\rput[r](-0.03,0.5){$\\overrightarrow{j}$}')
        }
        else if (key == 'fct') {
            let def = '{\\xmin}{\\xmax}'
            if ('def' in params) {
                def = '{' + (params['def'].replace(',', '}{')) + '}'
                delete params['def']
            }
            let paramsString = Macros.getParamsString(params, { 'linewidth': '1pt', 'plotpoints': '2000', 'linecolor': 'dark' })
            tikz.push('       \\psplot' + paramsString + def + '{' + content + '}')
        }
    }
    static getParamsString = (params, defaut = {}) => {
        delete params['pos']
        let merged = { ...defaut, ...params };
        let result = []
        for (const key in merged) {
            if (merged.hasOwnProperty(key)) {
                result.push(key + "=" + merged[key]);
            }
        }
        if (result.length == 0) {
            return ''
        }
        return '[' + result.join(',') + ']'
    }

}

/**************************************************************************************************************************
 * @class Tex2Html
 *
 * convert input_tex to output_html
 */

class Tex2Html {
  constructor(model) {
    this.model = model
    this.extern_links = {}
    this.maths = []
    this.externs = []
    this.pythons = []
    this.tables = []
    this.externsTable = []
  }

  _findClosing(str, pos) {
    const closing = {
      "(": ")",
      "{": "}",
      "[": "]",
      "<": ">",
      "└": "┘",
      "┌": "┐"
    }
    const deb_char = str[pos]
    if (!(deb_char in closing)) {
      throw new Error(deb_char + " is not a start symbol ");
    }
    let depth = 1;
    const fin_char = closing[deb_char]
    for (let i = pos + 1; i < str.length; i++) {
      switch (str[i]) {
        case deb_char:
          depth++;
          break;
        case fin_char:
          if (--depth == 0) {
            return i;
          }
          break;
      }
    }
    alert(" No matching closing parenthesis : ..." + str.substring(pos - 6, pos + 1))
    return pos + 1;
  }

  _replace_cmd(cmd, replacement, texte) {
    console.log(cmd)
    let deb_cmd = texte.indexOf(cmd)
    while (deb_cmd >= 0) {
      let deb_param = deb_cmd + cmd.length - 1
      let fin_param = this._findClosing(texte, deb_param)
      let newtexte = texte.substring(0, deb_cmd) + replacement[0] + texte.substring(deb_param + 1, fin_param) + replacement[1]
      for (let i = 2; i < replacement.length; i++) {
        deb_param = fin_param + 1
        fin_param = this._findClosing(texte, deb_param)
        newtexte += texte.substring(deb_param + 1, fin_param) + replacement[i]
      }
      texte = newtexte + texte.substring(fin_param + 1)
      deb_cmd = texte.indexOf(cmd)
    }
    return texte
  }

  _traite_liste(texte) {
    const listes = ["└", "┌"];
    listes.forEach((char, i) => {
      let deb = 0
      while (deb >= 0) {
        deb = texte.indexOf(char)
        if (deb >= 0) {
          // console.log("deb : " + deb)
          let fin = this._findClosing(texte, deb)
          const deb_texte = texte.substring(0, deb)
          const fin_texte = texte.substring(fin + 1)
          const items = this._traite_liste(texte.substring(deb + 1, fin - 1)).split("\\item")
          // console.log(items)
          const head = items.shift().trim()
          const html_tag = (i == 0) ? "ol" : "ul"
          const html_class = (i == 0) ? (head.indexOf("label=\\alph") > 0 ? "question-alpha" : "question")
            : (head.indexOf("label=---") >= 0 ? "tiret" : "dot")
          const inner = "\n<li><p class=\"item\">" + items.join("</p></li>\n<li><p class=\"item\">") + "</p></li>"
          texte = deb_texte + "</p>\n<" + html_tag + " class=\"" + html_class + "\">" + inner
            + "\n</" + html_tag + ">\n<p>" + fin_texte;

          // console.log("fin : " + fin)
        }
      }
    })
    return texte
  }

  convert(input) {
    //  console.log("conversion")
    //  console.log("conversion input : " + input)
    input = this.pretraite(input)
    input = this.convertTexte(input)
    this.externs.forEach((extern, i) => {
      this.externs[i] = this.convertExtern(extern, i)
    })
    input = this.remplace("--e-x-t-e-r-n--", this.externs, input)
    this.maths.forEach((math, i, maths) => {
      maths[i] = this.convertMath(math)
    })
    input = this.remplace("--m-a-t-h-s--", this.maths, input)
    this.pythons.forEach((python, i, pythons) => {
      pythons[i] = this.convertPython(python)
    })
    input = this.remplace("--p-y-t-h-o-n--", this.pythons, input)
    input = this.posttraite(input)
    return input
  }

  remplace = (str, arr, res) => {
    arr.forEach(item => {
      res = res.replace(str, item)
    })
    return res
  }

  //=======================================================================================
  //  Traitement initial
  //=======================================================================================

  pretraite = (input) => {
    this.maths = []
    this.externs = []
    this.pythons = []
    this.tables = []

    // caractères échappés
    input = input.replace(/\\\$/g, "&#36;")


    // 	maths centré
    input = input.replace(/\\\[/g, "\\begin{center}$")
    input = input.replace(/\\\]/g, "$\\end{center}")

    //  Extrait la commande {extern}    
    input = input.replace(/\\begin{extern}/g, "\\end{extern}")
    const blocs_extern = input.split("\\end{extern}")
    blocs_extern.forEach((item, i, blocs_extern) => {
      if (i % 2 == 1) {
        this.externs.push(item)
        blocs_extern[i] = "--e-x-t-e-r-n--"
      }
    })
    input = blocs_extern.join("")

    //  Extrait la commande {lstlisting}[language=Python]
    input = input.replace(/\\begin{lstlisting}\[language=Python\]/g, "\\end{lstlisting}")
    const blocs_python = input.split("\\end{lstlisting}")
    blocs_python.forEach((item, i, blocs_python) => {
      if (i % 2 == 1) {
        this.pythons.push(item)
        blocs_python[i] = "--p-y-t-h-o-n--"
      }
    })
    input = blocs_python.join("")

    //  Extrait les formules de maths
    const blocs_maths = input.split("$")
    if (blocs_maths.length % 2 == 1) {
      blocs_maths.forEach((item, i, blocs_maths) => {
        if (i % 2 == 1) {
          this.maths.push(item)
          blocs_maths[i] = "--m-a-t-h-s--"
        }
      })
      input = blocs_maths.join("")
    }

    //  Convertit les tableaux
    input = input.replace(/\\begin{tabularx?}/g, "\\end{tabular}")
    input = input.replace(/\\end{tabularx}/g, "\\end{tabular}")
    const blocs_table = input.split("\\end{tabular}")
    blocs_table.forEach((item, i, blocs_table) => {
      if (i % 2 == 1) {
        blocs_table[i] = this.convertTable(item)
      }
    })
    input = blocs_table.join("")

    // ignoré
    input = input.replace(/\\(input|meta){.*/g, "")
    input = input.replace(/\\rule\[.*/g, "")
    input = input.replace(/\\begin{tex}(.|\\n)*?\\end{tex}/g, "")
    input = input.replace(/\\(begin|end){vbloc}\s*/g, "")


    // couleur 
    input = this._replace_cmd("\\textcolor{", ["<span style=\"color:", "\">", "</span>"], input)

    return input

  }
  posttraite = (input) => {
    //   input = input.replace(/%.*/g, "")
    if (this.model.config["site"] != "quiz") {
      input = "<p>" + input + "</p>"
    }
    input = input.replace(/<p>\s*<\/p>/g, "")
    return input.trim()
  }

  convertTexte = (texte) => {
    // paragraphes
    texte = texte.replace(/\\\\/g, "<br>")
    texte = texte.replace(/\\par|\\newpar/g, "</p>\n<p class=\"tex-par\">\n")
    texte = texte.replace(/\\newline/g, "<br>")
    texte = texte.replace(/\\(med|small|big)(skip|break)/g, "</p>\n<p class=\"$1skip\">")

    //boites

    texte = texte.replace(/\\begin{note}/g, "</p><div class=\"note\"><p>")
    texte = texte.replace(/\\end{note}/g, "</p></div><p>")

    texte = this._replace_cmd("\\mintxtbox{", ["</p>\n<span class=\"minbox\"><p>", "</p>\n</span><p>"], texte);

    texte = texte.replace(/\\boite{(.*)%(.*)/g, "\\cboite{$2}{$1")
    texte = texte.replace(/\\cadre{(.*)%(.*)/g, "\\ccadre{$2}{$1")
    texte = texte.replace(/\\bloc{(.*)%(.*)/g, "\\cbloc{$2}{$1")
    texte = this._replace_cmd("\\boite{", ["</p>\n<div class=\"boite boite-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);
    texte = this._replace_cmd("\\cadre{", ["</p>\n<div class=\"cadre cadre-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);
    texte = this._replace_cmd("\\bloc{", ["</p>\n<div class=\"bloc bloc-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);
    texte = this._replace_cmd("\\minbox{", ["<span class=\"minbox\">", "</span>"], texte);
    texte = this._replace_cmd("\\cboite{", ["</p>\n<div ", " class=\"boite boite-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);
    texte = this._replace_cmd("\\ccadre{", ["</p>\n<div ", " class=\"cadre cadre-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);
    texte = this._replace_cmd("\\cbloc{", ["</p>\n<div ", " class=\"bloc bloc-", "\">\n<h3>", "</h3>\n<p>", "</p>\n</div><p>"], texte);

    // liste
    texte = texte.replace(/\\begin{itemize}/g, "┌")
    texte = texte.replace(/\\end{itemize}/g, "┐")
    texte = texte.replace(/\\begin{enumerate}/g, "└")
    texte = texte.replace(/\\end{enumerate}/g, "┘")
    texte = this._traite_liste(texte)

    // style
    texte = this._replace_cmd("\\textbf{", ["<strong>", "</strong>"], texte)
    texte = this._replace_cmd("\\textit{", ["<em>", "</em>"], texte)
    texte = this._replace_cmd("\\texttt{", ["<span class=\"sans-serif\">", "</span>"], texte)
    texte = this._replace_cmd("\\texttp{", ["<span class=\"ss-python\">", "</span>"], texte)
    texte = this._replace_cmd("\\emph{", ["<em>", "</em>"], texte)
    //liens
    texte = this._replace_cmd("\\mcLien{", ["<a href=\"", "\" target=\"_blank\">", "</a>"], texte);
    texte = this._replace_cmd("\\Lien{", ["<a href=\"", "\" target=\"_blank\">", "</a>"], texte);

    //  svg externes
    texte = this._replace_cmd("\\svg-extern{", ["<img src=\"", ".svg\"", " alt=\"\" >"], texte);

    //images svg
    texte = this._replace_cmd("\\imgsvg{", ["<img src=\"" + "/assets/imgsvg/", ".svg\" data-eps=\"", "\" alt=\"imgsvg\" >"], texte);
    texte = texte.replace(/alt="imgsvg" >\s*%(.*)/g, "$1" + " >");

    // caractères spéciaux - espace
    texte = texte.replace(/\\%/g, "&#37;")
    texte = texte.replace(/%.*/g, "")
    texte = texte.replace(/&#37;/g, "%")
    texte = texte.replace(/\\(text)?backslash/g, "\\")
    texte = texte.replace(/\\nosp/g, "")
    texte = texte.replace(/\\`(A|E|I|O|U)/g, "&$1grave;")
    texte = texte.replace(/\\'(A|E|I|O|U)/g, "&$1acute;")
    texte = texte.replace(/(~|\\:|\\,)/g, "&nbsp;")
    texte = texte.replace(/(~|\\:|\\,)/g, "&nbsp;")
    texte = texte.replace(/\\euro({})?/g, "&euro;")
    texte = texte.replace(/\\degres({})?/g, "°")
    texte = texte.replace(/\\quad/g, "<span style=\"width:1.5em;\"><span>")
    texte = texte.replace(/\\(#|_)/g, "$1")
    texte = texte.replace(/\\newpage/g, "<hr>")
    texte = texte.replace(/\\og\s*/g, "&laquo;&nbsp;")
    texte = texte.replace(/\s*\\fg({})?/g, "&nbsp;&raquo;")

    //titres 
    texte = texte.replace(/\\begin{h([1-5])\}/g, "</p>\n<h$1>");
    texte = texte.replace(/\\end{h([1-5])\}/g, "</h$1>\n<p>");
    texte = texte.replace(/\\Partie{([^\}]*)\}/g, "<h2 class=\"center partie\">Partie $1</h2>");
    texte = texte.replace(/\\TitreC{([^\}]*)\}/g, "<h2 class=\"center partie\">$1</h2>");


    // balises
    texte = texte.replace(/\\begin{center}/g, "</p><div class=\"center\"><p>")
    texte = texte.replace(/\\begin{indent}/g, "</p><div class=\"indent\"><p>")
    texte = texte.replace(/\\begin{encadrer}/g, "</p><div class=\"center encadrer\"><p>")
    texte = texte.replace(/\\end{(center|indent|encadrer)}/g, "</p></div><p>")
    texte = texte.replace(/\\begin{corrige}/g, "</p><div class=\"volet\"><h2><a>Corrigé</a></h2><div><p>")
    texte = texte.replace(/\\begin{reponses}/g, "</p><div class=\"volet\"><h2><a>Réponses</a></h2><div><p>")
    texte = texte.replace(/\\begin{solution}/g, "</p><div class=\"volet\"><h2><a>Solution</a></h2><div><p>")
    texte = texte.replace(/\\end{(corrige|reponses|solution)}/g, "</p></div></div><p>")
    texte = texte.replace(/\\begin{code}\s*\n/g, "</p><code>")
    texte = texte.replace(/\s*\n\s*\\end{code}/g, "</code><p>")


    //overflow
    texte = texte.replace(/\\begin{overflow}/g, "<div style=\"overflow-x:auto;\">", texte);
    texte = texte.replace(/\\end{overflow}/g, "</div>", texte);
    
    //qcm
    texte = texte.replace(/§Q:/g, '<div class="qcm-item-q"></div>', texte);
    texte = texte.replace(/§S\+:/g, '<div class="qcm-item-sok"></div>', texte);
    texte = texte.replace(/§S-:/g, '<div class="qcm-item-snok"></div>', texte);
    texte = texte.replace(/§R:/g, '<div class="qcm-item-r"></div>', texte);

    //quiz		
    if (this.model.config["site"] == "quiz") {
      const hasExplic = !(texte.indexOf('vrai{}') > 0 || texte.indexOf('faux{}') > 0);
      const debfiche = '<div class="fiche fiche--sujet fiche--sujet-__numquest__" id="fiche--sujet-__numquest__">';
      const bullenum = '<div class="fiche__title"><span class="name">__classe__ - __name__</span><span class="numquest">__numquest__</span></div>';
      const intro = bullenum + '<div class="encadre"><div class="encadre__intro">';
      const affirm = '<div class="encadre__affirm">';
      const inaffirm = bullenum + '<div class="encadre"><div class="encadre__affirm">';
      const boutons_si_vrai = '<div class="boutons"><a class="bouton bouton--vrai bouton--ok ob-slide"><span>VRAI</span></a><a class="bouton bouton--faux bouton--nok ob-slide"><span>FAUX</span></a></div></div>';
      const boutons_si_faux = '<div class="boutons"><a class="bouton bouton--vrai bouton--nok ob-slide"><span>VRAI</span></a><a class="bouton bouton--faux bouton--ok ob-slide"><span>FAUX</span></a></div></div>';
      const debexplic = '<div class="fiche fiche--explic fiche--explic-__numquest__" id="fiche--explic-__numquest__">' + bullenum + '<div class="encadre"><div class="encadre__explic"><p>';
      const finexplic = '</p></div></div><div class="boutons"><a class="bouton bouton--enonce ob-slide"><span>Énoncé</span></a><a class="bouton bouton--next ob-slide"><span>Question suivante</span></a></div></div>';
      //const 	finexplic='</p></div></div><div class="boutons"><a class="bouton bouton--next ob-slide"><span>Question suivante</span></a></div></div>';
      const debenonce = '<div class="fiche fiche--enonce fiche--enonce-__numquest__" id="fiche--enonce-__numquest__">' + bullenum + '<div class="encadre">';
      const finenonce = '</div><div class="boutons"><a class="bouton bouton--explic bouton--reponse ob-slide"><span>Réponse</span></a><a class="bouton bouton--next ob-slide"><span>Question suivante</span></a></div></div>';
      const debreponse = '<div class="fiche fiche--reponse fiche--reponse-__numquest__" id="fiche--reponse-__numquest__">' + bullenum + '<div class="encadre">';
      const finreponse = '</div><div class="boutons"><a class="bouton bouton--explic ob-slide"><span>Explications</span></a><a class="bouton bouton--next ob-slide"><span>Question suivante</span></a></div></div>';
      texte = texte.replace(/\\intro{}\s*\\affirm\{/g, '\\inaffirm{');
      texte = this._replace_cmd("\\intro{", [debfiche + intro + '<p>', '</p></div>'], texte);
      texte = this._replace_cmd("\\affirm{", [affirm + '<p>', '</p></div></div>'], texte);
      texte = this._replace_cmd("\\inaffirm{", [debfiche + inaffirm + '<p>', '</p></div></div>'], texte);
      if (hasExplic) {
        texte = this._replace_cmd("\\vrai{", [boutons_si_vrai + debenonce + finenonce + debreponse + finreponse + debexplic, finexplic], texte);
        texte = this._replace_cmd("\\faux{", [boutons_si_faux + debenonce + finenonce + debreponse + finreponse + debexplic, finexplic], texte);
      } else {
        texte = this._replace_cmd("\\vrai{", [boutons_si_vrai + debreponse + finreponse, ''], texte);
        texte = this._replace_cmd("\\faux{", [boutons_si_faux + debreponse + finreponse, ''], texte);
        texte = texte.replace('<a class="bouton bouton--explic ob-slide"><span>Explications</span></a>', '');
      }
    }

    return texte
  }

  convertMath = (math) => {
    math = math.replace(/''/g, "^{\\prime \\prime}")
    math = math.replace(/'/g, "^{\\prime}")
    math = math.replace(/-/g, " - ")
    math = math.replace(/\\s*<\\s*/g, " &lt; ")
    math = math.replace(/\\s*>\\s*/g, " &gt; ")
    try {
      math = katex.renderToString(math, {
        displayMode: true
      });
    } catch (e) {
      if (e instanceof katex.ParseError) {
        console.log("Error KaTeX '" + math + "': " + e.message)
      } else {
        throw e;
      }
    }
    return "<span class=\"katex-wrapper\">" + math + "</span>"
  }

  convertPython = (python) => {
    let result = '<pre class="language-python line-numbers" tabindex="0"><code class="language-python">'
    result += Prism.highlight(python.trim(), Prism.languages.python, 'python')
    result += '<span aria-hidden="true" class="line-numbers-rows">'
    console.log('python')
    console.log(python)
    const nblig = (python.trim() + "\n").match(/\n/g).length
    for (let i = 0; i < nblig; i++) {
      result += '<span></span>'
    }
    result += '</span></code></pre>'
    return result
  }

  convertExtern = (extern, i) => {
    if (this.externsTable.length > i) {
      return "<div class=\"extern\" id=\"ext-" + i + "\">" + this.externsTable[i] + "</div>"
    }
    else {
      return "<div class=\"extern\" id=\"ext-" + i + "\"><img src=\"/assets/img/loader.gif\" style=\"width:3rem; display:block; margin:0 auto\" ></div>"
    }
  }

  drawExtern = (input, callback) => {
    let formData = new FormData();
    formData.append('input', input);
    formData.append('metas', JSON.stringify(this.model.getFileMetas()));
    fetch("/ajax/get-psimg", {
      method: 'post',
      body: formData
    }).then(res => {
      res.text(res).then(text => {
        this.externsTable = text.split('|')
        callback(input);
      })
    })

  }

  convertTable = (content) => {
    content = content.replace(/&/gs, '|')
    content = content.replace(/(\\\\|\n\\hline|\\hline|<br>)/gs, '')
    content = content.replace(/\n(\s*\n)*/gs, "\n")
    const lines = content.split("\n");
    const styles = lines.shift().split("%")
    const style = (styles.length > 1) ? styles[1] : ""
    let result = '<div style="overflow-x:auto;"><table ' + style + '>';
    lines.forEach(line => {
      if (line.indexOf('|') >= 0) {
        result += '<tr>';
        const cells = line.trim().split('|');
        cells.forEach(cell => {
          result += '<td>' + cell + '</td>';
        })
        result += "</tr>\n";
      }
    })
    return result + "</table></div>"
  }
}


/**************************************************************************************************************************
 * @class EditModel
 *
 * Manages the data of the application.
 */

class EditModel {
  constructor() {
    this.config = this.getConfig()
    this.aide_visible = false;
    this.metas = {}
    this.backup = '';
    this.input = '';
    this.output = '';
    this.pos = 0;
    this.selection = { start: 0, end: 0 };
    this.file_rw = new FileRw(this);
    this.tex2html = new Tex2Html(this);
    this.modelChangedObserver = [];
  }

  getConfig = () => {
    const config = {}
    const url = new URL(window.location.href);
    config["basename"] = url.searchParams.get("file");
 //   config["site"] = (config["basename"].substring(0, 4) == "quiz") ? "quiz" : "mc"
    config["ftp_server"] = "ftp.cluster026.hosting.ovh.net"
    config["ftp_id"] = "mathscoukj"
    config["ftp_pw"] = "f2T6ybtmdps"
    config["local-url"] = "http://newmc.test/"
    config["remote-url"] = "https://maths-cours.ovh/"
    config["local-dir"] = "C:/laragon/www/newmc/"
    config["remote-dir"] = "/www/"
    config["content-dir"] = config["local-dir"] + "assets/"
    config["content-url"] = config["local-url"] + "assets/"

    config["uploads-dir"] = config["content-dir"] + "uploads/"
    config["latex-dir"] = config["content-dir"] + "latex/"
    // config["psimg-dir"] = config["latex-dir"] + "psimg/"
    config["backup-dir"] = config["latex-dir"] + "backup/"
    // config["pdf-dir"] = config["uploads-dir"] + "pdf/"
    // config["uploads-url"] = config["content-url"] + "uploads/"
    // config["latex-url"] = config["uploads-url"] + "latex/"
    // config["psimg-url"] = config["latex-url"] + "psimg/"
    // config["pdf-url"] = config["uploads-url"] + "pdf/"
    return config
  }

  setModelChangedObserver = observer => {
    this.modelChangedObserver.push(observer);
  }

  modelChanged = () => {
    this.modelChangedObserver.forEach(observer => {
      observer(this.getData())
    })
  }

  getData = () => {
    return {
      aide_visible: this.aide_visible,
      metas: this.metas,
      input: this.input,
      output: this.output,
      selection: this.selection,
    };
  }

  inputChanged = (input) => {
    console.log("inputChanged");
    //    console.log(input);
    this.input = input;
    this.output = this.tex2html.convert(this.input);
    this.modelChanged();
  }

  externDraw = (input) => {
    //   console.log(input)
    this.tex2html.externsTable = []
    this.inputChanged(input)
    this.tex2html.drawExtern(input, this.inputChanged);
    //    this.modelChanged();
  }

  toggleAide = () => {
    console.log('toggleAide')
    this.aide_visible = !this.aide_visible;
    this.data_changed['action'] = 'toggleAide';
    this.modelChanged();
  }

  getFileMetas() {
    const matches = this.input.match(/\\meta({.*)/g)
    let metas = {}
    matches.forEach(match => {
      const items = match.split('{')
      metas[items[1].substring(0, items[1].length - 1)] = items[2].substring(0, items[2].length - 1)
    })
    metas['slug'] = metas['url'].split("/")[2]
    metas['basename'] = metas['type'] + "_" + metas['slug']
    return metas
  }

  doBackup = () => {
    if (this.backup != this.input) {
      console.log("backup model")
      this.backup = this.input
      this.file_rw.backup(this.getFileMetas(), this.input)
    }
  }

  transfert = () => {
    this.file_rw.transfert(this.getFileMetas(), this.input, this.output, "remote")
  }

  transpdf = () => {
    console.log(" transpdf")
    this.file_rw.transfert_pdf(this.getFileMetas())
  }

  transdev = () => {
    this.file_rw.transfert(this.getFileMetas(), this.input, this.output, "local")
  }

  transquiz = () => {
    console.log('transquiz')
  }

  translistquiz = () => {
    console.log('translistquiz')
  }

  cremodel = () => {
    console.log('cremodel')
  }

  models = () => {
    console.log('models')
  }
}




/**************************************************************************************************************************
 * @class EditInputView
 *
 * I/O User input management & Visual representation of the model.
 */


class EditInputView {

    constructor() {
        this._input = $id("source")
        this.initEventListener()
        // this._input.addEventListener('scroll', e => {
        //   console.log("scroll")
        //   this.scrollOutput()
        // })
    }

    start = () => {
        this.inputChangedHandler(this._input.value)
        this.externDrawHandler(this._input.value)
    }

    initEventListener = () => {
        // evenements internes à la vue
        $id('fullscreen').addEventListener("click", e => {
            document.body.classList.toggle('fullscreen')
        })
        // evenements observés par le controller
        this._input.addEventListener('keydown', e => {
            if (e.code == "Tab") {
                this.nextTab()
                e.preventDefault()
                this.inputChangedHandler(this._input.value)
            }
            if (e.code == "F12") {
                e.preventDefault()
                this.externDrawHandler(this._input.value)
            }
            if (e.key == "$") {
                this.insertAtCaret("$  $", 2)
                e.preventDefault()
                this.inputChangedHandler(this._input.value)
            }
            if (e.code == "Backquote") {
                e.preventDefault()
                e.stopPropagation()
                Shortkeys.replaceShortkey(this._input)
                this.inputChangedHandler(this._input.value)
            }
        })
        this._input.addEventListener('input', e => {
            Macros.execMacro(this._input)
            this.inputChangedHandler(this._input.value)
        })
    }

    setInputChangedHandler = (handler) => {
        this.inputChangedHandler = handler
    }

    setExternDrawHandler = (handler) => {
        this.externDrawHandler = handler
    }

    nextTab = () => {
        const i = this._input
        const pos = i.selectionStart
        const next_pos = i.value.indexOf("@", pos)
        if (next_pos < 0) {
            i.value = i.value.substring(0, pos) + '   ' + i.value.substring(pos)
            i.selectionStart = pos + 3
            i.selectionEnd = pos + 3
        } else {
            i.value = i.value.substring(0, next_pos) + i.value.substring(next_pos + 1)
            i.selectionStart = next_pos
            i.selectionEnd = next_pos
        }
    }

    insertAtCaret = (data, delta) => {
        const i = this._input
        const pos = i.selectionStart
        i.value = i.value.substring(0, pos) + data + i.value.substring(pos)
        i.selectionStart = pos + delta
        i.selectionEnd = pos + delta
    }
}



/********************************************************************************
 * @class EditOutputView
 *
 * I/O User input management & Visual representation of the model.
 */


class EditOutputView {
    constructor() {
        this._output = $id("html_content")
        this._text = $id("text-content")
    }

    modelChanged = (data) => {
        this._output.innerHTML = data.output
        this._text.innerHTML = data.output
    }

    // scrollOutput = () => {
    //   const scrollPercent = (this._input.scrollTop / (this._input.scrollHeight - this._input.clientHeight))
    //   if (scrollPercent < .9) {
    //     this._output.scrollTop = scrollPercent * (this._output.scrollHeight - this._input.clientHeight)
    //   } else {
    //     this._output.scrollTop = 10000
    //   }
    // }
}



/*************************************************************************************
 * @class EditController
 *
 * Links the View and the Model
 *
 */


class EditController {
  constructor() {
    this.model = new EditModel();
    this.inputView = new EditInputView();
    this.outputView = new EditOutputView();

    // this.onModelChanged = () => this.inputView.modelChanged(this.model.getData());
    //this.getViewInput = () => this.inputView.getInput();

   // this.model.bindModelChanged(() => this.inputView.modelChanged(this.model.getData()));

    this.model.setModelChangedObserver(this.modelChanged);

    this.inputView.setInputChangedHandler(this.inputChanged);
    this.inputView.setExternDrawHandler(this.externDraw);

    this.inputView.start();
    window.setInterval(() => {
      this.model.doBackup()
    },
      30000);
  }

  inputChanged = (input) => {
    this.model.inputChanged(input)
  }

  externDraw = (input) => {
    this.model.externDraw(input)
  }

  modelChanged = (data) => {
    this.outputView.modelChanged(data)
  }
  
}

/**************************************************************************************************************************
 * @class Batch
 *
 * Batch
 *
 */


class Batch {


    constructor() {
        this.i_post = 0;
        $id("batch").addEventListener("click", e => {
            e.stopPropagation()
            e.preventDefault()
            this.batch_handler()
        })
    }

    batch_handler = () => {
        // console.log(post_ids)
        let post_keys = JSON.parse(post_ids);
        //  console.log(post_keys)
        fetch("/ajax/get-post/" + post_keys[this.i_post]['id'], {
            method: 'get'
        }).then(res => {
            return res.text().then(text => {
                console.log(text)
                this.i_post += 1
            })
        })
    }
}



/**************************************************************************************************************************
 * @class List
 *
 * List
 *
 */


class List {


    constructor() {
        $id("select-list").addEventListener("click", e => {
            e.stopPropagation()
            e.preventDefault()
            this.list_handler()
        })
    }

    list_handler = () => {
        // console.log(post_ids)
        //         http://newmc.test/admin/posts/list/category/cours
        //         var e = document.getElementById("ddlViewBy");
        // var strUser = e.value;
        let query = ''
        let category = $id('category').value
        if (category != 'all') {
            query += '/category/' + category;
        }
        let classe = $id('classe').value
        if (classe != 'all') {
            query += '/classe/' + classe;
        }
        let status = $id('status').value
        if (status != 'all') {
            query += '/status/' + status;
        }
        window.location.href = '/admin/posts/list' + query
    }
}


/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism&languages=python&plugins=line-numbers */
/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /\blang(?:uage)?-([\w-]+)\b/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		//		manual: _self.Prism && _self.Prism.manual,
		manual: true,
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element && !lang.test(element.className)) {
					element = element.parentElement;
				}
				if (element) {
					return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
				}
				return 'none';
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */
;
Prism.languages.python = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true
	},
	'string-interpolation': {
		pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'function': {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: true
	},
	'class-name': {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: true
	},
	'decorator': {
		pattern: /(^\s*)@\w+(?:\.\w+)*/im,
		lookbehind: true,
		alias: ['annotation', 'punctuation'],
		inside: {
			'punctuation': /\./
		}
	},
	'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	'boolean': /\b(?:True|False|None)\b/,
	'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
	'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;

Prism.languages.py = Prism.languages.python;

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	/**
	 * Plugin name which is used as a class name for <pre> which is activating the plugin
	 *
	 * @type {string}
	 */
	var PLUGIN_NAME = 'line-numbers';

	/**
	 * Regular expression used for determining line breaks
	 *
	 * @type {RegExp}
	 */
	var NEW_LINE_EXP = /\n(?!$)/g;


	/**
	 * Global exports
	 */
	var config = Prism.plugins.lineNumbers = {
		/**
		 * Get node for provided line number
		 *
		 * @param {Element} element pre element
		 * @param {number} number line number
		 * @returns {Element|undefined}
		 */
		getLine: function (element, number) {
			if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
				return;
			}

			var lineNumberRows = element.querySelector('.line-numbers-rows');
			if (!lineNumberRows) {
				return;
			}
			var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
			var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

			if (number < lineNumberStart) {
				number = lineNumberStart;
			}
			if (number > lineNumberEnd) {
				number = lineNumberEnd;
			}

			var lineIndex = number - lineNumberStart;

			return lineNumberRows.children[lineIndex];
		},

		/**
		 * Resizes the line numbers of the given element.
		 *
		 * This function will not add line numbers. It will only resize existing ones.
		 *
		 * @param {HTMLElement} element A `<pre>` element with line numbers.
		 * @returns {void}
		 */
		resize: function (element) {
			resizeElements([element]);
		},

		/**
		 * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
		 * the current viewport.
		 *
		 * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
		 *
		 * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
		 *
		 * @type {boolean}
		 */
		assumeViewportIndependence: true
	};

	/**
	 * Resizes the given elements.
	 *
	 * @param {HTMLElement[]} elements
	 */
	function resizeElements(elements) {
		elements = elements.filter(function (e) {
			var codeStyles = getStyles(e);
			var whiteSpace = codeStyles['white-space'];
			return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
		});

		if (elements.length == 0) {
			return;
		}

		var infos = elements.map(function (element) {
			var codeElement = element.querySelector('code');
			var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
			if (!codeElement || !lineNumbersWrapper) {
				return undefined;
			}

			/** @type {HTMLElement} */
			var lineNumberSizer = element.querySelector('.line-numbers-sizer');
			var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

			if (!lineNumberSizer) {
				lineNumberSizer = document.createElement('span');
				lineNumberSizer.className = 'line-numbers-sizer';

				codeElement.appendChild(lineNumberSizer);
			}

			lineNumberSizer.innerHTML = '0';
			lineNumberSizer.style.display = 'block';

			var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
			lineNumberSizer.innerHTML = '';

			return {
				element: element,
				lines: codeLines,
				lineHeights: [],
				oneLinerHeight: oneLinerHeight,
				sizer: lineNumberSizer,
			};
		}).filter(Boolean);

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var lines = info.lines;
			var lineHeights = info.lineHeights;
			var oneLinerHeight = info.oneLinerHeight;

			lineHeights[lines.length - 1] = undefined;
			lines.forEach(function (line, index) {
				if (line && line.length > 1) {
					var e = lineNumberSizer.appendChild(document.createElement('span'));
					e.style.display = 'block';
					e.textContent = line;
				} else {
					lineHeights[index] = oneLinerHeight;
				}
			});
		});

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var lineHeights = info.lineHeights;

			var childIndex = 0;
			for (var i = 0; i < lineHeights.length; i++) {
				if (lineHeights[i] === undefined) {
					lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
				}
			}
		});

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var wrapper = info.element.querySelector('.line-numbers-rows');

			lineNumberSizer.style.display = 'none';
			lineNumberSizer.innerHTML = '';

			info.lineHeights.forEach(function (height, lineNumber) {
				wrapper.children[lineNumber].style.height = height + 'px';
			});
		});
	}

	/**
	 * Returns style declarations for the element
	 *
	 * @param {Element} element
	 */
	function getStyles(element) {
		if (!element) {
			return null;
		}

		return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);
	}

	var lastWidth = undefined;
	window.addEventListener('resize', function () {
		if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
			return;
		}
		lastWidth = window.innerWidth;

		resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.' + PLUGIN_NAME)));
	});

	Prism.hooks.add('complete', function (env) {
		if (!env.code) {
			return;
		}

		var code = /** @type {Element} */ (env.element);
		var pre = /** @type {HTMLElement} */ (code.parentNode);

		// works only for <code> wrapped inside <pre> (not inline)
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		// Abort if line numbers already exists
		if (code.querySelector('.line-numbers-rows')) {
			return;
		}

		// only add line numbers if <code> or one of its ancestors has the `line-numbers` class
		if (!Prism.util.isActive(code, PLUGIN_NAME)) {
			return;
		}

		// Remove the class 'line-numbers' from the <code>
		code.classList.remove(PLUGIN_NAME);
		// Add the class 'line-numbers' to the <pre>
		pre.classList.add(PLUGIN_NAME);

		var match = env.code.match(NEW_LINE_EXP);
		var linesNum = match ? match.length + 1 : 1;
		var lineNumbersWrapper;

		var lines = new Array(linesNum + 1).join('<span></span>');

		lineNumbersWrapper = document.createElement('span');
		lineNumbersWrapper.setAttribute('aria-hidden', 'true');
		lineNumbersWrapper.className = 'line-numbers-rows';
		lineNumbersWrapper.innerHTML = lines;

		if (pre.hasAttribute('data-start')) {
			pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
		}

		env.element.appendChild(lineNumbersWrapper);

		resizeElements([pre]);

		Prism.hooks.run('line-numbers', env);
	});

	Prism.hooks.add('line-numbers', function (env) {
		env.plugins = env.plugins || {};
		env.plugins.lineNumbers = true;
	});

}());



if (document.readyState !== "loading") {
    doc_ready();
  } else {
    document.addEventListener("DOMContentLoaded", doc_ready);
  }
  
  function doc_ready() {
    if(loadModule.indexOf('edit') != -1) {
      new EditController();
    }
    if(loadModule.indexOf('batch') != -1) {
      new Batch();
    }
    if(loadModule.indexOf('list') != -1) {
      new List();
    }
  }