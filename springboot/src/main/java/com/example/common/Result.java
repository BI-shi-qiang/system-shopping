package com.example.common;

public class Result {

    private String code;

    private String msg;

    private Object data;

    public Result() {
    }

    public static Result success() { // 成功时的默认返回结果
        Result result = new Result();
        result.setCode("200");
        result.setMsg("请求成功");
        return result;
    }

    public static Result success(Object data) { // 成功时返回数据
        Result result = success();
        result.setData(data);
        return result;
    }

    public static Result error() { // 失败时的默认返回结果
        Result result = new Result();
        result.setCode("500");
        result.setMsg("系统异常");
        return result;
    }

    public static Result error(String code, String msg) { // 失败时的自定义返回结果
        Result result = error();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

    public static Result error(String msg) { // 失败时的自定义返回结果
        Result result = error();
        result.setCode("500");
        result.setMsg(msg);
        return result;
    }

    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }
}
