import store from '../store'
import {
    toast
} from '@/utils/toast'
import i18n from './i18n'
import {
    stringutils
} from '@/utils/stringutils'
var uploadPDF = function () {
    var self = {};

    //上传图片地址
    self.uploadAction = function () {
        return stringutils.getBaseUrl() + "/pf/file/docupload";
    };
    //上传图片传参数
    self.uploadData = function () {
        return {
            "token": store.getters.token,
        }
    };
    self.beforeAvatarUpload = function (file) {
        const isLt2M = file.size / 1024 / 1024 < 10;

        var FileExt = file.name.replace(/.+\./, "");
        if (['pdf', 'PDF'].indexOf(FileExt.toLowerCase()) === -1) {
            this.$message({
                type: 'warning',
                message: '只支持PDF文件'
            });
            return false;
        }

        if (!isLt2M) {
            toast.error(i18n.t('tupiandaxiao'));
        }
        return isLt2M;
    };

    return self;
}();

export {
    uploadPDF
}