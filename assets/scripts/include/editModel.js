

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


