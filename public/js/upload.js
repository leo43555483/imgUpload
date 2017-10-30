     let view = require('./domView.js');
     const $ = require('jquery');
         module.exports = function(){
         class PhotoUpload {
            constructor(v, control){
                let viewParams = {
                inputFile: null,
                dragDrop: null,
                submitBtn: null,
            }

            let controlParams = {
                filter: function(file) {
                    return file
                }

            }
            console.log(v.inputFile)

            this.domCount = 0; //缓存Dom数
            this.control = $.extend(true,controlParams,control); //筛选照片等方法 
            this.views = $.extend(true,viewParams,v); //关于DOM的相参数
            this.fileArray = []; //存放待上传的照片
            this.dragDrop = this.views.dragDrop;
            this.init();
            console.log(this.views)
            }

            init(){
                let self = this;
                console.log(this.views.inputFile)
                if (this.views.inputFile) {
                    this.views.inputFile.on("change", function(e) {
                        console.log(e)
                        self.getFiles(e);
                    });
                }
                if (this.views.submitBtn) {
                    this.views.submitBtn.on("click", function(e) {

                    })
                }
            }

             dropEvent(e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                let type = e.type === "dragover" ? "onDragOver" : "onDragLeave";
                e.target[type];
                return this
            }

            delete(e, j) {
                let temArr = [];
                let targetFile = this.fileArray[j];
                let k = 0;
                for (let i = 0; i < this.fileArray.length; i++) {
                    if (this.fileArray[i] !== targetFile) {
                        this.fileArray[i].index = k;
                        temArr.push(this.fileArray[i]);
                        k++
                        console.log(this.fileArray[i])
                    } else {
                        this.fileArray[i].index = k;
                    }
                }

                this.fileArray = temArr;
                console.log(this.fileArray)
            }

            getFiles(e) {
                e = e || window.event;
                if (e.type !== "change") {
                    this.dropEvent(e);
                }

                let self = this;
                let file = e.target.files || e.dataTransfer.files;
                let len = this.fileArray.length;
                let target = e.target;
                let finalfile = this.control.filter(file);
                this.opreatfile(finalfile, len);
                this.views.selected(finalfile, target, this);
            }

            opreatfile(file, arrLen) {
                let len = arrLen;
                for (let i = 0; i < file.length; i++) {
                    if (!file[i].hasOwnProperty("index")) {
                        file[i].index = len + i
                        this.fileArray.push(file[i]);
                    }
                }
            }
            
        }
        
    return new PhotoUpload(view,{})
    }

