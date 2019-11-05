import request from "@/utils/request";

// 获取用户
export async function queryList(): Promise<any> {
    debugger;
    return request('/api/user', {
        method:"GET",
    });
}

// 增加用户
export async function add(values:any): Promise<any> {
    return request('/api/user', {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}


// 更新用户
export async function update(values:any): Promise<any> {
    return request(`/api/user/${values.id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}


// 删除用户
export async function del(id:string): Promise<any> {
    return request(`/api/user/${id}`, {
        method:"DELETE",
    });
}


// 删除所有用户
export async function delAll(ids:string[] | number[] ): Promise<any> {
    return request(`/api/user/${ids[0]}`, {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ids)
    });
}

