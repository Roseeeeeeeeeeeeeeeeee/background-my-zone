<template>
    <div class="banner-container">
        <!-- 表格部分 -->
        <el-table :data="data" style="width: 100%" border>
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
                <template slot-scope="scope">
                    {{ scope.row.description }}
                </template>
            </el-table-column>
            <el-table-column label="中图预览" align="center">
                <template slot-scope="scope">
                    <el-image style="width: 100px;" :src="scope.row.midImg2" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="大图预览" align="center">
                <template slot-scope="scope">
                    <el-image style="width: 100px; " :src="scope.row.bigImg2" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button type="primary" icon="el-icon-edit" circle size="small"
                            @click="handleStartEdit(scope.row)"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑首页标语 -->
        <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                    <!-- 首页中图 -->
                    <el-col :span="12">
                        <el-form-item label="首页中图">
                            <UploadImage v-model="form.midImg" />
                        </el-form-item>
                    </el-col>
                    <!-- 首页大图 -->

                    <el-col :span="12">
                        <el-form-item label="首页大图">
                            <UploadImage v-model="form.bigImg" />
                        </el-form-item>

                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { getBanner,postBanner } from '@/api/banner';
import { SERVER_URL } from '@/urlConfig';
import UploadImage from '@/components/UploadImage'
export default {
    data() {
        return {
            data: [],
            dialogFormVisible: false,
            formLabelWidth: '120',
            form: {
                // title: '',
                // desc: ''
            }
        }
    },
    components: {
        UploadImage,
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getBanner().then(res => {

                this.data = res.data
                console.log(this.data,'da');
                for (let item of this.data) {

                    item.bigImg2 = SERVER_URL + item.bigImg
                    item.midImg2 = SERVER_URL + item.midImg
                    // item.bigImg2 = 'https://pic.rmb.bdstatic.com/bjh/3f1cd7e5653/240811/a1418dcca1bd9803f3766a78be74541f.jpeg'
                    // item.midImg2 = 'https://pic.rmb.bdstatic.com/bjh/3f1cd7e5653/240811/34ceb92d8379fe3ff3557e778bfc3af8.jpeg'
                }

            })
        },
        handleStartEdit(bannerInfo) {
            //将编辑行的信息给对话框的form
           
            this.form = { ...bannerInfo }
            this.dialogFormVisible = true;

        },
        editBannerConfirm() {
            let arr  = [...this.data]
            for(let i = 0; i < arr.length;i++){
                if(arr[i].id === this.form.id){
                    arr[i] = this.form;
                    break;
                }
            }
            postBanner(arr).then(res=>{
                this.dialogFormVisible = false;
                this.$message.success('修改成功');
                this.fetchData()

            })
            
            

        }
    }
}
</script>

<style lang="scss" scoped>
.banner-container {
    padding: 20px;
}

.upload {
    text-align: center;

    div {
        margin-bottom: 20px;
    }
}
</style>
