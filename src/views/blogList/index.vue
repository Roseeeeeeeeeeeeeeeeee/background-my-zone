<template>
    <div class="blog-list-container">
        <!-- 数据表格部分 -->
        <el-table :data="data" style="width: 100%" border>
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.$index+(curPage-1)*pageSize + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="文章名称" width="150" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top-start" title="博客预览图" width="230" trigger="hover">
                        <el-image style="width: 200px;" :src="scope.row.thumb" fit="cover" :preview-src-list="srcList"></el-image>
                        <a href="#" target="_blank" slot="reference" @click="goToDetail(scope.row)">{{ scope.row.title
                        }}</a>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="文章描述" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.description }}
                </template>
            </el-table-column>
            <el-table-column label="浏览数" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.scanNumber }}
                </template>
            </el-table-column>
            <el-table-column label="评论量" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.commentNumber }}
                </template>
            </el-table-column>
            <el-table-column label="所属分类" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.category === null ? '未分类' : scope.row.category.name }}
                </template>
            </el-table-column>
            <el-table-column label="创建日期" align="center" width="230">
                <template slot-scope="scope">
                    {{ getFormatDate(scope.row.createDate, true) }}
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-tooltip 
                    class="item" 
                    effect="dark" 
                    content="编辑" 
                    placement="top"
                    :hide-after="2000">
                        <el-button type="primary" icon="el-icon-edit" circle size="small"
                            @click="handleStartEdit(scope.row)"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" :hide-after="2000" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" circle size="small"
                            @click="deleteBlog(scope.row)"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页行 -->
        <el-pagination 
        background 
        :total="totalCount" 
        style="margin: 40px;"
        :page-size="pageSize"
        layout=" prev, pager, next,total ,->, sizes, jumper"
         :page-sizes="[5,10, 20]"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         @prev-click="handlePrev"
         @next-click="handleNext"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getBlogs, deleteBlog, delOneBlog } from '@/api/blog';
import { FRONTEND_URL, SERVER_URL } from '@/urlConfig';
import getFormatDate from '@/utils/getFormatDate';
export default {
    data() {
        return {
            data: [],
            srcList: [],
            totalCount:0, //数据总条数
            pageSize:5, //每页显示的条数
            curPage:1, //当前页
            totalPage:0//总页数
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getBlogs(this.curPage,this.pageSize).then(res => {
               
                this.totalCount = res.data.total;
                this.totalPage = Math.ceil(this.totalCount / this.pageSize)
                if(this.totalPage <  this.curPage){
                    //在删除文章后可能真实总页数会小于当前页数
                    this.curPage = this.totalPage;
                    this.fetchData();
                }
                for (let item of res.data.rows) {
                    item.thumb = SERVER_URL + item.thumb
                    // item.thumb = 'https://img1.baidu.com/it/u=1592846363,3525204503&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667'
                    this.srcList.push(item.thumb); //图片预览数组
                }
                this.data = res.data.rows
            })
        },
        getFormatDate,
        goToDetail(blogInfo) {
            window.open(`${FRONTEND_URL}/article/${blogInfo.id}`)
        },
        deleteBlog(blogInfo) {

            this.$confirm(
                "删除该文章会将该文章下面的评论一并删除，是否继续?",
                "是否删除此篇文章",
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delOneBlog(blogInfo.id).then(res => {
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
        //分页相关事件
        handleCurrentChange(cur){
            this.curPage = cur
            this.fetchData();
        },
        handleNext(){
            this.curPage++;
        },
        handlePrev(){
            this.curPage--;
        },
        handleSizeChange(nsize){
            this.pageSize = nsize
            this.curPage = 1
            this.fetchData();
        },
        //编辑文章
        handleStartEdit({id}){
            
            
            this.$router.push(`/editBlog${id}`)
        }

    },
}
</script>

<style lang="scss" scoped></style>
