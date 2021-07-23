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