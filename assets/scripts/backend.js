
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