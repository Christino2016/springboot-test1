package com.cern.springboottest1.controller;

import com.cern.springboottest1.domain.UserData;
import com.cern.springboottest1.mapper.UserMapper;
import com.cern.springboottest1.service.AsyncTestService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
public class UserController {

    @Resource
    AsyncTestService asyncTestService;

    @Resource
    UserMapper userMapper;

    //value可读取配置文件中的变量
    @Value("${property.property1}")
    String property;

    //index页面
    @RequestMapping("/login")
    public String login(HttpServletRequest request) {
        log.info("登录日志 === Someone is logging to the system!!!");
        //这里就用Session代替ID吧
        //需要在logback中配置，这里没配
        MDC.put("reqId", request.getSession().getId());
        //测试异步操作
        asyncTestService.test();
        System.out.println("同步测试 === This is a Sync test!");
        //测试Redis cache
        userMapper.getNum();
        System.out.println("Redis Cache测试 === database count:" + userMapper.getNum());

        return "login";
    }

    //index页面
    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/login-error")
    public String error() {
        return "error";
    }

    @RequestMapping("/student")
    @ResponseBody
    public UserData student() {
        UserData user = new UserData();
        //user.setId(10);
        //user.setUsername("小明");
        user.setPassword("123456");
        //user.setRole("admin");
        return user;
    }



}
