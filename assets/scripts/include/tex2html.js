
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
    texte = texte.replace(/\\begin{margeneg}/g, "</p><div class=\"margeneg\"><p>")
    texte = texte.replace(/\\end{margeneg}/g, "</p></div><p>")

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