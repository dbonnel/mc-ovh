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