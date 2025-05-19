import request from '@/utils/request'

//分页获取文章
export function getBlogs(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params:{
            page,
            limit
        }
    })
}
//删除某篇文章
export function delOneBlog(id){
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

//获取文章分类

export function getBlogType(){
    return request({
        url: `/api/blogtype`,
        method: 'get',
    })
}

//添加文章分类

export function addBlogType(data){
    return request({
        url: `/api/blogtype`,
        method: 'post',
        data
    })
}   

//删除文章分类
export function delBlogType(id){
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',

    })
}

// 查找某一个文章分类
export function findOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get',
    })
}

//更新文章分类
export function updataBlogType(typeInfo){
    return request({
        url: `/api/blogtype/${typeInfo.id}`,
        method: 'put',
        data:typeInfo
    })
}