import request from '@/utils/request'


// 文章部分

//分页获取文章
export function getBlogs(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}
//删除某篇文章
export function delOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}
//发布文章
export function publishOneBlog(data) {
    return request({
        url: `/api/blog/    `,
        method: 'post',
        data
    })
}
//得到某篇文章内容
export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}   `,
        method: 'get',

    })
}
//修改文章内容
export function editOneBlog(blogInfo) {
    return request({
        url: `/api/blog/${blogInfo.id}   `,
        method: 'put',
        data:blogInfo.data
    })
}

//文章分类部分

//获取文章分类

export function getBlogType() {
    return request({
        url: `/api/blogtype`,
        method: 'get',
    })
}

//添加文章分类

export function addBlogType(data) {
    return request({
        url: `/api/blogtype`,
        method: 'post',
        data
    })
}

//删除文章分类
export function delBlogType(id) {
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
export function updataBlogType(typeInfo) {
    return request({
        url: `/api/blogtype/${typeInfo.id}`,
        method: 'put',
        data: typeInfo
    })
}