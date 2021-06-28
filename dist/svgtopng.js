"use strict";
/**
 * SvgToPng 1.1.6
 * License : MIT
 * Author : EXIzT
 */
class SvgToPng {
    _presets;
    _currentPreset;
    _canvasContainerId = '';
    _presetId = '';
    constructor(options) {
        this._canvasContainerId = options.canvasContainerId;
    }
    /**
     * presets를 셋팅하고 canvas를 draw함.
     */
    loadPresetWithDraw(presets) {
        // console.log(presets)
        this._presets = presets;
        // 첫번째 항목을 선택 및 드로우
        this._presetId = Object.keys(this._presets)[0];
        this.createWithDrawCanvas(this._presetId);
    }
    /**
    * Canvas를 생성하고 drawing을 하는 메서드
    */
    createWithDrawCanvas(presetId) {
        this._presetId = presetId;
        // 프리셋에서 지정한 걸로 대체
        this._currentPreset = this._presets[presetId];
        // cavnas elements를 생성함
        this.createCanvasElements();
        var canvasList = document.getElementsByTagName('canvas');
        for (var i = 0; i < canvasList.length; i++) {
            this.drawCanvas2(canvasList[i]);
        }
    }
    redraw() {
        if (this._presetId) {
            this.createWithDrawCanvas(this._presetId);
        }
        else {
            this._presetId = Object.keys(this._presets)[0];
            this.createWithDrawCanvas(this._presetId);
        }
    }
    /**
    * container 안에 빈 canvas elements들을 생성함
    */
    createCanvasElements() {
        let container = document.getElementById(this._canvasContainerId);
        container.innerHTML = "";
        // 변환할 사이즈 종류
        let sizes = this._currentPreset.sizes;
        for (var i in sizes) {
            this.createCanvasElement(sizes[i]);
        }
    }
    /**
    * 하나의 Canvas를 생성하는 메서드
    */
    createCanvasElement(size) {
        var container = document.getElementById(this._canvasContainerId);
        let html = `<div class="wrap-canvas"><canvas id="canvas-${size}" width="${size}" height="${size}"></canvas><br>${size}px</div>`;
        container.insertAdjacentHTML('beforeend', html);
    }
    /**
    * svg를 canvas에 그리는 메서드.
    */
    drawCanvas2(canvas) {
        var ctx = canvas.getContext("2d");
        // 배경에 적용할 svg
        let backgroundSvg = this._currentPreset.backgroundSvg;
        // 내용에 적용할 svg
        let foregroundSvg = this._currentPreset.foregroundSvg;
        if (backgroundSvg == null) {
            //console.log("only foreground")
            // 내용만 드로잉
            drawForeground();
        }
        else {
            //console.log("background with foreground")			
            // 배경 드로잉 후 내용 드로잉
            var bg = new Image();
            bg.src = backgroundSvg;
            bg.onload = function () {
                //ctx.fillStyle = "orange";
                //ctx.drawImage(img, 0, 0, 128, 128);
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                //var png = canvas.toDataURL("image/png");
                //document.querySelector(pngContainerSelector).innerHTML = '<img src="'+png+'"/>';
                //DOMURL.revokeObjectURL(png);
                drawForeground();
            };
        }
        function drawForeground() {
            var foreground = new Image();
            //let foregroundSvg = this._currentPreset.foregroundSvg
            foreground.src = foregroundSvg;
            foreground.onload = function () {
                //ctx.fillStyle = "orange";
                //ctx.drawImage(img, 0, 0, 128, 128);
                ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);
                //var png = canvas.toDataURL("image/png");
                //document.querySelector(pngContainerSelector).innerHTML = '<img src="'+png+'"/>';
                //DOMURL.revokeObjectURL(png);
            };
        }
    }
    /**
    * 다운로드 메서드
    * 생성되어있는 canvas를 탐색해서 png로 다운로드 받는다.
    */
    downloadPng() {
        if (location.protocol == "file:") {
            alert("웹 서버에서 동작된 경우에만 PNG 일괄 다운로드가 가능합니다 (브라우저 권한 이슈");
            return;
        }
        var canvasList = document.getElementsByTagName('canvas');
        let filenameRule = this._currentPreset.filename;
        for (var i = 0; i < canvasList.length; i++) {
            download(canvasList[i].id, canvasList[i].width);
        }
        function download(canvasId, size) {
            var link = document.createElement('a');
            //var filename = canvasId+'.png';
            //var filename = `canvas-${size}`+'.png';
            // let filenameRule = this._currentPreset.filename
            var filename = formatUnicorn(filenameRule, { "size": size });
            link.download = filename;
            //console.log(filename)
            link.href = document.getElementById(canvasId).toDataURL("image/png");
            link.click();
        }
        /**
         * https://gist.github.com/richardblondet/9a23a155e6a784f1ff2cbd8d84accd72
         */
        function formatUnicorn(rule, args) {
            var str = rule;
            for (const key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
            return str;
        }
    }
}
