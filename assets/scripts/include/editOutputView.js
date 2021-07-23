
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

