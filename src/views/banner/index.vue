<template>
    <div class="banner-container">
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
                        <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
                    </el-tooltip>
                    
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getBanner } from '@/api/banner';
import { SERVER_URL } from '@/urlConfig';
export default {
    data() {
        return {
            data: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getBanner().then(res => {
               
                this.data = res.data
                for (let item of this.data) {

                    item.bigImg2 = SERVER_URL + item.bigImg
                    item.midImg2 = SERVER_URL + item.midImg

                }

            })
        }
    }
}
</script>

<style lang="scss" scoped>
.banner-container {
    padding: 20px;
}
</style>
