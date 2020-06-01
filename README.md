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
{"code":"1062","msg":"该用户已被注册，请尝试输入其他帐号"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
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
{"code":"1","msg":"账户名或密码错误"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "msg": "登陆成功"
      
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
{"code":1062,"msg":"系统异常，获取失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "ret": [{
          "express": "6*6*6",   //表达式
          "id": 33,       //计算结果在数据表中的id
          "result": "216",      //计算结果
          "updateAt": "2020-06-01T03:02:56.000Z",     //计算结果创建/更新时间
          "user": "112"     //用户名
      },
      ……
],
      "total": 222 //该用户全部计算记录的总数
     }
```
####测试
```
curl "http://127.0.0.1:3000/records/records?page=1&userId=1"
```
---------------------

GET/records/details

功能:获取对应id的计算记录详情

####提交参数
recordID,计算记录在数据表中的ID
####返回数据
* 失败
    * 返回格式
    
```json
{"code":1062,"msg":"没有找到相应数据"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "ret": [{
        "express": "1996",
        "id": 33,
        "result": "1996",
        "updateAt": "2020-06-01T03:02:56.000Z",
        "user": "112"
      }
]
    }
```
---------------------

POST/records/deleteRecord

功能:删除对应id的计算记录

####返回数据
* 失败
    * 返回格式
    
```json
{"code":1062,"msg":"没有找到相应数据"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "msg": "删除成功"
    }
```
---------------------

POST/create-record

功能:创建新的计算记录

####返回数据
* 失败
    * 返回格式
    
```json
{"code":1063,"msg":"保存失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "msg": "记录成功"
    }
```
---------------------

POST/update-record

功能:更新计算记录

####返回数据
* 失败
    * 返回格式
    
```json
{"code":1062,"msg":"更新失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "msg": "更新计算记录成功！"
    }
```
---------------------

POST/calculate

功能:根据传送的表达式计算

####返回数据
* 失败
    * 返回格式
    
```json
{"code":1062,"msg":"更新失败"}
``` 
   
* 成功
    * 返回格式
```json
    {
      "code": 0,
      "msg": "更新计算记录成功！"
    }
```
---------------------
# calculator-server
