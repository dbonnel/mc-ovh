
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

