<template>
    <div class="add-blog-container">
        <div class="title">文章标题</div>
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        <div class="title">文章正文</div>
        <Editor height="600px" ref="toastuiEditor" />
        <!-- <div class="title">文章头图</div> -->
        <div class="title">文章描述</div>
        <el-input type="textarea" :rows="6" placeholder="请输入文章描述" v-model="form.description">
        </el-input>

        <UploadImage v-model="form.thumb" uploadTitle="文章头图" />
        <div class="title">选择分类</div>
        <el-select v-model="form.categoryId" slot="prepend" placeholder="请选择">
            <el-option v-for="item in categoryArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="title"><el-button type="primary" @click="confirmBlogChage">{{mode === "add" ? '发布文章' : '提交修改'}}</el-button></div>

    </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import UploadImage from '@/components/UploadImage'
import { getBlogType, publishOneBlog, editOneBlog,findOneBlog } from '@/api/blog';
export default {
    props: {
        mode: {
            type: String,
            default: 'add'
        }
    },
    data() {
        return {
            id: null,
            form: {
                title: '',
                thumb: '',
                categoryId: '',
                description: ''
            },
            categoryArr: [],
        }
    },

    components: {
        Editor,
        UploadImage,
    },
    created() {
        getBlogType().then(({ data }) => {
            this.categoryArr = data
        })
        if (this.mode === 'edit') {
            this.id = this.$route.params.id;
            findOneBlog(this.id).then(({ data }) => {

                this.form = data

                this.form.categoryId = data.category === null ? '' : data.category.id;
                this.$refs.toastuiEditor.invoke('setHTML', data.htmlContent);
            })
        }

    },
    methods: {
        confirmBlogChage() {
            let html = this.$refs.toastuiEditor.invoke('getHTML');
            let md = this.$refs.toastuiEditor.invoke('getMarkdown');
            let obj = {
                ...this.form,
                toc: [],
                markDown: md,
                htmlContent: html,
                createDate: Date.now()
            }

            if (obj.description && obj.title && obj.categoryId && obj.htmlContent) {
                if (this.mode === 'add') {
                    publishOneBlog(obj).then(res => {

                        this.$message.success('发布文章成功');
                        this.$router.push('/blogList');
                    })
                } else if (this.mode === 'edit') {
                    editOneBlog({
                        id: this.form.id,
                        data: obj
                    }).then(res => {
                        this.$message.success('文章修改成功');
                        this.$router.push('/blogList');
                    })
                }

            } else {
                this.$message.warning('请完整填写文章相关信息')
            }


        }
    }
}
</script>

<style lang="scss" scoped>
.add-blog-container {
    padding: 20px;

    .title {
        font-weight: 100;
        margin: 20px 0;
    }
}
</style>
