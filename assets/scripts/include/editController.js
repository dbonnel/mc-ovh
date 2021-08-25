
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
      300000);
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