import request from "@/utils/request";

// 获取用户
export async function queryList(): Promise<any> {
    debugger;
    return request('/api/user', {
        method:"GET",
    });
}

// 增加用户
export async function add(): Promise<any> {
    debugger;
    return request('/api/user', {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: {JSON}
    });
}