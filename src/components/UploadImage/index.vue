<template>
    <div class="upload-image-container">
        <div class="block">{{ uploadTitle }}</div>
        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :headers="headers">
            <img v-if="value" :src="imageUrl" class="avatar">

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { SERVER_URL } from '@/urlConfig';
export default {
    props: ['value', 'uploadTitle'],
    computed: {
        imageUrl() {
            return SERVER_URL + this.value
        }
    },
    methods: {
        handleAvatarSuccess(res) {
            if (!res.code && res.data) {
                this.$emit('input', res.data)
            }

        }
    },
    data() {
        return {
            headers: {
                authorization: "Bearer " + getToken()
            },

        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    margin: 15px 0;
    font-weight: 100;
}

.avatar-uploader .el-upload {
    
    cursor: pointer;
    position: relative;
    overflow: hidden;

    img {
        object-fit: cover;
    }
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>