<template>
    <div class="blog-type-container">
        <!-- 搜索框 -->
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入要添加的分类，左侧下拉框可选分类等级" v-model="input" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                </el-select>

            </el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="addOneType">添加</el-button>
        </div>
        <!-- 数据表格 -->
        <el-table :data="data" style="width: 100%;margin-top: 30px;" border>
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="博客类别" align="center">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="文章数量" align="center">
                <template slot-scope="scope">
                    {{ scope.row.articleCount }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
                        <el-button type="primary" icon="el-icon-edit" circle size="small"
                            @click="handleStartEdit(scope.row)"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" :hide-after="2000" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" circle size="small"
                            @click="deleteBlogType(scope.row)"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑分类 -->
        <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序等级" >
                    <el-select v-model="form.order" placeholder="请选择分类等级">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getBlogType, addBlogType, delBlogType,findOneBlogType,updataBlogType } from '@/api/blog';
export default {
    data() {
        return {
            input: '',
            select: '1',
            data: [],
            dialogFormVisible:false,
            form:{
                
            }

        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            getBlogType().then(({ data }) => {
                this.data = data
            })
        },
        addOneType() {
            if (!this.input) {
                this.$message.warning('必须提供分类名称')
            } else {
                addBlogType({
                    name: this.input,
                    order: this.select
                }).then(res => {

                    this.fetchData()
                    this.$message.success('添加文章分类成功')

                })
            }
        },
        deleteBlogType({ id }) {
            this.$confirm(
                "删除该文章分类会使该分类下文章变成未分类状态，是否继续?",
                "是否删除此文章分类",
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delBlogType(id).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        handleStartEdit({id}){
            findOneBlogType(id).then(({data})=>{
                this.form = {...data}
                this.dialogFormVisible = true;
            })
            
        },
        confirmEdit(){
           
            
            updataBlogType(this.form).then(res=>{

                this.fetchData();
                this.dialogFormVisible = false
                this.$message.success('更新分类信息成功')
                
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-type-container {
    padding: 20px;
}

.input-with-select {
    width: 400px;
}
</style>
