## 后端接口规范
------------------------------
请求根路径：http://127.0.0.1:3000/
### 认证相关
--------------
POST /auth/register

功能：用户注册

####提交参数

* 参数类型：Content-Type: application/x-www-form-urlencoded;charset=utf-8
* 参数字段:
    * username:用户名，长度1到15个字符，只能是字母、数字、下划线，中文。
    * password:密码，长度6-16个任意字符
    
####返回数据
* 失败
    * 返回格式
    
```json
{"status":"fail","msg":"注册失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "status": "ok",
      "msg": "注册成功",
      "data": {
        "id": 1,
        "username": "user",
        "createdAt": "2019-04-26T07:40:09.697Z"
      }
    }
```
####测试
```
curl -d "username=username&password=123456" -X POST "http://127.0.0.1:3000/register"
```

----------------------------------

POST /auth/login

功能：用户登录

####提交参数

* 参数类型：Content-Type: application/x-www-form-urlencoded;charset=utf-8
* 参数字段:
    * username:用户名，长度1到15个字符，只能是字母、数字、下划线，中文。
    * password:密码，长度6-16个任意字符
    
####返回数据
* 失败
    * 返回格式
    
```json
{"status":"fail","msg":"用户不存在（或密码不正确）"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "status": "ok",
      "msg": "登陆成功",
      "data": {
        "id": 1,
        "username": "user",
        "createdAt": "2019-04-26T07:40:09.697Z"
      }
    }
```
####测试
```
curl -d "username=username&password=123456" "http://127.0.0.1:3000/login"
```
--------------------------

###记录相关
GET/records

功能:获取计算记录列表

####提交参数

* 参数字段:
    * page:页码，不传默认为1。如果设置，则获取第page页的计算记录列表
    * userId：用户id
    
####返回数据
* 失败
    * 返回格式
    
```json
{"status":"fail","msg":"系统异常，获取失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "status": "ok",
      "msg": "获取成功",
      "total": 222, //全部计算记录的总数
      "page": 2,    //当前页数
      "totalPage": 10, //总页数
      "data": [{
        "id": 1,  //记录id
        "express": "5-6+4",
        "result": "3",
        "username": "user",
        "createdAt": "2019-04-26T07:40:09.697Z",
        "updateAt": "2019-04-26T07:40:09.697Z"
      },
      ……
]
    }
```
####测试
```
curl "http://127.0.0.1:3000/records/records?page=1&userId=1"
```
---------------------

GET/records/:recordId

功能:获取对应id的计算记录详情

####提交参数
无    
####返回数据
* 失败
    * 返回格式
    
```json
{"status":"fail","msg":"系统异常，获取失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "status": "ok",
      "msg": "获取成功",
      "data": {
        "id": 1,  //记录id
        "express": "5-6+4",
        "result": "3",
        "username": "user",
        "createdAt": "2019-04-26T07:40:09.697Z",
        "updateAt": "2019-14-26T07:40:09.697Z"
      }
    }
```
---------------------

DELETE/records/:recordId

功能:删除对应id的计算记录
####返回数据
* 失败
    * 返回格式
    
```json
{"status":"fail","msg":"删除失败，记录不存在"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "status": "ok",
      "msg": "删除成功"
    }
```
---------------------
# calculator-server
