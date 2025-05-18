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
