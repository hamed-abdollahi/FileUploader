var fileUploader = (function ($) {
    var mainContent,
        realFile,
        currentFile,
        index = 0,
        fileExtentionsArr = [],
        domainUrl,
        dataTosend = [],
        formData = new FormData();
    var init = function (arr) {
        fileExtentionsArr = arr;
        onLoad();
    }
    var onLoad = function () {
        mainContent = document.getElementById('mainContent');
        mainContent.addEventListener('click', onClick);
    }
    var onCreate = function (file) {
        var form = document.createElement('form');
        form.className = 'frm';
        form.setAttribute('enctype', 'multipart/form-data');
        //
        var div = document.createElement('div');
        div.className = 'box';
        div.setAttribute('ind', index);
        div.addEventListener('click', function (e) { e.stopPropagation(); });
        //
        var img = document.createElement('img');
        img.className = 'imgType';
        img.setAttribute('width', 100);
        img.setAttribute('height', 130);
        img.src = '../Styles/images/attachment/' + getFileExt(file.name) + '.png';
        div.appendChild(img);
        //
        var adiv = document.createElement('div');
        adiv.style.textAlign = 'center';
        adiv.style.fontSize = '12px;';
        var span = document.createElement('span');
        span.style = 'word-wrap:break-word;';
        span.className = 'filename';
        span.innerText = file.name;
        adiv.appendChild(span);
        div.appendChild(adiv);
        //
        div.appendChild(currentFile);
        //
        var i = document.createElement('i');
        i.className = 'fa fa-remove rt';
        i.addEventListener('click', onDeleteFile)
        div.appendChild(i);
        form.appendChild(div);
        //
        var spin = document.createElement('i');
        spin.className = 'spin';
        spin.style.display = 'inline-block';
        spin.style.fontSize = '40px';
        spin.style.color = 'blue';
        spin.style.marginRight = '30px';
        spin.style.position = 'absolute';
        spin.style.top = '50px';
        div.appendChild(spin);
        //
        form.appendChild(div);
        index++;
        mainContent.appendChild(form);
        if (index > 0) {
            $('#mainContent').css('background-image', 'none')
        }
    }
    var onClick = function () {
        var inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.setAttribute('id', 'FileSelector_' + 0);
        inputFile.setAttribute('name', 'FileSelector[' + 0 + ']');
        inputFile.setAttribute('accept', getFileExenctions());
        inputFile.style.display = "none";
        document.body.appendChild(inputFile);
        inputFile.addEventListener('change', onChange);
        currentFile = inputFile;
        inputFile.click();
    }
    var onChange = function () {
        let file = currentFile.files[0];
        if (!file) return;
        var fileSize = getExtSize(getFileExt(file.name))
        if (fileSize == undefined) fileSize = 20480;
        if ((file.size / 1024) > fileSize) {
            alert("Large file error!!");
            return false;
        };
        onCreate(file);
    }
        let file = realFile.files[0];
        if (!file) return;
        if (getFileExenctions().indexOf(getFileExt(file.name)) < 0) {
            alert('فرمت فابل قبول نیست');
            realFile.value = '';
            return;
        }
        var fileSize = getExtSize(getFileExt(file.name))
        if ((file.size / 1024) > fileSize) {
            alert("حجم فایل زیاد است ، حداکثر حجم فایل 20 مگابایت می باشد");
            realFile.value = '';
            return false;
        };
        $('#dms_detID_fk').val(getExtId(getFileExt(file.name)));
    }
    var onDeleteFile = function (e) {
        var frm = $(this).closest('.frm');
        frm.remove();
        if (index > 0)
            index--;
        if (index == 0) {
            $('#mainContent').css('background-image', 'url(../../Styles/images/fancy_upload.png)')
        }
        e.stopPropagation();
    }
    var onSubmitFile = function (e) {
        var cnt = 0;
        var funcArr = [];
        var forms = $('.frm');
        if (forms.length == 0) {
            alert(' فایلی وجود ندارد');
            return;
        }
        $('.rt').hide();
        forms.each(function (index, elm) {
            var currentForm = elm;
            if ($(elm).hasClass('done')) return;
            var formData = new FormData(currentForm);
            e.preventDefault();
            var elm = $(currentForm).find('.spin')[0];
            var f = $.ajax({
                url: '/document/EditDocument',
                type: 'POST',
                dataType: "JSON",
                data: formData,
                processData: false,
                contentType: false,
                async: true,
                beforeSend: function () {
                    $(elm).addClass('fa fa-spinner fa-spin');
                    $(elm).css('color', 'blue')
                },
                success: function (data, status) {
                    if (data == 'UnauthorizedAccess') {
                        window.location.href = '/account/login';
                    }
                    if (data.success) {
                        $(elm).removeClass('fa fa-spinner fa-spin').addClass('fa fa-check-circle-o');
                        $(elm).css('color', 'green');
                        $(currentForm).addClass('done');
                    }
                    else {
                        $(elm).removeClass('fa fa-spinner fa-spin').addClass('fa fa-ban');
                        $(elm).css('color', 'red');
                        cnt = cnt + 1;
                    }
                },
                error: function (xhr, desc, err) {
                    $(elm).removeClass('fa fa-spinner fa-spin').addClass('fa fa-ban')
                    $(elm).css('color', 'red');
                    cnt = cnt + 1;
                }
            });
            funcArr.push(f)
        })
        $.when.apply($, funcArr).done(function () {
            documentManagement.onLoad();
        }).fail(function () {
            alert(String.format('تعداد {0} فایل با خطا مواجه شد',cnt))
        });
    }
        var cnt = 0;
        var forms = $('.frm');
        if (realFile.files[0] == undefined) {
            alert(' فایلی وجود ندارد');
            return;
        }
        forms.each(function (index, elm) {
            var currentForm = elm;
            if ($(elm).hasClass('done')) return;
            var formData = new FormData(currentForm);
            e.preventDefault();
            var elm = $(currentForm).find('.spin')[0];
            $.ajax({
                url: '/document/EditDocument',
                type: 'POST',
                dataType: "JSON",
                data: formData,
                processData: false,
                contentType: false,
                async: true,
                beforeSend: function () {
                    fileUploader.insideLoading("doc-data", true)
                },
                success: function (data, status) {
                    if (data == 'UnauthorizedAccess') {
                        window.location.href = '/account/login';
                    }
                    if (data.success) {
                        fileUploader.insideLoading("doc-data", false)
                        alert(' عملیات با موفقیت انجام شد');
                        documentManagement.onLoad();
                        currentFile = undefined;
                    }
                    else {
                        cnt = cnt + 1;
                    }
                },
                error: function (xhr, desc, err) {
                    cnt = cnt + 1;
                }
            });
        })
    }
    var getFileExt = function (fileName) {
        var ind = fileName.lastIndexOf('.');
        return fileName.substr((fileName.lastIndexOf('.') + 1));
    }
    var getFileExenctions = function () {
        var arr = [];
        fileExtentionsArr.forEach(function (elm) {
            arr.push('.' + elm.suffix)
        })
        return arr.join(',')
    }
    var getExtSize = function (ext) {
        var res
        fileExtentionsArr.forEach(function (elm) {
            if (elm.suffix.toLowerCase() == ext.toLowerCase())
                res = elm.maxSize
        })
        return res;
    }
    var insideLoading = function (divId, isShow) {
        if (!isShow) {
            $('#materialLoading').remove();
            return;
        }
        var div = document.getElementById(divId)
        var ml = document.createElement('div');
        ml.id = 'materialLoading';
        var mlCentered = document.createElement('div');
        mlCentered.id = 'materialLoadingCentered'
        var mlContent = document.createElement('div');
        mlContent.id = 'materialLoadingContent'
        mlContent.innerHTML = '<div class="fa fa-spinner fa-spin"></div>'
        mlCentered.appendChild(mlContent)
        ml.appendChild(mlCentered);
        div.appendChild(ml);
    }
    return {
        init: init,
        onLoad: onLoad,
        onChange: onChange,
        insideLoading: insideLoading,
        onSubmitFile: onSubmitFile
    }
})(jQuery);


