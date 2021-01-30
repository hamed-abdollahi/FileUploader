Getting Started With Multiple FileUploader in Mvc
===================================

This File Uploader can help you to upload and send multiple files to server simultaneously.
![](https://github.com/hamed-abdollahi/FileUploader/blob/main/2.png)


## Prerequisites
* .Javascript
* .Net Mvc
* Sql Server

## Usage
* Add this tags to your html page whatewere you want
```
<style>
    .imgType {
        cursor: default;
        z-index: 44;
    }

    .box {
        margin: 10px;
        float: right;
        width: 101px;
        height: 166px;
        border: 1px dashed gray;
        background-color: antiquewhite;
        /*cursor: pointer;*/
        z-index: 104;
        position: relative;
        border-radius: 14px;
        position:relative;
    }

    .rt {
        font-size: 16px;
        color: white;
        padding: 5px;
        cursor: pointer;
        top: 3px;
        right: 3px;
        position: absolute;
        display: block;
        border: 1px solid gray;
        border-radius: 50%;
        background-color: gray;
        border-width: 1px;
    }

    #mainContent {
        margin-top: 53px;
        display: block;
        width: 100%;
        height: 400px;
        box-sizing: border-box;
        border: 2px dashed #A2B4CA;
        border-radius: 3px;
        padding: 0;
        background-image: url(../../Styles/images/fancy_upload.png);
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0.85;
        cursor: pointer;
        outline: none;
        z-index: 3;
    }

    #_frm {
        padding: 9px;
    }
</style>

<script src="~/Scripts/Document/FileUploader.js"></script>

<div id="mainContent"></div>
<div class="modal-footer" style="margin-top: 17px;clear: both;border-top:0 !important;">
    <button id="submit" type="button" class="btn btn-primary btn-sm">save</button>
    <button id="return" type="button" class="btn btn-info btn-sm">return</button>
</div>
<script>
    fileUploader.onLoad();

    $('body').on('click', '.box', function (e) {
        e.stopPropagation();
        return false;
    })

    $('body').on('mousemove', '.box', function (e) {
        var t = $(this).find('.spin')
        if ($(t).hasClass('fa-spin')) return;
        $(this).find('.rt').show();
    })

    $('body').on('mousemove', '.rt', function (e) {
        $(this).css('color', 'red')
    })

    $('body').on('mouseout', '.rt', function (e) {
        $(this).css('color', 'white')
    })

    $('.rt').click(function () {
        fileUploader.onDeleteFile(this)
    })

    $('#submit').click(function (e) {
        fileUploader.onSubmitFile(e);
    })
    

</script>
```
* Create a action like this
```
public ActionResult _AddDocument()
{
    return PartialView();
}

public ActionResult EditDocument(List<HttpPostedFileBase> FileSelector)
{
     // do anything with your files
}

```

## Result
![](https://github.com/hamed-abdollahi/FileUploader/blob/main/FileUpload.png)

