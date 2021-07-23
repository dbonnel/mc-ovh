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